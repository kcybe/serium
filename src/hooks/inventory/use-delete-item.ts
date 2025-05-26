import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteItemFromInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itemId: string) => {
      const res = await fetch(
        `/api/inventories/${inventoryId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(itemId),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
    },
  });
};
