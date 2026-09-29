"use client";

import { useState, useEffect, useCallback, Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { Volume2, VolumeX, X, HelpCircle, Gauge, Radio, Sparkles, Zap } from "lucide-react";
import { MatatuCar } from "./MatatuCar";
import { NairobiEnvironment, ZoneData } from "./NairobiEnvironment";
import { RetroTerminalModal } from "./RetroTerminalModal";
import { TouchControls } from "./TouchControls";
import { retroAudio } from "./RetroAudio";
import { Project } from "@/lib/projects";

// Post-processing – lazy-loaded so standard mode never pays the cost
const PostFX = lazy(() =>
  import("./PostFX").then((m) => ({ default: m.PostFX }))
);

interface ExploreModeProps {
  projects: Project[];
  onClose: () => void;
}

export function ExploreMode({ projects, onClose }: ExploreModeProps) {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    brake: false,
    horn: false,
  });

  const [matatuPos, setMatatuPos] = useState<[number, number, number]>([0, 0, 0]);
  const [speedKmH, setSpeedKmH]   = useState(0);
  const [fps, setFps]             = useState(60);
  const [isMuted, setIsMuted]     = useState(true);
  const [nearbyZone, setNearbyZone]           = useState<ZoneData | null>(null);
  const [activeTerminalZone, setActiveTerminalZone] = useState<ZoneData | null>(null);
  const [showHelp, setShowHelp]   = useState(false);

  // FPS counter
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 1000) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      return requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (activeTerminalZone) {
        if (e.key === "Escape") setActiveTerminalZone(null);
        return;
      }
      switch (e.key.toLowerCase()) {
        case "w": case "arrowup":    setControls((p) => ({ ...p, forward:  true })); break;
        case "s": case "arrowdown":  setControls((p) => ({ ...p, backward: true })); break;
        case "a": case "arrowleft":  setControls((p) => ({ ...p, left:     true })); break;
        case "d": case "arrowright": setControls((p) => ({ ...p, right:    true })); break;
        case " ":                    setControls((p) => ({ ...p, brake:    true })); break;
        case "h":                    setControls((p) => ({ ...p, horn:     true })); break;
        case "e":
          if (nearbyZone) { retroAudio.playZonePing(); setActiveTerminalZone(nearbyZone); }
          break;
        case "escape": onClose(); break;
      }
    };
    const up = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "w": case "arrowup":    setControls((p) => ({ ...p, forward:  false })); break;
        case "s": case "arrowdown":  setControls((p) => ({ ...p, backward: false })); break;
        case "a": case "arrowleft":  setControls((p) => ({ ...p, left:     false })); break;
        case "d": case "arrowright": setControls((p) => ({ ...p, right:    false })); break;
        case " ":                    setControls((p) => ({ ...p, brake:    false })); break;
        case "h":                    setControls((p) => ({ ...p, horn:     false })); break;
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [activeTerminalZone, nearbyZone, onClose]);

  const handleSoundToggle = () => {
    const next = !isMuted;
    setIsMuted(next);
    retroAudio.setMuted(next);
  };

  const handlePositionUpdate = useCallback((pos: [number, number, number], speed: number) => {
    setMatatuPos(pos);
    setSpeedKmH(speed);
  }, []);

  const handleTouchControl = (key: "forward"|"backward"|"left"|"right"|"brake"|"horn", active: boolean) => {
    setControls((p) => ({ ...p, [key]: active }));
  };

  const fpsColor = fps >= 45 ? "#10b981" : fps >= 28 ? "#f59e0b" : "#ef4444";

  return (
    <div className="fixed inset-0 z-50 bg-[#070704] flex flex-col overflow-hidden select-none">

      {/* ── 3D Canvas ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <Suspense
          fallback={
            <div className="h-full w-full flex flex-col items-center justify-center bg-[#070704]" aria-live="polite">
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 rounded-full border-2 border-amber-400/30 animate-ping" />
                <div className="absolute inset-2 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
              </div>
              <p className="text-amber-400 font-mono text-xs uppercase tracking-[0.25em]">
                Nairobi Loading…
              </p>
              <p className="text-zinc-600 font-mono text-[10px] mt-2">
                Piga honi ukifika 🚌
              </p>
            </div>
          }
        >
          <Canvas
            shadows="soft"
            camera={{ position: [0, 6, -10], fov: 55, near: 0.5, far: 200 }}
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              powerPreference: "high-performance",
              toneMapping: 4,          // ACESFilmicToneMapping
              toneMappingExposure: 1.1,
            }}
          >
            <MatatuCar controls={controls} onPositionUpdate={handlePositionUpdate} />
            <NairobiEnvironment
              projects={projects}
              matatuPos={matatuPos}
              onZoneNearby={setNearbyZone}
            />
            {/* Post-processing: Bloom + chromatic aberration */}
            <Suspense fallback={null}>
              <PostFX />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>

      {/* ── Top HUD ────────────────────────────────────────────────────── */}
      <div className="relative z-30 p-4 sm:p-5 flex items-center justify-between pointer-events-none">
        {/* Left: Telemetry */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-black/60 border border-white/10 text-xs font-mono backdrop-blur-xl">
            <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
            <span className="text-amber-400 font-bold hidden sm:inline">NAIROBI OS</span>
            <span className="w-px h-3 bg-white/15 hidden sm:block" />
            <Gauge className="w-3 h-3 text-zinc-400" />
            <span className="text-white tabular-nums">{speedKmH}<span className="text-zinc-500 text-[10px] ml-0.5">km/h</span></span>
            <span className="w-px h-3 bg-white/15" />
            <span style={{ color: fpsColor }} className="tabular-nums text-[10px]">{fps}<span className="text-zinc-600 ml-0.5">fps</span></span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound */}
          <button
            onClick={handleSoundToggle}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="p-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-amber-400/40 text-zinc-400 hover:text-amber-400 transition-all backdrop-blur-xl cursor-pointer"
          >
            {isMuted
              ? <VolumeX className="w-4 h-4 text-zinc-600" />
              : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Help */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            aria-label="Controls guide"
            className="hidden sm:flex p-2.5 rounded-xl bg-black/60 border border-white/10 hover:border-amber-400/40 text-zinc-400 hover:text-amber-400 transition-all backdrop-blur-xl cursor-pointer"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Exit */}
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/35 hover:bg-red-500/25 text-red-300 hover:text-red-200 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-xl cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit 3D</span>
          </button>
        </div>
      </div>

      {/* ── Help overlay ──────────────────────────────────────────────── */}
      {showHelp && (
        <div className="absolute top-20 right-4 sm:right-5 z-40 p-5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl text-xs font-mono text-zinc-300 space-y-2 max-w-[220px]">
          <p className="text-amber-400 font-bold mb-3 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Controls
          </p>
          {[
            ["W / ↑", "Accelerate"],
            ["S / ↓", "Reverse"],
            ["A / ←", "Steer left"],
            ["D / →", "Steer right"],
            ["Space", "Brake"],
            ["H", "Honi 📯"],
            ["E", "Open terminal"],
            ["Esc", "Exit 3D"],
          ].map(([key, label]) => (
            <div key={key} className="flex justify-between gap-4">
              <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white text-[10px]">{key}</kbd>
              <span className="text-zinc-400">{label}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Zone proximity banner ─────────────────────────────────────── */}
      {nearbyZone && !activeTerminalZone && (
        <div className="absolute top-[72px] left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
          <button
            onClick={() => { retroAudio.playZonePing(); setActiveTerminalZone(nearbyZone); }}
            className="group px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-2.5 shadow-[0_0_40px_rgba(245,158,11,0.55)] hover:shadow-[0_0_60px_rgba(245,158,11,0.75)] transition-shadow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 group-hover:animate-spin" />
            <span>{nearbyZone.name}</span>
            <span className="opacity-70">· Press [E]</span>
          </button>
        </div>
      )}

      {/* ── Desktop control hint ──────────────────────────────────────── */}
      <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-5 py-2 rounded-full bg-black/55 border border-white/8 text-[11px] font-mono text-zinc-500 backdrop-blur-xl gap-3">
        <span>WASD / Arrows · Drive</span>
        <span className="opacity-40">|</span>
        <span>Space · Brake</span>
        <span className="opacity-40">|</span>
        <span>H · Honi</span>
        <span className="opacity-40">|</span>
        <span>E · Inspect zone</span>
      </div>

      {/* ── Mobile touch controls ─────────────────────────────────────── */}
      <TouchControls
        onControlChange={handleTouchControl}
        onOpenTerminal={() => { if (nearbyZone) { retroAudio.playZonePing(); setActiveTerminalZone(nearbyZone); } }}
        hasNearbyZone={!!nearbyZone}
      />

      {/* ── Retro CRT terminal modal ──────────────────────────────────── */}
      <RetroTerminalModal zone={activeTerminalZone} onClose={() => setActiveTerminalZone(null)} />
    </div>
  );
}
