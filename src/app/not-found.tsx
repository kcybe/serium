import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
      <FileSearch className="w-24 h-24 text-primary mb-6" strokeWidth={1.5} />
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-3">Page Not Found</h2>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <div className="flex space-x-4">
        <Button asChild variant="default" size="lg">
          <Link href="/">Go to Homepage</Link>
        </Button>
      </div>
      <p className="mt-12 text-sm text-muted-foreground">
        If you believe this is an error, please let us know.
      </p>
    </div>
  );
}
