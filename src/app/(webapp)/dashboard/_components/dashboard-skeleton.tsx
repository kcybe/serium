import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[125px]" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-[300px] lg:col-span-4" />
        <Skeleton className="h-[300px] lg:col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Skeleton className="h-[300px] lg:col-span-4" />
        <Skeleton className="h-[300px] lg:col-span-3" />
      </div>
      <Skeleton className="h-[400px]" />
    </div>
  )
}
