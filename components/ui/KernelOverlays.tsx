"use client";

import React from "react";
import { useKernel } from "@/components/providers/KernelProvider";
import { motion, AnimatePresence } from "framer-motion";

export function KernelOverlays() {
  const { isKernelMode } = useKernel();

  return (
    <AnimatePresence>
      {isKernelMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] pointer-events-none overflow-hidden"
        >
          {/* Global Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Kernel Status Indicator */}
          <div className="absolute top-24 right-6 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-full backdrop-blur-md">
            <p className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest animate-pulse">
              // KERNEL.EXECUTION_TRACE: ACTIVE
            </p>
          </div>

          {/* Component Boundary Highlights (via CSS) */}
          <style jsx global>{`
            .kernel-mode * {
              outline: 1px solid rgba(255, 0, 0, 0.05) !important;
            }
            .kernel-mode *:hover {
              outline: 1px solid rgba(239, 68, 68, 0.3) !important;
              background: rgba(239, 68, 68, 0.02) !important;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
