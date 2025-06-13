import { Metadata } from "next";
import SearchPageClient from "./_components/search-page-client";

export const metadata: Metadata = {
  title: "Search | Serium",
  description:
    "Search across all your inventories by name, serial number, or tags.",
};

export default function SearchPage() {
  return <SearchPageClient />;
}
