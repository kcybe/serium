"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

function ToggleSkeleton() {
  return (
    <div className="flex p-4 h-9 w-9 items-center justify-center rounded-full animate-pulse bg-muted" />
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ToggleSkeleton />; // Or return null; or a div with fixed size
  }

  const currentEffectiveTheme = theme === "system" ? resolvedTheme : theme;

  const nextThemeToSet = currentEffectiveTheme === "dark" ? "light" : "dark";

  const isCurrentlyDark = currentEffectiveTheme === "dark";

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full flex items-center justify-center", // Explicit square dimensions and full roundness
              className
            )}
            onClick={() => setTheme(nextThemeToSet)}
          >
            {isCurrentlyDark ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {nextThemeToSet} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
