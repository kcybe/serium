import { BlurFade } from "@/components/animations/blur-fade";
import { Card } from "@/components/ui/card";
import { Safari } from "../safari";
import { GlowEffect } from "../glow-effect";
import { Badge } from "../ui/badge";
import { Container, Lock, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ProductShowcaseSection() {
  const [showcaseImage, setShowcaseImage] = useState("/showcase.png");
  const theme = useTheme().theme;

  useEffect(() => {
    if (theme === "dark") {
      setShowcaseImage("/showcase-dark.png");
    } else {
      setShowcaseImage("/showcase.png");
    }
  }, [theme]);

  return (
    <section id="product-showcase" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <BlurFade delay={0.25} inView>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Badge className="mt-4">
              <Container className="mr-2 w-3 h-3" />
              <span>Self-Contained</span>
            </Badge>
            <Badge className="mt-4">
              <WifiOff className="mr-2 w-3 h-3" />
              <span>Offline First</span>
            </Badge>
            <Badge className="mt-4">
              <Lock className="mr-2 w-3 h-3" />
              <span>Data Privacy</span>
            </Badge>
          </div>
          <h2 className="text-4xl font-bold text-balance sm:text-5xl">
            Visualize Your Self-Contained Inventory Hub
          </h2>

          <p className="mt-4 text-lg text-pretty text-muted-foreground md:text-xl lg:mx-auto lg:max-w-3xl">
            Look at the clear and simple interface of Serium. It is made to be
            clear and efficient, and it runs completely locally on your
            computer—no external servers, just offline power and data privacy.
          </p>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <Card className="mt-12 relative">
            <GlowEffect
              colors={["#0894FF", "#4A47FF", "#8A2BE2"]}
              mode="colorShift"
              blur="stronger"
              scale={1}
              className="opacity-50 absolute inset-0 z-0"
            />
            <Safari
              url="serium.noamyu.dev"
              src={showcaseImage}
              className="relative size-full z-10"
            />
          </Card>
        </BlurFade>
      </div>
    </section>
  );
}
