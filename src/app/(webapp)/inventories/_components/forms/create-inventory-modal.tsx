import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiamondPlus, Loader2 } from "lucide-react";
import { useCreateInventory } from "@/hooks/inventory";
import { toast } from "sonner";

export function CreateInventoryModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate: createInventory, isPending: isCreatingInventory } =
    useCreateInventory();

  const onSubmit = () => {
    createInventory(
      { name, description },
      {
        onSuccess: () => {
          toast.success(`Inventory "${name}" created successfully.`);
          setOpen(false);
          setName("");
          setDescription("");
        },
        onError: (error) => {
          toast.error(`Failed to create inventory: ${error.message}`);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <DiamondPlus />
          New Inventory
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Inventory</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col space-y-2"
        >
          <label htmlFor="name">Inventory name</label>
          <Input
            placeholder="Inventory name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="description">Inventory description</label>
          <Textarea
            placeholder="Inventory description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
          />
          <Button
            type="submit"
            className="mt-4 w-full"
            disabled={isCreatingInventory}
          >
            {isCreatingInventory ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
