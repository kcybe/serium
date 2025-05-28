// src/app/(webapp)/activities/_components/data.tsx
import {
  Edit3,
  Eye,
  Trash2,
  Search,
  ScanLine,
  PlusCircle,
  Layers,
  View,
} from "lucide-react";
import { ActivityActions } from "../../../../../generated/prisma";

export const actions = [
  {
    value: ActivityActions.CREATE_INVENTORY,
    label: "Create Inventory",
    icon: PlusCircle,
  },
  {
    value: ActivityActions.VIEW_INVENTORY,
    label: "View Inventory",
    icon: Eye,
  },
  {
    value: ActivityActions.EDIT_INVENTORY,
    label: "Edit Inventory",
    icon: Edit3,
  },
  {
    value: ActivityActions.DELETE_INVENTORY,
    label: "Delete Inventory",
    icon: Trash2,
  },
  {
    value: ActivityActions.CREATE_ITEM,
    label: "Create Item",
    icon: PlusCircle,
  },
  {
    value: ActivityActions.VIEW_ITEM,
    label: "View Item",
    icon: View,
  },
  {
    value: ActivityActions.EDIT_ITEM,
    label: "Edit Item",
    icon: Edit3,
  },
  {
    value: ActivityActions.DELETE_ITEM,
    label: "Delete Item",
    icon: Trash2,
  },
  {
    value: ActivityActions.VERIFY_ITEM_BY_SERIAL,
    label: "Verify Item",
    icon: ScanLine,
  },
  {
    value: ActivityActions.SEARCH_ITEMS,
    label: "Search Items",
    icon: Search,
  },
  {
    value: ActivityActions.VIEW_ALL_INVENTORIES,
    label: "View All Inventories",
    icon: Layers,
  },
];
