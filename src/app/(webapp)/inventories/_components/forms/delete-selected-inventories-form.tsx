// src/app/(webapp)/inventories/_components/forms/delete-selected-inventories-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { toast } from "sonner";
import { useDeleteMultipleInventories } from "@/hooks/inventories";

interface DeleteSelectedInventoriesFormProps {
  inventoryIdsNames: { id: string; name: string }[];
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export default function DeleteSelectedInventoriesForm({
  inventoryIdsNames,
  setIsOpen,
  onSuccess,
}: DeleteSelectedInventoriesFormProps) {
  const { mutate: deleteMultipleInventories, isPending: isDeleting } =
    useDeleteMultipleInventories();

  const handleSubmit = async () => {
    if (inventoryIdsNames.length === 0) {
      toast.error("No inventories selected for deletion.");
      return;
    }

    try {
      deleteMultipleInventories(
        inventoryIdsNames.map((idName) => idName.id),
        {
          onSuccess: () => {
            toast.success(
              `Successfully deleted ${inventoryIdsNames.length} inventories.`
            );
            onSuccess();
            setIsOpen(false);
          },
          onError: (error) => {
            console.error("Failed to delete selected inventories:", error);
            toast.error(
              (error as Error).message ||
                "Could not delete selected inventories. Please try again."
            );
          },
        }
      );
    } catch (error) {
      console.error("Failed to delete selected inventories:", error);
      toast.error(
        (error as Error).message ||
          "Could not delete selected inventories. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to delete the selected{" "}
        <strong>{inventoryIdsNames.length}</strong> inventory/inventories? This
        action cannot be undone.
      </p>
      <Textarea
        disabled
        value={inventoryIdsNames.map((idName) => idName.name).join(", ")}
        className="resize-none"
      />
      <div className="flex justify-end space-x-2 pt-2">
        <div className="w-full hidden sm:block">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(false)}
          disabled={isDeleting}
          className="w-full"
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={handleSubmit}
          disabled={isDeleting}
          className="w-full"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
