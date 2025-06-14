import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingChangePasswordPage() {
  return (
    <div className="container mx-auto max-w-lg py-8 px-4 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <Skeleton className="h-8 w-48" /> {/* "Change Password" */}
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-5 w-full max-w-xs" />{" "}
            {/* Description line */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Skeleton for Current Password Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>

            {/* Skeleton for New Password Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
              <Skeleton className="h-4 w-4/5" /> {/* Description */}
            </div>

            {/* Skeleton for Confirm Password Field */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" /> {/* Label */}
              <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Skeleton className="h-10 w-full rounded-md" /> {/* Cancel Button */}
          <Skeleton className="h-10 w-full rounded-md" />{" "}
          {/* Update Password Button */}
        </CardFooter>
      </Card>
    </div>
  );
}
