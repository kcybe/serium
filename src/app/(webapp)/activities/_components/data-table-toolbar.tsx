"use client";

import {
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
import { Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { actions } from "./data";
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  rowSelection: RowSelectionState;
  setRowSelection: React.Dispatch<React.SetStateAction<RowSelectionState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  sorting,
  setSorting,
  rowSelection,
  setRowSelection,
  setColumnVisibility,
}: DataTableToolbarProps<TData>) {
  const isColumnFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
      <div className="flex flex-1 items-center space-x-2">
        {/* Global Filter Input */}
        <Input
          placeholder="Filter all columns..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-lg bg-background" // Adjusted size
        />

        {/* Status Faceted Filter */}
        {table.getColumn("action") && (
          <DataTableFacetedFilter
            column={table.getColumn("action")}
            title="Action"
            options={actions}
          />
        )}

        {/* Reset Column Filters Button (specific to faceted filters) */}
        {isColumnFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-9 px-2 lg:px-3"
          >
            Reset Filters
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        {/* Column Visibility Dropdown */}
        <div className="flex items-center space-x-2">
          <DataTableViewOptions
            table={table}
            title="View"
            setColumnVisibility={setColumnVisibility} // Pass if DataTableViewOptions needs to directly call your hook's setter
          />

          {/* Clear All Filters Button */}
          <Button
            variant="ghost" // Or "outline" if preferred
            size="sm"
            onClick={() => {
              setGlobalFilter("");
              table.resetColumnFilters(); // Clears column-specific filters
              setSorting([]);
              setRowSelection({});
              setColumnVisibility({}); // Resets column visibility to default
            }}
            disabled={
              globalFilter === "" &&
              !isColumnFiltered &&
              sorting.length === 0 &&
              Object.keys(rowSelection).length === 0
            }
            className="h-9"
          >
            <Trash className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
