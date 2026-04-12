"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/services/api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { useEffect, Suspense } from "react";

function RegisterContent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading } = useUser();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push(redirectPath);
    }
  }, [isAuthenticated, isLoading, router, redirectPath]);

  const registerMutation = useMutation({
    mutationFn: (data: any) => api.post("/api/auth/register", data),
    onSuccess: () => {
      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to register");
    }
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-sm bg-card p-8 rounded-2xl shadow-sm border border-border">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tighter mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join us for premium custom aesthetics</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input 
                type="text" 
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-1 focus:ring-foreground"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={registerMutation.isPending}
            className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-6"
          >
            {registerMutation.isPending ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-foreground font-medium hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center p-4">Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
