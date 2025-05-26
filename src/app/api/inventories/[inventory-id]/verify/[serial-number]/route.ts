import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
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

  const item = await prisma.item.findUnique({
    where: {
      serialNumber_inventoryId: {
        serialNumber: params["serial-number"],
        inventoryId: params["inventory-id"],
      },
    },
  });

  if (item) {
    console.log(item);
    // Update the verification details
    await prisma.item.update({
      where: { id: item.id },
      data: {
        lastVerified: new Date(),
      },
    });

    return NextResponse.json({
      exists: true,
      verifiedAt: new Date(),
    });
  }

  return NextResponse.json({ exists: false });
}
