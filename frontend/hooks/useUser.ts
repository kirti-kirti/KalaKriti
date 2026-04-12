"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
}

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, isLoading, refetch } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return null;
      try {
        return await api.get<User>("/api/users/me");
      } catch (err) {
        localStorage.removeItem("token");
        return null;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    queryClient.setQueryData(["user"], userData);
    queryClient.invalidateQueries({ queryKey: ["cart"] }); // Refresh cart on login
  };

  const logout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
    queryClient.setQueryData(["cart"], null);
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    login,
    logout,
    refetchUser: refetch,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
  };
}
