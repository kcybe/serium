import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteMultipleItems = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { inventoryId: string; itemIdsToDelete: string[] }
  >({
    mutationFn: async ({
      inventoryId,
      itemIdsToDelete,
    }: {
      inventoryId: string;
      itemIdsToDelete: string[];
    }) => {
      const res = await fetch(
        `/api/inventories/${inventoryId}/items/bulk-delete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: itemIdsToDelete }),
        }
      );

      if (!res.ok) {
        let errorMessage = `Failed to delete items. Status: ${res.status} ${res.statusText}`;
        try {
          const errorBody = await res.json();
          if (errorBody && errorBody.error) {
            errorMessage = errorBody.error;
          }
        } catch (e) {
          console.error("Failed to parse error response as JSON:", e);
        }
        throw new Error(errorMessage);
      }

      return;
    },
    onSuccess: (_data, variables) => {
      const { inventoryId } = variables;
      queryClient.invalidateQueries({
        queryKey: ["inventory", inventoryId],
      });
    },
    onError: (error: Error, variables) => {
      const { inventoryId } = variables;
      console.error(
        `onError: Error deleting items from inventory ${inventoryId}:`,
        error.message
      );
    },
  });
};
