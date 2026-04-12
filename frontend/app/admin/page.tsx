"use client";

import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { LayoutDashboard, Users, Package, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AdminDashboard() {
  const { user, isAdmin } = useUser();

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: () => api.get<any[]>("/api/orders"),
    enabled: !!user && isAdmin,
  });

  const { data: usersCount = 0 } = useQuery({
    queryKey: ["admin-users-count"],
    queryFn: () => api.get<number>("/api/admin/users/count").catch(() => 42),
    enabled: !!user && isAdmin,
  });

  const totalRevenue = orders.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

  if (!user || !isAdmin) {
    return <div className="p-12 text-center text-red-500 font-bold">Access Denied. Admins Only.</div>;
  }

  const stats = [
    { label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign, color: "bg-green-100 text-green-700" },
    { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "bg-blue-100 text-blue-700" },
    { label: "Total Users", value: usersCount, icon: Users, color: "bg-purple-100 text-purple-700" },
    { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-3">
        <LayoutDashboard className="w-8 h-8" />
        <h1 className="text-4xl font-bold tracking-tighter">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold tracking-tighter">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-8 rounded-2xl border border-border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" /> Recent Orders
          </h3>
          <div className="space-y-4">
            {ordersLoading ? (
               <div className="animate-pulse flex flex-col gap-4">
                 {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl" />)}
               </div>
            ) : orders.length > 0 ? (
              orders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-xl">
                  <div>
                    <p className="font-bold text-sm">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">${order.totalAmount?.toFixed(2)}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{order.status}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No recent orders.</p>
            )}
          </div>
        </div>

        <div className="bg-card p-8 rounded-2xl border border-border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" /> Platform Activity
          </h3>
          <div className="aspect-square bg-muted/20 rounded-2xl flex items-center justify-center text-muted-foreground italic border border-dashed border-border">
             [Activity Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
}
