import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Check, X } from "lucide-react";
import { useRef, useState } from "react";
import { useVerifyItem } from "@/hooks/inventory";
import { toast } from "sonner";
import { DotPattern } from "@/components/animations/dot-pattern";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/animations/blur-fade";

interface VerifyItemModalProps {
  inventoryId: string;
}

export function VerifyItemModal({ inventoryId }: VerifyItemModalProps) {
  const [open, setOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [verificationState, setVerificationState] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const verifyItem = useVerifyItem();

  const handleVerify = async () => {
    if (!serialNumber) return;

    try {
      setIsLoading(true);
      const result = await verifyItem.mutateAsync({
        inventoryId,
        itemSerialNumber: serialNumber,
      });

      if (result.exists) {
        setVerificationState("success");
        toast.success("Item Verified", {
          description: `Item ${serialNumber} was successfully verified.`,
        });
        setIsLoading(false);
      } else {
        setVerificationState("error");
        toast.error("Item Not Found", {
          description: `No item with serial number ${serialNumber} was found.`,
        });
        setIsLoading(false);
      }

      // Reset state after animation
      setTimeout(() => {
        setVerificationState("idle");
        setSerialNumber("");
        inputRef.current?.focus();
        setIsLoading(false);
      }, 1800);
    } catch (error) {
      setVerificationState("error");

      toast.error("Verification Failed", {
        description: `Something went wrong. ${error}`,
      });

      setTimeout(() => {
        setVerificationState("idle");
        inputRef.current?.focus();
        setIsLoading(false);
      }, 1800);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Verify Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Item</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 relative overflow-hidden p-1">
          <div className="flex justify-center items-center h-64 bg-background rounded-xl border relative overflow-hidden">
            {/* DotPattern in the background */}
            <DotPattern
              glow={true}
              className={cn(
                "absolute inset-0 z-0 [mask-image:radial-gradient(150px_circle_at_center,white,transparent)]"
              )}
            />

            {/* Foreground content */}
            <div className="z-10 transition-all duration-300 transform scale-100 flex flex-col items-center justify-center">
              {verificationState === "success" && (
                <BlurFade delay={0.25}>
                  <Check className="h-32 w-32 text-green-500 animate-shake" />
                </BlurFade>
              )}
              {verificationState === "error" && (
                <BlurFade>
                  <X className="h-32 w-32 text-red-500 animate-shake" />
                </BlurFade>
              )}
              {verificationState === "idle" && (
                <BlurFade>
                  <div className="flex flex-col items-center text-gray-500 animate-pulse">
                    <Search className="h-16 w-16" />
                    <span className="mt-2 text-sm">Waiting for input...</span>
                  </div>
                </BlurFade>
              )}
            </div>
          </div>
          <div>
            <Input
              ref={inputRef}
              placeholder="Enter serial number..."
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleVerify();
                }
              }}
            />
          </div>
          <Button
            onClick={handleVerify}
            className="w-full"
            disabled={
              !serialNumber || verificationState !== "idle" || isLoading
            }
          >
            Verify
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
