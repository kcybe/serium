// src/app/(webapp)/inventories/[id]/_components/inventory-page-client.tsx
"use client";

import { useInventoryById, FetchError } from "@/hooks/inventories"; // Import FetchError
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddItemModal } from "@/components/inventories/inventory-items/add-item-modal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "../loading"; // Your existing loading component
import InventoryActions from "./inventory-actions";
import { NotFoundDisplay } from "@/components/inventories/not-found-display"; // Your new component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InventoryPageClient({ id }: { id: string }) {
  const { data: inventory, isPending, isError, error } = useInventoryById(id);

  if (isPending) {
    return <LoadingInventoryPage />;
  }

  if (isError) {
    if (error instanceof FetchError && error.status === 404) {
      return (
        <div className="p-6 h-full flex items-center justify-center">
          <NotFoundDisplay
            resourceName="inventory"
            goBackPath="/inventories"
            goBackText="Back to Inventories"
          />
        </div>
      );
    }

    return (
      <div className="p-6 h-full flex flex-col items-center justify-center">
        <Alert variant="destructive" className="max-w-lg">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Loading Inventory</AlertTitle>
          <AlertDescription>
            {error?.message ||
              "An unexpected error occurred while fetching the inventory."}
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/inventories">Go to Inventories</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!inventory) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <NotFoundDisplay
          resourceName="inventory"
          message="The inventory data could not be loaded or is empty."
          goBackPath="/inventories"
          goBackText="Back to Inventories"
        />
      </div>
    );
  }

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
            data={inventory.items || []} // Ensure data.items is an array
            inventoryId={inventory.id}
          />
        </CardContent>
      </Card>
    </div>
  );
}
