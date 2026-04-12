import Link from "next/link";
import { ImageFallback } from "./ImageFallback";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-md bg-muted">
        <ImageFallback 
          filename={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4">
            <span className="bg-background text-foreground text-xs uppercase tracking-widest py-1 px-3 w-fit rounded-sm font-medium">Sold Out</span>
          </div>
        )}
      </div>
      <h3 className="font-medium text-base mb-1">{product.name}</h3>
      <p className="text-muted-foreground text-sm">${product.price.toFixed(2)}</p>
    </Link>
  );
}
