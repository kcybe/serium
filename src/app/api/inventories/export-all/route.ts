import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextRequest, NextResponse } from "next/server";
import Papa from "papaparse";

export async function GET(req: NextRequest) {
  // 1. Authenticate the user
  const user = await getAuthenticatedUserServer();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Determine the requested format from URL (e.g., /api/inventories/export-all?format=csv)
  const format = req.nextUrl.searchParams.get("format") ?? "json";

  // 3. Fetch all inventories for the user, including their nested items and tags
  const allUserInventories = await prisma.inventory.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          tags: { select: { name: true } },
        },
        orderBy: {
          name: "asc",
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  // 4. Log the export activity
  await logActivity({
    userId: user.id,
    action: "EXPORT_ALL_INVENTORIES",
    metadata: {
      inventoryCount: allUserInventories.length,
      itemCount: allUserInventories.reduce(
        (sum, inv) => sum + inv.items.length,
        0
      ),
      format: format,
    },
  });

  // 5. Generate a consistent filename for the export
  const timestamp = new Date().toISOString().split("T")[0];
  const baseFilename = `all_inventories_export_${timestamp}`;

  // 6. Generate and return the file based on the requested format
  switch (format.toLowerCase()) {
    case "csv": {
      // Use `flatMap` to transform the nested structure (inventories -> items)
      // into a single flat array of item objects, perfect for CSV.
      const flatData = allUserInventories.flatMap((inventory) =>
        inventory.items.map((item) => ({
          // Define the exact columns and their order for the CSV file.
          inventoryName: inventory.name,
          itemName: item.name,
          serialNumber: item.serialNumber ?? "",
          status: item.status,
          quantity: item.quantity,
          description: item.description ?? "",
          // Join tags into a single comma-separated string
          tags: item.tags.map((tag) => tag.name).join(", "),
          createdAt: item.createdAt.toISOString(),
          lastVerified: item.lastVerified?.toISOString() ?? "",
          inventoryId: inventory.id,
          itemId: item.id,
        }))
      );

      // Convert the flat array of objects into a CSV string.
      const csv = Papa.unparse(flatData, {
        header: true,
      });

      // Return the response that tells the browser to download the file.
      return new Response(csv, {
        status: 200,
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${baseFilename}.csv"`,
        },
      });
    }

    case "json":
    default: {
      // JSON naturally handles the nested data structure, so we just stringify it.
      // The `null, 2` argument makes the JSON output "pretty-printed" and readable.
      const jsonContent = JSON.stringify(allUserInventories, null, 2);

      // Return the response that tells the browser to download the file.
      return new Response(jsonContent, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${baseFilename}.json"`,
        },
      });
    }
  }
}
