"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { "inventory-id": string; "item-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // First, verify that the inventory belongs to the user
  const inventory = await prisma.inventory.findFirst({
    where: {
      id: params["inventory-id"],
      user: {
        email: user.email,
      },
    },
  });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found or unauthorized" },
      { status: 404 }
    );
  }

  // Then fetch the item, ensuring it belongs to the verified inventory
  const item = await prisma.item.findFirst({
    where: {
      id: params["item-id"],
      inventoryId: inventory.id,
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json(item);
}

export async function DELETE(
  req: Request,
  { params }: { params: { "inventory-id": string; "item-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // First, verify that the inventory belongs to the user
  const inventory = await prisma.inventory.findFirst({
    where: {
      id: params["inventory-id"],
      user: {
        email: user.email,
      },
    },
  });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found or unauthorized" },
      { status: 404 }
    );
  }

  // Then fetch the item, ensuring it belongs to the verified inventory
  const item = await prisma.item.delete({
    where: {
      id: params["item-id"],
      inventoryId: inventory.id,
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Item deleted successfully" });
}
