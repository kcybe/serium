"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";

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
import { useEditItemFromInventory, useTags } from "@/hooks/inventory";
import { toast } from "sonner";
import { ItemStatus } from "../../../../../../../generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Tag as EmblorTag, TagInput } from "emblor";
import { normalizeTagName } from "@/lib/utils";
import { ItemWithTags } from "@/types";

interface PrismaTag {
  id: string;
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  status: z.nativeEnum(ItemStatus),
  description: z.string(),
  quantity: z.number(),
  serialNumber: z.string(),
  tags: z.array(z.object({ id: z.string().optional(), text: z.string() })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ItemEditForm({
  item,
  setIsOpen,
}: {
  item: ItemWithTags;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [tags, setTags] = useState<EmblorTag[]>(
    item.tags?.map(tag => ({ id: tag.id, text: tag.name })) || []
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const { data: allPrismaTags, isLoading: isLoadingTags } = useTags();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item.name,
      status: item.status,
      description: item.description || "",
      quantity: item.quantity,
      serialNumber: item.serialNumber || "",
      tags: item.tags?.map(tag => ({ id: tag.id, text: tag.name })) || [],
    },
  });

  const { mutate: editItem, isPending: isEditing } = useEditItemFromInventory(
    item.inventoryId
  );

  const tagsSuggestion = Array.isArray(allPrismaTags)
    ? allPrismaTags.map((tag: PrismaTag) => ({
        id: tag.id,
        text: tag.name,
      }))
    : [];

  const handleSetTags = (
    newEmblorTags: EmblorTag[] | ((prevState: EmblorTag[]) => EmblorTag[])
  ) => {
    setTags((prevTags) => {
      const resolvedNewTags =
        typeof newEmblorTags === "function"
          ? newEmblorTags(prevTags)
          : newEmblorTags;

      // Create a Set of IDs from existing suggestions for quick lookup
      const suggestionIds = new Set(tagsSuggestion.map((s) => s.id));

      const processedTags = resolvedNewTags
        .map((tag) => {
          const isExistingSuggestion = tag.id && suggestionIds.has(tag.id);
          const wasAlreadyProcessed = prevTags.find(
            (pt) => pt.id === tag.id && pt.text === tag.text
          );

          if (!isExistingSuggestion && !wasAlreadyProcessed) {
            const normalizedText = normalizeTagName(tag.text);
            if (!normalizedText) return null; // If normalization results in empty, filter it out later

            // Important: Check for duplicates AFTER normalization
            // Prevent adding a tag if its normalized form already exists in the list
            // (excluding the current tag being processed, if it's an update)
            const isDuplicateAfterNormalization = resolvedNewTags.some(
              (t) =>
                t.id !== tag.id && normalizeTagName(t.text) === normalizedText
            );
            if (
              isDuplicateAfterNormalization &&
              !tags.find((existingTag) => existingTag.text === normalizedText)
            ) {
              return { ...tag, text: normalizedText };
            }
            return { ...tag, text: normalizedText };
          }
          return tag; // It's an existing suggestion or already processed, keep as is
        })
        .filter(Boolean) as EmblorTag[]; // Filter out any nulls

      // Final pass to remove duplicates based on the (now possibly normalized) text
      const uniqueTags: EmblorTag[] = [];
      const seenTexts = new Set<string>();
      for (const tag of processedTags) {
        if (!seenTexts.has(tag.text)) {
          uniqueTags.push(tag);
          seenTexts.add(tag.text);
        }
      }
      
      return uniqueTags;
    });
  };

  useEffect(() => {
    form.setValue("tags", tags);
  }, [tags, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const updatedItem = {
      ...item,
      name: values.name,
      description: values.description,
      status: values.status,
      quantity: values.quantity,
      serialNumber: values.serialNumber,
      tags: tags,
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
        className="flex flex-col space-y-2"
      >
        <FormField
          name="name"
          control={form.control}
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "name">;
          }) => (
            <FormItem>
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
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Serial Number"
                  className="text-md"
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
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Description"
                  className="text-md"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between space-x-2">
          <div className="w-full">
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value as ItemStatus)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(ItemStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          {status === "InUse" ? "In Use" : status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormField
              name="quantity"
              control={form.control}
              render={({
                field,
              }: {
                field: ControllerRenderProps<FormValues, "quantity">;
              }) => (
                <FormItem>
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
          </div>
        </div>

        <FormField
          name="tags"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  placeholder="Enter a tag"
                  tags={tags}
                  enableAutocomplete={true}
                  autocompleteOptions={tagsSuggestion}
                  activeTagIndex={activeTagIndex}
                  setActiveTagIndex={setActiveTagIndex}
                  setTags={handleSetTags}
                />
              </FormControl>
              {isLoadingTags && (
                <p className="text-xs text-gray-500 mt-1">Loading tags...</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full sm:justify-end mt-4">
          <Button
            type="submit"
            disabled={isEditing || isLoadingTags}
            className="w-full"
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
