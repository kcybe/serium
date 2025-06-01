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
import { useAddItemToInventory } from "@/hooks/inventory";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemStatus } from "../../../../generated/prisma";

export function AddItemModal({ inventoryId }: { inventoryId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<ItemStatus>(ItemStatus.Available);

  const addItemToInventory = useAddItemToInventory(inventoryId);
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addItemToInventory.mutateAsync({
        name: name,
        serialNumber: serialNumber,
        quantity: quantity,
        description: description,
        status: status,
      });
      toast.success("Item added successfully");
      setOpen(false);
      setName("");
      setSerialNumber("");
      setDescription("");
      setQuantity(1);
      setStatus(ItemStatus.Available);
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
              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value as ItemStatus);
                }}
              >
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
          <Button
            type="submit"
            className="w-full"
            disabled={addItemToInventory.isPending}
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
