"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Project } from "@/lib/projects";
import { PROJECTS_CONFIG } from "@/projects.config";

export interface ZoneData {
  id: string;
  name: string;
  projectSlug?: string;
  isEasterEgg?: boolean;
  easterEggText?: string;
  position: [number, number, number];
  color: string;
  project?: Project;
}

interface NairobiEnvironmentProps {
  projects: Project[];
  matatuPos: [number, number, number];
  onZoneNearby: (zone: ZoneData | null) => void;
}

// ── Palette ──────────────────────────────────────────────────────────────────
const AMBER = "#f59e0b";
const OCHRE = "#ea580c";
const EMERALD = "#10b981";
const DEEP_AMBER = "#b45309";
const WARM_WHITE = "#fff8ec";
const NEON_GREEN = "#22c55e";

// ── Shared materials (created once, reused) ──────────────────────────────────
const roadMat = new THREE.MeshStandardMaterial({ color: "#10100f", roughness: 0.85, metalness: 0.05 });
const curbMat = new THREE.MeshStandardMaterial({ color: "#1c1c18", roughness: 0.9 });
const groundMat = new THREE.MeshStandardMaterial({ color: "#0b0b09", roughness: 0.95 });

// ── Main Environment Component ───────────────────────────────────────────────
export function NairobiEnvironment({ projects, matatuPos, onZoneNearby }: NairobiEnvironmentProps) {
  const sunRef = useRef<THREE.DirectionalLight>(null);

  const zones: ZoneData[] = useMemo(() => {
    const list: ZoneData[] = [];
    const defaultPositions: [number, number, number][] = [
      [-18, 0, -16],
      [ 18, 0, -16],
      [-22, 0,  16],
      [ 22, 0,  16],
      [  0, 0, -28],
      [  0, 0,  28],
    ];
    const zoneColors = [AMBER, EMERALD, OCHRE, "#3b82f6", "#a855f7", NEON_GREEN];

    projects.slice(0, 6).forEach((project, index) => {
      const override = PROJECTS_CONFIG.overrides[project.slug];
      const pos = override?.zone3D?.position || defaultPositions[index] || [0, 0, 0];
      const color = override?.zone3D?.color || zoneColors[index % zoneColors.length];
      list.push({
        id: project.slug,
        name: override?.zone3D?.name || project.title,
        projectSlug: project.slug,
        position: pos,
        color,
        project,
        easterEggText: override?.zone3D?.easterEgg,
      });
    });

    list.push({
      id: "joska-farm",
      name: "🌾 Joska Farm · Old Kangundo Road",
      isEasterEgg: true,
      position: [-36, 0, -32],
      color: "#84cc16",
      easterEggText: "Where it all started: Joska, Machakos county. Farming crops taught me to build software that withstands drought and scales with care.",
    });
    list.push({
      id: "kabarak-campus",
      name: "🎓 Kabarak University (Class of '26)",
      isEasterEgg: true,
      position: [36, 0, -32],
      color: "#3b82f6",
      easterEggText: "Final-year BSc IT coursework, late-night hackathons, and systems engineering foundations in Nakuru.",
    });

    return list;
  }, [projects]);

  useFrame(({ clock }) => {
    // Slow animated sun arc – golden hour feel
    if (sunRef.current) {
      const t = clock.getElapsedTime() * 0.04;
      sunRef.current.position.set(
        Math.sin(t) * 60,
        18 + Math.sin(t * 0.5) * 8,
        Math.cos(t) * 40
      );
    }

    const cx = matatuPos[0];
    const cz = matatuPos[2];
    let closestZone: ZoneData | null = null;
    let minDist = 5.5;
    for (const z of zones) {
      const dist = Math.sqrt((cx - z.position[0]) ** 2 + (cz - z.position[2]) ** 2);
      if (dist < minDist) { minDist = dist; closestZone = z; }
    }
    onZoneNearby(closestZone);
  });

  return (
    <group>
      {/* ── Fog – warm amber haze ──────────────────────────────────── */}
      <fog attach="fog" args={["#1a0d00", 32, 110]} />

      {/* ── Sky dome ──────────────────────────────────────────────── */}
      <mesh>
        <sphereGeometry args={[130, 32, 16]} />
        <meshBasicMaterial color="#0e0602" side={THREE.BackSide} />
      </mesh>

      {/* Horizon glow band */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[125, 125, 18, 64, 1, true]} />
        <meshBasicMaterial color="#7c2d12" side={THREE.BackSide} transparent opacity={0.35} />
      </mesh>

      {/* ── Lighting ──────────────────────────────────────────────── */}
      <ambientLight intensity={0.22} color="#4a2800" />

      {/* Golden-hour sun */}
      <directionalLight
        ref={sunRef}
        position={[45, 18, 20]}
        intensity={3.2}
        color="#ff9500"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={120}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-bias={-0.0004}
      />

      {/* Cool city-bounce fill */}
      <directionalLight position={[-30, 12, -20]} intensity={0.5} color="#1e3a8a" />

      {/* Warm ground hemisphere */}
      <hemisphereLight args={["#ff6b00", "#0a0600", 0.4]} />

      {/* ── Ground ────────────────────────────────────────────────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[160, 160]} />
        <primitive object={groundMat} />
      </mesh>

      {/* ── Road network ──────────────────────────────────────────── */}
      <Roads />

      {/* ── Center roundabout ─────────────────────────────────────── */}
      <Roundabout />

      {/* ── Street lamps ──────────────────────────────────────────── */}
      <StreetLamps />

      {/* ── Graffiti perimeter walls ──────────────────────────────── */}
      <GraffitiWalls />

      {/* ── Acacia trees ──────────────────────────────────────────── */}
      <AcaciaTrees />

      {/* ── Project zones ─────────────────────────────────────────── */}
      {zones.map((zone) => (
        <ProjectZone key={zone.id} zone={zone} />
      ))}

      {/* ── Nairobi skyline ───────────────────────────────────────── */}
      <NairobiSkyline />
    </group>
  );
}

