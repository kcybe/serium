"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { InventoryWithItems } from "@/types";
import { toast } from "sonner";
import { useDeleteInventory } from "@/hooks/inventories";

export default function DeleteForm({
  inventory,
  setIsOpen,
}: {
  inventory: InventoryWithItems;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm();

  const { mutate: deleteInventory, isPending: isDeletingInventory } =
    useDeleteInventory();

  const onSubmit = () => {
    deleteInventory(inventory.id, {
      onSuccess: () => {
        toast.success(`Inventory "${inventory.name}" deleted successfully.`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(`Failed to delete inventory: ${error.message}`);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // handleSubmit prevents default and calls your onSubmit
      >
        <div className="w-full flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-3 sm:space-y-0">
          <Button
            size="lg"
            variant="outline"
            disabled={isDeletingInventory} // Disable if mutation is pending
            className="w-full"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            type="submit"
            disabled={isDeletingInventory} // Disable if mutation is pending
            variant="destructive" // Use destructive variant for delete buttons
            className="w-full" // Removed specific red colors, let variant handle it
          >
            {isDeletingInventory ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <span>Delete Inventory</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
