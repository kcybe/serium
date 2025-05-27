// types/index.ts
import { Inventory, Item } from "@/../generated/prisma/client";

export type InventoryWithItems = Inventory & {
  items: Item[];
};

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
