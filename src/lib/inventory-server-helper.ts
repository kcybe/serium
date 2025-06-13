import { prisma } from "./db";
import { getAuthenticatedUserServer } from "./get-authenticated-user-server";

export async function getInventoryName(id: string): Promise<string | null> {
  const user = await getAuthenticatedUserServer();
  if (!user) return null;

  const inventory = await prisma.inventory.findUnique({
    where: { id, userId: user.id },
    select: { name: true },
  });
  return inventory?.name ?? null;
}
