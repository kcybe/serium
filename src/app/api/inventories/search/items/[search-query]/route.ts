// app/api/items/search/route.ts
import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
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

  try {
    const items = await prisma.item.findMany({
      where: {
        inventory: {
          user: {
            email: user.email,
          },
        },
        OR: [
          { name: { contains: query } },
          { serialNumber: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        inventory: {
          select: { id: true, name: true },
        },
      },
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
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
