import EditProfilePageClient from "./_components/edit-profile-page-client";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | Serium",
  description: "Edit your account profile.",
};

export default async function EditProfilePage() {
  const user = await getAuthenticatedUserServer();

  return (
    <EditProfilePageClient
      initialData={{
        name: user?.name || "",
        bio: user?.bio || "",
        email: user?.email || "",
      }}
    />
  );
}
