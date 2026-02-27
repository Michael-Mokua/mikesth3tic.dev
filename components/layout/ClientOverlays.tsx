"use client";

import { useState, useEffect } from "react";
import { Preloader } from "@/components/ui/Preloader";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorSpotlight } from "@/components/ui/CursorSpotlight";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AIChatbot } from "@/components/chat/AIChatbot";
import { Toaster } from "@/components/ui/Toaster";
import { KonamiOverlay } from "@/components/ui/KonamiOverlay";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export function ClientOverlays() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            <Preloader />
            <AnimatedCursor />
            <ScrollProgress />
            <CursorSpotlight />
            <CommandPalette />
            <AIChatbot />
            <Toaster />
            <KonamiOverlay />
            <WhatsAppButton />
        </>
    );
}
