"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import UserDetails from "./user-details";
import { ThemeToggle } from "@/components/theme-toggle";
import SidebarLogo from "./sidebar-logo";
import SidebarItems from "./sidebar-items";

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarItems />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu className="flex flex-row items-center justify-between p-2">
          <UserDetails />
          <ThemeToggle className="p-4" />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
