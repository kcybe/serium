"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed z-50 top-6 inset-x-6 h-16 bg-background/70 border dark:border-slate-700/70 backdrop-blur-lg max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Link href={"/"}>
            <Logo className="shrink-0" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full" />{" "}
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

  return (
    <nav className="fixed z-50 top-6 inset-x-6 h-16 bg-background/70 border dark:border-slate-700/70 backdrop-blur-lg max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Link
          href={"/"}
          className="flex items-center gap-2 md:gap-6 hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out"
        >
          <Logo className="shrink-0" />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />

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
