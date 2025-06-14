import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingEditProfilePage() {
  return (
    <div className="container mx-auto max-w-xl py-8 px-4 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <Skeleton className="h-8 w-36" /> {/* "Edit Profile" */}
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-full max-w-sm" />{" "}
            {/* Description line */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Avatar Skeleton */}
          <div className="flex flex-col items-center mb-6">
            <Skeleton className="h-24 w-24 rounded-full mb-2" /> {/* Avatar */}
            {/* Placeholder for "Change Photo" button if you add one */}
            {/* <Skeleton className="h-8 w-28 rounded-md" /> */}
          </div>

          {/* Form Skeletons */}
          <div className="space-y-6">
            {/* Skeleton for Name Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" /> {/* Label "Full Name" */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
              <Skeleton className="h-4 w-3/4" /> {/* Description */}
            </div>

            {/* Skeleton for Bio Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" /> {/* Label "Bio" */}
              <Skeleton className="h-24 w-full rounded-md" /> {/* Textarea */}
              <Skeleton className="h-4 w-full max-w-xs" /> {/* Description */}
            </div>

            {/* Add skeletons for other fields if you have them */}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Skeleton className="h-10 w-full rounded-md" /> {/* Cancel Button */}
          <Skeleton className="h-10 w-full rounded-md" />{" "}
          {/* Save Changes Button */}
        </CardFooter>
      </Card>
    </div>
  );
}
