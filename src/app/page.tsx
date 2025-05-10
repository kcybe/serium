"use client";

import React from "react";
import { HeroSection } from "@/components/landing-page/hero-section";
import FeaturesSection from "@/components/landing-page/features-section";
import { Navbar } from "@/components/landing-page/nav/navbar";

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

          {/* Features Section */}
          <FeaturesSection />

          {/* Add other sections like Call to Action, Footer etc. here */}
        </div>
      </main>
    </>
  );
}
