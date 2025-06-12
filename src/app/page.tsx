"use client";

import React from "react";
import { HeroSection } from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import ProductShowcaseSection from "@/components/landing-page/product-showcase-section";
import CtaSection from "@/components/landing-page/cta-section";
import FooterSection from "@/components/landing-page/footer-section";
import { Navbar } from "@/components/landing-page/nav/navbar";

export default function HomePage() {
  return (
    <div className="flex flex-col mt-16 md:-mt-4 items-center w-full bg-background">
      <Navbar />
      <main className="w-full">
        <HeroSection />
        {/* The Product Showcase has its own distinct background, creating natural separation */}
        <ProductShowcaseSection />
        {/* The Features section can sit on the default background */}
        <FeaturesSection />
        {/* The CTA has its own distinct background */}
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
