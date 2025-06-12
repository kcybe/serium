"use client";

import { Button } from "@/components/ui/button";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export default function ItemExportForm({ setIsOpen }: Props) {
  const handleExport = (format: "csv" | "json") => {
    window.location.href = `/api/inventories/export-all?format=${format}`;
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 py-4">
      <Button onClick={() => handleExport("csv")} className="flex-1">
        Export as CSV
      </Button>
      <Button
        onClick={() => handleExport("json")}
        className="flex-1"
        variant="secondary"
      >
        Export as JSON
      </Button>
    </div>
  );
}
