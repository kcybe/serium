"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import SignOut from "./sign-out";
import { useTranslation } from "@/hooks/use-translation";
import { useSettings } from "@/hooks/use-settings";

interface ProfileProps {
  username?: string | null;
  email?: string | null;
}

export default function Profile({ username, email }: ProfileProps) {
  const settings = useSettings();
  const { t } = useTranslation(settings);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-100/25">
                <Avatar>
          <AvatarImage 
            src={`https://avatar.vercel.sh/${username || email}?size=32`} 
            alt={username || email || "User avatar"} 
          />
          <AvatarFallback>
            {username?.charAt(0).toUpperCase() ||
              email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-2 p-4">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2">
            <User size={16} />
            <span>{t("profile.yourProfile")}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
