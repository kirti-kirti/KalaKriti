"use client";

import { api } from "@/services/api";
import { toast } from "sonner";
import { ClipboardList, Filter, MoreVertical } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function AdminOrders() {
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-all-orders"],
    queryFn: () => api.get<any[]>("/api/orders"), // Again, assuming admin gets all orders here
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => 
      api.put(`/api/orders/${id}/status?status=${status}`),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["admin-all-orders"] });
    },
    onError: () => toast.error("Failed to update status"),
  });

  const handleStatusChange = (id: number, status: string) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-8 h-8" />
          <h1 className="text-4xl font-bold tracking-tighter">Order Management</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center animate-pulse">Loading orders...</div>
        ) : orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-muted/30 border-b border-border text-muted-foreground uppercase text-[10px] tracking-widest font-bold">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer Email</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-bold">#{order.id}</td>
                    <td className="px-6 py-4 text-muted-foreground">{order.email}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter cursor-pointer ${
                          order.status === "DELIVERED" ? "bg-green-100 text-green-700" :
                          order.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                          "bg-pastel-yellow/30 text-yellow-700"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 font-medium">${order.totalAmount?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground italic">
            No orders found in the system.
          </div>
        )}
      </div>
    </div>
  );
}
