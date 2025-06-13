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
import { Home, Folder, Package, Search, Shield } from "lucide-react";

const ITEMS_TO_DISPLAY = 3;

const getBreadcrumbIcon = (segment: string) => {
  const icons: Record<string, React.ReactNode> = {
    dashboard: <Home className="w-4 h-4 mr-1" />,
    inventories: <Folder className="w-4 h-4 mr-1" />,
    items: <Package className="w-4 h-4 mr-1" />,
    search: <Search className="w-4 h-4 mr-1" />,
    activities: <Shield className="w-4 h-4 mr-1" />,
  };
  return icons[segment.toLowerCase()] ?? null;
};

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
      ...(pathSegments[0] !== "dashboard"
        ? [{ href: "/dashboard", label: "Dashboard", segment: "dashboard" }]
        : []),
      ...pathSegments.map((segment, index) => {
        const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
        return {
          href,
          label:
            inventoryId && segment === inventoryId && inventory?.name
              ? inventory.name
              : segment.charAt(0).toUpperCase() + segment.slice(1),
          segment:
            inventoryId && segment === inventoryId && inventory?.name
              ? "inventories"
              : segment,
        };
      }),
    ];
    return baseItems;
  }, [pathSegments, inventory, inventoryId]);

  if (items.length === 1) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage className="inline-flex items-center gap-1.5 text-foreground">
              {getBreadcrumbIcon(items[0].segment ?? "")}
              {items[0].label}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          // First item (Dashboard)
          if (index === 0) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={item.href}
                    className="inline-flex items-center gap-1.5"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {getBreadcrumbIcon(item.segment ?? "")}
                      {item.label}
                    </span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          }

          // Ellipsis dropdown
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
                              <Link
                                href={dropdownItem.href}
                                className="inline-flex items-center gap-1.5"
                              >
                                {getBreadcrumbIcon(dropdownItem.segment ?? "")}
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
                <BreadcrumbPage
                  aria-current="page"
                  className="inline-flex items-center gap-1.5"
                >
                  {getBreadcrumbIcon(item.segment ?? "")}
                  {item.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          // Middle visible items
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.href}
                  className="inline-flex items-center gap-1.5"
                >
                  <span className="inline-flex items-center gap-1.5">
                    {getBreadcrumbIcon(item.segment ?? "")}
                    {item.label}
                  </span>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
