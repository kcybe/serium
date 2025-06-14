// src/app/api/inventories/[inventory-id]/import/route.ts

import { prisma } from "@/lib/db";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { logActivity } from "@/lib/logActivity";
import { NextResponse } from "next/server";
import Papa from "papaparse";
import { z } from "zod";

// 1. Define schemas for BOTH CSV and JSON formats

// Schema for a single row in a CSV file
const CsvRowSchema = z.object({
  itemName: z.string().min(1, "Item name cannot be empty."),
  serialNumber: z.string().optional().nullable(),
  status: z.enum(["Available", "InUse", "Broken", "Repair", "Lost"]),
  quantity: z.coerce
    .number()
    .int()
    .min(0, "Quantity must be a positive number."),
  description: z.string().optional().nullable(),
  tags: z.string().optional(), // Tags in CSV are a single comma-separated string
});

// Schema for a single item within an imported JSON file
const JsonItemSchema = z.object({
  name: z.string().min(1),
  serialNumber: z.string().optional().nullable(),
  status: z.enum(["Available", "InUse", "Broken", "Repair", "Lost"]),
  quantity: z.coerce.number().int().min(0),
  description: z.string().optional().nullable(),
  // In JSON, tags are an array of objects, which is how Prisma returns them.
  tags: z.array(z.object({ name: z.string() })).optional(),
});

// Schema for the top-level structure of the imported JSON file
const JsonImportSchema = z.object({
  // We only care about the 'items' array from the imported inventory file
  items: z.array(JsonItemSchema),
});

export async function POST(
  req: Request,
  { params }: { params: { "inventory-id": string } }
) {
  const user = await getAuthenticatedUserServer();
  if (!user) return new NextResponse("Unauthorized", { status: 401 });

  const inventoryId = params["inventory-id"];

  // Verify the user owns the target inventory for the import
  const inventory = await prisma.inventory.findFirst({
    where: { id: inventoryId, userId: user.id },
  });
  if (!inventory)
    return new NextResponse("Inventory not found", { status: 404 });

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const fileType = file.type;
    const fileContent = await file.text();

    // This will hold the validated items, regardless of source format
    let itemsToCreate: (
      | z.infer<typeof CsvRowSchema>
      | z.infer<typeof JsonItemSchema>
    )[];

    // 2. Process file based on its MIME type
    if (fileType === "text/csv") {
      const parseResult = Papa.parse(fileContent, {
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
      itemsToCreate = validation.data;
    } else if (fileType === "application/json") {
      const jsonData = JSON.parse(fileContent);
      const validation = JsonImportSchema.safeParse(jsonData);
      if (!validation.success) {
        return NextResponse.json(
          {
            error: "JSON data validation failed",
            details: validation.error.format(),
          },
          { status: 400 }
        );
      }
      // We only need the items array from the JSON file
      itemsToCreate = validation.data.items;
    } else {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a CSV or JSON file." },
        { status: 400 }
      );
    }

    if (itemsToCreate.length === 0) {
      return NextResponse.json({ message: "No items to import." });
    }

    await logActivity({
      userId: user.id,
      action: "IMPORT_INVENTORY",
      inventoryId: inventory.id,
      metadata: {
        inventoryName: inventory.name,
        items: itemsToCreate.length,
      },
    });

    // 3. Use a single transaction block to create items
    await prisma.$transaction(
      async (tx) => {
        for (const item of itemsToCreate) {
          // Handle tags: find or create them
          const tagConnectOrCreate = [];

          // Tags from CSV are a string
          if (typeof item.tags === "string" && item.tags) {
            const tagNames = item.tags
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
          } else if (Array.isArray(item.tags)) {
            for (const tag of item.tags) {
              tagConnectOrCreate.push({
                where: { name_userId: { name: tag.name, userId: user.id } },
                create: { name: tag.name, userId: user.id },
              });
            }
          }

          // Create the item
          await tx.item.create({
            data: {
              // Use 'name' from JSON or 'itemName' from CSV
              name: "name" in item ? item.name : item.itemName,
              serialNumber: item.serialNumber,
              status: item.status,
              quantity: item.quantity,
              description: item.description,
              inventoryId: inventoryId,
              tags: {
                connectOrCreate: tagConnectOrCreate,
              },
            },
          });
        }
      },
      { timeout: 30000 }
    );

    return NextResponse.json(
      {
        message: `${itemsToCreate.length} items imported successfully.`,
      },
      { status: 200 }
    );
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
      (error as any)?.code === "P2028" ||
      (error as any)?.message?.includes("Transaction already closed")
    ) {
      return NextResponse.json(
        {
          error:
            "Import operation timed out. Please try with a smaller file or contact support.",
        },
        { status: 504 }
      );
    }
    if ((error as any)?.code === "P2002") {
      return NextResponse.json(
        {
          error:
            "Import operation failed. There was a duplicate serial number when trying to import.",
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