// ── Roads ────────────────────────────────────────────────────────────────────
function Roads() {
  return (
    <group>
      {/* N-S main boulevard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[9, 100]} />
        <primitive object={roadMat} />
      </mesh>
      {/* E-W main boulevard */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]} receiveShadow>
        <planeGeometry args={[100, 9]} />
        <primitive object={roadMat} />
      </mesh>

      {/* Curbs N-S */}
      {([-4.7, 4.7] as number[]).map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.02, 0]}>
          <planeGeometry args={[0.3, 100]} />
          <primitive object={curbMat} />
        </mesh>
      ))}
      {/* Curbs E-W */}
      {([-4.7, 4.7] as number[]).map((z, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, z]}>
          <planeGeometry args={[100, 0.3]} />
          <primitive object={curbMat} />
        </mesh>
      ))}

      {/* Amber center dashes N-S */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={`dns-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.022, -42 + i * 6.5]}>
          <planeGeometry args={[0.12, 3.2]} />
          <meshBasicMaterial color={AMBER} />
        </mesh>
      ))}
      {/* Amber center dashes E-W */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={`dew-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[-42 + i * 6.5, 0.022, 0]}>
          <planeGeometry args={[3.2, 0.12]} />
          <meshBasicMaterial color={AMBER} />
        </mesh>
      ))}

      {/* Outer ring road segments */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i / 24) * Math.PI * 2;
        const r = 32;
        return (
          <mesh
            key={`ring-${i}`}
            rotation={[-Math.PI / 2, 0, angle]}
            position={[Math.sin(angle) * r, 0.012, Math.cos(angle) * r]}
          >
            <planeGeometry args={[0.8, 8.4]} />
            <meshStandardMaterial color="#13130e" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Roundabout ───────────────────────────────────────────────────────────────
function Roundabout() {
  const diamondRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (diamondRef.current) {
      diamondRef.current.rotation.y = clock.getElapsedTime() * 0.4;
      diamondRef.current.position.y = 3.5 + Math.sin(clock.getElapsedTime() * 1.5) * 0.18;
    }
  });

  return (
    <group>
      {/* Tarmac ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[4.8, 8.2, 48]} />
        <meshStandardMaterial color={OCHRE} roughness={0.5} metalness={0.1} />
      </mesh>
      {/* Center island */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[4.5, 4.8, 0.7, 48]} />
        <meshStandardMaterial color="#0e0e0a" roughness={0.8} />
      </mesh>
      {/* Monument plinth */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.85, 1.1, 1.6, 8]} />
        <meshStandardMaterial color="#1a1208" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Spinning golden diamond */}
      <mesh ref={diamondRef} position={[0, 3.5, 0]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={AMBER}
          metalness={0.95}
          roughness={0.05}
          emissive={DEEP_AMBER}
          emissiveIntensity={0.6}
        />
      </mesh>
      <pointLight position={[0, 4.5, 0]} color={AMBER} intensity={8} distance={18} decay={2} />
      <pointLight position={[0, 1, 0]} color={OCHRE} intensity={3} distance={10} decay={2} />
    </group>
  );
}

