"use client";

import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  // useSidebar, // No longer needed if we assume it's always expanded when visible
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Search,
  Package,
  ChevronRight,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useInventories } from "@/hooks/inventories";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton"; // For cleaner loading state

// Define the structure for standard sidebar items
interface SidebarItemConfig {
  title: string;
  url: string;
  icon: React.ElementType; // Use React.ElementType for component icons
}

const applicationItems: SidebarItemConfig[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Activities",
    url: "/activities",
    icon: Shield,
  },
];

export default function SidebarItems() {
  const { data: inventories, isLoading, error } = useInventories();
  // const { state } = useSidebar(); // Removed
  // const isCollapsed = state === "collapsed"; // Removed

  // Common button class, assuming expanded state
  const buttonBaseClass = "flex items-center w-full justify-start px-3 py-2"; // Example padding

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* START Inventories Collapsible Menu */}
          <Collapsible asChild defaultOpen={false}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild className="w-full group">
                <SidebarMenuButton
                  tooltip="Inventories"
                  className={cn(buttonBaseClass)}
                >
                  <Link href="/inventories" className="flex items-center">
                    <Package className="h-5 w-5 shrink-0 -ml-[1px]" />
                    <span className="ml-3.5 flex-1">Inventories</span>
                  </Link>
                  <ChevronRight className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-1">
                {isLoading && (
                  <div className="pl-7 pr-2 py-1 space-y-1.5">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-[22px] w-full rounded" />
                    ))}
                  </div>
                )}
                {error && (
                  <div className="text-xs text-destructive px-4 py-2 text-center pl-7">
                    Error loading inventories
                  </div>
                )}
                {!isLoading &&
                  !error &&
                  (!inventories || inventories.length === 0) && (
                    <div className="text-xs text-muted-foreground px-4 py-2 text-center pl-7">
                      No inventories found
                    </div>
                  )}
                {!isLoading &&
                  !error &&
                  inventories &&
                  inventories.length > 0 && (
                    <SidebarMenuSub className="pl-5">
                      {inventories.map((sub) => (
                        <SidebarMenuSubItem key={sub.id} className="px-2">
                          <SidebarMenuSubButton
                            asChild
                            className="text-sm h-8 rounded-md"
                          >
                            <Link href={`/inventories/${sub.id}`}>
                              <span className="truncate">{sub.name}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {/* END Inventories Collapsible Menu */}

          {/* START Other Menu Items */}
          {applicationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title} // Tooltip still useful if sidebar can collapse at a higher level
                className={cn(buttonBaseClass)}
              >
                <Link href={item.url} className="w-full flex items-center">
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className="ml-2">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {/* END Other Menu Items */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
