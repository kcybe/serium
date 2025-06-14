import { FileSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you use shadcn/ui Button

interface NotFoundDisplayProps {
  resourceName?: string;
  message?: string;
  showGoBackButton?: boolean;
  goBackPath?: string;
  goBackText?: string;
}

export function NotFoundDisplay({
  resourceName = "resource",
  message,
  showGoBackButton = true,
  goBackPath = "/",
  goBackText = "Go to Homepage",
}: NotFoundDisplayProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 h-full">
      <FileSearch className="w-16 h-16 text-muted-foreground" />
      <h2 className="text-2xl font-semibold">
        {resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} Not Found
      </h2>
      <p className="text-muted-foreground">
        {message ||
          `The ${resourceName} you are looking for could not be found or does not exist.`}
      </p>
      {showGoBackButton && (
        <Button asChild variant="outline">
          <Link href={goBackPath}>{goBackText}</Link>
        </Button>
      )}
    </div>
  );
}
