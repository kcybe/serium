"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRecentActivity } from "@/hooks/dashboard/use-recent-activity"
import Link from "next/link"

export function RecentActivity() {

  const { data: recentActivity } = useRecentActivity();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  const formatAction = (action: string) => {
    return action
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getActionBadgeColor = (action: string) => {
    if (action.includes("CREATE")) return "bg-green-100 text-green-800"
    if (action.includes("EDIT")) return "bg-blue-100 text-blue-800"
    if (action.includes("DELETE")) return "bg-red-100 text-red-800"
    if (action.includes("VIEW") || action.includes("SEARCH")) return "bg-gray-100 text-gray-800"
    if (action.includes("VERIFY")) return "bg-purple-100 text-purple-800"
    return ""
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions performed in the system</CardDescription>
          </div>
          <Button variant="link" className="text-primary"> <Link href="/activities">View All</Link></Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead className="hidden md:table-cell">Inventory</TableHead>
              <TableHead className="hidden md:table-cell">Item</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity?.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">{activity.userName}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getActionBadgeColor(activity.action)}>
                    {formatAction(activity.action)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{activity.inventoryName || "-"}</TableCell>
                <TableCell className="hidden md:table-cell">{activity.itemName || "-"}</TableCell>
                <TableCell>{formatDate(activity.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
