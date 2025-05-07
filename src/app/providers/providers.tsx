"use client";

import React, { ReactNode, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({
  children,
  defaultSidebarOpen,
}: {
  children: ReactNode;
  defaultSidebarOpen: boolean;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={defaultSidebarOpen}>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
