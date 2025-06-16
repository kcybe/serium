import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BlurFade } from "../animations/blur-fade";

export function HeroSection() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["free", "open-source", "offline-first", "efficient", "simple"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full container mx-auto pb-[250px] overflow-hidden">
      <div className="z-0 flex gap-8 py-20 md:py-40 lg:py-40 items-center justify-center relative flex-col">
        <div className="-z-10 bg-primary w-1/2 lg:w-3/4 max-w-[1200px] h-[450px] rounded-2xl blur-3xl opacity-25 absolute -bottom-[250px]" />
        <BlurFade delay={0.25} inView>
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              <Link href={"#features"} className="flex items-center gap-2">
                Learn why Serium stands out <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </BlurFade>

        <div className="flex gap-4 flex-col">
          <BlurFade delay={0.25 * 1.5} inView>
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tighter text-center font-regular">
              <span className="dark:text-cyan-50">
                Serium <br />
                Inventory Management
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.25 * 2} inView>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl text-center">
              Serium offers robust, offline-first inventory control. It&apos;s
              completely free, open-source, and designed to give you full
              ownership of your data and workflow, perfect for individuals and
              teams who value privacy and flexibility.
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.25 * 2.5} inView>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="gap-2 rounded-full px-8 py-3 text-base"
              asChild
            >
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-8 py-3 text-base"
              asChild
            >
              <Link
                href="https://github.com/kcybe/serium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-1.5" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
