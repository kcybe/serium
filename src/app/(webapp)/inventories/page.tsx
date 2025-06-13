import InventoryPageClient from "./_components/inventories-page-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventories | Serium",
  description: "Monitor and manage your inventory with comprehensive analytics",
};

export default function InventoryPage() {
  return <InventoryPageClient />;
}
