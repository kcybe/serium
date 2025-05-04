"use client";

import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    <Button
      variant={"destructive"}
      size={"sm"}
      className="w-full"
      onClick={handleSignOut}
      disabled={isLoading} // Disable button while signing out
      // Remove asChild if Button doesn't require it for text children
      // Remove isLoading prop if the Button doesn't use it internally
      // when children are manually changed based on loading state.
    >
      {isLoading ? "Signing out..." : "Sign out"}
    </Button>
  );
}
