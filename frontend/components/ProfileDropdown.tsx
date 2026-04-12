"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User as UserIcon, Package, Heart, LogOut, ChevronDown } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function ProfileDropdown() {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push("/");
  };

  const getInitials = () => {
    if (!user) return "?";
    return (user.firstName?.[0] || user.email?.[0] || "?").toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 pr-3 bg-muted/40 hover:bg-muted/80 border border-border rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/20"
      >
        <div className="w-7 h-7 bg-foreground text-background flex items-center justify-center rounded-full text-xs font-bold">
          {getInitials()}
        </div>
        <span className="text-sm font-medium hidden sm:block max-w-[100px] truncate text-foreground">
          {user?.firstName || "User"}
        </span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-56 bg-card border border-border rounded-2xl shadow-xl overflow-hidden origin-top-right z-50"
          >
            <div className="p-4 border-b border-border bg-muted/10">
              <p className="font-bold text-sm truncate">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
            <div className="p-2 space-y-1">
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-muted transition-colors"
              >
                <UserIcon className="w-4 h-4 text-muted-foreground" />
                My Profile
              </Link>
              <Link 
                href="/dashboard" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-muted transition-colors"
              >
                <Package className="w-4 h-4 text-muted-foreground" />
                My Orders
              </Link>
              <Link 
                href="/wishlist" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl hover:bg-muted transition-colors"
              >
                <Heart className="w-4 h-4 text-muted-foreground" />
                Wishlist
              </Link>
            </div>
            <div className="p-2 border-t border-border">
              <button 
                onClick={handleLogout}
                className="flex items-center w-full gap-3 px-3 py-2.5 text-sm text-red-500 rounded-xl hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
