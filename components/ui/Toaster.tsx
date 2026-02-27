"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

let toastQueue: ((toast: Omit<Toast, "id">) => void)[] = [];

export function toast(message: string, type: ToastType = "info") {
    toastQueue.forEach((fn) => fn({ message, type }));
}

export function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    useEffect(() => {
        const addToast = (t: Omit<Toast, "id">) => {
            const id = Math.random().toString(36).slice(2);
            setToasts((prev) => [...prev, { ...t, id }]);
            setTimeout(() => {
                setToasts((prev) => prev.filter((item) => item.id !== id));
            }, 4000);
        };
        toastQueue.push(addToast);
        return () => {
            toastQueue = toastQueue.filter((fn) => fn !== addToast);
        };
    }, []);

    const icons = {
        success: <CheckCircle className="w-4 h-4 text-green-400" />,
        error: <XCircle className="w-4 h-4 text-red-400" />,
        info: <AlertCircle className="w-4 h-4 text-electric-400" />,
    };

    return (
        <div className="fixed bottom-6 left-6 z-[300] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0, x: -60, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -60, scale: 0.9 }}
                        className="glass border border-white/[0.1] rounded-xl px-4 py-3 flex items-center gap-3 pointer-events-auto max-w-xs shadow-xl"
                    >
                        {icons[t.type]}
                        <p className="text-sm text-foreground flex-1">{t.message}</p>
                        <button
                            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
