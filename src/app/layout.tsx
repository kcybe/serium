import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./providers/providers";

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
  title: "Serium – Offline Inventory Manager",
  description:
    "Serium is a privacy-first, offline inventory management tool built for speed, simplicity, and security. Run it locally. Own your data.",
  metadataBase: new URL("https://serium.noamyu.dev"),
  keywords: [
    "inventory manager",
    "offline inventory",
    "local inventory software",
    "self-hosted inventory",
    "data privacy",
    "inventory app",
    "Serium",
  ],
  openGraph: {
    title: "Serium – Offline Inventory Manager",
    description:
      "Serium is a privacy-first inventory manager that works offline. Manage your stock locally, securely, and without third-party servers.",
    url: "https://serium.noamyu.dev",
    siteName: "Serium",
    images: [
      {
        url: "/preview-social.png", // <-- place this in your public folder
        width: 1200,
        height: 630,
        alt: "Serium Inventory Manager interface screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Serium – Offline Inventory Manager",
    description:
      "Run your inventory system locally with Serium. Fast, secure, and offline-first.",
    images: ["/preview-social.png"],
    creator: "@noamyu",
  },
  authors: [{ name: "Noam Yu", url: "https://noamyu.dev" }],
  creator: "Noam Yu",
  themeColor: "#0894FF",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <Providers>
          <div className="flex w-full">
            {children}
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
