import { ReactNode } from "react";
import { Navbar } from "@/components/landing-page/nav/navbar"; // Adjust path
import FooterSection from "@/components/landing-page/footer-section"; // Adjust path

export default function LegalPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto p-16 sm:pt-24 md:pt-28">
        {children}
      </main>
      <FooterSection />
    </div>
  );
}
