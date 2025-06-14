import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function LoadingProfilePage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-0">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar Skeleton */}
            <Skeleton className="h-24 w-24 rounded-full border-2 border-primary" />
            <div className="space-y-1">
              {/* Name Skeleton */}
              <Skeleton className="h-7 w-48 mx-auto" />
              {/* Email Skeleton */}
              <Skeleton className="h-5 w-64 mx-auto" />
            </div>
            {/* Placeholder for Rank Badge if it was here, but it's not in the provided final code */}
            {/* <Skeleton className="h-7 w-36 rounded-md" /> */}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Verified Badge Skeleton */}
          <div className="flex items-center justify-center">
            <Skeleton className="h-6 w-32 rounded-full" />
          </div>

          {/* Bio Skeleton */}
          <div className="text-center">
            <Skeleton className="h-5 w-3/4 mx-auto" />
            {/* <Skeleton className="h-5 w-2/3 mx-auto mt-1" />  // Optional second line for bio */}
          </div>

          <Separator />

          {/* Info Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
            {/* Email Address Info Item Skeleton */}
            <div className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded mt-0.5 flex-shrink-0" />{" "}
              {/* Icon */}
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-5 w-24" /> {/* Label */}
                <Skeleton className="h-5 w-3/4" /> {/* Value */}
              </div>
            </div>

            {/* Joined Serium Info Item Skeleton */}
            <div className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded mt-0.5 flex-shrink-0" />{" "}
              {/* Icon */}
              <div className="space-y-1.5 w-full">
                <Skeleton className="h-5 w-28" /> {/* Label */}
                <Skeleton className="h-5 w-2/3" /> {/* Value */}
              </div>
            </div>

            {/* Add more info item skeletons if your page has more */}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center sm:justify-end gap-2 border-t pt-6">
          {/* Edit Profile Button Skeleton */}
          <Skeleton className="h-10 w-36 rounded-md" />
          {/* Change Password Button Skeleton */}
          <Skeleton className="h-10 w-40 rounded-md" />
        </CardFooter>
      </Card>
    </div>
  );
}
