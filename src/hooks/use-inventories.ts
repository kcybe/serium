// lib/hooks/useInventories.ts
import { InventoryWithItems } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useInventories = () => {
  return useQuery<InventoryWithItems[]>({
    queryKey: ["inventories"],
    queryFn: async () => {
      const res = await fetch("/api/inventories");
      if (!res.ok) throw new Error("Failed to fetch inventories");
      return res.json();
    },
  });
};
