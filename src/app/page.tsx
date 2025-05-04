"use client";

import React from "react";
import HeroSection from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";

export default function HomePage() {
  return (
    <main>
      {/* Hero Section (keep as is from previous version) */}
      <HeroSection />

      {/* Fading Separator (keep as is) */}
      <div className="mx-auto my-12 h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-border to-transparent dark:via-border" />

      {/* Features Section */}
      <FeaturesSection />

      {/* Add other sections like Call to Action, Footer etc. here */}
    </main>
  );
}
