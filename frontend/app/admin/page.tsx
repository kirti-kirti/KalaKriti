"use client";

import { useUser } from "@/hooks/useUser";
import { LayoutDashboard, Users, Package, Settings, BarChart, Plus, Calendar, Search, MoreVertical, Star } from "lucide-react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  const { user, isAdmin } = useUser();

  if (!user || !isAdmin) {
    return (
      <ProtectedRoute>
        <div className="p-12 text-center text-primary font-bold">Access Denied. Admins Only.</div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 lg:px-8 py-12 flex flex-col md:flex-row gap-12 text-on-surface">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-10">
          <div>
            <h2 className="font-display font-bold text-xl text-on-surface">Control Center</h2>
            <p className="text-outline text-xs tracking-wider uppercase mt-1">Management Suite</p>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[#fdf5f0] border-l-4 border-primary text-primary font-medium rounded-r-xl">
              <LayoutDashboard className="w-5 h-5" /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Users className="w-5 h-5" /> Artisan Networks
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Package className="w-5 h-5" /> Inventory
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <PenToolIcon /> Custom Orders
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <BarChart className="w-5 h-5" /> Analytics
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 text-outline hover:text-on-surface hover:bg-surface-container-low rounded-xl transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </Link>
          </nav>

          <div className="mt-auto flex flex-col gap-8">
            <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Create Collection
            </button>
            
            <div className="pt-8 border-t border-surface-container-highest flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Arjun Mehta" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-sm">Arjun Mehta</p>
                <p className="text-outline text-xs">Head Curator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-10">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-surface-container-highest pb-6">
            <div>
              <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Heritage Management</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-on-surface">
                Varanasi Loom Overview
              </h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container text-sm font-medium rounded-lg">
              <Calendar className="w-4 h-4 text-secondary" /> Oct 24 - Nov 23
            </button>
          </div>

          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Revenue */}
            <div className="bg-[#fbefe8] rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-[-20%] bottom-[-20%] opacity-20 transform scale-150">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="12" cy="12" r="3"/></svg>
              </div>
              <p className="font-medium text-sm mb-4">Monthly Revenue</p>
              <h3 className="font-display text-5xl font-bold text-primary mb-2">₹ 12,45,000</h3>
              <p className="text-secondary text-xs font-bold flex items-center gap-1">
                <TrendingUpIcon /> 14% increase from last month
              </p>
            </div>

            {/* Users */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[var(--shadow-editorial)] flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-tertiary-container text-tertiary rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="bg-surface-container text-xs font-bold px-2 py-1 rounded-md">+122</span>
              </div>
              <div>
                <p className="font-medium text-xs tracking-widest uppercase text-outline mb-1">Active Users</p>
                <h3 className="font-display text-4xl font-bold">4,280</h3>
              </div>
            </div>

            {/* Orders */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[var(--shadow-editorial)] flex flex-col justify-between">
               <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-[#eaebfc] text-secondary rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <span className="bg-surface-container text-xs font-bold px-2 py-1 rounded-md">+45</span>
              </div>
              <div>
                <p className="font-medium text-xs tracking-widest uppercase text-outline mb-1">Total Orders</p>
                <h3 className="font-display text-4xl font-bold">892</h3>
              </div>
            </div>
          </div>

          {/* Grid View */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Artwork Review Queue */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              <div className="flex justify-between items-end">
                <h2 className="font-display text-2xl font-bold">Artwork Review Queue</h2>
                <Link href="#" className="text-secondary text-sm font-bold underline underline-offset-4 decoration-2">
                  View All Requests
                </Link>
              </div>
              
              {/* Review Item 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[var(--shadow-editorial)] flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 rounded-lg bg-surface-container overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=300&fit=crop" alt="Floral Silk" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight">Hand-Painted Mughal<br/>Floral Silk</h3>
                    <span className="bg-[#fde9a8] text-[#856b18] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg">Urgent Review</span>
                  </div>
                  <p className="text-sm text-outline mb-4">
                    Requested by <span className="font-bold text-on-surface">Meera K.</span> • 2 hours ago
                  </p>
                  <div className="flex gap-4 text-xs font-medium mb-4">
                    <span className="flex items-center gap-1"><ColorIcon /> 5 Colors</span>
                    <span className="flex items-center gap-1"><MeasureIcon /> 6 Yards</span>
                  </div>
                  <div className="flex gap-3 justify-end mt-auto">
                    <button className="bg-primary hover:bg-primary-container text-on-primary font-bold px-6 py-2 rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="bg-surface-container-highest hover:bg-surface-container-low text-on-surface font-bold px-6 py-2 rounded-lg transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>

              {/* Review Item 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-[var(--shadow-editorial)] flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 rounded-lg bg-surface-container overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop" alt="Jamdani Fusion" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight">Indigo Jamdani Fusion<br/>Concept</h3>
                    <span className="bg-surface-container-highest text-on-surface text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg">Standard</span>
                  </div>
                  <p className="text-sm text-outline mb-4">
                    Requested by <span className="font-bold text-on-surface">Studio Vistara</span> • 5 hours ago
                  </p>
                  <div className="flex gap-4 text-xs font-medium mb-4">
                    <span className="flex items-center gap-1"><ColorIcon /> 2 Colors</span>
                    <span className="flex items-center gap-1"><MeasureIcon /> 12 Yards</span>
                  </div>
                  <div className="flex gap-3 justify-end mt-auto">
                    <button className="bg-primary hover:bg-primary-container text-on-primary font-bold px-6 py-2 rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="bg-surface-container-highest hover:bg-surface-container-low text-on-surface font-bold px-6 py-2 rounded-lg transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Inventory & Top Artisans */}
            <div className="flex flex-col gap-6">
              
              <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant shadow-sm">
                <h3 className="font-display text-xl font-bold mb-6">Inventory Pulse</h3>
                
                <div className="space-y-5 mb-8">
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-bold">Silk Yarn (Katan)</p>
                      <p className="text-xs font-bold text-[#b42e2e]">24% Left</p>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#b42e2e] h-full rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-bold">Fine Cotton (Muslin)</p>
                      <p className="text-xs font-bold text-secondary">88% Left</p>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-end mb-1">
                      <p className="text-sm font-bold">Gold Zari Thread</p>
                      <p className="text-xs font-bold text-tertiary">52% Left</p>
                    </div>
                    <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full rounded-full" style={{ width: '52%' }}></div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-outline leading-relaxed mb-4">Stock notifications are currently <span className="font-bold text-on-surface">ACTIVE</span> for low levels.</p>
                <button className="w-full bg-surface-container-highest hover:bg-surface-container text-sm font-bold py-2 rounded-lg transition-colors">
                  Order Raw Materials
                </button>
              </div>

              <div>
                 <h3 className="font-display text-xl font-bold mb-4">Top Artisans</h3>
                 <div className="flex flex-col gap-4">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" alt="Sunita Verma" className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <p className="font-bold text-sm">Sunita Verma</p>
                         <p className="text-outline text-[10px] tracking-widest uppercase font-bold">Master Weaver</p>
                       </div>
                     </div>
                     <Star className="w-4 h-4 text-primary fill-primary" />
                   </div>
                   
                   <div className="flex items-center justify-between relative">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Rajesh Kumar" className="w-full h-full object-cover" />
                       </div>
                       <div>
                         <p className="font-bold text-sm">Rajesh Kumar</p>
                         <p className="text-outline text-[10px] tracking-widest uppercase font-bold">Dye Specialist</p>
                       </div>
                     </div>
                     <Star className="w-4 h-4 text-primary fill-primary" />
                     {/* Floating CTA button over this area like in mockup */}
                     <button className="absolute -right-2 top-8 w-12 h-12 rounded-xl bg-primary text-on-primary shadow-lg flex justify-center items-center hover:scale-105 transition-transform z-10 font-bold text-xl pb-1">
                       +
                     </button>
                   </div>
                 </div>
              </div>

            </div>
          </div>

          <hr className="border-t border-outline-variant my-4" />

          {/* Community Directory */}
          <div className="bg-surface-container-low rounded-2xl p-8 mb-8 border border-white/50">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-display text-2xl font-bold">Community Directory</h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
                <input 
                  type="text" 
                  placeholder="Search weavers, customers..." 
                  className="pl-9 pr-4 py-2 bg-surface-container-highest rounded-lg text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs font-bold tracking-widest uppercase text-outline border-b border-outline-variant">
                    <th className="pb-4 font-bold">Member</th>
                    <th className="pb-4 font-bold">Role</th>
                    <th className="pb-4 font-bold">Location</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-outline-variant/30">
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-secondary text-on-secondary flex items-center justify-center font-bold text-xs">AK</div>
                        <div>
                          <p className="font-bold">Ananya Kapoor</p>
                          <p className="text-xs text-outline">ananya.k@design.in</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-outline">Boutique Owner</td>
                    <td className="text-outline">Jaipur, RJ</td>
                    <td>
                      <span className="bg-[#e2f5e8] text-[#1c7841] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#c1e6cd]">Verified</span>
                    </td>
                    <td className="text-right">
                      <button className="text-outline hover:text-on-surface p-1"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-surface-container transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-tertiary-container text-tertiary flex items-center justify-center font-bold text-xs">SS</div>
                        <div>
                          <p className="font-bold">Siddharth Singh</p>
                          <p className="text-xs text-outline">sid.loom@craft.com</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium text-outline">Wholesale Buyer</td>
                    <td className="text-outline">Delhi, NCR</td>
                    <td>
                      <span className="bg-[#faebe1] text-[#b4561b] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-[#f0d6c4]">Reviewing</span>
                    </td>
                    <td className="text-right">
                      <button className="text-outline hover:text-on-surface p-1"><MoreVertical className="w-4 h-4" /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </ProtectedRoute>
  );
}

function PenToolIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="m2 2 7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>;
}

function TrendingUpIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}

function ColorIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
}

function MeasureIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h16M4 14h16M2 7v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2zM8 10v4M12 10v4M16 10v4"/></svg>;
}
