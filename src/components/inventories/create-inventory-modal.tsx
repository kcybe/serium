import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { DiamondPlus } from "lucide-react";

export function CreateInventoryModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();

  const createInventory = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      return await axios.post("/api/inventories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      setOpen(false);
      setName("");
      setDescription("");
    },
  });

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
            createInventory.mutate({ name, description });
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
          <Button type="submit" className="mt-4 w-full">
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
