"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SignOutButton from "./sign-out-btn";
import Link from "next/link";
import { LogIn, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export default function UserDetails() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenuItem>
      {!user ? (
        <SidebarMenuButton
          asChild
          tooltip="Sign In"
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center" : "justify-start"
          )}
        >
          <Button variant={"outline"} className="w-full justify-start">
            <LogIn className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
            {!isCollapsed && <Link href="/sign-in">Sign In</Link>}
          </Button>
        </SidebarMenuButton>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-gray-100 dark:hover:bg-gray-100/25"
            asChild
          >
            <button
              className={cn(
                "flex w-full items-center rounded-md p-2 outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isCollapsed ? "justify-center" : "justify-start gap-3"
              )}
            >
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage
                  src={
                    "https://avatar.vercel.sh/" +
                    session?.user.email +
                    "?rounded=60?size=32"
                  }
                  alt={user?.name}
                />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() ||
                    user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="hidden md:flex flex-col text-left">
                  <p className="text-sm font-medium leading-none">
                    {user?.name}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-2 p-4">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2">
                <User size={16} />
                <span>Your Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarMenuItem>
  );
}
