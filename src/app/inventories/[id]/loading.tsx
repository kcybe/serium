import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingInventoryPage() {
  return (
    <div className="p-6 space-y-6 w-full">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </CardHeader>
        <CardContent>
          {/* Table Controls */}
          <div className="mb-4 flex items-center">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-[140px] ml-2" />
            <Skeleton className="h-10 w-[120px] ml-2" />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              {/* Header */}
              <div className="bg-muted/50 h-12">
                <div className="flex">
                  {[...Array(7)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-[120px] m-4" />
                  ))}
                </div>
              </div>

              {/* Rows */}
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-t">
                  <div className="flex items-center">
                    {[...Array(7)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-[120px] m-4" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-8 w-[200px]" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-[100px]" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