// ── Street Lamps ─────────────────────────────────────────────────────────────
function StreetLamps() {
  const lampPositions: [number, number, number][] = [
    [-5.5, 0, -20], [5.5, 0, -20],
    [-5.5, 0,  20], [5.5, 0,  20],
    [-5.5, 0,   0], [5.5, 0,   0],
    [-20, 0, -5.5], [-20, 0, 5.5],
    [ 20, 0, -5.5], [ 20, 0, 5.5],
    [-5.5, 0, -38], [5.5, 0, -38],
    [-5.5, 0,  38], [5.5, 0,  38],
    [-38, 0, -5.5], [-38, 0, 5.5],
    [ 38, 0, -5.5], [ 38, 0, 5.5],
  ];

  return (
    <group>
      {lampPositions.map(([x, , z], i) => {
        const armX = x > 0 ? -0.9 : 0.9;
        return (
          <group key={i} position={[x, 0, z]}>
            {/* Pole */}
            <mesh position={[0, 2.6, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.09, 5.2, 8]} />
              <meshStandardMaterial color="#2a2820" roughness={0.6} metalness={0.8} />
            </mesh>
            {/* Arm */}
            <mesh position={[armX / 2, 5.0, 0]}>
              <boxGeometry args={[1.0, 0.08, 0.08]} />
              <meshStandardMaterial color="#2a2820" roughness={0.6} metalness={0.8} />
            </mesh>
            {/* Fixture */}
            <mesh position={[armX, 5.0, 0]}>
              <boxGeometry args={[0.35, 0.2, 0.35]} />
              <meshStandardMaterial color="#1a1810" roughness={0.4} metalness={0.7} />
            </mesh>
            {/* Lamp face */}
            <mesh position={[armX, 4.88, 0]}>
              <boxGeometry args={[0.28, 0.04, 0.28]} />
              <meshBasicMaterial color={WARM_WHITE} />
            </mesh>
            {/* Light */}
            <pointLight position={[armX, 4.7, 0]} color="#ffe8b0" intensity={4} distance={14} decay={2} />
          </group>
        );
      })}
    </group>
  );
}

// ── Graffiti Walls ───────────────────────────────────────────────────────────
const GRAFFITI_PALETTE = [OCHRE, AMBER, EMERALD, "#e11d48", "#7c3aed", NEON_GREEN, "#06b6d4"];

interface GraffitiWallProps {
  position: [number, number, number];
  rotation: [number, number, number];
  w: number;
  h: number;
  colors: string[];
}

