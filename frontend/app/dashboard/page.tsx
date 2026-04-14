"use client";

import { useUser } from "@/hooks/useUser";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LayoutDashboard, Package, PenTool, Heart, Shield, LogOut } from "lucide-react";
import Link from "next/link";
import { ImageFallback } from "@/components/ImageFallback";

export default function Dashboard() {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 lg:px-8 py-12 flex flex-col md:flex-row gap-12 text-on-surface">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-10">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">Control Center</h2>
            <p className="text-outline text-xs tracking-wider uppercase mt-1">Management Suite</p>
          </div>
          
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-surface-container-low border-l-4 border-primary text-primary font-medium rounded-r-xl">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Package className="w-5 h-5" /> Order History
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <PenTool className="w-5 h-5" /> Custom Orders
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Heart className="w-5 h-5" /> Wishlist
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Shield className="w-5 h-5" /> Security
            </Link>
          </nav>

          <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 px-6 rounded-xl font-medium w-full shadow-md transition-opacity hover:opacity-90">
            Create Collection
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-12">
          
          {/* Welcome Block */}
          <div className="relative bg-[#f8efea] rounded-2xl p-10 overflow-hidden shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#f2e7df]"></div>
            
            <div className="relative z-10 max-w-lg">
              <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Welcome Back,</p>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-on-surface mb-4">
                {user.firstName || "Aditi"} {user.lastName || "Sharma"}
              </h1>
              <p className="text-on-surface/70 leading-relaxed text-sm">
                Curating heritage since 2021. You have 2 active orders and 1 custom request pending artisan approval.
              </p>
            </div>
            
            <div className="relative z-10 bg-surface-container-lowest p-3 rounded-xl shadow-[var(--shadow-editorial)] flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center font-bold text-xl">
                {user?.firstName?.[0] || "A"}{user?.lastName?.[0] || "S"}
              </div>
              <div className="pr-4">
                <p className="font-bold text-sm">Premium Weaver</p>
                <p className="text-outline text-xs">Varanasi, India</p>
              </div>
            </div>
          </div>

          {/* Grid Layout Top */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Custom Order Progress */}
            <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 shadow-[var(--shadow-editorial)] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-display font-bold text-2xl">Custom Order Progress</h3>
                <span className="bg-tertiary-container text-on-surface text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Artisan Assigned</span>
              </div>
              
              <div className="flex justify-between items-end mb-3">
                <p className="font-medium text-sm">Silk Brocade Sari - Custom Pattern</p>
                <p className="text-secondary font-bold text-sm">65% Complete</p>
              </div>
              
              <div className="w-full bg-surface-container-low h-2 rounded-full mb-8 overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="bg-[#f9f5f1] rounded-xl p-4 flex gap-4 items-start border border-[#f0e7df]">
                <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
                   <PenTool className="w-4 h-4" />
                </div>
                <p className="text-sm italic text-on-surface/80">
                  Artisan Note: "The indigo dye is setting perfectly on the mulberry silk base."
                </p>
              </div>
            </div>

            {/* Saved Treasures */}
            <div className="bg-[#f5f5fc] rounded-2xl p-8 flex flex-col justify-between">
              <h3 className="font-display font-bold text-xl mb-6">Saved Treasures</h3>
              
              <div className="flex items-center gap-[-10px] mb-8">
                {/* Simulated avatars/images of saved items overlapping */}
                <div className="w-14 h-14 rounded-lg bg-red-800 overflow-hidden border-2 border-[#f5f5fc] z-10 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1583391733958-d25e07fac04f?w=100&h=100&fit=crop" alt="Pashmina" className="w-full h-full object-cover" />
                </div>
                <div className="w-14 h-14 rounded-lg bg-teal-800 overflow-hidden border-2 border-[#f5f5fc] z-20 shrink-0 -ml-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop" alt="Jeans" className="w-full h-full object-cover" />
                </div>
                <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center font-bold text-secondary text-sm shadow-sm border border-surface-container-highest z-30 shrink-0 -ml-4">
                  +12
                </div>
              </div>

              <Link href="#" className="text-secondary text-sm font-bold underline underline-offset-4 decoration-2">
                View All Wishlist
              </Link>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div>
            <div className="flex justify-between items-end mb-6">
              <h3 className="font-display font-bold text-2xl">Recent Orders</h3>
              <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View History</button>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Order Item 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://plus.unsplash.com/premium_photo-1673356301535-224a0f16f406?w=200&h=200&fit=crop" alt="Pashmina" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-outline font-bold tracking-widest uppercase mb-1">Order #VL-92834</p>
                    <h4 className="font-display font-bold text-lg mb-1">Hand-loomed Indigo Pashmina</h4>
                    <p className="text-secondary text-xs font-bold">Shipped: Arriving tomorrow</p>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="border border-outline-variant text-on-surface px-5 py-2 rounded-xl text-xs font-bold w-full sm:w-auto hover:bg-surface-container-low transition-colors">
                    Track Shipment
                  </button>
                  <button className="bg-secondary text-on-secondary px-5 py-2 rounded-xl text-xs font-bold w-full sm:w-auto hover:opacity-90 transition-opacity">
                    Reorder
                  </button>
                </div>
              </div>

              {/* Order Item 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop" alt="Kit" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] text-outline font-bold tracking-widest uppercase mb-1">Order #VL-61022</p>
                    <h4 className="font-display font-bold text-lg mb-1">Organic Cotton Block-Print Kit</h4>
                    <p className="text-outline text-xs">Delivered: Oct 12, 2023</p>
                  </div>
                </div>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  <button className="border border-outline-variant text-on-surface px-5 py-2 rounded-xl text-xs font-bold w-full sm:w-auto hover:bg-surface-container-low transition-colors">
                    Write Review
                  </button>
                  <button className="bg-secondary text-on-secondary px-5 py-2 rounded-xl text-xs font-bold w-full sm:w-auto hover:opacity-90 transition-opacity">
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4">
            
            {/* Saved Addresses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-2xl">Saved Addresses</h3>
                <button className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg leading-none pb-0.5 shadow-md hover:scale-105 transition-transform">+</button>
              </div>
              
              <div className="bg-[#faefe8] border border-[#f0e3d9] rounded-2xl p-6 mb-4 relative">
                <div className="absolute top-6 right-6">
                   <span className="bg-[#eedacb] text-primary text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded">Default</span>
                </div>
                <h4 className="font-bold mb-2">Home (Delhi)</h4>
                <p className="text-outline text-sm leading-relaxed mb-4 max-w-[200px]">A-14, Green Park Main, New Delhi, Delhi 110016 India</p>
                <button className="text-secondary text-xs font-bold hover:underline">Edit Address</button>
              </div>

              <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6">
                <h4 className="font-bold mb-2">Work (Varanasi Office)</h4>
                <p className="text-outline text-sm leading-relaxed mb-4 max-w-[200px]">Dashashwamedh Ghat Rd, Godowlia, Varanasi, Uttar Pradesh 221001</p>
                <button className="text-secondary text-xs font-bold hover:underline">Edit Address</button>
              </div>
            </div>
            
            {/* Security & Privacy */}
            <div>
              <h3 className="font-display font-bold text-2xl mb-6">Security & Privacy</h3>
              
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[var(--shadow-editorial)] flex flex-col gap-6">
                 
                 {/* Item */}
                 <div className="flex items-center justify-between border-b border-surface-container-highest pb-6">
                   <div className="flex items-center gap-4">
                     <Shield className="w-5 h-5 text-on-surface" />
                     <div>
                       <p className="font-bold text-sm">Password</p>
                       <p className="text-outline text-xs mt-1">Last changed 3 months ago</p>
                     </div>
                   </div>
                   <button className="text-secondary text-xs font-bold hover:underline">Update</button>
                 </div>

                 {/* Item */}
                 <div className="flex items-center justify-between border-b border-surface-container-highest pb-6">
                   <div className="flex items-center gap-4">
                     <Shield className="w-5 h-5 text-on-surface" />
                     <div>
                       <p className="font-bold text-sm">Two-Factor Auth</p>
                       <p className="text-outline text-xs mt-1">Enabled via SMS</p>
                     </div>
                   </div>
                   <div className="w-10 h-6 bg-primary rounded-full relative shadow-inner cursor-pointer">
                     <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm"></div>
                   </div>
                 </div>

                 {/* Item */}
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <LayoutDashboard className="w-5 h-5 text-on-surface" />
                     <div>
                       <p className="font-bold text-sm">Logged Devices</p>
                       <p className="text-outline text-xs mt-1">2 active sessions</p>
                     </div>
                   </div>
                   <button className="text-secondary text-xs font-bold hover:underline">Manage</button>
                 </div>

              </div>
            </div>
          </div>

          <hr className="border-t border-outline-variant my-8" />

          {/* Hand Crafted Footer Image Area */}
          <div className="relative mt-8">
            <h2 className="font-display text-[70px] leading-[0.8] md:text-[100px] font-bold text-tertiary mb-6 z-20 relative mix-blend-multiply">
              Hand<br />Crafted
            </h2>
            
            <div className="flex flex-col md:flex-row items-end gap-8 -mt-16 md:-mt-32">
              <div className="bg-[#f2e7df] p-8 rounded-2xl flex-1 z-10 pt-20 md:pt-40">
                <h3 className="font-display font-bold text-2xl mb-4">The Story of Your Indigo Brocade</h3>
                <p className="text-on-surface/80 text-sm leading-relaxed mb-8 italic">
                  "Every thread is a prayer, every weave a story. When you wear our loom, you wear the heritage of ten generations of Varanasi weavers."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-container rounded-lg overflow-hidden shadow-sm shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Rajesh Kumar" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Rajesh Kumar</h4>
                    <p className="text-outline text-[10px] uppercase tracking-widest font-bold">Master Weaver, Silk Division</p>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 lg:w-[60%] shrink-0">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-[var(--shadow-editorial)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1581452934579-247598c47dd6?w=800&h=600&fit=crop" alt="Loom" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
          
        </main>
      </div>
    </ProtectedRoute>
  );
}
