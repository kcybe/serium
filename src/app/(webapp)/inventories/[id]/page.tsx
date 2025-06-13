import InventoryPageClient from "./_components/inventory-page-client";
import { Metadata } from "next";
import { getInventoryName } from "@/lib/inventory-server-helper"; // optional for dynamic metadata

type Props = {
  params: { id: string };
};

// Optional: fetch inventory name for dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = await getInventoryName(params.id); // You write this fn to fetch name by ID
  return {
    title: `${name ?? "Inventory"} | Serium`,
    description: `View and manage items inside the "${
      name ?? "Inventory"
    }" collection.`,
  };
}

export default function InventoryPage({ params }: Props) {
  return <InventoryPageClient id={params.id} />;
}
