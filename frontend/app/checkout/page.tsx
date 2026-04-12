"use client";

import { useCart } from "@/hooks/useCart";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const queryClient = useQueryClient();

  const orderMutation = useMutation({
    mutationFn: () => api.post("/api/orders", { address }),
    onSuccess: () => {
      toast.success("Order placed successfully!");
      queryClient.setQueryData(["cart"], null);
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to place order");
    }
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      toast.error("Please enter shipping address");
      return;
    }
    orderMutation.mutate();
  };

  if (!cart || cart.items.length === 0) {
    return <div className="container mx-auto px-4 py-24 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 flex-1 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tighter mb-12">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5" />
              <h2 className="text-xl font-bold">Shipping Information</h2>
            </div>
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Full address (Street, Apt, City, Zip Code)"
              rows={4}
              className="w-full px-4 py-3 bg-muted rounded-xl border border-transparent focus:border-foreground focus:ring-0 text-sm transition-all"
            />
          </section>

          <section>
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5" />
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>
            <div className="p-6 border border-foreground/10 rounded-2xl bg-muted/20 flex items-center justify-between opacity-50 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center font-bold text-[10px]">VISA</div>
                <span className="text-sm font-medium">Coming soon...</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Note: Only Cash on Delivery available for now.
            </p>
          </section>
        </div>

        <div>
          <div className="bg-card border border-border p-8 rounded-3xl shadow-sm">
            <h3 className="text-lg font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              {cart.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.productName} x {item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-border pt-6 space-y-3 mb-8">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-3">
                <span>Total</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handlePlaceOrder}
              disabled={orderMutation.isPending}
              className="w-full bg-foreground text-background py-4 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {orderMutation.isPending ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
