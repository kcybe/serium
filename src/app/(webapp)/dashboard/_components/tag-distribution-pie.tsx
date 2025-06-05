"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { cn } from "@/lib/utils"
import { useTagsDistribution } from "@/hooks/dashboard/use-tags-distribution"

export function TagDistribution({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const {data: tagDistribution, isLoading} = useTagsDistribution()
    
if (isLoading || !tagDistribution || tagDistribution.length === 0) {
    return (
        <Card className={cn("col-span-3", className)} {...props}>
            <CardHeader>
                <CardTitle>Tag Distribution</CardTitle>
                <CardDescription>Items categorized by tags</CardDescription>
            </CardHeader>
            <CardContent>
                <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p className="text-muted-foreground">Loading data or no data available...</p>
                </div>
            </CardContent>
        </Card>
    )
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
            <Pie data={tagDistribution} cx="50%" cy="50%" outerRadius={80} dataKey="value" nameKey="name" label>
              {tagDistribution?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(var(--chart-${index + 1}))`} />
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
                          <span className="text-xs text-muted-foreground">{payload[0].name}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs uppercase">Items</span>
                          <span className="text-xs">{payload[0].value}</span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
