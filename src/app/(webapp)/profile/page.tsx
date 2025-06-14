import ProfilePageClient from "./_components/profile-page-client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Serium",
  description: "View and manage your Serium profile information.",
};

export default function ProfilePage() {
  return <ProfilePageClient />;
}
