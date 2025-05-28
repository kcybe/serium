import { prisma } from "@/lib/db"; // adjust to your project structure
import { Prisma } from "../../generated/prisma";

type LogActivityParams = {
  userId: string;
  action: string;
  itemId?: string;
  inventoryId?: string;
  metadata?: Prisma.JsonValue;
};

export async function logActivity(params: LogActivityParams) {
  await prisma.activityLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      itemId: params.itemId,
      inventoryId: params.inventoryId,
      metadata: params.metadata || {},
    },
  });
}
