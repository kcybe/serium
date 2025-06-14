"use client";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreHorizontal, Upload } from "lucide-react";
import React, { useState } from "react";
import AllInventoriesImportForm from "./forms/all-inventories-import-form";
import AllInventoriesExportForm from "./forms/all-inventories-export-form";

export default function InventoriesActions() {
  const [isImportAllOpen, setIsImportAllOpen] = useState(false);
  const [isExportAllOpen, setIsExportAllOpen] = useState(false);

  return (
    <>
      {/* Import All Modal */}
      <ResponsiveDialog
        isOpen={isImportAllOpen}
        setIsOpen={setIsImportAllOpen}
        title="Import All Inventories"
        description="Restore all inventories and items from a JSON or CSV file."
      >
        <AllInventoriesImportForm setIsOpen={setIsImportAllOpen} />
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isExportAllOpen}
        setIsOpen={setIsExportAllOpen}
        title="Export All Inventories"
        description="Export all inventories and items to a JSON or CSV file."
      >
        <AllInventoriesExportForm setIsOpen={setIsExportAllOpen} />
      </ResponsiveDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DropdownMenuItem onSelect={() => setIsImportAllOpen(true)}>
            <Upload className="mr-2 h-4 w-4" />
            <span>Import Inventories</span>
          </DropdownMenuItem>

          {/* For exporting, we can use a simple anchor tag */}
          <DropdownMenuItem onSelect={() => setIsExportAllOpen(true)}>
            <Download className="mr-2 h-4 w-4" />
            <span>Export Inventories</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
