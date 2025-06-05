import { useQuery } from "@tanstack/react-query";

export interface TagDistributionDataPoint {
  name: string;
  value: number;
}

export const TAGS_DISTRIBUTION_QUERY_KEY = ["tags-distribution"];

export const useTagsDistribution = () => {
  return useQuery<TagDistributionDataPoint[], Error>({
    queryKey: TAGS_DISTRIBUTION_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/dashboard/tags-distribution");
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to fetch tags distribution" }));
        throw new Error(errorData.error || "Failed to fetch tags distribution");
      }
      return res.json();
    },
    // Add any other react-query options here if needed, e.g., staleTime, cacheTime
  });
};