function GraffitiWall({ position, rotation, w, h, colors }: GraffitiWallProps) {
  const panels = useMemo(() => {
    const arr = [];
    const cols = Math.floor(w / 1.1);
    for (let c = 0; c < cols; c++) {
      const color = colors[c % colors.length];
      const pw = 0.85 + (c * 0.13) % 0.6;
      const ph = 0.4 + (c * 0.31) % (h * 0.55);
      arr.push({ cx: -w / 2 + c * (w / cols) + pw / 2, cy: ph / 2, pw, ph, color });
    }
    return arr;
  }, [w, h, colors]);

  return (
    <group position={position} rotation={rotation}>
      {/* Base wall */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, h, 0.22]} />
        <meshStandardMaterial color="#0d0d09" roughness={0.95} />
      </mesh>
      {/* Graffiti panels */}
      {panels.map((p, i) => (
        <mesh key={i} position={[p.cx, p.cy - h / 2 + 0.05, 0.13]}>
          <boxGeometry args={[p.pw, p.ph, 0.04]} />
          <meshStandardMaterial
            color={p.color}
            roughness={0.6}
            metalness={0.1}
            emissive={p.color}
            emissiveIntensity={0.14}
          />
        </mesh>
      ))}
      {/* Neon top strip */}
      <mesh position={[0, h / 2 + 0.05, 0.05]}>
        <boxGeometry args={[w, 0.08, 0.06]} />
        <meshBasicMaterial color={colors[0]} />
      </mesh>
      <pointLight position={[0, h / 2 + 0.3, 0.3]} color={colors[0]} intensity={1.2} distance={6} decay={2} />
    </group>
  );
}

function GraffitiWalls() {
  return (
    <group>
      <GraffitiWall position={[-12, 1.5, -49]} rotation={[0, 0, 0]} w={16} h={3} colors={[OCHRE, AMBER, "#e11d48"]} />
      <GraffitiWall position={[ 12, 1.5, -49]} rotation={[0, 0, 0]} w={16} h={3} colors={[EMERALD, NEON_GREEN, AMBER]} />
      <GraffitiWall position={[-49, 1.5, -12]} rotation={[0,  Math.PI / 2, 0]} w={16} h={3} colors={["#7c3aed", "#e11d48", AMBER]} />
      <GraffitiWall position={[-49, 1.5,  12]} rotation={[0,  Math.PI / 2, 0]} w={16} h={3} colors={[AMBER, OCHRE, NEON_GREEN]} />
      <GraffitiWall position={[ 49, 1.5, -12]} rotation={[0, -Math.PI / 2, 0]} w={16} h={3} colors={["#06b6d4", EMERALD, AMBER]} />
      <GraffitiWall position={[ 49, 1.5,  12]} rotation={[0, -Math.PI / 2, 0]} w={16} h={3} colors={[OCHRE, "#7c3aed", NEON_GREEN]} />
      <GraffitiWall position={[ 12, 1.5,  49]} rotation={[0,  Math.PI, 0]} w={16} h={3} colors={[AMBER, "#e11d48", EMERALD]} />
      <GraffitiWall position={[-12, 1.5,  49]} rotation={[0,  Math.PI, 0]} w={16} h={3} colors={[NEON_GREEN, OCHRE, "#06b6d4"]} />
    </group>
  );
}

