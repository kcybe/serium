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
import { useEditItemFromInventory } from "@/hooks/use-inventory";
import { toast } from "sonner";
import { Item } from "../../../../../../generated/prisma";

const formSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  status: z.string().min(1, "Status cannot be empty"),
  description: z.string(),
  quantity: z.number(),
  serialNumber: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ItemEditForm({
  item,
  setIsOpen,
}: {
  item: Item;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      status: item.status,
      description: item.description || "",
      quantity: item.quantity,
      serialNumber: item.serialNumber || "",
    },
  });

  const { mutate: editItem, isPending: isEditing } = useEditItemFromInventory(
    item.inventoryId
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedItem = {
      ...item,
      name: values.name,
      description: values.description,
      status: values.status,
      quantity: values.quantity,
      serialNumber: values.serialNumber,
    };

    editItem(updatedItem, {
      onSuccess: () => {
        toast.success(`Item edited successfully`);
        setIsOpen(false);
      },
      onError: (error) => {
        toast.error(
          "Failed to edit item: " +
            (error instanceof Error ? error.message : String(error))
        );
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 sm:px-0 px-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "name">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  className="text-md"
                  required
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="serialNumber"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "serialNumber">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Serial Number"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "description">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Description"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="status"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "status">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Status"
                  className="text-md"
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="quantity"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "quantity">;
          }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Quantity"
                  className="text-md"
                  required
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
