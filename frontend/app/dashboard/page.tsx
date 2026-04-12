"use client";

import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { Package, User as UserIcon, MapPin, Phone, History, Clock, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, isLoading: authLoading, logout } = useUser();
  const router = useRouter();

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["user-orders"],
    queryFn: () => api.get<any[]>("/api/orders"),
    enabled: !!user,
  });

  const { data: customOrders = [], isLoading: customLoading } = useQuery({
    queryKey: ["user-custom-orders"],
    queryFn: () => api.get<any[]>("/api/custom-orders"),
    enabled: !!user,
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (authLoading) return <div className="container mx-auto py-24 text-center">Loading...</div>;
  if (!user) return <div className="container mx-auto py-24 text-center text-red-500 font-medium">Please login to view dashboard.</div>;

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="flex flex-col lg:flex-row gap-8 mb-16 items-start lg:items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">Hello, {user.firstName}</h1>
          <p className="text-muted-foreground">Manage your orders and account settings.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border">
            <div className="w-12 h-12 bg-foreground text-background rounded-full flex items-center justify-center font-bold text-xl">
              {user?.firstName?.[0] || user?.email?.[0] || "?"}
            </div>
            <div>
              <p className="font-bold text-sm">{user?.firstName || "User"} {user?.lastName || ""}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="p-4 bg-red-50 text-red-500 rounded-2xl border border-red-100 hover:bg-red-100 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* ... stats sections ... */}
        <div className="bg-card p-8 rounded-2xl border border-border flex items-start gap-4">
          <div className="p-3 bg-pastel-pink/10 rounded-xl">
            <UserIcon className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h3 className="font-bold mb-4">Personal Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="w-4 h-4" />
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Joined April 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border flex items-start gap-4">
          <div className="p-3 bg-pastel-yellow/20 rounded-xl">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h3 className="font-bold mb-4">Default Address</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              123 Premium Street,<br />Fashion District, Mumbai 400001
            </p>
          </div>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border flex items-start gap-4">
          <div className="p-3 bg-pastel-blue/20 rounded-xl">
            <Phone className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>{user.email}</p>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <History className="w-6 h-6" />
            <h2 className="text-2xl font-bold tracking-tighter">Order History</h2>
          </div>
          
          {ordersLoading ? (
            <div className="bg-muted/20 h-32 rounded-2xl animate-pulse" />
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-4 font-medium">Order ID</th>
                    <th className="py-4 font-medium">Date</th>
                    <th className="py-4 font-medium">Items</th>
                    <th className="py-4 font-medium">Total</th>
                    <th className="py-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order: any) => (
                    <tr key={order.id} className="border-b border-border/50">
                      <td className="py-4 font-medium">#{order.id}</td>
                      <td className="py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 text-muted-foreground">{order.items?.length || 0} items</td>
                      <td className="py-4 font-medium">${order.totalAmount?.toFixed(2)}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === "DELIVERED" ? "bg-green-100 text-green-700" : "bg-pastel-yellow/30 text-yellow-700"
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border opacity-60">
              No orders found.
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center gap-3 mb-8">
            <Package className="w-6 h-6" />
            <h2 className="text-2xl font-bold tracking-tighter">Custom Orders Status</h2>
          </div>
          
          {customLoading ? (
            <div className="bg-muted/20 h-32 rounded-2xl animate-pulse" />
          ) : customOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customOrders.map((co: any) => (
                <div key={co.id} className="p-6 bg-card rounded-2xl border border-border">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">#{co.id}</span>
                    <span className="px-2 py-1 bg-pastel-blue/20 text-pastel-blue-dark rounded-md text-[10px] font-bold">
                      {co.status}
                    </span>
                  </div>
                  <h4 className="font-bold mb-2 capitalize">{co.clothType}</h4>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{co.description}</p>
                  <div className="text-xs font-medium pt-4 border-t border-border flex justify-between items-center">
                    <span className="text-muted-foreground">Requested on:</span>
                    <span>{new Date(co.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/10 rounded-2xl border border-dashed border-border opacity-60">
              No custom orders yet.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
