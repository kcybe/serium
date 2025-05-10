"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inventoryId = params["inventory-id"];

  const inventory = await prisma.inventory.findFirst({
    where: {
      id: inventoryId,
      user: {
        email: user.email,
      },
    },
    include: {
      items: true,
    },
  });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json(inventory);
}
