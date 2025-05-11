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
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{inventory.name}</h1>
            <AddItemModal inventoryId={inventory.id} />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <DataTable columns={columns} data={inventory.items} />
        </CardContent>
      </Card>
    </div>
  );
}
