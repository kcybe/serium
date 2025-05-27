"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchItems } from "@/hooks/inventory";
import { ItemSearchResult } from "@/types/index";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  const { data: items, isLoading } = useSearchItems(debouncedQuery);
  const hasResults = Array.isArray(items) && items.length > 0;

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Search Items</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search by item name or serial number"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="placeholder-gray-400"
          />

          {isLoading && <p className="text-sm text-muted">Loading...</p>}

          {!isLoading && debouncedQuery && !hasResults && (
            <p className="text-sm text-muted">No items found.</p>
          )}

          {hasResults && (
            <Accordion type="single" collapsible className="w-full space-y-2">
              {items!.map((item: ItemSearchResult) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>
                    <div className="text-left">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Serial: {item.serialNumber} • Inventory:{" "}
                        {item.inventory.name}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-sm text-gray-600 space-y-1 pt-2">
                      {item.description && (
                        <p>Description: {item.description}</p>
                      )}
                      <p>Status: {item.status}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>
                        Created: {new Date(item.createdAt).toLocaleString()}
                      </p>
                      {item.lastVerified && (
                        <p>
                          Last Verified:{" "}
                          {new Date(item.lastVerified).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
