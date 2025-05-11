import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed z-50 top-6 inset-x-6 h-16 bg-background/70 border dark:border-slate-700/70 backdrop-blur-lg max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2 md:gap-6 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out">
          <Link href={"/"}>
            <Logo className="shrink-0" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full"
            asChild
          >
            <Link href={"/sign-in"}>Sign In</Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href={"/sign-up"}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
