"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useUser } from "./useUser";

export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totalPrice: number;
}

export function useCart() {
  const { isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const { data: cart = null, isLoading } = useQuery<Cart | null>({
    queryKey: ["cart"],
    queryFn: () => api.get<Cart>("/api/cart"),
    enabled: isAuthenticated,
  });

  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) => 
      api.post("/api/cart/items", { productId, quantity }),
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to add to cart"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) => 
      api.put(`/api/cart/items/${id}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
    onError: () => toast.error("Failed to update cart"),
  });

  const removeMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/api/cart/items/${id}`),
    onSuccess: () => {
      toast.success("Item removed");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Failed to remove item"),
  });

  return {
    cart,
    isLoading,
    addToCart: (productId: number, quantity: number) => addMutation.mutateAsync({ productId, quantity }),
    updateCartItem: (id: number, quantity: number) => updateMutation.mutateAsync({ id, quantity }),
    removeCartItem: (id: number) => removeMutation.mutateAsync(id),
    itemCount: cart?.items.length || 0,
    isAdding: addMutation.isPending,
  };
}
