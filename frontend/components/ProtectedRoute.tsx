"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isAuthorized = isAuthenticated && !(adminOnly && !isAdmin);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error("Please login to continue");
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (adminOnly && !isAdmin) {
      toast.error("You do not have permission to access this page");
      router.push("/dashboard");
      return;
    }
  }, [isAuthenticated, isAdmin, isLoading, router, pathname, adminOnly]);

  if (isLoading || !isAuthorized) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-8 h-8 border-4 border-muted-foreground border-t-foreground rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
