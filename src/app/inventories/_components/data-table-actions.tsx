import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import React from "react";
import { toast } from "sonner";

interface Props {
  inventory: InventoryWithItems;
}

export default function DataTableActions({ inventory }: Props) {
  const { mutate: deleteInventory, isPending: isDeleting } = useDeleteInventory(
    inventory.id
  );

  const handleDeleteConfirm = () => {
    deleteInventory(inventory, {
      onSuccess: () => {
        toast.success(`Inventory "${inventory.name}" deleted successfully.`);
      },
      onError: (error) => {
        toast.error(`Failed to delete inventory: ${error.message}`);
      },
    });
  };

  return (
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
          onClick={() => {
            navigator.clipboard.writeText(inventory.id);
            toast.success(
              `Successfully copied the id of inventory: ${inventory.name}`
            );
          }}
        >
          Copy inventory ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View customer</DropdownMenuItem>
        <DropdownMenuItem>View payment details</DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* START Delete dialog inside dropdown menu */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="text-red-500"
            >
              Delete Inventory
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete inventory{" "}
                <strong>&quot;{inventory.name}&quot;</strong> and all associated
                items. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
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
        {/* END Delete dialog inside dropdown menu */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
