"use client";

import { useCallback, useRef, useEffect } from "react";

export function useSound() {
    const audioContextRef = useRef<AudioContext | null>(null);

    const initAudio = useCallback(() => {
        if (typeof window === "undefined") return;
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (audioContextRef.current.state === "suspended") {
            audioContextRef.current.resume();
        }
    }, []);

    const playHover = useCallback(() => {
        initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        // futuristic soft tick
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    }, [initAudio]);

    const playClick = useCallback(() => {
        initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        // deep satisfying mechanical click
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        // add a bit of white noise for a tactile feel (optional, omitted for purity)

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.09);
    }, [initAudio]);

    const playType = useCallback(() => {
        initAudio();
        const ctx = audioContextRef.current;
        if (!ctx) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime); 

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.04);
    }, [initAudio]);

    return { playHover, playClick, playType, initAudio };
}
