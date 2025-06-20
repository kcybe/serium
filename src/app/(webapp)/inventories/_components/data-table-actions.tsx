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
import { InventoryWithItems } from "@/types";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import RenameForm from "./forms/edit-inventory-form";
import DeleteForm from "./forms/delete-form";
import IconMenu from "@/components/icon-menu";

interface Props {
  inventory: InventoryWithItems;
}

export default function DataTableActions({ inventory }: Props) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isRenameOpen}
        setIsOpen={setIsRenameOpen}
        title="Edit Inventory"
      >
        <RenameForm inventory={inventory} setIsOpen={setIsRenameOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Inventory"
        description="Are you sure you want to delete this inventory?"
      >
        <DeleteForm inventory={inventory} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px] z-50">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* START Rename */}
          <DropdownMenuItem
            // Use onSelect and preventDefault
            onSelect={(e) => {
              e.preventDefault();
              setIsRenameOpen(true);
            }}
            className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 text-sm font-base text-neutral-500 cursor-pointer" // Added cursor-pointer
          >
            <IconMenu text="Edit" icon={<SquarePen className="h-4 w-4" />} />
          </DropdownMenuItem>
          {/* END Rename */}

          <DropdownMenuSeparator />

          {/* START Delete */}
          <DropdownMenuItem
            // Use onSelect and preventDefault
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteOpen(true);
            }}
            className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100 text-sm font-base cursor-pointer"
          >
            <IconMenu text="Delete" icon={<Trash2 className="h-4 w-4" />} />
          </DropdownMenuItem>
          {/* END Delete */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
