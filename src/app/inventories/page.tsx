"use client";

import { useInventories } from "@/hooks/use-inventory";
import { Card } from "@/components/ui/card";
import { InventoryWithItems } from "@/types";
import { CreateInventoryModal } from "@/components/inventories/create-inventory-modal";
import { useRouter } from "next/navigation";
import LoadingInventoriesPage from "./loading";

export default function InventoriesPage() {
  const { data: inventories, isLoading, error } = useInventories();
  const router = useRouter();

  const totalInventories = inventories?.length || 0;

  if (isLoading) {
    return <LoadingInventoriesPage />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Failed to load inventories.</p>
      </div>
    );
  }

  console.log("Inventories:", inventories);

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <Card className="w-full shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl md:text-2xl font-bold mb-4 sm:mb-0">
            Total Inventories: {totalInventories}
          </h2>
          <CreateInventoryModal />
        </div>

        {totalInventories === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[200px] p-8">
            <p className="text-lg text-muted-foreground">
              No inventories found.
            </p>
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {(inventories ?? []).map((inv: InventoryWithItems) => (
                <Card
                  key={inv.id}
                  className="p-5 hover:shadow-lg transition-shadow duration-200"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/inventories/${inv.id}`)}
                  >
                    <h2 className="text-xl font-semibold text-primary hover:text-primary/80 transition-colors duration-200 mb-3">
                      {inv.name}
                    </h2>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span>📦</span> {inv.items?.length || 0} items
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>📅</span>{" "}
                        {new Date(inv.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
