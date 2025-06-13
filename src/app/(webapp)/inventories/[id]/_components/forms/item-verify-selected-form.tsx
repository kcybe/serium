// src/app/(webapp)/inventories/_components/forms/delete-selected-inventories-form.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { toast } from "sonner";
import { useVerifyMultipleItems } from "@/hooks/inventory";

interface ItemVerifySelectedFormProps {
  itemIdsSerialsNames: { id: string; serial: string; name: string }[];
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
  inventoryId: string;
}

export default function ItemVerifySelectedForm({
  itemIdsSerialsNames,
  setIsOpen,
  onSuccess,
  inventoryId,
}: ItemVerifySelectedFormProps) {
  const { mutate: verifyMultipleItems, isPending: isVerifying } =
    useVerifyMultipleItems();

  const handleSubmit = async () => {
    if (itemIdsSerialsNames.length === 0) {
      toast.error("No items selected for verification.");
      return;
    }

    try {
      verifyMultipleItems(
        {
          inventoryId,
          itemIdsToVerify: itemIdsSerialsNames.map(
            (idSerialName) => idSerialName.id
          ),
        },
        {
          onSuccess: () => {
            toast.success(
              `Successfully verified ${itemIdsSerialsNames.length} items.`
            );
            onSuccess();
            setIsOpen(false);
          },
          onError: (error) => {
            console.error("Failed to verify selected items:", error);
            toast.error(
              (error as Error).message ||
                "Could not verify selected items. Please try again."
            );
          },
        }
      );
    } catch (error) {
      console.error("Failed to verify selected items:", error);
      toast.error(
        (error as Error).message ||
          "Could not verify selected items. Please try again."
      );
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Are you sure you want to verify the selected{" "}
        <strong>{itemIdsSerialsNames.length}</strong> items? This action cannot
        be undone.
      </p>
      <Textarea
        disabled
        value={itemIdsSerialsNames
          .map(
            (idSerialName) => `${idSerialName.name} (${idSerialName.serial})`
          )
          .join(", ")}
        className="resize-none"
      />
      <div className="flex justify-end space-x-2 pt-2">
        <div className="w-full hidden sm:block">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isVerifying}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
        <Button
          variant="default"
          onClick={handleSubmit}
          disabled={isVerifying}
          className="w-full"
        >
          {isVerifying ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
}
