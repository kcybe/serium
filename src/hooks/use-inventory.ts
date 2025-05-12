import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryWithItems } from "@/types";
import { Item } from "@/../generated/prisma/client";

// Fetch all inventories
export const useInventories = () => {
  return useQuery<InventoryWithItems[]>({
    queryKey: ["inventories"],
    queryFn: async () => {
      const res = await fetch("/api/inventories");
      if (!res.ok) throw new Error("Failed to fetch inventories");
      return res.json();
    },
  });
};

// Fetch single inventory by ID
export const useInventoryById = (id: string) => {
  return useQuery<InventoryWithItems>({
    queryKey: ["inventory", id],
    queryFn: async () => {
      const res = await fetch(`/api/inventories/${id}`);
      if (!res.ok) throw new Error("Failed to fetch inventory");
      return res.json();
    },
    enabled: !!id,
  });
};

// Add item to inventory
export const useAddItemToInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      serialNumber: string;
      inventoryId: string;
      description: string;
      status: string;
      quantity: number;
    }) => {
      const res = await fetch(`/api/inventories/${inventoryId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to add item");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
    },
  });
};

export const useDeleteItemFromInventory = (
  inventoryId: string,
  itemId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (item: Item) => {
      const res = await fetch(
        `/api/inventories/${inventoryId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete item");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory", inventoryId] });
    },
  });
};

export const useDeleteInventory = (inventoryId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (inventory: InventoryWithItems) => {
      const res = await fetch(`/api/inventories/${inventoryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inventory),
      });

      if (!res.ok) {
        throw new Error("Failed to delete inventory");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
  });
};

export const useEditInventory = () => {
  const queryClient = useQueryClient();

  return useMutation<JSON, Error, { id: string; name: string }>({
    mutationFn: async (updateData: { id: string; name: string }) => {
      const requestBody = {
        name: updateData.name,
      };
      const res = await fetch(`/api/inventories/${updateData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error("Failed to edit inventory");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventories"] });
    },
    onError: (error, variables) => {
      console.error("Mutation failed for inventory", variables.id, error);
    },
  });
};
