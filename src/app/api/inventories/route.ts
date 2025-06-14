"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";

export async function GET() {
  // Pass headers as an object property
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userWithInventories = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        inventories: {
          orderBy: { createdAt: "desc" },
          include: { items: true },
        },
      },
    });

    const inventories = userWithInventories?.inventories ?? [];

    // Log the activity of viewing all inventories
    await logActivity({
      userId: user.id,
      action: "VIEW_ALL_INVENTORIES",
      metadata: JSON.parse(
        JSON.stringify({
          inventoriesCount: inventories.length,
        })
      ),
    });

    return NextResponse.json(inventories);
  } catch (error) {
    console.error("Failed to fetch inventories:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let requestBody;
  try {
    requestBody = await req.json();
  } catch (error) {
    console.error("Error parsing JSON body for inventory creation:", error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, description } = requestBody;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json(
      { error: "Inventory name is required and cannot be empty" },
      { status: 400 }
    );
  }

  try {
    const newInventory = await prisma.inventory.create({
      data: {
        name: name.trim(), // Use trimmed name
        description: description?.trim(), // Use trimmed description
        userId: user.id,
      },
    });

    // Log the activity of creating a new inventory
    await logActivity({
      userId: user.id,
      action: "CREATE_INVENTORY",
      inventoryId: newInventory.id,
      metadata: JSON.parse(
        JSON.stringify({
          created: newInventory,
        })
      ),
    });

    return NextResponse.json(newInventory, { status: 201 }); // Return 201 Created
  } catch (error) {
    console.error("Failed to create inventory:", error);
    return NextResponse.json(
      { error: `Failed to create inventory: ${error}` },
      { status: 500 }
    );
  }
}
