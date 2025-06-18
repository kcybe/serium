import { Activity, ScanBarcode, BarChartBig, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlurFade } from "../animations/blur-fade";
import { Card } from "../ui/card";

export default function FeaturesSection() {
  const features = [
    {
      name: "offline-first",
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Offline First & Your Data",
      description:
        "Serium runs locally using Next.js, Prisma, and BetterAuth. No external servers, full privacy, true offline capability.",
    },
    {
      name: "real-time",
      icon: <Activity className="h-6 w-6" />,
      title: "Local Real-Time Tracking",
      description:
        "Track assets locally in real-time. Your data stays on your device, ensuring privacy and speed.",
    },
    {
      name: "barcode-scanning",
      icon: <ScanBarcode className="h-6 w-6" />,
      title: "Barcode Scanning",
      description:
        "Effortlessly scan barcodes with your device to log items and manage inventory status quickly.",
    },
    {
      name: "local-analytics",
      icon: <BarChartBig className="h-6 w-6" />,
      title: "Local Analytics",
      description:
        "Generate insightful reports to understand inventory turnover, asset usage, and maintenance schedules.",
    },
  ];

  return (
    <section id="features" className="bg-background border-muted py-20">
      <div className="mx-auto max-w-7xl px-6">
        <BlurFade delay={0.25} inView>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold sm:text-5xl text-black dark:text-cyan-50">
              Core Principles & Features
            </h2>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Serium is built on transparency and user empowerment. Explore the
              features that make it a reliable, offline-first solution.
            </p>
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <BlurFade delay={0.25 * (idx + 1)} key={idx} inView>
              <Card
                key={idx}
                className={cn(
                  "relative group overflow-hidden rounded-xl bg-card border",
                  "p-6 transition-colors duration-300 hover:border-primary/50"
                )}
              >
                <div className="mb-4 flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
