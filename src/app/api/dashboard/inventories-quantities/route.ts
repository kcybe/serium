export const dynamic = "force-dynamic";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getAuthenticatedUserServer();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await prisma.item.findMany({
      select: {
        quantity: true,
        createdAt: true, // Using createdAt for monthly aggregation
        inventory: {
          select: {
            name: true,
          },
        },
      },
      where: {
        inventory: {
          userId: user.id,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Intermediate structure to hold aggregated data: { "Month Year": { "InventoryName": totalQuantity, ... }, ... }
    const monthlyData: Record<string, Record<string, number>> = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    items.forEach((item) => {
      if (!item.inventory) return; // Skip items without an inventory

      const date = new Date(item.createdAt);
      const year = date.getFullYear();
      const monthIndex = date.getMonth(); // 0-11
      const monthKey = `${monthNames[monthIndex]} ${year}`; // e.g., "Jan 2024"

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {};
      }
      if (!monthlyData[monthKey][item.inventory.name]) {
        monthlyData[monthKey][item.inventory.name] = 0;
      }
      monthlyData[monthKey][item.inventory.name] += item.quantity;
    });

    // Get all unique inventory names from the items that have an inventory
    const allInventoryNames = Array.from(
      new Set(
        items
          .filter((item) => item.inventory)
          .map((item) => item.inventory!.name)
      )
    );

    // Transform into the final chart data structure, sorted by date
    // e.g., [{ date: "Jan 2024", "Inventory A": 10, "Inventory B": 0 }, { date: "Feb 2024", ... }]
    const chartData = Object.keys(monthlyData)
      .sort((a, b) => {
        // Sort by date chronologically
        const [aMonthStr, aYearStr] = a.split(" ");
        const [bMonthStr, bYearStr] = b.split(" ");
        const dateA = new Date(`${aMonthStr} 1, ${aYearStr}`);
        const dateB = new Date(`${bMonthStr} 1, ${bYearStr}`);
        return dateA.getTime() - dateB.getTime();
      })
      .map((monthKey) => {
        const monthEntry: Record<string, string | number> = { date: monthKey };
        allInventoryNames.forEach((invName) => {
          monthEntry[invName] = monthlyData[monthKey]?.[invName] || 0; // Default to 0 if no items for this inventory in this month
        });
        return monthEntry;
      });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error("Error fetching inventories quantities:", error);
    // In a production app, you might want to log more details or use a dedicated error reporting service
    return NextResponse.json(
      { error: "Failed to fetch item quantity data" },
      { status: 500 }
    );
  }
}
