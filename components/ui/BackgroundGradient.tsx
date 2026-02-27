"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const BackgroundGradient = ({
    className,
}: {
    className?: string;
}) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 bg-background -z-50" />;
    }

    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden w-full h-full pointer-events-none -z-50 bg-background",
                className
            )}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 mix-blend-screen pointer-events-none">
                <div className="absolute inset-0 bg-electric-400 rounded-full blur-[120px] translate-y-[-50%] animate-pulse-slow" />
            </div>

            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] opacity-10 mix-blend-screen pointer-events-none">
                <div className="absolute inset-0 bg-neon-400 rounded-full blur-[150px] animate-blob" />
            </div>

            <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] opacity-10 mix-blend-screen pointer-events-none animation-delay-2000">
                <div className="absolute inset-0 bg-electric-600 rounded-full blur-[130px] animate-blob" />
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 mix-blend-overlay" />
        </div>
    );
};
