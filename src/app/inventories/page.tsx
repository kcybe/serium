"use client";

import { useInventories } from "@/hooks/use-inventory";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "./loading";
import { CreateInventoryModal } from "@/components/inventories/create-inventory-modal";

export default function InventoryPage() {
  const { data: inventories, isLoading } = useInventories();

  if (isLoading) return <LoadingInventoryPage />;
  if (!inventories) return <div>Error loading inventory</div>;

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Inventories</h1>
            <CreateInventoryModal />
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <DataTable columns={columns} data={inventories} />
        </CardContent>
      </Card>
    </div>
  );
}
