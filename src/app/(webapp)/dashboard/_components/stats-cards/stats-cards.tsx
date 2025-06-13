"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/dashboard/use-stats";
import { Package, PackageCheck, AlertTriangle, Tag } from "lucide-react";
import { StatsCardsSkeleton } from "./stats-cards-skeleton";

export function StatsCards() {
  const { data: statsData, isLoading } = useStats();

  if (isLoading) {
    return (
      <>
        <StatsCardsSkeleton />
        <StatsCardsSkeleton />
        <StatsCardsSkeleton />
        <StatsCardsSkeleton />
      </>
    );
  }

  const stats = [
    {
      title: "Total Items",
      value: statsData?.totalItems,
      icon: Package,
      description: "Across all inventories",
      change: `+${statsData?.totalItemsChange}% from last month`,
      trend: statsData?.totalItemsTrend,
    },
    {
      title: "Available Items",
      value: statsData?.totalAvailableItems,
      icon: PackageCheck,
      description: "Ready for use",
      change: `+${statsData?.totalAvailableItemsChange}% from last month`,
      trend: statsData?.totalAvailableItemsTrend,
    },
    {
      title: "Items Needing Attention",
      value: statsData?.itemsNeedingAttentionCount,
      icon: AlertTriangle,
      description: "Broken, repair, or lost",
      change: `+${statsData?.itemsNeedingAttentionCountChange}% from last month`,
      trend: statsData?.itemsNeedingAttentionCountTrend,
    },
    {
      title: "Total Tags",
      value: statsData?.uniqueTagsCount,
      icon: Tag,
      description: "Used for categorization",
      change: `+${statsData?.uniqueTagsCountChange}% new tags this month`,
      trend: statsData?.uniqueTagsCountTrend,
    },
  ];

  return (
    <>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              {stat.change && (
                <p
                  className={`text-xs mt-1 ${
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
