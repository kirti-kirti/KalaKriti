"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LogoutModal } from "@/components/LogoutModal";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useUser();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const requestLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push("/");
  };

  return (
    <ProtectedRoute adminOnly>
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-8">
          <Link href="/" className="text-xl font-bold tracking-tighter">
            STUDIO<span className="text-muted-foreground font-light">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium">
            <ShoppingBag className="w-4 h-4" /> Orders
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium text-muted-foreground">
            <Users className="w-4 h-4" /> Products
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors font-medium text-muted-foreground">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={requestLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {children}
      </main>
      
      <LogoutModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
      />
    </div>
    </ProtectedRoute>
  );
}
