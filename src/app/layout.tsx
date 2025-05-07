import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import Providers from "./providers/providers";
import { cookies } from "next/headers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Serium Inventory Manager",
  description:
    "Serium Inventory Manager is a tool for managing your inventory.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <Providers defaultSidebarOpen={defaultOpen}>
          <div className="flex w-full">
            <AppSidebar />
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
