"use client";

import { useInventories } from "@/hooks/inventory";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "../loading";
import { CreateInventoryModal } from "./forms/create-inventory-modal";
import InventoriesActions from "./inventories-actions";

export default function InventoriesPageClient() {
  const { data: inventories, isLoading } = useInventories();

  if (isLoading) return <LoadingInventoryPage />;
  if (!inventories) return <div>Error loading inventory</div>;

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Inventories</h1>
            <div className="flex items-center space-x-2">
              <CreateInventoryModal />
              <InventoriesActions />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <DataTable columns={columns} data={inventories} />
        </CardContent>
      </Card>
    </div>
  );
}
