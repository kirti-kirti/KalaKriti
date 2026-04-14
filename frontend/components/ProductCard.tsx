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
    <Link href={`/products/${product.id}`} className="group block bg-surface-container-low p-4 transition-colors hover:shadow-[var(--shadow-editorial)] rounded-xl">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-surface-container-highest">
        <ImageFallback 
          filename={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-end p-4">
            <span className="bg-tertiary-container text-on-primary text-xs uppercase tracking-widest py-1 px-3 w-fit rounded-full font-medium shadow-md">Sold Out</span>
          </div>
        )}
      </div>
      <h3 className="font-display font-medium text-lg mb-1">{product.name}</h3>
      <p className="font-sans text-outline text-sm">${product.price.toFixed(2)}</p>
    </Link>
  );
}
