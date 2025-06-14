"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile"; // Your hook

// Define the form schema using Zod
const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters.")
    .optional(),
  bio: z.string().max(160, "Bio must be at most 160 characters.").optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface InitialProfileData {
  name?: string;
  bio?: string;
  email?: string;
}

export default function EditProfilePageClient({
  initialData,
}: {
  initialData: InitialProfileData;
}) {
  const router = useRouter();
  // The useUpdateProfile hook manages its own loading/pending state
  const { mutate: updateProfileMutation, isPending: isUpdatingProfile } =
    useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialData.name || "", // Ensure initialData.name is defined or fallback
      bio: initialData.bio || "",
    },
    mode: "onChange",
  });

  // useEffect to reset form if initialData changes (e.g., if parent component re-fetches)
  // This is good practice if initialData could be dynamic.
  useEffect(() => {
    form.reset({
      name: initialData.name || "",
      bio: initialData.bio || "",
    });
  }, [initialData, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    const profileData = {
      name: data.name || initialData.name || "Default Name", // Handle potentially undefined name from optional schema
      bio: data.bio || "",
    };

    updateProfileMutation(profileData, {
      onSuccess: () => {
        toast.success("Profile updated successfully!");
        router.push("/profile");
        router.refresh(); // Important to refresh server-rendered profile page
      },
      onError: (error) => {
        toast.error(error.message || "Could not update your profile.");
      },
    });
  };

  return (
    <div className="container mx-auto max-w-xl py-8 px-4 md:px-0">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Profile</CardTitle>
          <CardDescription>
            Make changes to your public profile information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage
                src={`https://avatar.vercel.sh/${
                  initialData.email || initialData.name
                }?rounded=true&size=96`}
                alt={initialData.name || "User"}
              />
              <AvatarFallback className="text-3xl">
                {(
                  initialData.name?.[0] ||
                  initialData.email?.[0] ||
                  "U"
                ).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full name"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about yourself"
                        className="resize-none"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription>
                      A short bio that will be displayed on your profile. (Max
                      160 characters)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-6">
          <Button
            variant="outline"
            disabled={isUpdatingProfile} // Use isPending from the hook
            onClick={() => router.push("/profile")} // Or router.back()
            className="w-full" // Adjust width for responsiveness
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isUpdatingProfile} // Use isPending from the hook
            className="w-full" // Adjust width for responsiveness
          >
            {isUpdatingProfile && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
