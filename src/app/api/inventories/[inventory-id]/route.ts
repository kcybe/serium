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

export async function PUT(
  req: Request,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inventoryId = params["inventory-id"];
  const { newInventoryName } = await req.json();

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

  try {
    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        name: newInventoryName,
      },
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    return NextResponse.json(
      { error: "Failed to update inventory" },
      { status: 500 }
    );
  } finally {
    return NextResponse.json(inventory);
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

  try {
    await prisma.inventory.delete({
      where: {
        id: inventoryId,
      },
    });
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory" },
      { status: 500 }
    );
  } finally {
    return NextResponse.json(inventory);
  }
}
