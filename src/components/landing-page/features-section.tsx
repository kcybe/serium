import { Activity, ScanBarcode, BarChartBig } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function FeaturesSection() {
  return (
    <>
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-balance sm:text-5xl">
              Key Features
            </h2>
            <p className="mt-4 text-lg text-pretty text-muted-foreground md:text-xl lg:mx-auto lg:max-w-3xl">
              Discover the powerful features that make Serium the best inventory
              manager for your team.
            </p>
          </div>

          {/* Feature Grid using Shadcn Cards with Glowing Blobs */}
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {/* --- Feature 1 --- */}
            {/* Relative container for positioning the blob */}
            <div className="relative">
              {/* The Blob */}
              <div
                aria-hidden="true" // Hide from screen readers
                className="absolute -inset-2 -z-10 rounded-full bg-gradient-to-br from-primary/20 to-blue-400/10 opacity-60 blur-3xl pointer-events-none"
                // Adjust -inset-X to control how much the blob extends
                // Adjust opacity-XX to control intensity
                // Adjust blur-XXxl for glow softness
                // Adjust gradient colors (from-primary/20, to-blue-400/10 etc.)
              />
              {/* The Card (ensure it has a background color to sit above the blob) */}
              <Card className="text-center h-full">
                {" "}
                {/* Added h-full for consistent height if needed */}
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Activity className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-balance">
                    Real-Time Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-pretty text-muted-foreground">
                    Keep track of your equipment and assets in real time,
                    ensuring your team always knows what’s available.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* --- Feature 2 --- */}
            <div className="relative">
              {/* The Blob - different gradient */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-cyan-400/10 via-primary/15 to-green-400/10 opacity-50 blur-3xl pointer-events-none"
              />
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ScanBarcode className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-balance">
                    Easy Barcode Scanning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-pretty text-muted-foreground">
                    Scan barcodes effortlessly using our mobile app to quickly
                    log items and update inventory status on the go.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* --- Feature 3 --- */}
            <div className="relative">
              {/* The Blob - another gradient variation */}
              <div
                aria-hidden="true"
                className="absolute -inset-1 -z-10 rounded-full bg-gradient-to-br from-violet-500/15 to-primary/15 opacity-60 blur-3xl pointer-events-none"
              />
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BarChartBig className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-balance">
                    Detailed Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-pretty text-muted-foreground">
                    Generate insightful reports to understand inventory
                    turnover, asset usage, and maintenance schedules.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
