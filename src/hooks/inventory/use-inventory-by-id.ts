import { InventoryWithItems } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Fetch single inventory by ID
export const useInventoryById = (id: string) => {
  return useQuery<InventoryWithItems>({
    queryKey: ["inventory", id],
    queryFn: async () => {
      const res = await fetch(`/api/inventories/${id}`);
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return res.json();
    },
    enabled: !!id,
  });
};
