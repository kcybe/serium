import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/animations/blur-fade";
import { DownloadCloud, Github } from "lucide-react";

export default function CtaSection() {
  return (
    <section
      id="cta"
      className="py-16 md:py-24 bg-muted/40 dark:bg-muted/20 rounded-2xl"
    >
      <div className="mx-auto max-w-4xl px-6 text-center">
        <BlurFade delay={0.25} inView>
          <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Take Control with Serium: Free & Open Source
          </h2>
          <p className="mt-6 text-lg text-pretty text-muted-foreground">
            Serium is a community-driven, offline-first inventory solution.
            Download it for free, explore the code, or contribute to its
            development. Your data, your rules.
          </p>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link
                href="/download-placeholder"
                className="flex items-center gap-2"
              >
                {" "}
                {/* Replace with actual download link */}
                <DownloadCloud className="w-5 h-5" /> Download Serium
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link
                href="https://github.com/kcybe/serium"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Github className="w-5 h-5" /> Contribute on GitHub
              </Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
