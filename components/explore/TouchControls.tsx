"use client";

import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Volume2 } from "lucide-react";

interface TouchControlsProps {
  onControlChange: (key: "forward" | "backward" | "left" | "right" | "brake" | "horn", active: boolean) => void;
  onOpenTerminal?: () => void;
  hasNearbyZone?: boolean;
}

export function TouchControls({ onControlChange, onOpenTerminal, hasNearbyZone }: TouchControlsProps) {
  const handleTouch = (key: "forward" | "backward" | "left" | "right" | "brake" | "horn") => {
    return {
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        onControlChange(key, true);
      },
      onTouchEnd: (e: React.TouchEvent) => {
        e.preventDefault();
        onControlChange(key, false);
      },
      onMouseDown: () => onControlChange(key, true),
      onMouseUp: () => onControlChange(key, false),
      onMouseLeave: () => onControlChange(key, false),
    };
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-40 pointer-events-none flex justify-between items-end px-6 max-w-lg mx-auto w-full md:hidden select-none">
      {/* Steering (Left / Right) */}
      <div className="pointer-events-auto flex gap-2">
        <button
          {...handleTouch("left")}
          aria-label="Steer Left"
          className="w-14 h-14 rounded-2xl bg-dark-950/80 border border-white/20 active:bg-amber-500/30 active:border-amber-400 flex items-center justify-center text-zinc-300 active:text-amber-400 shadow-lg backdrop-blur-md"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          {...handleTouch("right")}
          aria-label="Steer Right"
          className="w-14 h-14 rounded-2xl bg-dark-950/80 border border-white/20 active:bg-amber-500/30 active:border-amber-400 flex items-center justify-center text-zinc-300 active:text-amber-400 shadow-lg backdrop-blur-md"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Action / Terminal / Horn */}
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        {hasNearbyZone && (
          <button
            onClick={onOpenTerminal}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider animate-bounce shadow-warm"
          >
            Open Terminal
          </button>
        )}
        <button
          {...handleTouch("horn")}
          aria-label="Horn"
          className="w-11 h-11 rounded-full bg-dark-950/80 border border-white/20 active:bg-amber-500/30 text-amber-400 text-xs font-mono font-bold flex items-center justify-center backdrop-blur-md"
        >
          HONK
        </button>
      </div>

      {/* Gas (Forward) & Reverse */}
      <div className="pointer-events-auto flex flex-col gap-2">
        <button
          {...handleTouch("forward")}
          aria-label="Gas / Forward"
          className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 active:bg-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg backdrop-blur-md"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
        <button
          {...handleTouch("backward")}
          aria-label="Reverse"
          className="w-14 h-14 rounded-2xl bg-dark-950/80 border border-white/20 active:bg-red-500/30 active:border-red-400 flex items-center justify-center text-zinc-300 active:text-red-400 shadow-lg backdrop-blur-md"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
