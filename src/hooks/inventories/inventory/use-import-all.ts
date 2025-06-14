import { useMutation, useQueryClient } from "@tanstack/react-query";

type ImportSuccessResponse = {
  message: string;
};

const importAllAPI = async (file: File): Promise<ImportSuccessResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/inventories/import-all`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(
      errorBody.error || "Failed to import inventories. Please try again."
    );
  }

  return res.json();
};

export const useImportAllInventories = () => {
  const queryClient = useQueryClient();

  return useMutation<ImportSuccessResponse, Error, File>({
    mutationFn: (file: File) => importAllAPI(file),
    onSuccess: () => {
      // Invalidate the main inventories query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
