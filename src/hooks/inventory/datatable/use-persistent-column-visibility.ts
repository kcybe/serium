import { useEffect, useState } from "react";
import type { VisibilityState } from "@tanstack/react-table";

export function usePersistentColumnVisibility(inventoryId?: string) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (!inventoryId) return;

    const key = `columnVisibility-${inventoryId}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        setColumnVisibility(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid column visibility data", err);
      }
    }

    setHasLoaded(true);
  }, [inventoryId]);

  useEffect(() => {
    if (!inventoryId || !hasLoaded) return;

    const key = `columnVisibility-${inventoryId}`;
    localStorage.setItem(key, JSON.stringify(columnVisibility));
  }, [columnVisibility, inventoryId, hasLoaded]);

  return [columnVisibility, setColumnVisibility] as const;
}
