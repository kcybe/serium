import { InventoryWithItems } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query"; // Import UseQueryResult

export class FetchError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "FetchError";
    this.status = status;
  }
}

export const useInventoryById = (
  id: string | null | undefined,
  options?: { enabled?: boolean }
): UseQueryResult<InventoryWithItems, FetchError> => {
  return useQuery<
    InventoryWithItems,
    FetchError,
    InventoryWithItems,
    readonly ["inventory", string | null | undefined]
  >({
    queryKey: ["inventory", id] as const,
    queryFn: async () => {
      if (!id) {
        throw new FetchError("Inventory ID is required to fetch.", 400);
      }

      const res = await fetch(`/api/inventories/${id}`);

      if (!res.ok) {
        let errorMessage = `Failed to fetch inventory. Status: ${res.status}`;
        try {
          const errorInfo = await res.json();
          if (errorInfo && errorInfo.error) {
            errorMessage = errorInfo.error;
          }
        } catch (e) {
          console.warn("Could not parse error response as JSON:", e);
        }
        throw new FetchError(errorMessage, res.status);
      }
      return res.json();
    },
    enabled: options?.enabled !== undefined ? options.enabled && !!id : !!id,
    retry: (failureCount, error) => {
      if (error.status === 404) {
        return false;
      }
      if (error.status === 429) {
        return false;
      }
      if (
        error.status &&
        error.status >= 400 &&
        error.status < 500 &&
        error.status !== 429
      ) {
        return false;
      }
      return failureCount < 2;
    },
  });
};
