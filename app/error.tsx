"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Home, AlertCircle } from "lucide-react";
import { HeroBackground } from "@/components/home/HeroBackground";
import Magnetic from "@/components/ui/Magnetic";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
            <HeroBackground />

            <div className="relative z-10 max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="glass rounded-[3rem] p-12 md:p-16 border border-white/10 bg-white/[0.02] backdrop-blur-3xl"
                >
                    <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
                        <AlertCircle className="w-10 h-10 text-red-500" />
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
                        System <span className="text-red-500">Anomaly.</span>
                    </h1>

                    <p className="text-lg text-white/50 mb-12 max-w-sm mx-auto leading-relaxed">
                        An unexpected core error has occurred. The system is attempting to stabilize.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Magnetic>
                            <button
                                onClick={() => reset()}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white text-black font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                <RefreshCcw className="w-5 h-5" />
                                Retry System
                            </button>
                        </Magnetic>

                        <Magnetic>
                            <button
                                onClick={() => window.location.href = "/"}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold transition-all hover:bg-white/10"
                            >
                                <Home className="w-5 h-5" />
                                Emergency Exit
                            </button>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
