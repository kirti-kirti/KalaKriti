"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard, Product } from "@/components/ProductCard";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const CATEGORIES = [
  { name: "Hand-painted T-Shirts", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600" },
  { name: "Embroidered Kurtis", image: "https://images.unsplash.com/photo-1583391733958-d25e07fac04f?auto=format&fit=crop&q=80&w=600" },
  { name: "Custom Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=600" },
];

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => api.get<any>("/api/products"),
  });

  const featuredProducts = Array.isArray(products) 
    ? products.slice(0, 4) 
    : products?.content?.slice(0, 4) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-background/20" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-3xl glass-panel p-12 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground">
            Wear Your <span className="text-pastel-pink/80 mix-blend-multiply">Aesthetic</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto font-light">
            Premium hand-painted and custom embroidered clothing designed exclusively for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-foreground text-background px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
            >
              Shop Collection
            </Link>
            <Link 
              href="/custom-order" 
              className="bg-background text-foreground border border-foreground/10 px-8 py-3 rounded-full font-medium transition-transform hover:scale-105"
            >
              Design Your Own
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold tracking-tighter">Shop by Category</h2>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm font-medium hover:text-muted-foreground transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CATEGORIES.map((category, idx) => (
              <Link href={`/products?category=${encodeURIComponent(category.name)}`} key={idx} className="group relative aspect-square overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-medium mb-2">{category.name}</h3>
                  <div className="text-white/80 text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">Featured Additions</h2>
            <p className="text-muted-foreground">The latest pieces from our studio.</p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="animate-pulse flex flex-col gap-4">
                   <div className="bg-muted aspect-[3/4] rounded-md" />
                   <div className="bg-muted h-4 w-2/3 rounded" />
                   <div className="bg-muted h-4 w-1/4 rounded" />
                 </div>
               ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {featuredProducts.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center text-muted-foreground py-12">
               No products available right now. Check back later!
             </div>
          )}
          
          <div className="mt-16 text-center">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 border border-border px-8 py-3 rounded-full font-medium hover:bg-muted transition-colors"
            >
              View Entire Collection
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
