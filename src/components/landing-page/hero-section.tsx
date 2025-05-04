import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <section>
        <div className="pb-24 pt-16 md:pb-32 lg:pb-48 lg:pt-24">
          <div className="relative mx-auto flex max-w-7xl flex-col px-6 lg:block">
            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
              <h1 className="mt-0 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-0 xl:text-7xl">
                Track Smarter with Serium
              </h1>
              <p className="mt-6 max-w-2xl text-pretty text-lg text-muted-foreground lg:mt-8">
                Serium is the modern inventory management tool that makes
                tracking equipment, tools, and assets effortless — so your team
                can stay organized and move faster.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                <Button asChild size="lg" className="px-5 text-base">
                  <Link href="/inventory">
                    <span className="text-nowrap">Get started</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="px-5 text-base"
                >
                  <Link href="#features">
                    <span className="text-nowrap">Explore Features</span>
                  </Link>
                </Button>
              </div>
            </div>
            {/* Using the fixed image positioning from the user's last code */}
            <img
              className="-z-10 pointer-events-none order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-96 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
              src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
              alt="Abstract Object"
              height="4000"
              width="3000"
            />
          </div>
        </div>
      </section>
    </>
  );
}