// ── Acacia Trees ─────────────────────────────────────────────────────────────
function AcaciaTrees() {
  const positions: [number, number, number][] = [
    [-10, 0, -10], [10, 0, -10], [-10, 0, 10], [10, 0, 10],
    [-28, 0, -8],  [28, 0, -8],  [-28, 0,  8], [28, 0,  8],
    [-8,  0, -28], [8,  0, -28], [-8,  0, 28], [8,  0, 28],
    [-20, 0, -42], [20, 0, -42], [-42, 0, -20], [42, 0, 20],
    [-15, 0,  38], [15, 0,  38],
  ];

  return (
    <group>
      {positions.map(([x, y, z], i) => {
        const scale = 0.8 + (i % 3) * 0.2;
        return (
          <group key={i} position={[x, y, z]} scale={scale}>
            <mesh position={[0, 1.4, 0]} castShadow>
              <cylinderGeometry args={[0.18, 0.28, 2.8, 7]} />
              <meshStandardMaterial color="#3d1a00" roughness={0.95} />
            </mesh>
            <mesh position={[0, 3.1, 0]} castShadow>
              <cylinderGeometry args={[2.5, 1.4, 0.55, 8]} />
              <meshStandardMaterial color="#14532d" roughness={0.8} emissive="#052e16" emissiveIntensity={0.05} />
            </mesh>
            <mesh position={[0.25, 3.6, -0.15]} castShadow>
              <cylinderGeometry args={[1.6, 0.9, 0.4, 7]} />
              <meshStandardMaterial color="#166534" roughness={0.8} />
            </mesh>
            <pointLight position={[0, 1.8, 0]} color="#ff8c00" intensity={0.4} distance={5} decay={2} />
          </group>
        );
      })}
    </group>
  );
}

// ── Project Zone ─────────────────────────────────────────────────────────────
function ProjectZone({ zone }: { zone: ZoneData }) {
  const floatRef  = useRef<THREE.Group>(null);
  const ringRef   = useRef<THREE.Mesh>(null);
  const neonRef   = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (floatRef.current) {
      floatRef.current.position.y = 4.5 + Math.sin(t * 1.1 + zone.position[0]) * 0.3;
      floatRef.current.rotation.y = t * 0.5;
    }
    if (ringRef.current) {
      (ringRef.current as THREE.Mesh).rotation.z = t * 0.6;
    }
    if (neonRef.current) {
      neonRef.current.intensity = 2.5 + Math.sin(t * 2.5 + zone.position[2]) * 0.8;
    }
  });

  return (
    <group position={zone.position}>
      {/* Ground halo */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[5, 48]} />
        <meshBasicMaterial color={zone.color} transparent opacity={0.06} />
      </mesh>

      {/* Pedestal */}
      <mesh position={[0, 0.3, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[3.6, 4.0, 0.6, 32]} />
        <meshStandardMaterial
          color="#111109"
          roughness={0.5}
          metalness={0.5}
          emissive={zone.color}
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Spinning torus ring */}
      <mesh ref={ringRef} position={[0, 0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.09, 16, 80]} />
        <meshBasicMaterial color={zone.color} />
      </mesh>

      {/* Kiosk tower */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <boxGeometry args={[1.3, 3.2, 1.3]} />
        <meshStandardMaterial color="#0e0e0a" roughness={0.25} metalness={0.85} />
      </mesh>

      {/* Screen face */}
      <mesh position={[0, 2.25, 0.68]}>
        <boxGeometry args={[1.05, 0.9, 0.04]} />
        <meshStandardMaterial
          color={zone.color}
          roughness={0.05}
          metalness={0.2}
          emissive={zone.color}
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* CRT scanline overlay */}
      <mesh position={[0, 2.25, 0.705]}>
        <boxGeometry args={[1.0, 0.86, 0.01]} />
        <meshStandardMaterial color="#000000" transparent opacity={0.18} />
      </mesh>

      {/* Name plate */}
      <mesh position={[0, 1.08, 0.67]}>
        <boxGeometry args={[1.1, 0.18, 0.04]} />
        <meshBasicMaterial color={zone.color} />
      </mesh>

      {/* Side accent stripes */}
      {([-0.67, 0.67] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 2.0, 0]}>
          <boxGeometry args={[0.05, 3.2, 1.3]} />
          <meshBasicMaterial color={zone.color} transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Floating holographic icon */}
      <group ref={floatRef} position={[0, 4.5, 0]}>
        {zone.isEasterEgg ? (
          <mesh>
            <icosahedronGeometry args={[0.65, 0]} />
            <meshStandardMaterial
              color={zone.color}
              metalness={0.8}
              roughness={0.15}
              emissive={zone.color}
              emissiveIntensity={0.5}
            />
          </mesh>
        ) : (
          <>
            <mesh>
              <octahedronGeometry args={[0.65, 0]} />
              <meshStandardMaterial
                color={zone.color}
                metalness={0.92}
                roughness={0.08}
                emissive={zone.color}
                emissiveIntensity={0.4}
                wireframe
              />
            </mesh>
            <mesh scale={0.78}>
              <octahedronGeometry args={[0.65, 0]} />
              <meshStandardMaterial
                color={zone.color}
                metalness={0.85}
                roughness={0.1}
                emissive={zone.color}
                emissiveIntensity={0.6}
                transparent
                opacity={0.5}
              />
            </mesh>
          </>
        )}
      </group>

      {/* Pulsing zone light */}
      <pointLight ref={neonRef} position={[0, 3.5, 0]} color={zone.color} intensity={2.5} distance={10} decay={2} />

      {/* Upward spotlight column */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.15}
        penumbra={0.8}
        intensity={6}
        color={zone.color}
        distance={18}
        decay={2}
      />
    </group>
  );
}

