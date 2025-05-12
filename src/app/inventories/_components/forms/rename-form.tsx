"use client";

import React, { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import * as z from "zod";
import { InventoryWithItems } from "@/types";
import { useEditInventory } from "@/hooks/use-inventory";
import { toast } from "sonner";

const formSchema = z.object({
  newInventoryName: z.string().min(1, "Inventory name cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

export default function RenameForm({
  inventory,
  setIsOpen,
}: {
  inventory: InventoryWithItems;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newInventoryName: inventory?.name,
    },
  });

  const { mutate: editInventory, isPending: isEditing } = useEditInventory();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newName = values.newInventoryName;

    editInventory(
      {
        id: inventory.id,
        name: newName,
      },
      {
        onSuccess: () => {
          toast.success(`Inventory renamed to "${newName}".`);
          setIsOpen(false);
        },
        onError: (error) => {
          toast.error(
            "Failed to rename inventory: " +
              (error instanceof Error ? error.message : String(error))
          );
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="newInventoryName"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "newInventoryName">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Inventory Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="New Inventory Name"
                  className="text-md"
                  required
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full sm:justify-end mt-4">
          <Button
            type="submit"
            disabled={isEditing}
            className="w-full sm:w-auto"
          >
            <>
              {isEditing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
