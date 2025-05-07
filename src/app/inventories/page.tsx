"use client";

import { useInventories } from "@/hooks/use-inventories";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InventoryWithItems } from "@/types";
import { CreateInventoryModal } from "@/components/inventories/CreateInventoryModal";
import { useRouter } from "next/navigation";

export default function InventoriesPage() {
  const { data: inventories, isLoading, error } = useInventories();
  const router = useRouter();

  const totalInventories = inventories?.length || 0;

  if (isLoading) {
    return (
      <div className="p-4">
        <Card>
          <div className="flex items-center justify-between border-b px-4 py-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-8 w-32 rounded" />
          </div>
          <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </Card>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center mt-4">
        Failed to load inventories.
      </p>
    );
  }

  return (
    <div className="p-4 w-full">
      <Card className="w-full">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-semibold">
            Total Inventories: {totalInventories}
          </h2>
          <CreateInventoryModal />
        </div>

        {totalInventories === 0 ? (
          <p className="text-center mt-4 text-muted-foreground">
            No inventories found.
          </p>
        ) : (
          <div className="p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {(inventories ?? []).map((inv: InventoryWithItems) => (
              <Card key={inv.id} className="p-4">
                <h2
                  className="text-xl font-semibold underline decoration-dashed cursor-pointer text-primary hover:opacity-80 transition"
                  onClick={() => router.push(`/inventories/${inv.id}`)}
                >
                  {inv.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {inv.items?.length || 0} items
                </p>
                <p className="text-xs text-muted-foreground">
                  Created at: {new Date(inv.createdAt).toLocaleDateString()}
                </p>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
