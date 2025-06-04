import { DashboardStats } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const STATS_QUERY_KEY = ["stats"];

export const useStats = () => {
  return useQuery<DashboardStats, Error>({
    queryKey: STATS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/dashboard/stats");
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to fetch stats" }));
        throw new Error(errorData.error || "Failed to fetch stats");
      }
      return res.json();
    },
  });
};
