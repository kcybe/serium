import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAuthenticatedUserServer() {
  const session = await auth.api.getSession({ headers: headers() });

  if (!session?.user?.email) return null;

  return session.user;
}
