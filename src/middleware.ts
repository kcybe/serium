import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request, {
        // Optionally pass config if cookie name, prefix or useSecureCookies option is customized in auth config.
		cookieName: "session_token",
		cookiePrefix: "better-auth",
		useSecureCookies: true,
    });
 
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
 
	return NextResponse.next();
}
 
// Define which routes require authentication
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inventory/:path*",
    "/history/:path*",
    "/settings/:path*",
    // Add any other protected routes here
  ],
};