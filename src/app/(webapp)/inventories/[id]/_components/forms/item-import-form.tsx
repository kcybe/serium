"use client";

import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { useImportItemsToInventory } from "@/hooks/inventories";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  inventoryId: string;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ItemImportForm({ inventoryId, setIsOpen }: Props) {
  const [importFile, setImportFile] = useState<File | null>(null);
  const { mutate: importToInventory, isPending: isImporting } =
    useImportItemsToInventory(inventoryId);
  const router = useRouter();

  const handleFileChange = (files: File[]) => {
    if (files.length > 0) {
      if (
        files[0].type !== "text/csv" &&
        files[0].type !== "application/json"
      ) {
        toast.error("Invalid file type. Please upload a CSV or JSON file.");
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

    importToInventory(importFile, {
      onSuccess: (data) => {
        toast.success(data.message || "Import successful!");
        setIsOpen(false);
        router.refresh();
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
        {isImporting ? "Importing..." : "Start Import"}
      </Button>
    </div>
  );
}
