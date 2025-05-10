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

const ITEMS_TO_DISPLAY = 3;

export function InventoryBreadcrumb() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const items = React.useMemo(() => {
    const paths = pathname.split("/").filter(Boolean);
    return [
      { href: "/", label: "Home" },
      ...paths.map((path, index) => ({
        href: `/${paths.slice(0, index + 1).join("/")}`,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      })),
    ];
  }, [pathname]);

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

          // Ellipsis dropdown for middle items
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

          // Last item
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                  {item.label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          // Visible middle items
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
