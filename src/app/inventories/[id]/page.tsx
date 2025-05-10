"use client";

import { useParams } from "next/navigation";
import { useInventoryById } from "@/hooks/use-inventory";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddItemModal } from "@/components/inventories/inventory-items/add-item-modal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "./loading";

export default function InventoryPage() {
  const { id } = useParams();
  const { data: inventory, isLoading } = useInventoryById(id as string);

  if (isLoading) return <LoadingInventoryPage />;
  if (!inventory) return <div>Error loading inventory</div>;

  return (
    <div className="p-6 space-y-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{inventory.name}</h1>
            <AddItemModal inventoryId={inventory.id} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={inventory.items} />
        </CardContent>
      </Card>
    </div>
  );
}
