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

export default function LoadingInventoryDetailPage() {
  const numRows = 5; // Number of skeleton rows for items

  return (
    <div className="p-6 h-full">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex justify-between items-center">
            {/* Dynamic Inventory Name */}
            <Skeleton className="h-7 w-48" />
            <div className="flex items-center space-x-2">
              {/* "Add Item" button */}
              <Skeleton className="h-9 w-28 rounded-md" />
              {/* "InventoryActions" dropdown (MoreHorizontal icon) */}
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto pt-1">
          {/* --- Item DataTableToolbar Skeleton --- */}
          <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
            {/* Left group of toolbar items */}
            <div className="flex flex-1 items-center space-x-2 flex-wrap">
              {/* Global Filter Input */}
              <Skeleton className="h-9 w-full max-w-sm" />
              {/* Faceted Filter for Status (example) */}
              <Skeleton className="h-9 w-32 rounded-md" />
              {/* Faceted Filter for Tags (example) */}
              <Skeleton className="h-9 w-32 rounded-md" />
              {/* Reset Column Filters Button (conditional) */}
              {/* <Skeleton className="h-9 w-28 rounded-md" /> */}
              {/* DataTableViewOptions ("View" button) */}
              <Skeleton className="h-9 w-20 rounded-md" />
              {/* Clear All Button */}
              <Skeleton className="h-9 w-[110px] rounded-md" />
              {/* Selection Actions Dropdown (conditional) */}
              {/* <Skeleton className="h-9 w-40 rounded-md" /> */}
            </div>
          </div>

          {/* --- Item Table Skeleton --- */}
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  {/* Select Checkbox */}
                  <TableHead className="w-[40px] px-2">
                    <Skeleton className="h-5 w-5 rounded-sm" />
                  </TableHead>
                  {/* Name */}
                  <TableHead className="w-[200px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Quantity */}
                  <TableHead className="w-[100px]">
                    <Skeleton className="h-5 w-1/2" />
                  </TableHead>
                  {/* Serial Number */}
                  <TableHead className="w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Status */}
                  <TableHead className="w-[120px]">
                    <Skeleton className="h-5 w-2/3" />
                  </TableHead>
                  {/* Tags */}
                  <TableHead className="w-[180px]">
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-10 rounded" />
                      <Skeleton className="h-5 w-12 rounded" />
                    </div>
                  </TableHead>
                  {/* Description */}
                  <TableHead>
                    {" "}
                    {/* More flexible width */}
                    <Skeleton className="h-5 w-5/6" />
                  </TableHead>
                  {/* Last Verified */}
                  <TableHead className="w-[170px]">
                    <Skeleton className="h-5 w-3/4" />
                  </TableHead>
                  {/* Created At */}
                  <TableHead className="w-[120px]">
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
                  <TableRow key={`skeleton-item-row-${rowIndex}`}>
                    <TableCell className="px-2">
                      {" "}
                      {/* Select */}
                      <Skeleton className="h-5 w-5 rounded-sm" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Name */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Quantity */}
                      <Skeleton className="h-5 w-1/2" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Serial */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Status */}
                      <Skeleton className="h-5 w-16 rounded-full" />{" "}
                      {/* Badge-like */}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Tags */}
                      <div className="flex gap-1">
                        <Skeleton className="h-5 w-10 rounded" />
                        <Skeleton className="h-5 w-12 rounded" />
                      </div>
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Description */}
                      <Skeleton className="h-5 w-5/6" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Last Verified */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell>
                      {" "}
                      {/* Created At */}
                      <Skeleton className="h-5 w-3/4" />
                    </TableCell>
                    <TableCell className="text-right pr-2">
                      {" "}
                      {/* Actions */}
                      <Skeleton className="h-5 w-6 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* --- Pagination Skeleton --- */}
          <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
            <Skeleton className="h-7 w-40" /> {/* Selected rows text */}
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
