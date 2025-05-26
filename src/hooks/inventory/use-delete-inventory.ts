import { InventoryWithItems } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inventory: InventoryWithItems) => {
      const res = await fetch(`/api/inventories/${inventoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),
      });

      if (!res.ok) {
        throw new Error("Failed to delete inventory");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
  });
};
