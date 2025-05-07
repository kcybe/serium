// types/index.ts
import { Inventory, Item } from "@/../generated/prisma/client";

export type InventoryWithItems = Inventory & {
  items: Item[];
};
