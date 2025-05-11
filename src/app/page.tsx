"use client";

import React from "react";
import { HeroSection } from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import ProductShowcaseSection from "@/components/landing-page/product-showcase-section";
import CtaSection from "@/components/landing-page/cta-section";
import FooterSection from "@/components/landing-page/footer-section";
import { Navbar } from "@/components/landing-page/nav/navbar";
import { BlurFade } from "@/components/animations/blur-fade";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col mt-8 items-center w-full">
        <div className="w-full max-w-7xl">
          {/* Hero Section (keep as is from previous version) */}
          <HeroSection />

          {/* Fading Separator (keep as is) */}
          <div className="mx-auto my-12 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent dark:via-border" />

          {/* Product Showcase Section */}
          <BlurFade delay={0.25} inView>
            <ProductShowcaseSection />
          </BlurFade>

          {/* Separator */}
          <div className="mx-auto my-12 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent dark:via-border" />

          {/* Features Section */}
          <BlurFade delay={0.25} inView>
            <FeaturesSection />
          </BlurFade>

          {/* Separator */}
          <div className="mx-auto my-12 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent dark:via-border" />

          {/* Call to Action Section */}
          {/* CTA has its own background, so BlurFade might not be needed directly on it, or applied internally if desired */}
          <CtaSection />

          <FooterSection />
        </div>
      </main>
    </>
  );
}
