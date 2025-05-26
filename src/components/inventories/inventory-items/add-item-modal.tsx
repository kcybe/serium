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
import { useAddItemToInventory } from "@/hooks/use-inventory";
import { toast } from "sonner";

export function AddItemModal({ inventoryId }: { inventoryId: string }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("SN-");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Available");

  const addItemToInventory = useAddItemToInventory(inventoryId);
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addItemToInventory.mutateAsync({
        inventoryId: inventoryId,
        name: name,
        serialNumber: serialNumber,
        quantity: quantity,
        description: description,
        status: status,
      });
      setOpen(false);
      setName("");
      setSerialNumber("SN-");
      setDescription("");
      setQuantity(1);
      setStatus("Available");
    } catch (error) {
      toast.error("Failed to add item, please try again. " + error);
    }
    toast.success("Item added successfully");
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
          <Input
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Serial Number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
