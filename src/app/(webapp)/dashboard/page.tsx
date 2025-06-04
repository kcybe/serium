import { Suspense } from "react"
import type { Metadata } from "next"
import { DashboardShell } from "./_components/dashboard-shell"
import { DashboardSkeleton } from "./_components/dashboard-skeleton"
import { DashboardHeader } from "./_components/dashboard-header"
import { StatsCards } from "./_components/stats-cards"
import { RecentActivity } from "./_components/recent-activity"

export const metadata: Metadata = {
  title: "Dashboard | Serium",
  description: "Monitor and manage your inventory with comprehensive analytics",
}

export default function DashboardPage() {
  return (
    <DashboardShell className="p-8">
      <DashboardHeader heading="Dashboard" text="Get an overview of your inventory management system." />
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCards />
        </div>
        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <InventoryOverview className="lg:col-span-4" />
          <ItemStatusChart className="lg:col-span-3" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <ItemQuantityChart className="lg:col-span-4" />
          <TagDistribution className="lg:col-span-3" />
        </div>*/}
        <RecentActivity /> 
      </Suspense>
    </DashboardShell>
  )
}
