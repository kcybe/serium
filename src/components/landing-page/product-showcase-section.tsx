import Image from "next/image";
import { BlurFade } from "@/components/animations/blur-fade";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductShowcaseSection() {
  return (
    <section id="product-showcase" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <BlurFade delay={0.25} inView>
          <h2 className="text-4xl font-bold text-balance sm:text-5xl">
            Visualize Your Self-Contained Inventory Hub
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground md:text-xl lg:mx-auto lg:max-w-3xl">
            Take a look at Serium&apos;s clean and focused interface. Designed
            for clarity and efficiency, it operates entirely on your local
            machine—no external servers, just pure offline power and data
            privacy.
          </p>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-12">
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
              <CardContent className="p-0">
                <Image
                  src="/showcase.png"
                  alt="Serium Product Showcase"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-auto"
                />
              </CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
