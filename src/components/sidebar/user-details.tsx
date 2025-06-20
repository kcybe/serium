"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogIn, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SignOutButton from "./sign-out-btn";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export default function UserDetails() {
  const { data: session, isPending: isLoadingSession } =
    authClient.useSession();
  const user = session?.user;
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (isLoadingSession) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className={cn(isCollapsed ? "p-2" : "p-2 w-full")} // Adjust padding for collapsed state
            disabled // Skeletons are often non-interactive
          >
            <Skeleton className="p-4 h-8 w-8 rounded-lg" />{" "}
            {/* Avatar Skeleton */}
            {!isCollapsed && (
              <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <Skeleton className="h-4 w-16 mb-1" /> {/* Name Skeleton */}
                <Skeleton className="h-3 w-24" /> {/* Email Skeleton */}
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="Sign In"
            className={cn(
              "flex items-center", // Removed justify-start as Button's own class handles it
              isCollapsed ? "justify-center" : ""
            )}
          >
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-sm p-2" // Ensure consistent padding
            >
              <Link href="/sign-in" className="flex items-center w-full">
                <LogIn
                  className={cn("h-5 w-5 shrink-0", !isCollapsed && "mr-2")}
                />{" "}
                {/* Added shrink-0 */}
                {!isCollapsed && <span>Sign In</span>}
              </Link>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${user.email}?rounded=60?size=32`}
                  alt={user.name || user.email || "User"}
                />
                <AvatarFallback className="rounded-lg">
                  {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${user.email}?rounded=60?size=32`}
                    alt={user.name || "User"}
                  />
                  <AvatarFallback className="rounded-lg">
                    {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Your Profile</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
