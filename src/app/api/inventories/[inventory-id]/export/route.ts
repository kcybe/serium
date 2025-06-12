import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(
  req: Request,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const inventoryId = params["inventory-id"];
  const url = new URL(req.url);
  const format = url.searchParams.get("format") ?? "json";

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
    action: "EXPORT_INVENTORY",
    inventoryId: inventory.id,
    metadata: {
      inventoryName: inventory.name,
      items: inventory.items.length,
    },
  });

  switch (format.toLowerCase()) {
    case "csv": {
      try {
        if (!inventory.items || inventory.items.length === 0) {
          return new Response("", {
            headers: {
              "Content-Type": "text/csv",
              "Content-Disposition": `attachment; filename="inventory-${inventory.id}-empty.csv"`,
            },
          });
        }

        const flattenedItems = inventory.items.map((item) => {
          return {
            itemId: item.id,
            itemName: item.name,
            serialNumber: item.serialNumber,
            status: item.status,
            quantity: item.quantity,
            description: item.description,
            createdAt: item.createdAt.toISOString(),
            lastVerified: item.lastVerified?.toISOString() ?? "",
            tags: item.tags.map((tag) => tag.name).join(", "),
            inventoryId: inventory.id,
            inventoryName: inventory.name,
          };
        });

        const csv = Papa.unparse(flattenedItems, {
          header: true,
        });

        return new Response(csv, {
          status: 200,
          headers: {
            "Content-Type": "text/csv",
            "Content-Disposition": `attachment; filename="inventory-${inventory.id}.csv"`,
          },
        });
      } catch (error) {
        return NextResponse.json(
          { error: `CSV export failed: ${error}` },
          { status: 500 }
        );
      }
    }

    default: {
      const json = JSON.stringify(inventory);

      return new Response(json, {
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="inventory-${inventory.id}.json"`,
        },
      });
    }
  }
}
