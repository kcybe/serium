import Link from "next/link";
import { AnimatedLogo } from "../ui/animated-logo";
import { NavItems } from "./components/nav-items";
import { MobileNav } from "./components/mobile-nav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Button } from "../ui/button";
import Profile from "./components/Profile";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="sticky top-0 z-50 flex justify-center">
      <nav className="border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full p-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex space-x-2">
            <AnimatedLogo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <NavItems />
                <Profile username={user?.username} email={user?.email} />
              </>
            ) : (
              <Link href="/sign-up">
                <Button variant={"default"}>Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>
    </div>
  );
}
