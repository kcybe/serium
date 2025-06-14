export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import type { DashboardStats } from "@/types"; // Ensure this path is correct for your DashboardStats type

// Helper function to calculate percentage change and trend
function calculatePercentageChange(
  current: number,
  previous: number
): { change?: number; trend?: "up" | "down" | "neutral" } {
  if (previous === 0) {
    // If previous is 0, any increase is 'infinite' or 100% if current > 0
    // You might want to display "New" or similar in the UI for this case
    return {
      change: current > 0 ? 100 : 0,
      trend: current > 0 ? "up" : "neutral",
    };
  }
  const change = ((current - previous) / previous) * 100;
  return {
    change: parseFloat(change.toFixed(1)), // Round to one decimal place
    trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
  };
}

export async function GET() {
  try {
    const user = await getAuthenticatedUserServer();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1); // Not strictly needed for these queries

    // --- Total Items (sum of quantity) ---
    const currentTotalItemsAgg = await prisma.item.aggregate({
      _sum: { quantity: true },
      where: {
        inventory: { userId: user.id },
        // Consider if you only want items created *this* month or *all* current items
      },
    });
    const currentTotalItems = currentTotalItemsAgg._sum.quantity ?? 0;

    const previousTotalItemsAgg = await prisma.item.aggregate({
      _sum: { quantity: true },
      where: {
        inventory: { userId: user.id },
        createdAt: { lt: startOfCurrentMonth }, // Items created before the start of this month
      },
    });
    const previousTotalItems = previousTotalItemsAgg._sum.quantity ?? 0;
    const totalItemsChangeStats = calculatePercentageChange(
      currentTotalItems,
      previousTotalItems
    );

    // --- Total Available Items (count) ---
    const currentAvailableItems = await prisma.item.count({
      where: {
        inventory: { userId: user.id },
        status: "Available",
      },
    });
    const previousAvailableItems = await prisma.item.count({
      where: {
        inventory: { userId: user.id },
        status: "Available",
        createdAt: { lt: startOfCurrentMonth },
      },
    });
    const availableItemsChangeStats = calculatePercentageChange(
      currentAvailableItems,
      previousAvailableItems
    );

    // --- Items Needing Attention (count) ---
    const currentItemsNeedingAttention = await prisma.item.count({
      where: {
        inventory: { userId: user.id },
        OR: [{ status: "Broken" }, { status: "Repair" }, { status: "Lost" }],
      },
    });
    const previousItemsNeedingAttention = await prisma.item.count({
      where: {
        inventory: { userId: user.id },
        OR: [{ status: "Broken" }, { status: "Repair" }, { status: "Lost" }],
        createdAt: { lt: startOfCurrentMonth },
      },
    });
    const itemsNeedingAttentionChangeStats = calculatePercentageChange(
      currentItemsNeedingAttention,
      previousItemsNeedingAttention
    );

    // --- Unique Tags (count) ---
    const currentUniqueTags = await prisma.tag.count({
      where: { userId: user.id },
    });
    const previousUniqueTags = await prisma.tag.count({
      where: {
        userId: user.id,
        createdAt: { lt: startOfCurrentMonth },
      },
    });
    const uniqueTagsChangeStats = calculatePercentageChange(
      currentUniqueTags,
      previousUniqueTags
    );

    const dashboardStats: DashboardStats = {
      totalItems: currentTotalItems,
      totalItemsChange: totalItemsChangeStats.change,
      totalItemsTrend: totalItemsChangeStats.trend,

      totalAvailableItems: currentAvailableItems,
      totalAvailableItemsChange: availableItemsChangeStats.change,
      totalAvailableItemsTrend: availableItemsChangeStats.trend,

      itemsNeedingAttentionCount: currentItemsNeedingAttention,
      itemsNeedingAttentionCountChange: itemsNeedingAttentionChangeStats.change,
      itemsNeedingAttentionCountTrend: itemsNeedingAttentionChangeStats.trend,

      uniqueTagsCount: currentUniqueTags,
      uniqueTagsCountChange: uniqueTagsChangeStats.change,
      uniqueTagsCountTrend: uniqueTagsChangeStats.trend,
    };

    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error("Failed to fetch stats with percentage change:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch stats", details: errorMessage }, // Consider removing 'details' in production
      { status: 500 }
    );
  }
}
