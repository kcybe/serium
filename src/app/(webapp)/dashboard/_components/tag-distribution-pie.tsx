"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";
import { useTagsDistribution } from "@/hooks/dashboard/use-tags-distribution";
import { Loader2 } from "lucide-react";

export function TagDistribution({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data: tagDistribution, isLoading } = useTagsDistribution();

  if (isLoading) {
    return (
      <Card className={cn("col-span-4", className)} {...props}>
        <CardHeader>
          <CardTitle>Tag Distribution</CardTitle>
          <CardDescription>Items categorized by tags</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[350px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!tagDistribution || tagDistribution.length === 0) {
    return (
      <Card className={cn("col-span-4", className)} {...props}>
        <CardHeader>
          <CardTitle>Tag Distribution</CardTitle>
          <CardDescription>Items categorized by tags</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[350px] w-full flex items-center justify-center text-muted-foreground text-sm">
            No tag data available to display.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Tag Distribution</CardTitle>
        <CardDescription>Items categorized by tags</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={tagDistribution}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              nameKey="name"
              label
            >
              {tagDistribution?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`hsl(var(--chart-${index + 1}))`}
                />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-xs uppercase">Tag</span>
                          <span className="text-xs text-muted-foreground">
                            {payload[0].name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase">Items</span>
                          <span className="text-xs">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
