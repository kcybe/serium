import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/logActivity";

export async function POST(req: Request) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  const { ids: inventoryIdsToProcess } = payload; // Extract the array

  try {
    const inventoriesToDelete = await prisma.inventory.findMany({
      where: {
        id: {
          in: inventoryIdsToProcess,
        },
        user: { email: user.email },
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (inventoriesToDelete.length === 0) {
      return NextResponse.json(
        {
          error:
            "No matching inventories found or unauthorized to delete the specified inventories.",
        },
        { status: 404 }
      );
    }

    const actualIdsToDelete = inventoriesToDelete.map((inv) => inv.id);

    await logActivity({
      userId: user.id,
      action: "DELETE_SELECTED_INVENTORIES",
      metadata: {
        deleted: inventoriesToDelete.map((inventory) => ({
          id: inventory.id,
          name: inventory.name,
        })),
      },
    });

    await prisma.inventory.deleteMany({
      where: { id: { in: actualIdsToDelete } },
    });

    return NextResponse.json(
      {
        message: `${inventoriesToDelete.length} inventories deleted successfully.`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return NextResponse.json(
      { error: "Failed to delete inventory" },
      { status: 500 }
    );
  }
}
