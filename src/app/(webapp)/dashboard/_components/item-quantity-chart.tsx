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
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  useInventoriesQuantities,
  type InventoryQuantitiesDataPoint,
} from "@/hooks/dashboard/use-inventories-quantities";
import { Loader2 } from "lucide-react";

export function ItemQuantityChart({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data: inventoriesQuantities, isLoading } = useInventoriesQuantities();

  const chartConfig: ChartConfig = {};
  const seriesKeys: string[] = [];

  if (inventoriesQuantities && inventoriesQuantities.length > 0) {
    const firstDataItem: InventoryQuantitiesDataPoint =
      inventoriesQuantities[0];
    Object.keys(firstDataItem).forEach((key, index) => {
      if (key.toLowerCase() !== "date") {
        seriesKeys.push(key);
        chartConfig[key] = {
          label: key,
          color: `hsl(var(--chart-${index + 1}))`,
        };
      }
    });
  }

  if (isLoading) {
    return (
      <Card className={cn("col-span-4", className)} {...props}>
        <CardHeader>
          <CardTitle>Item Quantity Trends</CardTitle>
          <CardDescription>
            Monthly item quantity changes by inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[350px] w-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!inventoriesQuantities || inventoriesQuantities.length === 0) {
    return (
      <Card className={cn("col-span-4", className)} {...props}>
        <CardHeader>
          <CardTitle>Item Quantity Trends</CardTitle>
          <CardDescription>
            Monthly item quantity changes by inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="min-h-[350px] w-full flex items-center justify-center text-muted-foreground text-sm">
            No inventory data available to display.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("col-span-4", className)} {...props}>
      <CardHeader>
        <CardTitle>Item Quantity Trends</CardTitle>
        <CardDescription>
          Monthly item quantity changes by inventory
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="min-h-[350px] w-full">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              accessibilityLayer
              data={inventoriesQuantities}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              {seriesKeys.map((key) => (
                <Area
                  key={key}
                  dataKey={key}
                  type="natural"
                  fill={chartConfig[key]?.color as string}
                  fillOpacity={0.4}
                  stroke={chartConfig[key]?.color as string}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
