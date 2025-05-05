"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import UserDetails from "./user-details";
import { ThemeToggle } from "./theme-toggle";
import SidebarLogo from "./sidebar-logo";
import SidebarItems from "./sidebar-items";

// Menu items.

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarItems />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <ThemeToggle />
          <UserDetails />
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
