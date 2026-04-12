"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ImageFallback } from "@/components/ImageFallback";
import { Trash2, ArrowRight } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function CartPage() {
  const { cart, isLoading, updateCartItem, removeCartItem } = useCart();


  if (isLoading && !cart) {
    return <div className="container mx-auto px-4 py-24 text-center">Loading cart...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold tracking-tighter mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="bg-foreground text-background px-8 py-3 rounded-full font-medium inline-block">Start Shopping</Link>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="container mx-auto px-4 py-12 flex-1">
      <h1 className="text-3xl font-bold tracking-tighter mb-12">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-border">
              <div className="w-24 h-32 flex-shrink-0 bg-muted rounded-md overflow-hidden relative">
                <ImageFallback filename={item.imageUrl} alt={item.productName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{item.productName}</h3>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">${item.price.toFixed(2)} each</p>
                
                <div className="mt-auto flex justify-between items-end">
                  <div className="flex items-center border border-border rounded-full p-1 w-28">
                    <button 
                      onClick={() => updateCartItem(item.id, Math.max(1, item.quantity - 1))}
                      className="w-7 h-7 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-muted"
                    >-</button>
                    <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full flex flex-shrink-0 items-center justify-center hover:bg-muted"
                    >+</button>
                  </div>
                  
                  <button 
                    onClick={() => removeCartItem(item.id)}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-muted/30 rounded-2xl p-6 lg:sticky lg:top-24 border border-border">
            <h2 className="text-xl font-bold tracking-tighter mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 border-b border-border pb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="font-bold">Total estimated</span>
              <span className="font-bold text-xl">${cart.totalPrice.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/checkout"
              className="w-full bg-foreground text-background py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
