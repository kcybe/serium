"use client";

import {
  RowSelectionState,
  SortingState,
  Table,
  VisibilityState,
} from "@tanstack/react-table";
import { Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { useState } from "react";
import { InventoryWithItems } from "@/types";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import DeleteSelectedInventoriesForm from "./forms/delete-selected-inventories-form";

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
  const [isDeleteSelectedModalOpen, setIsDeleteSelectedModalOpen] =
    useState(false);

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length;

  const getSelectedInventoryIdsNames = () => {
    return table.getFilteredSelectedRowModel().rows.map((row) => {
      const inventory = row.original as InventoryWithItems;
      return { id: inventory.id, name: inventory.name };
    });
  };

  const handleBulkDeleteSuccess = () => {
    table.resetRowSelection(); // Clear selection after successful deletion
    // Data re-fetching should be handled by the mutation hook (e.g., invalidateQueries)
  };

  return (
    <>
      {/* Delete Selected Modal */}
      <ResponsiveDialog
        isOpen={isDeleteSelectedModalOpen}
        setIsOpen={setIsDeleteSelectedModalOpen}
        title={`Delete ${selectedRowsCount} Selected Inventories`}
        description="This will permanently delete the selected inventories and their items."
      >
        <DeleteSelectedInventoriesForm
          inventoryIdsNames={
            isDeleteSelectedModalOpen ? getSelectedInventoryIdsNames() : []
          } // Pass IDs only when modal is open
          setIsOpen={setIsDeleteSelectedModalOpen}
          onSuccess={handleBulkDeleteSuccess}
        />
      </ResponsiveDialog>

      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex flex-1 items-center space-x-2">
          {/* Global Filter Input */}
          <Input
            placeholder="Filter all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-lg bg-background" // Adjusted size
          />

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

            {selectedRowsCount > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteSelectedModalOpen(true)}
                className="h-9"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Selected ({selectedRowsCount})
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
