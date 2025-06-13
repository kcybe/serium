import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<JSON, Error, { name: string; description: string }>({
    mutationFn: async (data: { name: string; description: string }) => {
      const requestBody = {
        name: data.name,
        description: data.description,
      };
      const res = await fetch(`/api/inventories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error("Failed to create inventory");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (error, variables) => {
      console.error("Mutation failed for inventory", variables.name, error);
    },
  });
};
