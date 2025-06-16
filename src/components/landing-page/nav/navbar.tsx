"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "./logo"; // Assuming Logo is in the same directory
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle"; // Ensure correct path
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react"; // For mobile menu
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Placeholder for nav items to make mobile menu easier
  const navItems = [
    { href: "#features", label: "Features" },
    {
      href: "https://github.com/kcybe/serium",
      label: "GitHub",
      external: true,
    },
    // Add more if needed, e.g., "Pricing", "Docs"
  ];

  // Render a basic non-interactive navbar structure until mounted to avoid hydration issues
  // and provide a consistent height for layout.
  if (!mounted) {
    return (
      <nav className="fixed z-50 top-0 inset-x-0 h-16 md:top-6 md:inset-x-6 md:h-16 bg-transparent md:max-w-screen-xl md:mx-auto md:rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="w-24 h-8 bg-muted rounded-md animate-pulse"></Skeleton>{" "}
          {/* Logo Placeholder */}
          <div className="flex items-center gap-2">
            <Skeleton className="w-9 h-9 rounded-full bg-muted animate-pulse"></Skeleton>{" "}
            {/* Theme Toggle Placeholder */}
            <Skeleton className="w-20 h-9 rounded-full bg-muted animate-pulse hidden sm:block"></Skeleton>{" "}
            {/* Sign In Placeholder */}
            <Skeleton className="w-28 h-9 rounded-full bg-primary/50 animate-pulse"></Skeleton>{" "}
            {/* Get Started Placeholder */}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav
      className={cn(
        "fixed z-50 top-0 inset-x-0 h-16 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 border-b border-border/50 shadow-sm backdrop-blur-lg" // Scrolled state
          : "bg-transparent md:top-6 md:inset-x-6 md:max-w-screen-xl md:mx-auto md:rounded-full md:border md:border-border/30 md:bg-background/70 md:backdrop-blur-lg" // Initial state (transparent on top, then styled for md+)
      )}
    >
      <div className="h-full flex items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <Logo className="shrink-0 h-24 w-auto" />{" "}
          {/* Adjust size as needed */}
        </Link>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              size="sm"
              asChild
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Link
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
              >
                {item.label}
              </Link>
            </Button>
          ))}
          <ThemeToggle />
          <Button variant="outline" size="sm" className="rounded-full" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="sm" className="rounded-full" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg border-t border-border/50 p-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start"
              asChild
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Link
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : ""}
              >
                {item.label}
              </Link>
            </Button>
          ))}
          <Separator />
          <Button
            variant="outline"
            className="w-full rounded-full"
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button
            className="w-full rounded-full"
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
