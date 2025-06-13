"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useInventoryById } from "@/hooks/inventory";

const ITEMS_TO_DISPLAY = 3;

export function InventoryBreadcrumb() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const pathSegments = React.useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  const inventoryId =
    pathSegments[0] === "inventories" && pathSegments[1]
      ? pathSegments[1]
      : null;

  const { data: inventory } = useInventoryById(inventoryId ?? "");

  const items = React.useMemo(() => {
    const baseItems = [
      { href: "/", label: "Home" },
      ...pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const label =
          inventoryId && segment === inventoryId && inventory?.name
            ? inventory.name
            : segment.charAt(0).toUpperCase() + segment.slice(1);
        return { href, label };
      }),
    ];
    return baseItems;
  }, [pathSegments, inventory, inventoryId]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          // First item (Home)
          if (index === 0) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }

          // Ellipsis dropdown for hidden middle items
          if (
            items.length > ITEMS_TO_DISPLAY &&
            index > 0 &&
            index < items.length - (ITEMS_TO_DISPLAY - 1)
          ) {
            if (index === 1) {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                      <DropdownMenuTrigger
                        className="flex items-center gap-1"
                        aria-label="Toggle menu"
                      >
                        <BreadcrumbEllipsis className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {items
                          .slice(1, -2)
                          .map((dropdownItem, dropdownIndex) => (
                            <DropdownMenuItem key={dropdownIndex}>
                              <Link href={dropdownItem.href}>
                                {dropdownItem.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </React.Fragment>
              );
            }
            return null;
          }

          // Last item (current page)
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          // Middle visible items
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
