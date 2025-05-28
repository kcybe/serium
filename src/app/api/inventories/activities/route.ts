"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server"; // Removed NextRequest as it's not used for query params now

export async function GET() {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const whereClause = {
      userId: user.id,
    };

    const activities = await prisma.activityLog.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc", // Show most recent activities first
      },
      include: {
        inventory: {
          select: { id: true, name: true },
        },
        item: {
          select: { id: true, name: true, serialNumber: true },
        },
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Return all fetched activities directly
    return NextResponse.json(activities);
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);
    return NextResponse.json(
      { error: "Failed to fetch activity logs" },
      { status: 500 }
    );
  }
}
