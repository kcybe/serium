import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // from lucide icons

export default function LoadingButton({
  pending,
  children,
  onClick,
  span,
  variant = "default",
}: {
  pending: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  span: string;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive"; // Shadcn variants
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className="w-full"
      variant={variant}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-muted-foreground" />
          <span>{span}...</span>
        </>
      ) : (
        children
      )}
    </Button>
  );
}
