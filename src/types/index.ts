// types/index.ts
import { Inventory, Item, Tag } from "@/../generated/prisma/client";

export type InventoryWithItems = Inventory & {
  items: ItemWithTags[];
};

export type ItemWithTags = Item & {
  tags: Pick<Tag, "id" | "name">[]; // Or just Tag[] if you fetch all tag fields
};

export interface PrismaTagWithName {
  id: string;
  name: string;
}

export interface ItemSearchResult {
  id: string;
  name: string;
  serialNumber: string | null;
  status: string;
  description: string | null;
  quantity: number;
  inventoryId: string;
  createdAt: Date;
  lastVerified: Date | null;
  inventory: {
    id: string;
    name: string;
  };
}
