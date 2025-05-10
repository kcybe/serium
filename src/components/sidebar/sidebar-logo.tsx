"use client";

import React from "react";
import { SidebarMenuButton, useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { Box } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/inbox": "Inbox",
  "/calendar": "Calendar",
  "/search": "Search",
  "/settings": "Settings",
  "/inventories": "Inventories",
  "/sign-in": "Sign In",
  "/sign-up": "Sign Up",
};

export default function SidebarLogo() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Untitled";

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuButton asChild size="lg" tooltip="Home" className="mb-4 w-full">
      <a
        href="/"
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors",
          isCollapsed ? "justify-center" : "justify-start"
        )}
      >
        {/* Logo Icon */}
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Box className="size-4" />
        </div>

        {/* App name - hidden when collapsed */}
        {!isCollapsed && (
          <div className="flex flex-col text-left text-sm leading-tight">
            <span className="font-semibold">Serium</span>
            <span className="text-xs text-muted-foreground">{title}</span>
          </div>
        )}
      </a>
    </SidebarMenuButton>
  );
}
