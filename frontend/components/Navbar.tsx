"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu, LayoutDashboard } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useCart } from "@/hooks/useCart";

export function Navbar() {
  const { user, isAdmin, isAuthenticated } = useUser();
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-foreground/70 hover:text-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="text-xl font-bold tracking-tighter">
            STUDIO<span className="text-muted-foreground font-light">AESTHETA</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/products" className="hover:text-muted-foreground transition-colors">Catalog</Link>
          <Link href="/custom-order" className="hover:text-muted-foreground transition-colors">Custom Design</Link>
          {isAdmin && (
             <Link href="/admin" className="flex items-center gap-1 text-pastel-pink-dark hover:opacity-80 transition-opacity">
               <LayoutDashboard className="w-4 h-4" /> Admin
             </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block p-2 text-foreground/70 hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/wishlist" className="p-2 text-foreground/70 hover:text-foreground transition-colors relative">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart" className="p-2 text-foreground/70 hover:text-foreground transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center rounded-full font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href={isAuthenticated ? "/dashboard" : "/login"} className="p-2 text-foreground/70 hover:text-foreground transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
