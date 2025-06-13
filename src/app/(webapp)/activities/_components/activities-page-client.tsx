"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LoadingInventoryPage from "../loading";
import { useActivities } from "@/hooks/activities/use-activities";

export default function ActivitiesPage() {
  const { data: activities, isLoading } = useActivities();

  if (isLoading) return <LoadingInventoryPage />;
  if (!activities) return <div>Error loading inventory</div>;

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Activities</h1>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <DataTable columns={columns} data={activities} />
        </CardContent>
      </Card>
    </div>
  );
}
