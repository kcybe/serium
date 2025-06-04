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

export interface DashboardStats {
  totalItems: number;
  totalItemsChange?: number; // Percentage change from last month
  totalItemsTrend?: 'up' | 'down' | 'neutral';

  totalAvailableItems: number;
  totalAvailableItemsChange?: number;
  totalAvailableItemsTrend?: 'up' | 'down' | 'neutral';

  uniqueTagsCount: number;
  uniqueTagsCountChange?: number; // Percentage change for new tags this month
  uniqueTagsCountTrend?: 'up' | 'down' | 'neutral';

  itemsNeedingAttentionCount: number;
  itemsNeedingAttentionCountChange?: number;
  itemsNeedingAttentionCountTrend?: 'up' | 'down' | 'neutral';
}

export type ActivityActionType =
  | "CREATE_INVENTORY"
  | "VIEW_INVENTORY"
  | "EDIT_INVENTORY"
  | "DELETE_INVENTORY"
  | "CREATE_ITEM"
  | "VIEW_ITEM"
  | "EDIT_ITEM"
  | "DELETE_ITEM"
  | "VERIFY_ITEM_BY_SERIAL"
  | "SEARCH_ITEMS"
  | "VIEW_ALL_INVENTORIES";

export interface RecentActivity {
  id: string;
  action: ActivityActionType;
  createdAt: string; // ISO date string
  userName?: string | null;
  itemName?: string | null;
  itemId?: string | null;
  inventoryName?: string | null;
  inventoryId?: string | null;
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
