"use client";

import { ProductCard, Product } from "@/components/ProductCard";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HeartOff } from "lucide-react";

export default function WishlistPage() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => api.get<Product[]>("/api/wishlist"),
    enabled: !!user,
  });

  const removeMutation = useMutation({
    mutationFn: (productId: number) => api.delete(`/api/wishlist/${productId}`),
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: () => toast.error("Failed to remove from wishlist"),
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tighter mb-4">Your Wishlist</h1>
        <p className="text-muted-foreground">Please sign in to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">My Wishlist</h1>
        <p className="text-muted-foreground">Your curate pieces for your future aesthetic.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
             <div key={i} className="animate-pulse flex flex-col gap-4">
               <div className="bg-muted aspect-[3/4] rounded-md" />
               <div className="bg-muted h-4 w-2/3 rounded" />
             </div>
           ))}
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map(product => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              <button 
                onClick={() => removeMutation.mutate(product.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500"
                title="Remove from wishlist"
              >
                <HeartOff className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-2xl border border-dashed border-border">
          <p className="text-muted-foreground italic mb-2">Your wishlist is currently empty.</p>
          <p className="text-sm text-muted-foreground/50">Heart some products to see them here!</p>
        </div>
      )}
    </div>
  );
}
