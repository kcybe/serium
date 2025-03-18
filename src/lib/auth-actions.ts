"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Server action to handle user sign out
 * Invokes the auth API's signOut method and redirects to home page
 */
export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers()
  });
  
  redirect("/");
}