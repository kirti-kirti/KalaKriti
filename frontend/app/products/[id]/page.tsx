"use client";

import { useState, use } from "react";
import { useCart } from "@/hooks/useCart";
import { ImageFallback } from "@/components/ImageFallback";
import { api } from "@/services/api";
import { Product } from "@/components/ProductCard";
import { Heart, Star, ShoppingBag, Truck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { ReviewCard } from "@/components/ReviewCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => api.get<Product>(`/api/products/${productId}`),
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: () => api.get<any[]>(`/api/products/${productId}/reviews`).catch(() => []),
  });

  const { data: avgRating = 0 } = useQuery({
    queryKey: ["product-rating", productId],
    queryFn: () => api.get<number>(`/api/products/${productId}/reviews/average-rating`).catch(() => 0),
  });

  const wishlistMutation = useMutation({
    mutationFn: () => api.post(`/api/wishlist/${productId}`),
    onSuccess: () => toast.success("Added to wishlist"),
    onError: () => toast.error("Failed to add to wishlist"),
  });

  const handleAddToCart = async () => {
    if (!product) return;
    await addToCart(product.id, quantity);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    wishlistMutation.mutate();
  };

  if (productLoading) {
    return (
      <div className="container mx-auto px-4 py-12 animate-pulse flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 aspect-[3/4] bg-muted rounded-xl" />
        <div className="md:w-1/2 flex flex-col gap-6 pt-8">
          <div className="h-10 bg-muted w-3/4 rounded" />
          <div className="h-6 bg-muted w-1/4 rounded" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-24 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-24">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden sticky top-24 bg-muted">
            <ImageFallback filename={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-foreground text-foreground" />
                <span className="font-medium text-foreground">{avgRating > 0 ? avgRating.toFixed(1) : "New"}</span>
              </div>
              <span>•</span>
              <span>{reviews.length} Reviews</span>
            </div>
            <p className="text-2xl font-medium">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <span className="font-medium w-24">Quantity</span>
              <div className="flex items-center border border-border rounded-full p-1 w-32">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
                >-</button>
                <span className="flex-1 text-center text-sm font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted"
                >+</button>
              </div>
            </div>
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-sm text-red-500 font-medium">Only {product.stock} items left in stock!</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-foreground text-background py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={handleAddToWishlist}
              disabled={wishlistMutation.isPending}
              className="sm:w-16 h-14 sm:h-auto border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
            >
              <Heart className={`w-5 h-5 ${wishlistMutation.isPending ? "animate-pulse" : ""}`} />
            </button>
          </div>

          <div className="border-t border-border pt-8 space-y-4">
            <div className="flex gap-4 text-muted-foreground">
              <Truck className="w-5 h-5 flex-shrink-0 text-foreground" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">Free Shipping</p>
                <p className="text-sm">On all orders over $150.</p>
              </div>
            </div>
            <div className="flex gap-4 text-muted-foreground">
              <RefreshCw className="w-5 h-5 flex-shrink-0 text-foreground" />
              <div>
                <p className="font-medium text-foreground text-sm mb-1">14-Day Returns</p>
                <p className="text-sm">Not completely satisfied? Return it within 14 days.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
