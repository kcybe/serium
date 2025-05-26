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
  useSidebar,
} from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { Search, Settings, Package, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useInventories } from "@/hooks/inventory";
import Link from "next/link";

const items = [
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function SidebarItems() {
  const { data: inventories, isLoading, error } = useInventories();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* START Inventories Collapsible Menu */}
          <Collapsible asChild defaultOpen={false}>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <div className="group flex w-full">
                  <SidebarMenuButton
                    tooltip="Inventories"
                    className={cn(
                      "flex items-center w-full",
                      isCollapsed ? "justify-center" : "justify-start"
                    )}
                  >
                    <Link href={"/inventories"}>
                      <Package className="h-5 w-5" />
                    </Link>
                    {!isCollapsed && (
                      <>
                        <span className="ml-2">Inventories</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]:rotate-90" />
                      </>
                    )}
                  </SidebarMenuButton>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {/* Loading state */}
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <span>Loading...</span>
                  </div>
                )}
                {/* Error state */}
                {error && (
                  <div className="flex items-center justify-center p-4">
                    <span>Error loading inventories</span>
                  </div>
                )}
                {/* No inventories */}
                {!inventories?.length && (
                  <div className="flex items-center justify-center p-4">
                    <span>No inventories found</span>
                  </div>
                )}
                {/* Inventories list */}
                <SidebarMenuSub>
                  {inventories?.map((sub) => (
                    <SidebarMenuSubItem key={sub.name}>
                      <SidebarMenuSubButton asChild>
                        <a href={`/inventories/${sub.id}`}>
                          <span>{sub.name}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          {/* END Inventories Collapsible Menu */}

          {/* START Other Menu Items */}
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  "flex items-center w-full",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <a href={item.url} className="w-full flex items-center">
                  <item.icon className="h-5 w-5" />
                  {!isCollapsed && <span className="ml-2">{item.title}</span>}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {/* END Other Menu Items */}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
