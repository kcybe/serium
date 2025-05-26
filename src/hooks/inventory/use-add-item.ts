import { useMutation, useQueryClient } from "@tanstack/react-query";

// Add item to inventory
export const useAddItemToInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      serialNumber: string;
      description: string;
      status: string;
      quantity: number;
    }) => {
      const res = await fetch(`/api/inventories/${inventoryId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.error || "Failed to add item");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
    },
  });
};
