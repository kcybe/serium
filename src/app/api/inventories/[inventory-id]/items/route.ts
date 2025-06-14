// app/api/inventories/[id]/items/route.ts
"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { normalizeTagName } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "../../../../../../prisma/generated/prisma";
import { cleanupUnusedTags } from "@/lib/tag-utils";

const EmblorTagSchema = z.object({
  id: z.string().optional(), // Will be present if it's an existing tag selected from suggestions
  text: z.string().min(1, "Tag name cannot be empty"),
});

const CreateItemPayloadSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  serialNumber: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum(["Available", "InUse", "Broken", "Repair", "Lost"]), // Use your ItemStatus enum values
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
  tags: z.array(EmblorTagSchema).optional().default([]), // Array of emblor tags
});

export async function POST(
  req: NextRequest,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inventoryId = params["inventory-id"];

  const inventory = await prisma.inventory.findUnique({
    where: { id: inventoryId },
    include: { user: true },
  });

  if (!inventory || inventory.userId !== user.id) {
    return NextResponse.json(
      { error: "Forbidden or Inventory not found" },
      { status: 403 }
    );
  }

  let payload;
  try {
    const rawPayload = await req.json();
    payload = CreateItemPayloadSchema.parse(rawPayload);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Failed to parse JSON body:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const {
    name,
    serialNumber,
    description,
    status,
    quantity,
    tags: emblorTags,
  } = payload;

  if (serialNumber) {
    const checkSerialNumberExists = await prisma.item.findFirst({
      where: {
        serialNumber: serialNumber.trim(),
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

    if (checkSerialNumberExists) {
      return NextResponse.json(
        {
          error: `Item with serial number ${serialNumber} already exists in this inventory.`,
        },
        { status: 409 }
      );
    }
  }

  try {
    // Prepare tag operations for Prisma
    // Use Prisma.TagCreateOrConnectWithoutItemsInput type for clarity
    const tagConnectOrCreateOperations: Prisma.TagCreateOrConnectWithoutItemsInput[] =
      [];

    for (const tag of emblorTags) {
      const normalizedTagText = normalizeTagName(tag.text);
      if (normalizedTagText) {
        // Only proceed if the normalized name is not empty
        tagConnectOrCreateOperations.push({
          where: { name_userId: { name: normalizedTagText, userId: user.id } },
          create: { name: normalizedTagText, userId: user.id },
        });
      }
    }

    const newItem = await prisma.item.create({
      data: {
        name: name,
        serialNumber: serialNumber ? serialNumber.trim() : null, // Store trimmed or null
        inventoryId,
        description: description || null,
        status,
        quantity: quantity !== undefined ? quantity : 1,
        tags:
          tagConnectOrCreateOperations.length > 0
            ? { connectOrCreate: tagConnectOrCreateOperations }
            : undefined,
      },
      include: { tags: true },
    });

    await cleanupUnusedTags(user.id);

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
