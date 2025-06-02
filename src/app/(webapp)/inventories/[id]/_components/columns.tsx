"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Item } from "@/../generated/prisma/client";
import { format } from "date-fns";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableActions from "./data-table-actions";
import { StatusBadge } from "@/app/(webapp)/inventories/[id]/_components/status-badge";
import { ItemWithTags, PrismaTagWithName } from "@/types";
import { TagBadge } from "./tag-badge";

export const columns: ColumnDef<ItemWithTags>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
  },
  {
    accessorKey: "serialNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm">
          <StatusBadge status={row.original.status} />
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "tags", // Accessor for the tags array
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags; // Now TypeScript knows about tags
      if (!tags || tags.length === 0) {
        return <span className="text-xs text-gray-500">-</span>; // Or "No tags"
      }
      return (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <TagBadge key={tag.id} tagName={tag.name} />
          ))}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue || filterValue.length === 0) {
        return true; // If no tags are selected in the filter, show all rows.
      }

      const rowTags = row.getValue(columnId) as PrismaTagWithName[];

      if (!rowTags || rowTags.length === 0) {
        return false; // If the row has no tags, it cannot match any selected filter tag.
      }

      // Check if AT LEAST ONE of the row's tags is included in the selected filter values.
      // This is "OR" logic: show item if it has TagA OR TagB (if TagA and TagB are selected).
      return rowTags.some((tagObject) => filterValue.includes(tagObject.name));
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },
  {
    accessorKey: "lastVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Verified" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.lastVerified || 0);
      return (
        <div className="text-sm">
          {row.original.lastVerified
            ? format(date, "dd/MM/yyyy HH:mm:ss")
            : "Not Verified"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div className="text-sm">{format(date, "dd/MM/yyyy")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original as Item;
      return <DataTableActions item={item} />;
    },
  },
];
