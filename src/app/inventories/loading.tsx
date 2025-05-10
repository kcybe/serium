import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingInventoriesPage() {
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
