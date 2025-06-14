"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchItems } from "@/hooks/inventories";
import { SearchResultItem } from "./search-result-item";
import { SearchResultsSkeleton } from "./search-results-skeleton";
import { FileSearch, SearchX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchState = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="text-center py-16 px-6 bg-muted/50 rounded-lg border border-dashed">
    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-background">
      {icon}
    </div>
    <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
    <p className="mt-1 text-sm text-muted-foreground">{description}</p>
  </div>
);

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  const { data: items, isLoading } = useSearchItems(debouncedQuery);
  const hasResults = Array.isArray(items) && items.length > 0;
  const showEmptyState = debouncedQuery && !hasResults && !isLoading;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* 1. Page Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Global Item Search
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find any item across all of your inventories in one place.
        </p>
      </header>

      {/* 2. Search Input */}
      <div className="relative mb-8">
        <Input
          placeholder="Search by name, serial number, description, or tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 text-lg pl-10"
        />
        <FileSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      </div>

      {/* 3. Results Area with State Handling */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoading ? "loading" : hasResults ? "results" : "state"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {isLoading ? (
            <SearchResultsSkeleton />
          ) : showEmptyState ? (
            <SearchState
              icon={<SearchX className="h-8 w-8 text-muted-foreground" />}
              title="No Results Found"
              description={`Your search for "${debouncedQuery}" did not return any results.`}
            />
          ) : hasResults ? (
            <div className="space-y-4">
              {items.map((item) => (
                <SearchResultItem key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <SearchState
              icon={<FileSearch className="h-8 w-8 text-muted-foreground" />}
              title="Search Your Inventories"
              description="Enter a query above to find items by name, serial number, and more."
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
