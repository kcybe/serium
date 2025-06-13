"use client";

import { useInventoryById } from "@/hooks/inventory";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddItemModal } from "@/components/inventories/inventory-items/add-item-modal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "../loading";
import InventoryActions from "./inventory-actions";

export default function InventoryPageClient({ id }: { id: string }) {
  const { data: inventory, isLoading } = useInventoryById(id);

  if (isLoading) return <LoadingInventoryPage />;
  if (!inventory) return <div>Error loading inventory</div>;

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{inventory.name}</h1>
            <div className="flex items-center space-x-2">
              <AddItemModal inventoryId={inventory.id} />
              <InventoryActions inventoryId={inventory.id} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <DataTable
            columns={columns}
            data={inventory.items}
            inventoryId={inventory.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
