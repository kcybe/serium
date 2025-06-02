import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../../ui/button";
import { DiamondPlus } from "lucide-react";
import { useAddItemToInventory, useTags } from "@/hooks/inventory";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Tag as EmblorTag, TagInput } from "emblor";
import { normalizeTagName } from "@/lib/utils";

interface PrismaTag {
  id: string;
  name: string;
  // Add other fields if needed, but id and name are key for emblor
}

export function AddItemModal({ inventoryId }: { inventoryId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Available");
  const [tags, setTags] = useState<EmblorTag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const addItemToInventory = useAddItemToInventory(inventoryId);
  const { data: allPrismaTags, isLoading: isLoadingTags } = useTags();

  // make an array of all the {id, text(tag.name)}
  const tagsSuggestion = Array.isArray(allPrismaTags)
    ? allPrismaTags.map((tag: PrismaTag) => ({
        id: tag.id,
        text: tag.name, // emblor expects 'text' for display
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

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addItemToInventory.mutateAsync({
        name: name,
        serialNumber: serialNumber.trim() || null,
        quantity: quantity,
        description: description.trim() || null,
        status: status,
        tags: tags,
      });
      toast.success("Item added successfully");
      setOpen(false);
      setName("");
      setSerialNumber("");
      setDescription("");
      setQuantity(1);
      setStatus("Available");
      setTags([]);
    } catch (error) {
      toast.error("Failed to add item, please try again. " + error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <DiamondPlus className="mr-2" />
          Add Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Item to Inventory</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddItem(e);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Item Name</label>
            <Input
              placeholder="e.g. Keyboard"
              className="placeholder:text-gray-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Serial Number
            </label>
            <Input
              placeholder="e.g. SN-123456"
              className="placeholder:text-gray-500"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Input
              placeholder="e.g. Wireless mechanical keyboard"
              className="placeholder:text-gray-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-between space-x-2">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="InUse">In Use</SelectItem>
                  <SelectItem value="Broken">Broken</SelectItem>
                  <SelectItem value="Repair">Repair</SelectItem>
                  <SelectItem value="Lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <Input
                type="number"
                placeholder="e.g. 5"
                className="placeholder:text-gray-500"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>
            <TagInput
              placeholder="Enter a tag"
              tags={tags}
              enableAutocomplete={true}
              autocompleteOptions={tagsSuggestion}
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              setTags={handleSetTags}
            />
            {isLoadingTags && (
              <p className="text-xs text-gray-500 mt-1">Loading tags...</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={addItemToInventory.isPending || isLoadingTags}
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
