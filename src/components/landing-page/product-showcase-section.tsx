import { BlurFade } from "@/components/animations/blur-fade";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function ProductShowcaseSection() {
  const [showcaseImage, setShowcaseImage] = useState("/showcase.png");
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const effectiveTheme = theme === "system" ? resolvedTheme : theme;

    if (effectiveTheme === "dark") {
      setShowcaseImage("/showcase-dark.png");
    } else {
      setShowcaseImage("/showcase.png");
    }
  }, [theme, resolvedTheme]);

  return (
    <section id="product-showcase" className="bg-background">
      <div className="z-0 mx-auto w-full px-6 text-center border-t border-muted">
        <BlurFade delay={0.25 * 3}>
          <div className="flex bg-card justify-center items-center max-w-[1200px] w-full rounded-2xl mx-auto">
            <Image
              src={showcaseImage}
              alt="Serium Showcase"
              width={1200}
              height={650}
              loading="eager"
              className="-mt-[300px] border-2 border-primary relative max-w-full max-h-full block rounded-xl z-50"
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
