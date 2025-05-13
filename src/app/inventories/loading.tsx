import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingInventoriesPage() {
  const numRows = 3; // Number of skeleton rows to display

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            <Skeleton className="h-7 w-48" /> {/* "Inventories" title */}
            <Skeleton className="h-10 w-[150px] rounded-md" />{" "}
            {/* "New Inventory" button */}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          <div className="space-y-4">
            {/* Action Buttons Bar */}
            <div className="flex justify-end items-center space-x-2 mb-4">
              {/* Filter Input */}
              <Skeleton className="h-9 w-full" /> {/* Adjusted margin */}
              <Skeleton className="h-9 w-[160px] rounded-md" />{" "}
              {/* Column Visibility */}
              <Skeleton className="h-9 w-[130px] rounded-md" />{" "}
              {/* Clear Filters */}
            </div>
            {/* Table Skeleton */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Skeleton className="h-5 w-5 rounded-sm" />
                    </TableHead>
                    <TableHead className="w-[200px]">
                      <Skeleton className="h-5 w-3/4" />
                    </TableHead>
                    <TableHead className="w-[100px]">
                      <Skeleton className="h-5 w-1/2" />
                    </TableHead>
                    <TableHead>
                      {" "}
                      {/* Flexible width for Description */}
                      <Skeleton className="h-5 w-5/6" />
                    </TableHead>
                    <TableHead className="w-[150px]">
                      <Skeleton className="h-5 w-3/4" />
                    </TableHead>
                    <TableHead className="w-[80px] text-right">
                      <Skeleton className="h-5 w-6 ml-auto" />
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: numRows }).map((_, rowIndex) => (
                    <TableRow key={`row-${rowIndex}`}>
                      <TableCell>
                        <Skeleton className="h-5 w-5 rounded-sm" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-3/4" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-1/2" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-5/6" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-5 w-3/4" />
                      </TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-5 w-6 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination Skeleton */}
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-7 w-48" />{" "}
              {/* "0 of X row(s) selected." */}
              <div className="flex items-center space-x-6">
                {" "}
                {/* Increased spacing for visual separation */}
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-7 w-20" /> {/* "Rows per page" */}
                  <Skeleton className="h-9 w-[70px] rounded-md" />{" "}
                  {/* Dropdown */}
                </div>
                <Skeleton className="h-7 w-24" /> {/* "Page X of Y" */}
                <div className="flex items-center space-x-1">
                  <Skeleton className="h-9 w-9 rounded-md" /> {/* First page */}
                  <Skeleton className="h-9 w-9 rounded-md" />{" "}
                  {/* Previous page */}
                  <Skeleton className="h-9 w-9 rounded-md" /> {/* Next page */}
                  <Skeleton className="h-9 w-9 rounded-md" /> {/* Last page */}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
