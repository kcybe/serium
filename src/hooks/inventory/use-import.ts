// src/hooks/inventory/use-import.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ImportSuccessResponse = {
  message: string;
};

const importItemsAPI = async ({
  inventoryId,
  file,
}: {
  inventoryId: string;
  file: File;
}): Promise<ImportSuccessResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/inventories/${inventoryId}/import`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.json();
    throw new Error(
      errorBody.error || "Failed to import items. Please try again."
    );
  }

  return res.json();
};

export const useImportItemsToInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation<ImportSuccessResponse, Error, File>({
    mutationFn: (file: File) => importItemsAPI({ inventoryId, file }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
  });
};
