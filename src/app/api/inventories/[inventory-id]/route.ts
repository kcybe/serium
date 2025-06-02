"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
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
      items: {
        include: {
          tags: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found or unauthorized" },
      { status: 404 }
    );
  }

  await logActivity({
    userId: user.id,
    action: "VIEW_INVENTORY",
    inventoryId: inventory.id,
  });

  return NextResponse.json(inventory);
}

export async function PUT(
  req: Request,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inventoryId = params["inventory-id"];
  let requestBody;
  try {
    requestBody = await req.json();
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const newName = requestBody.name;

  if (typeof newName !== "string" || newName.length === 0) {
    return NextResponse.json(
      { error: "Name is required in the request body" },
      { status: 400 }
    );
  }

  const inventory = await prisma.inventory.findFirst({
    where: {
      id: inventoryId,
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
    const updatedInventory = await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        name: newName,
      },
    });

    return NextResponse.json(updatedInventory);
  } catch (error) {
    console.error("Error updating inventory:", error);
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
  });

  if (!inventory) {
    return NextResponse.json(
      { error: "Inventory not found or unauthorized" },
      { status: 404 }
    );
  }

  try {
    const deletedInventory = await prisma.inventory.delete({
      where: {
        id: inventoryId,
      },
    });

    await logActivity({
      userId: user.id,
      action: "DELETE_INVENTORY",
      metadata: {
        deleted: {
          id: deletedInventory.id,
          name: deletedInventory.name,
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory" },
      { status: 500 }
    );
  }
}
