"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import { logActivity } from "@/lib/logActivity";
import { ItemWithTags } from "@/types";
import { normalizeTagName } from "@/lib/utils";
import { Prisma } from "../../../../../../../generated/prisma";

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
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  // Log activity for viewing an item
  await logActivity({
    userId: user.id,
    action: "VIEW_ITEM",
    itemId: item.id,
    inventoryId: item.inventoryId,
    metadata: JSON.parse(JSON.stringify({ itemName: item.name })),
  });

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
  try {
    const deletedItem = await prisma.item.delete({
      where: {
        id: params["item-id"],
        inventoryId: inventory.id,
      },
    });

    await logActivity({
      userId: user.id,
      action: "DELETE_ITEM",
      itemId: deletedItem.id,
      inventoryId: deletedItem.inventoryId,
      metadata: JSON.parse(
        JSON.stringify({
          deleted: {
            id: deletedItem.id,
            name: deletedItem.name,
            description: deletedItem.description,
            status: deletedItem.status,
            quantity: deletedItem.quantity,
            serialNumber: deletedItem.serialNumber,
          },
        })
      ),
    });

    return NextResponse.json({
      message: "Item deleted successfully",
      id: deletedItem.id,
    });
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
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
    const {
      name,
      description,
      status,
      quantity,
      serialNumber,
      tags: emblorTags,
    } = body as Partial<ItemWithTags> & { tags?: { id?: string; text: string }[] };

    // Basic validation (you might want more robust validation, e.g., with Zod)
    if (!name || !status) {
      // Example: ensure required fields are present
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const oldItem = await prisma.item.findUnique({
      where: { id: String([params["item-id"]]) },
    });

    const tagConnectOrCreateOperations: Prisma.TagCreateOrConnectWithoutItemsInput[] =
          [];
    
        for (const tag of emblorTags || []) {
          const normalizedTagText = normalizeTagName(tag.text);
          if (normalizedTagText) {
            // Only proceed if the normalized name is not empty
            tagConnectOrCreateOperations.push({
              where: { name_userId: { name: normalizedTagText, userId: user.id } },
              create: { name: normalizedTagText, userId: user.id },
            });
          }
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
        tags: {
          // First disconnect all existing tags
          set: [],
          // Then connect the new ones  
          connectOrCreate: tagConnectOrCreateOperations,
        },
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    await logActivity({
      userId: user.id,
      action: "EDIT_ITEM",
      itemId: updatedItem.id,
      inventoryId: updatedItem.inventoryId,
      metadata: JSON.parse(
        JSON.stringify({
          old: oldItem,
          new: updatedItem,
        })
      ),
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
