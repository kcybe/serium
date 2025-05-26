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
import { useVerifyItem } from "@/hooks/use-inventory";
import { toast } from "sonner";

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
        <div className="space-y-4">
          <div className="flex justify-center items-center h-64 bg-gray-100 rounded-xl border border-gray-200">
            <div className="transition-all duration-300 transform scale-100 flex flex-col items-center justify-center">
              {verificationState === "success" && (
                <Check className="h-32 w-32 text-green-500 animate-shake" />
              )}
              {verificationState === "error" && (
                <X className="h-32 w-32 text-red-500 animate-shake" />
              )}
              {verificationState === "idle" && (
                <div className="flex flex-col items-center text-gray-400 animate-pulse">
                  <Search className="h-16 w-16" />
                  <span className="mt-2 text-sm">Waiting for input...</span>
                </div>
              )}
            </div>
          </div>
          <div className="relative">
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
