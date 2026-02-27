"use client";

import { useState, useCallback } from "react";

type ToastProps = {
    title: string;
    description?: string;
    variant?: "default" | "destructive";
};

// Simplified custom toast hook for the project form since Shadcn registry is failing
export function useToast() {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const toast = useCallback(({ title, description, variant = "default" }: ToastProps) => {
        // In a real app we'd render these to a portal, but for this specific portfolio refactor, 
        // the StartProject Form immediately renders a success Screen component anyway (`isSuccess`),
        // so the toast is mostly a fallback/secondary notification.
        console.log(`[TOAST: ${variant.toUpperCase()}] ${title} - ${description}`);

        // Just mapping the signature to prevent Next.js compiler crashes
        setToasts((prev) => [...prev, { title, description, variant }]);
    }, []);

    return { toast, toasts };
}
