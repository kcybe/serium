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
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import DeleteForm from "./forms/item-delete-form";
import IconMenu from "@/components/icon-menu";
import { Item } from "../../../../../generated/prisma";
import ItemEditForm from "./forms/item-edit-form";

interface Props {
  item: Item;
}

export default function DataTableActions({ item }: Props) {
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isRenameOpen}
        setIsOpen={setIsRenameOpen}
        title="Edit Item"
      >
        <ItemEditForm item={item} setIsOpen={setIsRenameOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Item"
        description={`Are you sure you want to delete the item: ${item.name}?
        This action cannot be undone.`}
      >
        <DeleteForm item={item} setIsOpen={setIsDeleteOpen} />
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
