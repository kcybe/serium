"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useImportAllInventories } from "@/hooks/inventory/use-import-all";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export default function AllInventoriesImportForm({ setIsOpen }: Props) {
  const [importFile, setImportFile] = useState<File | null>(null);
  const { mutate: importAll, isPending: isImporting } =
    useImportAllInventories();
  const router = useRouter();

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      if (
        files[0].type !== "application/json" &&
        files[0].type !== "text/csv"
      ) {
        toast.error("Invalid file type. Please upload a JSON or CSV file.");
        return;
      }
      setImportFile(files[0]);
    }
  };

  const handleImport = () => {
    if (!importFile) {
      toast.error("Please select a file to import.");
      return;
    }

    importAll(importFile, {
      onSuccess: (data) => {
        toast.success("Import successful!", {
          description: data.message,
        });
        setIsOpen(false);
        router.refresh(); // Or use the hook's onSuccess invalidation
      },
      onError: (error) => {
        toast.error("Import Failed", { description: error.message });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <FileUpload onChange={handleFileChange} maxFiles={1} />
      <Button
        className="w-full"
        onClick={handleImport}
        disabled={!importFile || isImporting}
      >
        {isImporting ? "Importing..." : "Start Full Import"}
      </Button>
    </div>
  );
}