// ── Nairobi Skyline ───────────────────────────────────────────────────────────
function NairobiSkyline() {
  const buildings = useMemo(() => {
    const list: {
      x: number; z: number; height: number; width: number;
      hasNeon: boolean; neonColor: string; id: number;
    }[] = [];
    const count = 28;
    const radius = 58;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (i % 4) * 4;
      list.push({
        x: Math.sin(angle) * r,
        z: Math.cos(angle) * r,
        height: 14 + (i % 6) * 9,
        width: 3.5 + (i % 3) * 2,
        hasNeon: i % 5 === 0,
        neonColor: GRAFFITI_PALETTE[i % GRAFFITI_PALETTE.length],
        id: i,
      });
    }
    return list;
  }, []);

  return (
    <group>
      {buildings.map((b) => (
        <group key={b.id} position={[b.x, b.height / 2, b.z]}>
          <mesh castShadow>
            <boxGeometry args={[b.width, b.height, b.width]} />
            <meshStandardMaterial
              color="#070706"
              roughness={0.9}
              metalness={0.4}
              emissive={b.hasNeon ? b.neonColor : "#000000"}
              emissiveIntensity={b.hasNeon ? 0.06 : 0}
            />
          </mesh>
          {/* Window light strips */}
          {Array.from({ length: Math.floor(b.height / 4) }, (_, wi) => (
            <mesh key={wi} position={[b.width / 2 + 0.01, -b.height / 2 + 2 + wi * 3.5, 0]}>
              <boxGeometry args={[0.05, 0.4, b.width * 0.8]} />
              <meshBasicMaterial color="#ffe080" transparent opacity={0.25 + (wi % 3) * 0.1} />
            </mesh>
          ))}
          {b.hasNeon && (
            <pointLight position={[0, b.height / 2 + 0.5, 0]} color={b.neonColor} intensity={1.5} distance={8} decay={2} />
          )}
        </group>
      ))}

      {/* KICC-inspired landmark tower */}
      <group position={[52, 27.5, -10]}>
        <mesh castShadow>
          <boxGeometry args={[5.5, 55, 5.5]} />
          <meshStandardMaterial color="#060605" roughness={0.85} metalness={0.5} />
        </mesh>
        <mesh position={[0, 33.5, 0]}>
          <coneGeometry args={[0.6, 12, 8]} />
          <meshStandardMaterial color="#1a1200" roughness={0.4} metalness={0.9} />
        </mesh>
        <pointLight position={[0, 40, 0]} color={AMBER} intensity={4} distance={20} decay={2} />
      </group>
    </group>
  );
}
