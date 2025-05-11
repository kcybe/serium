import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteInventory } from "@/hooks/use-inventory";
import { InventoryWithItems } from "@/types";
import { MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface Props {
  inventory: InventoryWithItems;
}

export default function DataTableActions({ inventory }: Props) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteInventory, isPending: isDeleting } = useDeleteInventory(
    inventory.id
  );

  const handleDeleteConfirm = () => {
    deleteInventory(inventory, {
      onSuccess: () => {
        toast.success(`Inventory "${inventory.name}" deleted successfully.`);
        setShowDeleteDialog(false);
      },
      onError: (error) => {
        toast.error(`Failed to delete inventory: ${error.message}`);
        setShowDeleteDialog(false);
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(inventory.id)}
          >
            Copy inventory ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onSelect={(e) => {
              e.preventDefault();
              document.body.style.pointerEvents = "";
              setShowDeleteDialog(true);
            }}
          >
            Delete Inventory
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the inventory
              <strong> &quot;{inventory.name}&quot;</strong> and all its
              associated items. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
