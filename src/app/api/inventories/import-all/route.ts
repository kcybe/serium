import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextResponse } from "next/server";
import Papa from "papaparse";
import { z } from "zod";
import { PrismaClientKnownRequestError } from "../../../../../prisma/generated/prisma/runtime/library";

// --- Zod Schemas for Validation ---

// Schema for a row in the CSV file for "all inventories" import.
// Must include the inventoryName.
const CsvRowSchema = z.object({
  inventoryName: z.string().min(1, "inventoryName is required for each row."),
  itemName: z.string().min(1, "itemName cannot be empty."),
  serialNumber: z.string().optional().nullable(),
  status: z.enum(["Available", "InUse", "Broken", "Repair", "Lost"]),
  quantity: z.coerce.number().int().min(0),
  description: z.string().optional().nullable(),
  tags: z.string().optional(), // e.g., "tag1, tag2, tag3"
});

type CsvItem = z.infer<typeof CsvRowSchema>;

// Schema for a single item within the JSON structure
const JsonItemSchema = z.object({
  name: z.string().min(1),
  serialNumber: z.string().optional().nullable(),
  status: z.enum(["Available", "InUse", "Broken", "Repair", "Lost"]),
  quantity: z.coerce.number().int().min(0),
  description: z.string().optional().nullable(),
  tags: z.array(z.object({ name: z.string() })).optional(), // e.g., [{name: "tag1"}, {name: "tag2"}]
});

// Schema for an inventory within the JSON structure
const JsonInventorySchema = z.object({
  name: z.string().min(1),
  items: z.array(JsonItemSchema).optional(),
});

// The final structure we will process, mapping inventory names to their items
type InventoryItemGroup = {
  name: string;
  items: (z.infer<typeof CsvRowSchema> | z.infer<typeof JsonItemSchema>)[];
};

export async function POST(req: Request) {
  const user = await getAuthenticatedUserServer();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const fileType = file.type;
    const content = await file.text();
    let inventoryGroups: InventoryItemGroup[] = [];

    // 1. PARSE AND VALIDATE BASED ON FILE TYPE
    if (fileType === "application/json") {
      const jsonData = JSON.parse(content);
      const validation = z.array(JsonInventorySchema).safeParse(jsonData);
      if (!validation.success) {
        return NextResponse.json(
          {
            error: "Invalid JSON structure.",
            details: validation.error.format(),
          },
          { status: 400 }
        );
      }
      // Convert JSON structure to our common `InventoryItemGroup` format
      inventoryGroups = validation.data.map((inv) => ({
        name: inv.name,
        items: inv.items || [],
      }));
    } else if (fileType === "text/csv") {
      const parseResult = Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
      });
      if (parseResult.errors.length) {
        return NextResponse.json(
          { error: "Error parsing CSV file", details: parseResult.errors },
          { status: 400 }
        );
      }

      const validation = z.array(CsvRowSchema).safeParse(parseResult.data);
      if (!validation.success) {
        return NextResponse.json(
          {
            error: "CSV data validation failed",
            details: validation.error.format(),
          },
          { status: 400 }
        );
      }

      // Group CSV rows by inventoryName into our common format
      const groupedByInventory = new Map<string, CsvItem[]>();
      for (const row of validation.data) {
        if (!groupedByInventory.has(row.inventoryName)) {
          groupedByInventory.set(row.inventoryName, []);
        }
        groupedByInventory.get(row.inventoryName)!.push(row);
      }

      inventoryGroups = Array.from(groupedByInventory.entries()).map(
        ([name, items]) => ({
          name,
          items,
        })
      );
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a JSON or CSV file." },
        { status: 400 }
      );
    }

    if (inventoryGroups.length === 0) {
      return NextResponse.json({
        message: "No inventories or items to import.",
      });
    }

    // 2. CREATE INVENTORIES AND ITEMS IN A TRANSACTION
    let inventoriesCreated = 0;
    let itemsCreated = 0;

    await prisma.$transaction(
      async (tx) => {
        for (const group of inventoryGroups) {
          // Create the inventory
          const newInventory = await tx.inventory.create({
            data: { name: group.name, userId: user.id },
          });
          inventoriesCreated++;

          if (group.items && group.items.length > 0) {
            for (const itemData of group.items) {
              // Handle tags: find or create them
              const tagConnectOrCreate = [];
              // Tags from CSV are a string
              if (typeof itemData.tags === "string" && itemData.tags) {
                const tagNames = itemData.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);
                for (const tagName of tagNames) {
                  tagConnectOrCreate.push({
                    where: { name_userId: { name: tagName, userId: user.id } },
                    create: { name: tagName, userId: user.id },
                  });
                }
                // Tags from JSON are an array of objects
              } else if (Array.isArray(itemData.tags)) {
                for (const tag of itemData.tags) {
                  tagConnectOrCreate.push({
                    where: { name_userId: { name: tag.name, userId: user.id } },
                    create: { name: tag.name, userId: user.id },
                  });
                }
              }

              // Create the item and connect tags
              await tx.item.create({
                data: {
                  name: "name" in itemData ? itemData.name : itemData.itemName,
                  serialNumber: itemData.serialNumber,
                  status: itemData.status,
                  quantity: itemData.quantity,
                  description: itemData.description,
                  inventoryId: newInventory.id,
                  tags: { connectOrCreate: tagConnectOrCreate },
                },
              });
              itemsCreated++;
            }
          }
        }
      },
      { timeout: 30000 }
    );

    await logActivity({
      userId: user.id,
      action: "IMPORT_ALL_INVENTORIES",
      metadata: { inventoriesCreated, itemsCreated, fileName: file.name },
    });

    return NextResponse.json({
      message: `Successfully imported ${inventoriesCreated} inventories and ${itemsCreated} items.`,
    });
  } catch (error) {
    console.error("Import Error:", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON format." },
        { status: 400 }
      );
    }
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors explicitly
      return NextResponse.json(
        { error: "Data validation failed", details: error.format() },
        { status: 400 }
      );
    }
    // Check for Prisma transaction timeout error specifically
    if (
      (error as PrismaClientKnownRequestError)?.code === "P2028" ||
      (error as PrismaClientKnownRequestError)?.message?.includes(
        "Transaction already closed"
      )
    ) {
      return NextResponse.json(
        {
          error:
            "Import operation timed out. Please try with a smaller file or contact support.",
        },
        { status: 504 }
      );
    }
    if ((error as PrismaClientKnownRequestError)?.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Import operation failed. There was a duplicate serial number when trying to import an item.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to process import." },
      { status: 500 }
    );
  }
}
