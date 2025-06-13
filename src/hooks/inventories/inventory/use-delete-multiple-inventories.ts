import { useMutation, useQueryClient } from "@tanstack/react-query";

const INVENTORIES_QUERY_KEY = ["inventories"];

export const useDeleteMultipleInventories = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string[]>({
    mutationFn: async (inventoryIdsToDelete: string[]) => {
      const res = await fetch(`/api/inventories/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: inventoryIdsToDelete }),
      });

      if (!res.ok) {
        let errorMessage = `Failed to delete inventory. Status: ${res.status} ${res.statusText}`;
        try {
          const errorBody = await res.json();
          if (errorBody && errorBody.error) {
            errorMessage = errorBody.error;
          }
        } catch (e) {
          console.error(e);
        }
        throw new Error(errorMessage);
      }

      return;
    },
    onSuccess: (_data, inventoryIdsDeleted) => {
      console.log(
        `onSuccess: Inventory with IDs: ${inventoryIdsDeleted} processed successfully.`
      );
      queryClient.invalidateQueries({ queryKey: INVENTORIES_QUERY_KEY });
      console.log(`Invalidated query with key: ${INVENTORIES_QUERY_KEY}`);
    },
    onError: (error: Error, inventoryIdsAttempted) => {
      console.error(
        `onError: Error deleting inventory with IDs ${inventoryIdsAttempted}:`,
        error.message
      );
    },
  });
};
