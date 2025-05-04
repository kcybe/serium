import React from "react";
import { ThemeToggle } from "./theme-toggle";
import UserDetails from "./user-details";
import Link from "next/link";
import { Button } from "../ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Navbar() {
  // Check if the user is authenticated on the server side
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="flex items-center justify-between p-4 bg-white/50 dark:bg-black/50 backdrop-blur-3xl shadow-sm sticky top-0 left-0 right-0 z-50">
      <Link href="/" className="flex items-center">
        <h1>SERIUM</h1>
      </Link>
      <div className="flex items-center gap-4">
        {/* If the user is authenticated, show their details and sign out button */}
        {session?.user ? (
          <UserDetails />
        ) : (
          // If not authenticated, show the sign-in button
          <Button>
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
