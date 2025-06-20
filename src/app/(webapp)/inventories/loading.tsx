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
  const numRows = 5; // Number of skeleton rows to display, adjust as needed

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* "Inventories" title */}
            <Skeleton className="h-7 w-36" />
            <div className="flex items-center space-x-2">
              {/* "Create Inventory" button */}
              <Skeleton className="h-9 w-32 rounded-md" />
              {/* "InventoriesActions" dropdown (MoreHorizontal icon) */}
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          {/* --- DataTableToolbar Skeleton --- */}

          <div className="mb-4 flex items-center justify-start gap-2 flex-wrap">
            {/* Main group for all left-aligned items */}
            <div className="flex flex-1 items-center space-x-2 flex-wrap">
              {/* Global Filter Input */}
              <Skeleton className="h-9 w-full max-w-lg" />

              {/* Nested group for "View Options" and "Clear All" - still part of the left group */}
              <div className="flex items-center space-x-2">
                {/* DataTableViewOptions ("View" button) */}
                <Skeleton className="h-8 w-20 rounded-md" />
                {/* Clear All Button */}
                <Skeleton className="h-8 w-[100px] rounded-md" />
              </div>
            </div>
          </div>

          {/* --- Table Skeleton --- */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Select Checkbox */}
                  <TableHead className="w-[40px] px-2">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                  </TableHead>
                  {/* Name */}
                  <TableHead className="w-[250px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Items Count */}
                  <TableHead className="w-[100px]">
                    <Skeleton className="h-5 w-1/2" />
                  </TableHead>
                  {/* Description */}
                  <TableHead>
                    <Skeleton className="h-5 w-5/6" />
                  </TableHead>
                  {/* Created At */}
                  <TableHead className="w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Actions */}
                  <TableHead className="w-[80px] text-right pr-2">
                    <Skeleton className="h-5 w-6 ml-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: numRows }).map((_, rowIndex) => (
                  <TableRow key={`skeleton-row-${rowIndex}`}>
                    <TableCell className="px-2">
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
                    <TableCell className="text-right pr-2">
                      <Skeleton className="h-5 w-6 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* --- Pagination Skeleton --- */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
            {/* Selected rows text */}
            <Skeleton className="h-7 w-40" />
            <div className="flex items-center space-x-4 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-7 w-20 hidden sm:block" />{" "}
                {/* "Rows per page" text */}
                <Skeleton className="h-9 w-[70px] rounded-md" />{" "}
                {/* Rows per page select */}
              </div>
              <Skeleton className="h-7 w-24" /> {/* "Page X of Y" */}
              <div className="flex items-center space-x-1">
                <Skeleton className="h-9 w-9 rounded-md" /> {/* First */}
                <Skeleton className="h-9 w-9 rounded-md" /> {/* Prev */}
                <Skeleton className="h-9 w-9 rounded-md" /> {/* Next */}
                <Skeleton className="h-9 w-9 rounded-md" /> {/* Last */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
