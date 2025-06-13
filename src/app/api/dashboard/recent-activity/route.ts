export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import type { RecentActivity, ActivityActionType } from "@/types"; // Import the new types

export async function GET() {
  try {
    const user = await getAuthenticatedUserServer();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const activities = await prisma.activityLog.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
      select: {
        id: true,
        action: true,
        createdAt: true,
        user: {
          select: { name: true },
        },
        item: {
          select: { id: true, name: true },
        },
        inventory: {
          select: { id: true, name: true },
        },
      },
    });

    const recentActivities: RecentActivity[] = activities.map((log) => ({
      id: log.id,
      action: log.action as ActivityActionType,
      createdAt: log.createdAt.toISOString(),
      userName: log.user?.name,
      itemName: log.item?.name,
      itemId: log.item?.id,
      inventoryName: log.inventory?.name,
      inventoryId: log.inventory?.id,
    }));

    return NextResponse.json(recentActivities);
  } catch (error) {
    console.error("Failed to fetch recent activity:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch recent activity", details: errorMessage },
      { status: 500 }
    );
  }
}
