// app/api/inventories/[id]/items/route.ts
"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inventoryId = params["inventory-id"];
  const { name, serialNumber, description, status, quantity } =
    await req.json();

  // Make sure the inventory belongs to the user
  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
    include: { user: true },
  });

  if (!inventory || inventory.user.email !== user.email) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const checkSerialNumberExists = await prisma.item.findFirst({
    where: {
      serialNumber,
      inventoryId,
    },
  });

  if (checkSerialNumberExists) {
    return NextResponse.json(
      {
        error: `Item with serial number ${serialNumber} already exists in inventory ${inventoryId}`,
      },
      { status: 400 }
    );
  }

  try {
    const newItem = await prisma.item.create({
      data: {
        name: name,
        serialNumber: serialNumber ? serialNumber.trim() : null, // Store trimmed or null
        inventoryId,
        description: description || null,
        status,
        quantity: quantity !== undefined ? quantity : 1,
      },
    });

    // Log activity for creating an item
    await logActivity({
      userId: user.id,
      action: "CREATE_ITEM",
      itemId: newItem.id,
      inventoryId: newItem.inventoryId,
      metadata: JSON.parse(
        JSON.stringify({
          created: newItem, // Log the entire created item object
        })
      ),
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Failed to create item:", error);
    return NextResponse.json(
      { error: `Failed to create item: ${error}` },
      { status: 500 }
    );
  }
}
