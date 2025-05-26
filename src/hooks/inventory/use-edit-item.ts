import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Item } from "../../../generated/prisma";

export const useEditItemFromInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Item) => {
      const res = await fetch(
        `/api/inventories/${inventoryId}/items/${item.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to edit item");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
    },
  });
};
