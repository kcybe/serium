import { prisma } from "./db";

// src/lib/tag-utils.ts
export async function cleanupUnusedTags(userId: string): Promise<number> {
  // Find tags that aren't connected to any items
  const unusedTags = await prisma.tag.findMany({
    where: {
      userId: userId,
      items: { none: {} }
    },
    select: { id: true }
  });

  if (unusedTags.length === 0) return 0;

  // Delete the unused tags
  const deleteResult = await prisma.tag.deleteMany({
    where: { id: { in: unusedTags.map(tag => tag.id) } }
  });

  return deleteResult.count;
}