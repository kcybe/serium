import Link from "next/link";
import { redirect } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Edit3, ShieldCheck, CalendarDays, Mail } from "lucide-react";
import { format } from "date-fns";
import { getAuthenticatedUserServer } from "@/lib/get-authenticated-user-server";

// Helper to format date, handling nulls gracefully
const formatDate = (
  dateInput?: Date | string | null,
  dateFormat: string = "PPP"
) => {
  if (!dateInput) return "N/A";
  try {
    return format(new Date(dateInput), dateFormat);
  } catch (error) {
    console.warn("Invalid date for formatting:", dateInput, error);
    return "Invalid Date";
  }
};

export default async function ProfilePageClient() {
  const user = await getAuthenticatedUserServer();

  if (!user) {
    redirect("/login?callbackUrl=/profile");
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-0">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage
                src={`https://avatar.vercel.sh/${user.email}?rounded=true&size=96`} // Vercel Avatars are great for placeholders
                alt={user.name || user.email || "User"}
              />
              <AvatarFallback className="text-3xl">
                {" "}
                {/* Adjusted for larger avatar */}
                {(user.name?.[0] || user.email?.[0] || "U").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl font-semibold">
                {user.name || "Serium User"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {user.email || "No email provided"}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {user.emailVerified && (
            <div className="flex items-center justify-center">
              <Badge
                variant="default"
                className="bg-green-100 text-green-700 hover:bg-green-200"
              >
                <ShieldCheck className="mr-1.5 h-4 w-4" />
                Email Verified
              </Badge>
            </div>
          )}

          <div className="text-center">
            {" "}
            {/* Placeholder for Bio */}
            <p className="text-sm text-muted-foreground italic">
              {user.bio ? `“${user.bio}”` : "User has not set a bio yet."}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Email Address</p>
                <p className="text-muted-foreground">{user.email || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CalendarDays className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Joined Serium</p>
                <p className="text-muted-foreground">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/profile/edit-profile">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/profile/change-password"> Change Password</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
