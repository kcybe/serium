import { Metadata } from "next";
import ActivitiesPageClient from "./_components/activities-page-client";

export const metadata: Metadata = {
  title: "Activities | Serium",
  description: "Track all activity across your inventories in real-time.",
};

export default function ActivitiesPage() {
  return <ActivitiesPageClient />;
}
