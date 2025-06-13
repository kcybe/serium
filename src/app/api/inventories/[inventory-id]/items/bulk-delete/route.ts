import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/logActivity";

interface RouteParams {
  params: {
    "inventory-id": string;
  };
}

export async function POST(req: Request, { params }: RouteParams) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inventoryIdFromPath = params["inventory-id"];
  if (!inventoryIdFromPath) {
    return NextResponse.json(
      { error: "Inventory ID is missing from path." },
      { status: 400 }
    );
  }

  let payload: { ids: string[] };
  try {
    payload = await req.json();
    if (!payload || !Array.isArray(payload.ids) || payload.ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid request body. 'ids' array is required." },
        { status: 400 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: `Invalid JSON body ${e}` },
      { status: 400 }
    );
  }

  const { ids: itemIdsToProcess } = payload;

  try {
    const inventory = await prisma.inventory.findUnique({
      where: {
        id: inventoryIdFromPath,
        userId: user.id,
      },
    });

    if (!inventory) {
      return NextResponse.json(
        {
          error: "Inventory not found or you are not authorized to access it.",
        },
        { status: 404 }
      );
    }

    const itemsToDelete = await prisma.item.findMany({
      where: {
        id: {
          in: itemIdsToProcess,
        },
        inventoryId: inventoryIdFromPath,
      },
      select: {
        id: true,
        name: true,
        serialNumber: true,
      },
    });

    if (itemsToDelete.length === 0) {
      return NextResponse.json(
        {
          error:
            "No matching items found or unauthorized to delete the specified items.",
        },
        { status: 404 }
      );
    }

    const actualIdsToDelete = itemsToDelete.map((item) => item.id);

    await logActivity({
      userId: user.id,
      action: "DELETE_ITEM",
      metadata: {
        deleted: itemsToDelete.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      },
    });

    await prisma.item.deleteMany({
      where: { id: { in: actualIdsToDelete } },
    });

    return NextResponse.json(
      {
        message: `${itemsToDelete.length} items deleted successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
