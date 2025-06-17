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

export default function LoadingActivitiesPage() {
  const numRows = 7; // Number of skeleton rows to display for activities

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* "Activities" title */}
            <Skeleton className="h-7 w-36" />
            {/* Activities page might not have header actions like "Create" */}
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          {/* --- DataTableToolbar Skeleton for Activities --- */}
          <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
            {/* Left group: Filter Input, potential faceted filters */}
            <div className="flex flex-1 items-center space-x-2 flex-wrap">
              <Skeleton className="h-9 w-full max-w-lg" /> {/* Global Filter */}
              {/* Add Skeletons for faceted filters if your Activities toolbar has them */}
              {/* e.g., <Skeleton className="h-9 w-32 rounded-md" /> */}
              <Skeleton className="h-8 w-20 rounded-md" /> {/* View Options */}
              <Skeleton className="h-8 w-20 rounded-md" />{" "}
              <Skeleton className="h-8 w-[100px] rounded-md" />{" "}
            </div>
          </div>

          {/* --- Table Skeleton for Activities --- */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Select Checkbox */}
                  <TableHead className="w-[40px] px-2">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                  </TableHead>
                  {/* User ID */}
                  <TableHead className="w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Action */}
                  <TableHead className="w-[120px]">
                    <Skeleton className="h-5 w-2/3" />
                  </TableHead>
                  {/* Inventory ID */}
                  <TableHead className="w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Item ID */}
                  <TableHead className="w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Metadata (can be wide) */}
                  <TableHead>
                    <Skeleton className="h-5 w-5/6" />
                  </TableHead>
                  {/* Created At */}
                  <TableHead className="w-[180px] text-right pr-2">
                    <Skeleton className="h-5 w-3/4 ml-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-activity-row-${rowIndex}`}>
                    <TableCell className="px-2">
                      {" "}
                      {/* Select */}
                      <Skeleton className="h-5 w-5 rounded-sm" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* User ID */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Action (Badge) */}
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Inventory ID */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Item ID */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Metadata */}
                      <Skeleton className="h-5 w-5/6" />
                    </TableCell>
                    <TableCell className="text-right pr-2">
                      {" "}
                      {/* Created At */}
                      <Skeleton className="h-5 w-3/4 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* --- Pagination Skeleton --- */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
            <Skeleton className="h-7 w-40" />{" "}
            {/* Selected rows text (if applicable) */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-7 w-20 hidden sm:block" />
                <Skeleton className="h-9 w-[70px] rounded-md" />
              </div>
              <Skeleton className="h-7 w-24" />
              <div className="flex items-center space-x-1">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
