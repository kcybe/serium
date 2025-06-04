import { RecentActivity } from "@/types";
import { useQuery } from "@tanstack/react-query";


export const RECENT_ACTIVITY_QUERY_KEY = ["recent-activity"];

export const useRecentActivity = () => {
  return useQuery<RecentActivity[], Error>({
    queryKey: RECENT_ACTIVITY_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/dashboard/recent-activity");
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to fetch recent activity" }));
        throw new Error(errorData.error || "Failed to fetch recent activity");
      }
      return res.json();
    },
  });
};
