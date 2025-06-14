import { Metadata } from "next";
import ChangePasswordPageClient from "./_components/change-password-page-client";

export const metadata: Metadata = {
  title: "Change Password | Serium",
  description: "Change your account password.",
};

export default function ChangePasswordPage() {
  return <ChangePasswordPageClient />;
}
