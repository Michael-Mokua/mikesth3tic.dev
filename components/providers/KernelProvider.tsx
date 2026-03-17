"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface KernelContextType {
  isKernelMode: boolean;
  toggleKernelMode: () => void;
}

const KernelContext = createContext<KernelContextType | undefined>(undefined);

export function KernelProvider({ children }: { children: ReactNode }) {
  const [isKernelMode, setIsKernelMode] = useState(false);

  const toggleKernelMode = useCallback(() => {
    setIsKernelMode((prev) => !prev);
  }, []);

  return (
    <KernelContext.Provider value={{ isKernelMode, toggleKernelMode }}>
      <div className={isKernelMode ? "kernel-mode" : ""}>
        {children}
      </div>
    </KernelContext.Provider>
  );
}

export function useKernel() {
  const context = useContext(KernelContext);
  if (context === undefined) {
    throw new Error("useKernel must be used within a KernelProvider");
  }
  return context;
}
