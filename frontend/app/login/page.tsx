"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: any) => api.post<any>("/api/auth/login", data),
    onSuccess: (data) => {
      login(data.token, data);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Invalid credentials");
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account? <Link href="/register" className="text-foreground font-medium hover:underline">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
