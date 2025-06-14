"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteItemFromInventory } from "@/hooks/inventories";
import { Item } from "../../../../../../../prisma/generated/prisma"; // Path seems correct

interface DeleteFormProps {
  item: Item;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteForm({ item, setIsOpen }: DeleteFormProps) {
  const inventoryId = item.inventoryId;
  const { mutate: deleteItemMutate, isPending: isDeleting } =
    useDeleteItemFromInventory(inventoryId); // Pass inventoryId to the hook. Handle potential undefined case.

  const handleSubmit = async () => {
    if (!inventoryId) {
      toast.error("Inventory ID is missing. Cannot delete item.");
      setIsOpen(false); // Close dialog if critical info is missing
      return;
    }

    deleteItemMutate(item.id, {
      onSuccess: () => {
        toast.success(`Item "${item.name}" deleted successfully.`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`Failed to delete item: ${error.message}`);
        setIsOpen(false);
      },
    });
  };

  return (
    <div className="space-y-6 sm:px-0 px-4">
      <div className="w-full flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <Button
          size="lg"
          variant="outline"
          disabled={isDeleting}
          className="w-full sm:w-auto"
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          type="button" // Not a submit button for a <form> anymore
          onClick={handleSubmit}
          disabled={isDeleting || !inventoryId} // Disable if inventoryId is missing
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <span>Delete Item</span>
          )}
        </Button>
      </div>
    </div>
  );
}
