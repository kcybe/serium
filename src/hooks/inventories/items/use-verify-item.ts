import { useMutation, useQueryClient } from "@tanstack/react-query";

interface VerifyResponse {
  exists: boolean;
  verifiedAt?: string;
}

export const useVerifyItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    VerifyResponse,
    Error,
    { inventoryId: string; itemSerialNumber: string }
  >({
    mutationFn: async ({ inventoryId, itemSerialNumber }) => {
      const res = await fetch(
        `/api/inventories/${inventoryId}/verify/${itemSerialNumber}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to verify item");
      }

      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["inventory", variables.inventoryId],
      });
    },
    onError: (error, variables) => {
      console.error(
        "Mutation failed for item",
        variables.itemSerialNumber,
        error
      );
    },
  });
};
