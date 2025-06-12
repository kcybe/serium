// app/api/items/search/route.ts
"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { "search-query": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const query = params["search-query"];

  if (!query || query.trim().length === 0) {
    return NextResponse.json([], { status: 200 }); // return empty if no query
  }

  const trimmedQuery = query.trim();

  try {
    const items = await prisma.item.findMany({
      where: {
        inventory: {
          user: {
            email: user.email,
          },
        },
        OR: [
          { name: { contains: trimmedQuery } },
          { serialNumber: { contains: trimmedQuery } },
          { description: { contains: trimmedQuery } },
        ],
      },
      include: {
        inventory: {
          select: { id: true, name: true },
        },
        tags: true,
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });

    // Log the search activity
    await logActivity({
      userId: user.id,
      action: "SEARCH_ITEMS",
      metadata: JSON.parse(
        JSON.stringify({
          searchQuery: trimmedQuery,
          resultsCount: items.length,
          searchedFields: ["name", "serialNumber", "description"],
        })
      ),
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Search failed:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
}
