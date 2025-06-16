import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

const PUBLIC_ROUTES = [
  "/",
  "/sign-in",
  "/sign-up",
  "/privacy",
  "/terms",
] as const;
const DEFAULT_AUTH_REDIRECT = "/dashboard";
const DEFAULT_UNAUTH_REDIRECT = "/sign-in";

export default async function authMiddleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(
    path as (typeof PUBLIC_ROUTES)[number]
  );

  const baseURL = process.env.BETTER_AUTH_URL;

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Handle unauthenticated users
  if (!session) {
    return isPublicRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL(DEFAULT_UNAUTH_REDIRECT, request.url));
  }

  // Handle authenticated users on public routes
  if (isPublicRoute && path !== "/") {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
