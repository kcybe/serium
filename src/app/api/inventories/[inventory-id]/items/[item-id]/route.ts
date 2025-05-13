"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import { Item } from "../../../../../../../generated/prisma";

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

export async function PUT(
  req: Request,
  { params }: { params: { "inventory-id": string; "item-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Verify inventory ownership (similar to GET/DELETE)
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

  try {
    // 2. Get updated item data from request body
    const body = await req.json();
    const { name, description, status, quantity, serialNumber } =
      body as Partial<Item>; // Use Partial<Item> or a specific update DTO

    // Basic validation (you might want more robust validation, e.g., with Zod)
    if (!name || !status) {
      // Example: ensure required fields are present
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Update the item
    const updatedItem = await prisma.item.update({
      where: {
        id: params["item-id"],
        inventoryId: inventory.id,
      },
      data: {
        name,
        description,
        status,
        quantity,
        serialNumber,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}
