export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { TagDistributionData } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getAuthenticatedUserServer();
    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tagsWithItemCounts = await prisma.tag.findMany({
      where: {
        userId: user.id,
      },
      select: {
        name: true,
        _count: {
          select: {
            items: true,
          },
        },
      },
    });

    const responseData: TagDistributionData[] = tagsWithItemCounts
      .map((tag) => ({
        name: tag.name,
        value: tag._count.items,
      }))
      .filter((tag) => tag.value > 0);

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Failed to fetch tags distribution:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch tags distribution", details: errorMessage },
      { status: 500 }
    );
  }
}
