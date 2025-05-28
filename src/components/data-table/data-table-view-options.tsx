"use client";

import * as React from "react";
import { Table, Column, RowData, VisibilityState } from "@tanstack/react-table"; // Added RowData
import { Check, ColumnsIcon, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableViewOptionsProps<TData extends RowData> {
  table: Table<TData>;
  title?: string;
  // Optional: If you need to call a setter from a hook that manages persistent state
  setColumnVisibility?: React.Dispatch<React.SetStateAction<VisibilityState>>;
}

export function DataTableViewOptions<TData extends RowData>({
  table,
  title = "Columns",
  setColumnVisibility,
}: DataTableViewOptionsProps<TData>): JSX.Element {
  const [searchValue, setSearchValue] = React.useState("");

  const hideableColumns = React.useMemo(
    () =>
      table.getAllColumns().filter(
        (
          column: Column<TData, unknown> // Explicitly type column
        ) => typeof column.accessorFn !== "undefined" && column.getCanHide()
      ),
    [table]
  );

  const currentColumnVisibility = table.getState().columnVisibility;

  const visibleColumnCount = React.useMemo(
    () =>
      hideableColumns.filter((col: Column<TData, unknown>) =>
        col.getIsVisible()
      ).length,
    [hideableColumns, currentColumnVisibility]
  );

  const getColumnDisplayName = React.useCallback(
    (column: Column<TData, unknown>): string => {
      const columnDef = column.columnDef;
      // Access meta with type safety if augmentation is set up
      // Otherwise, a careful access pattern:
      const meta = columnDef.meta as
        | {
            displayName?: string;
            icon?: React.ComponentType<{ className?: string }>;
          }
        | undefined;

      if (
        typeof columnDef.header === "string" &&
        columnDef.header.trim() !== ""
      ) {
        return columnDef.header;
      }
      if (meta?.displayName) {
        return meta.displayName;
      }
      if (
        column.id.toLowerCase() === "_select" ||
        column.id.toLowerCase() === "select"
      ) {
        return "Select Rows";
      }
      return column.id
        .replace(/([A-Z])/g, " $1")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
    },
    []
  );

  const filteredOptions = React.useMemo(
    () =>
      hideableColumns.filter((column) =>
        getColumnDisplayName(column)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      ),
    [hideableColumns, getColumnDisplayName, searchValue]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-primary">
          <ColumnsIcon className="mr-2 h-4 w-4" />
          {title}
          {hideableColumns.length !== visibleColumnCount && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {visibleColumnCount} of {hideableColumns.length}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0" align="end">
        <Command>
          <CommandInput
            placeholder="Search columns..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((column: Column<TData, unknown>) => {
                const isSelected = column.getIsVisible();
                const displayName = getColumnDisplayName(column);
                return (
                  <CommandItem
                    key={column.id}
                    onSelect={() => {
                      column.toggleVisibility(!isSelected);
                    }}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="truncate">{displayName}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {(hideableColumns.length !== visibleColumnCount || searchValue) && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      table.resetColumnVisibility();
                      if (setColumnVisibility) {
                        setColumnVisibility({});
                      }
                      setSearchValue("");
                    }}
                    className="justify-center text-center cursor-pointer text-red-500 hover:text-red-600"
                  >
                    <RotateCcw className="mr-2 h-3.5 w-3.5" />
                    Reset View
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
