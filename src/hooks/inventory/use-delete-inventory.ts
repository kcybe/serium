import { useMutation, useQueryClient } from "@tanstack/react-query";

const INVENTORIES_QUERY_KEY = ["inventories"];

export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (inventoryIdToDelete: string) => {
      const res = await fetch(`/api/inventories/${inventoryIdToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        // Attempt to parse error details if available, otherwise use status text
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
    onSuccess: (_data, inventoryIdDeleted) => {
      console.log(
        `onSuccess: Inventory with ID: ${inventoryIdDeleted} processed successfully.`
      );
      queryClient.invalidateQueries({ queryKey: INVENTORIES_QUERY_KEY });
      console.log(`Invalidated query with key: ${INVENTORIES_QUERY_KEY}`);
    },
    onError: (error: Error, inventoryIdAttempted) => {
      console.error(
        `onError: Error deleting inventory with ID ${inventoryIdAttempted}:`,
        error.message
      );
    },
  });
};
