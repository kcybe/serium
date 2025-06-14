"use client";

import React from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
      // Sign out likely redirects or unmounts the component.
      // Resetting state might not be strictly necessary if successful,
      // but it's safer in case of errors or unexpected behavior.
    } catch (error) {
      console.error("Sign out failed:", error);
      // TODO: Optionally add user feedback (e.g., toast notification)
    } finally {
      // Ensure loading state is always reset, even if the component
      // might unmount upon successful sign-out.
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleSignOut}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-sm text-red-500 rounded-3xl",
        "hover:bg-red-500/10 focus:bg-red-500/10",
        isLoading && "opacity-50 pointer-events-none"
      )}
    >
      <LogOut size={16} />
      {isLoading ? "Signing out..." : "Sign out"}
    </div>
  );
}
