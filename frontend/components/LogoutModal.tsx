"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="relative bg-card w-full max-w-sm rounded-3xl border border-border shadow-2xl p-6 overflow-hidden"
          >
             <div className="mx-auto w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
               <LogOut className="w-5 h-5 absolute -ml-1" />
             </div>
             <h2 className="text-xl font-bold tracking-tight text-center mb-2">Ready to Leave?</h2>
             <p className="text-center text-muted-foreground text-sm mb-8 px-4 leading-relaxed">
               Are you sure you want to log out of your account?
             </p>
             <div className="flex gap-3">
               <button 
                 onClick={onClose} 
                 className="flex-1 px-4 py-3 bg-muted text-foreground font-semibold rounded-xl hover:bg-muted/80 transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={onConfirm} 
                 className="flex-1 px-4 py-3 bg-foreground text-background font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-foreground/10"
               >
                 Log Out
               </button>
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
