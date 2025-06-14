import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<JSON, Error, { name: string; bio: string }>({
    mutationFn: async (updateData: { name: string; bio: string }) => {
      const requestBody = {
        name: updateData.name,
        bio: updateData.bio,
      };
      const res = await fetch(`/api/profile/edit-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error("Failed to edit profile");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error) => {
      console.error("Mutation failed for profile", error);
    },
  });
};
