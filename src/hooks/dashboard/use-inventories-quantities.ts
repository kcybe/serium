import { useQuery } from "@tanstack/react-query";

export interface InventoryQuantitiesDataPoint {
  date: string;
  [inventoryName: string]: string | number;
}

export const INVENTORIES_QUANTITIES_QUERY_KEY = ["inventories-quantities"];

export const useInventoriesQuantities = () => {
  return useQuery<InventoryQuantitiesDataPoint[], Error>({
    queryKey: INVENTORIES_QUANTITIES_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/dashboard/inventories-quantities");
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to fetch inventories quantities" }));
        throw new Error(errorData.error || "Failed to fetch inventories quantities");
      }
      return res.json();
    },
  });
};
