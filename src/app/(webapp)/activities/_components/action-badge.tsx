import React from "react";
import {
  Edit3, // For Edit
  Eye, // For View
  Trash2, // For Delete
  Search, // For Search
  ScanLine, // For Verify
  PlusCircle, // For Create
  FilePlus, // For Create Inventory (example)
  HelpCircle, // for Unknown Action fallback
  Layers,
  View,
} from "lucide-react";
import { ActivityActions } from "../../../../../generated/prisma";

interface ActionDisplayConfig {
  label: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const actionMap: Record<ActivityActions, ActionDisplayConfig> = {
  [ActivityActions.CREATE_INVENTORY]: {
    label: "Inventory Created",
    color: "bg-sky-100 text-sky-700",
    icon: FilePlus,
  },
  [ActivityActions.VIEW_INVENTORY]: {
    label: "Viewed Inventory",
    color: "bg-indigo-100 text-indigo-700",
    icon: Eye,
  },
  [ActivityActions.EDIT_INVENTORY]: {
    label: "Inventory Edited",
    color: "bg-amber-100 text-amber-700",
    icon: Edit3,
  },
  [ActivityActions.DELETE_INVENTORY]: {
    label: "Inventory Deleted",
    color: "bg-rose-100 text-rose-700",
    icon: Trash2,
  },
  [ActivityActions.CREATE_ITEM]: {
    label: "Item Created",
    color: "bg-green-100 text-green-700",
    icon: PlusCircle,
  },
  [ActivityActions.VIEW_ITEM]: {
    label: "Viewed Item",
    color: "bg-purple-100 text-purple-700",
    icon: View,
  },
  [ActivityActions.EDIT_ITEM]: {
    label: "Item Edited",
    color: "bg-yellow-100 text-yellow-700",
    icon: Edit3,
  },
  [ActivityActions.DELETE_ITEM]: {
    label: "Item Deleted",
    color: "bg-red-100 text-red-700",
    icon: Trash2,
  },
  [ActivityActions.VERIFY_ITEM_BY_SERIAL]: {
    label: "Item Verified",
    color: "bg-teal-100 text-teal-700",
    icon: ScanLine,
  },
  [ActivityActions.SEARCH_ITEMS]: {
    label: "Searched Items",
    color: "bg-purple-100 text-purple-700",
    icon: Search,
  },
  [ActivityActions.VIEW_ALL_INVENTORIES]: {
    label: "Viewed All Inventories",
    color: "bg-cyan-100 text-cyan-700",
    icon: Layers,
  },
};

// Fallback configuration for unknown actions
const fallbackActionConfig: ActionDisplayConfig = {
  label: "Unknown Action",
  color: "bg-gray-100 text-gray-800",
  icon: HelpCircle,
};

interface ActionBadgeProps {
  action: ActivityActions | string; // Accept string for flexibility, but ideally ActivityActions
}

export const ActionBadge: React.FC<ActionBadgeProps> = ({ action }) => {
  // Try to find the configuration in the map; use fallback if not found or if action is not a valid key
  const config = actionMap[action as ActivityActions] || fallbackActionConfig;
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${config.color}`}
    >
      <IconComponent className="w-3.5 h-3.5 mr-1.5 -ml-0.5" />
      {config.label}
    </span>
  );
};
