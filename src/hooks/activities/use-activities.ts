import { useQuery } from "@tanstack/react-query";
import { ActivityLog } from "../../../generated/prisma";

export interface ActivityLogWithRelations extends ActivityLog {
  user?: { name: string | null; email: string }; // Example, adjust to your API response
  inventory?: { name: string } | null;
  item?: { name: string } | null;
}

export const ACTIVITIES_QUERY_KEY = ["activities", "list"];

export const useActivities = () => {
  return useQuery<ActivityLogWithRelations[], Error>({
    queryKey: ACTIVITIES_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/inventories/activities");
      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to fetch activities" }));
        throw new Error(errorData.error || "Failed to fetch activities");
      }
      return res.json();
    },
  });
};
