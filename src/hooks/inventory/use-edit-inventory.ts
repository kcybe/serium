import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<JSON, Error, { id: string; name: string }>({
    mutationFn: async (updateData: { id: string; name: string }) => {
      const requestBody = {
        name: updateData.name,
      };
      const res = await fetch(`/api/inventories/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error("Failed to edit inventory");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (error, variables) => {
      console.error("Mutation failed for inventory", variables.id, error);
    },
  });
};
