"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Search, Upload } from "lucide-react";
import React, { useState } from "react";
import ItemExportForm from "./forms/item-export-form";
import ItemImportForm from "./forms/item-import-form";
import ItemVerifyForm from "./forms/item-verify-form";

interface Props {
  inventoryId: string;
}

export default function InventoryActions({ inventoryId }: Props) {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  return (
    <>
      {/* Import Modal */}
      <ResponsiveDialog
        isOpen={isImportOpen}
        setIsOpen={setIsImportOpen}
        title="Import Items"
        description="Restore all items in this inventory from a JSON or CSV file."
      >
        <ItemImportForm inventoryId={inventoryId} setIsOpen={setIsImportOpen} />
      </ResponsiveDialog>

      {/* Export Modal */}
      <ResponsiveDialog
        isOpen={isExportOpen}
        setIsOpen={setIsExportOpen}
        title="Export Items"
        description="Export all items in this inventory to a JSON or CSV file."
      >
        <ItemExportForm inventoryId={inventoryId} setIsOpen={setIsExportOpen} />
      </ResponsiveDialog>

      {/* Verify Modal */}
      <ResponsiveDialog
        isOpen={isVerifyOpen}
        setIsOpen={setIsVerifyOpen}
        title="Verify Items"
        description="Verify items in this inventory."
      >
        <ItemVerifyForm inventoryId={inventoryId} />
      </ResponsiveDialog>

      {/* The main Actions button */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[180px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsImportOpen(true);
            }}
          >
            <Upload className="mr-2 h-4 w-4" />
            <span>Import Items</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsExportOpen(true);
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            <span>Export Items</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsVerifyOpen(true);
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Verify Items</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
