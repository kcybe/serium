import { ItemSearchResult } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useSearchItems = (query: string) => {
  return useQuery<ItemSearchResult[]>({
    queryKey: ["search-items", query],
    queryFn: async () => {
      const res = await fetch(
        `/api/inventories/search/items/${encodeURIComponent(query)}`
      );
      if (!res.ok) throw new Error("Failed to search items");
      return res.json();
    },
    enabled: query.trim().length > 0,
  });
};
