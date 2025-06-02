import { useQuery } from "@tanstack/react-query";
import { type Tag as PrismaTag } from "../../../generated/prisma";

// Fetch all tags
export const useTags = () => {
  return useQuery<PrismaTag>({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await fetch("/api/inventories/tags");
      if (!res.ok) throw new Error("Failed to fetch tags");
      return res.json();
    },
  });
};
