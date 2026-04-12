"use client";

import { useState } from "react";
import { ProductCard, Product } from "@/components/ProductCard";
import { api } from "@/services/api";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  
  const categories = ["All", "T-Shirts", "Kurtis", "Jeans", "Custom"];

  const { data: rawProducts, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get<any>("/api/products"),
  });

  const products: Product[] = Array.isArray(rawProducts) 
    ? rawProducts 
    : rawProducts?.content || [];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">Collection</h1>
        <p className="text-muted-foreground">Browse our entire catalog of premium handmade clothing.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-8 items-start md:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {categories.map(c => (
            <button 
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                category === c ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
             <div key={i} className="animate-pulse flex flex-col gap-4">
               <div className="bg-muted aspect-[3/4] rounded-md" />
               <div className="bg-muted h-4 w-2/3 rounded" />
               <div className="bg-muted h-4 w-1/4 rounded" />
             </div>
           ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-xl">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(""); setCategory("All"); }}
            className="mt-4 border border-border px-6 py-2 rounded-full text-sm font-medium hover:bg-muted"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
