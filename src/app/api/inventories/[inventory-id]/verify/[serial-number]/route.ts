"use server";

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { "inventory-id": string; "serial-number": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  const itemToVerify = await prisma.item.findUnique({
    where: {
      serialNumber_inventoryId: {
        serialNumber: params["serial-number"],
        inventoryId: params["inventory-id"],
      },
    },
  });

  if (itemToVerify) {
    try {
      const verificationTime = new Date();
      const updatedItem = await prisma.item.update({
        where: {
          id: itemToVerify.id,
        },
        data: {
          lastVerified: verificationTime,
        },
      });

      await logActivity({
        userId: user.id,
        action: "VERIFY_ITEM_BY_SERIAL",
        itemId: updatedItem.id,
        inventoryId: updatedItem.inventoryId,
        metadata: JSON.parse(
          JSON.stringify({
            serialNumber: updatedItem.serialNumber,
            verifiedAt: updatedItem.lastVerified,
            itemName: updatedItem.name,
          })
        ),
      });

      return NextResponse.json({
        exists: true,
        verifiedAt: updatedItem.lastVerified,
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          serialNumber: updatedItem.serialNumber,
        },
      });
    } catch (error) {
      console.error("Error verifying item or logging activity:", error);
      return NextResponse.json(
        { error: "Failed to verify item" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        exists: false,
        message: `Item with serial number "${params["serial-number"]}" not found in inventory "${params["inventory-id"]}".`,
      },
      { status: 404 }
    ); // Return 404 if item specifically not found
  }
}
