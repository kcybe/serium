import { BlurFade } from "@/components/animations/blur-fade";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <BlurFade delay={0.25} inView>
      {children}
    </BlurFade>
  );
}
