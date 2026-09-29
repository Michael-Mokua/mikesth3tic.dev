"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { retroAudio } from "./RetroAudio";

interface MatatuCarProps {
  controls: {
    forward: boolean;
    backward: boolean;
    left: boolean;
    right: boolean;
    brake: boolean;
    horn: boolean;
  };
  onPositionUpdate: (pos: [number, number, number], speedKmH: number) => void;
}

// Matatu palette
const BODY_DARK  = "#0c0c10";
const BODY_MID   = "#181822";
const AMBER      = "#f59e0b";
const OCHRE      = "#ea580c";
const CHROME     = "#d4d8e0";
const KENYA_RED  = "#be1f2d";
const KENYA_GRN  = "#006600";

export function MatatuCar({ controls, onPositionUpdate }: MatatuCarProps) {
  const carGroup      = useRef<THREE.Group>(null);
  const flWheel       = useRef<THREE.Group>(null);
  const frWheel       = useRef<THREE.Group>(null);
  const rlWheel       = useRef<THREE.Group>(null);
  const rrWheel       = useRef<THREE.Group>(null);
  const brakeRef      = useRef<THREE.PointLight>(null);
  const underglowRef  = useRef<THREE.PointLight>(null);

  const state = useRef({
    position: new THREE.Vector3(0, 0.42, 0),
    rotation: 0,
    speed: 0,
    maxSpeed: 0.45,
    acceleration: 0.015,
    deceleration: 0.008,
    turnSpeed: 0.035,
    steerAngle: 0,
  });

  const { camera } = useThree();
  const cameraTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    if (controls.horn) retroAudio.playHorn();
  }, [controls.horn]);

  useFrame((_, delta) => {
    void delta;
    const s = state.current;
    if (!carGroup.current) return;

    // ── Physics ──────────────────────────────────────────────────
    if (controls.forward) {
      s.speed = Math.min(s.speed + s.acceleration, s.maxSpeed);
    } else if (controls.backward) {
      s.speed = Math.max(s.speed - s.acceleration * 0.7, -s.maxSpeed * 0.4);
    } else {
      s.speed = s.speed > 0
        ? Math.max(0, s.speed - s.deceleration)
        : Math.min(0, s.speed + s.deceleration);
    }
    if (controls.brake) s.speed *= 0.88;

    // ── Steering ─────────────────────────────────────────────────
    if (Math.abs(s.speed) > 0.001) {
      const dir = s.speed >= 0 ? 1 : -1;
      if (controls.left) {
        s.rotation += s.turnSpeed * dir;
        s.steerAngle = THREE.MathUtils.lerp(s.steerAngle, 0.38, 0.2);
      } else if (controls.right) {
        s.rotation -= s.turnSpeed * dir;
        s.steerAngle = THREE.MathUtils.lerp(s.steerAngle, -0.38, 0.2);
      } else {
        s.steerAngle = THREE.MathUtils.lerp(s.steerAngle, 0, 0.2);
      }
    } else {
      s.steerAngle = THREE.MathUtils.lerp(s.steerAngle, 0, 0.2);
    }

    s.position.x += Math.sin(s.rotation) * s.speed;
    s.position.z += Math.cos(s.rotation) * s.speed;
    s.position.x = THREE.MathUtils.clamp(s.position.x, -46, 46);
    s.position.z = THREE.MathUtils.clamp(s.position.z, -46, 46);

    carGroup.current.position.copy(s.position);
    carGroup.current.rotation.y = s.rotation;

    // ── Wheel rotation ───────────────────────────────────────────
    const wr = s.speed * 8;
    if (flWheel.current) { flWheel.current.rotation.x += wr; flWheel.current.rotation.y = s.steerAngle; }
    if (frWheel.current) { frWheel.current.rotation.x += wr; frWheel.current.rotation.y = s.steerAngle; }
    if (rlWheel.current) rlWheel.current.rotation.x += wr;
    if (rrWheel.current) rrWheel.current.rotation.x += wr;

    // ── Brake lights ─────────────────────────────────────────────
    if (brakeRef.current) {
      brakeRef.current.intensity = (controls.brake || s.speed < 0) ? 6 : 0.6;
    }

    // ── Underglow flicker ─────────────────────────────────────────
    if (underglowRef.current) {
      underglowRef.current.intensity = 2 + Math.sin(Date.now() * 0.003) * 0.4;
    }

    // ── Audio ─────────────────────────────────────────────────────
    retroAudio.updateEnginePitch(s.speed / s.maxSpeed);

    // ── Camera ───────────────────────────────────────────────────
    const offset = new THREE.Vector3(
      -Math.sin(s.rotation) * 8,
      4.5,
      -Math.cos(s.rotation) * 8
    );
    camera.position.lerp(s.position.clone().add(offset), 0.1);
    cameraTarget.current.lerp(s.position.clone().add(new THREE.Vector3(0, 1.2, 0)), 0.15);
    camera.lookAt(cameraTarget.current);

    const speedKmH = Math.round(Math.abs(s.speed / s.maxSpeed) * 75);
    onPositionUpdate([s.position.x, s.position.y, s.position.z], speedKmH);
  });

  return (
    <group ref={carGroup} position={[0, 0.42, 0]}>

      {/* ── Lower body ──────────────────────────────────────────── */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.62, 0.72, 3.24]} />
        <meshStandardMaterial color={BODY_DARK} roughness={0.35} metalness={0.7} />
      </mesh>

      {/* Kenyan flag stripe band along sides */}
      {/* Black base already on body. Red band. */}
      <mesh position={[0.825, 0.62, 0]}>
        <boxGeometry args={[0.02, 0.14, 2.8]} />
        <meshStandardMaterial color={KENYA_RED} roughness={0.3} emissive={KENYA_RED} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.825, 0.62, 0]}>
        <boxGeometry args={[0.02, 0.14, 2.8]} />
        <meshStandardMaterial color={KENYA_RED} roughness={0.3} emissive={KENYA_RED} emissiveIntensity={0.2} />
      </mesh>
      {/* Green band */}
      <mesh position={[0.825, 0.42, 0]}>
        <boxGeometry args={[0.02, 0.1, 2.8]} />
        <meshStandardMaterial color={KENYA_GRN} roughness={0.3} emissive={KENYA_GRN} emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-0.825, 0.42, 0]}>
        <boxGeometry args={[0.02, 0.1, 2.8]} />
        <meshStandardMaterial color={KENYA_GRN} roughness={0.3} emissive={KENYA_GRN} emissiveIntensity={0.15} />
      </mesh>

      {/* ── Cabin / upper body ──────────────────────────────────── */}
      <mesh position={[0, 1.06, -0.08]} castShadow>
        <boxGeometry args={[1.52, 0.58, 2.72]} />
        <meshStandardMaterial color={BODY_MID} roughness={0.2} metalness={0.85} />
      </mesh>

      {/* ── Roof ────────────────────────────────────────────────── */}
      <mesh position={[0, 1.4, -0.08]} castShadow>
        <boxGeometry args={[1.56, 0.13, 2.82]} />
        <meshStandardMaterial color={AMBER} roughness={0.25} metalness={0.45} emissive="#b45309" emissiveIntensity={0.1} />
      </mesh>

      {/* Roof rack bars */}
      {([-1.05, 0, 1.05] as number[]).map((z, i) => (
        <mesh key={i} position={[0, 1.48, z]}>
          <boxGeometry args={[1.5, 0.06, 0.07]} />
          <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
        </mesh>
      ))}

      {/* ── Front fascia ────────────────────────────────────────── */}
      {/* Grille */}
      <mesh position={[0, 0.42, 1.63]}>
        <boxGeometry args={[1.35, 0.38, 0.06]} />
        <meshStandardMaterial color="#0a0a0c" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Grille slots */}
      {([-0.38, -0.13, 0.13, 0.38] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.42, 1.64]}>
          <boxGeometry args={[0.06, 0.32, 0.03]} />
          <meshStandardMaterial color={AMBER} roughness={0.3} emissive={AMBER} emissiveIntensity={0.3} />
        </mesh>
      ))}

      {/* Chrome front bumper */}
      <mesh position={[0, 0.16, 1.64]}>
        <boxGeometry args={[1.58, 0.14, 0.1]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* ── Windshield ──────────────────────────────────────────── */}
      <mesh position={[0, 1.06, 0.84]}>
        <boxGeometry args={[1.44, 0.48, 0.08]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.05} metalness={0.95} transparent opacity={0.65} />
      </mesh>

      {/* ── Destination board ───────────────────────────────────── */}
      <mesh position={[0, 1.34, 1.3]}>
        <boxGeometry args={[1.12, 0.2, 0.05]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>
      {/* "NAIROBI" text plate glow */}
      <pointLight position={[0, 1.34, 1.38]} color={AMBER} intensity={1.2} distance={3} decay={2} />

      {/* ── Headlights (quad) ───────────────────────────────────── */}
      {/* Main beams */}
      {([0.52, -0.52] as number[]).map((x, i) => (
        <group key={i} position={[x, 0.46, 1.63]}>
          <mesh>
            <boxGeometry args={[0.28, 0.16, 0.05]} />
            <meshBasicMaterial color="#fef9c3" />
          </mesh>
          {/* DRL inner */}
          <mesh position={[0, 0, 0.04]}>
            <boxGeometry args={[0.14, 0.06, 0.02]} />
            <meshBasicMaterial color="#fef08a" />
          </mesh>
        </group>
      ))}
      {/* Headlight spotlights */}
      <spotLight
        position={[0.5, 0.46, 1.62]}
        angle={0.55}
        penumbra={0.5}
        intensity={4}
        color="#fff5d6"
        distance={28}
        decay={2}
      />
      <spotLight
        position={[-0.5, 0.46, 1.62]}
        angle={0.55}
        penumbra={0.5}
        intensity={4}
        color="#fff5d6"
        distance={28}
        decay={2}
      />

      {/* ── Indicator lights (amber) ─────────────────────────────── */}
      <mesh position={[0.78, 0.46, 1.58]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>
      <mesh position={[-0.78, 0.46, 1.58]}>
        <boxGeometry args={[0.1, 0.1, 0.04]} />
        <meshBasicMaterial color={AMBER} />
      </mesh>

      {/* ── Rear ───────────────────────────────────────────────── */}
      {/* Tail / brake lights */}
      {([0.52, -0.52] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.5, -1.63]}>
          <boxGeometry args={[0.28, 0.16, 0.05]} />
          <meshBasicMaterial color="#ef4444" />
        </mesh>
      ))}
      <pointLight ref={brakeRef} position={[0, 0.5, -1.65]} color="#ef4444" intensity={0.6} distance={6} decay={2} />

      {/* Rear bumper chrome */}
      <mesh position={[0, 0.16, -1.64]}>
        <boxGeometry args={[1.58, 0.14, 0.1]} />
        <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
      </mesh>

      {/* ── Matatu side art decals ──────────────────────────────── */}
      {/* Large diagonal amber stripe */}
      <mesh position={[0.83, 0.62, 0.4]} rotation={[0, 0, 0.28]}>
        <boxGeometry args={[0.02, 1.4, 1.1]} />
        <meshStandardMaterial color={AMBER} roughness={0.3} emissive={AMBER} emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[-0.83, 0.62, 0.4]} rotation={[0, 0, 0.28]}>
        <boxGeometry args={[0.02, 1.4, 1.1]} />
        <meshStandardMaterial color={AMBER} roughness={0.3} emissive={AMBER} emissiveIntensity={0.25} />
      </mesh>
      {/* Ochre accent block */}
      <mesh position={[0.83, 0.56, -0.6]}>
        <boxGeometry args={[0.02, 0.22, 0.9]} />
        <meshStandardMaterial color={OCHRE} roughness={0.3} emissive={OCHRE} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-0.83, 0.56, -0.6]}>
        <boxGeometry args={[0.02, 0.22, 0.9]} />
        <meshStandardMaterial color={OCHRE} roughness={0.3} emissive={OCHRE} emissiveIntensity={0.2} />
      </mesh>

      {/* ── Underglow ───────────────────────────────────────────── */}
      <pointLight ref={underglowRef} position={[0, 0.08, 0]} color={AMBER} intensity={2} distance={4.5} decay={2} />

      {/* ── Mirrors ─────────────────────────────────────────────── */}
      {([0.88, -0.88] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.98, 0.72]}>
          <boxGeometry args={[0.08, 0.12, 0.2]} />
          <meshStandardMaterial color={CHROME} metalness={0.95} roughness={0.05} />
        </mesh>
      ))}

      {/* ── Wheels ──────────────────────────────────────────────── */}
      {/* Front Left */}
      <group ref={flWheel} position={[0.84, 0.16, 0.96]}>
        <Wheel />
      </group>
      {/* Front Right */}
      <group ref={frWheel} position={[-0.84, 0.16, 0.96]}>
        <Wheel />
      </group>
      {/* Rear Left */}
      <group ref={rlWheel} position={[0.84, 0.16, -0.96]}>
        <Wheel />
      </group>
      {/* Rear Right */}
      <group ref={rrWheel} position={[-0.84, 0.16, -0.96]}>
        <Wheel />
      </group>
    </group>
  );
}

function Wheel() {
  return (
    <>
      {/* Tyre */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.33, 0.33, 0.22, 20]} />
        <meshStandardMaterial color="#1a1614" roughness={0.85} />
      </mesh>
      {/* Rim */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.21, 0.21, 0.24, 12]} />
        <meshStandardMaterial color={CHROME} metalness={0.92} roughness={0.08} />
      </mesh>
      {/* Centre cap */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.13, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.04, 8]} />
        <meshBasicMaterial color={CHROME} />
      </mesh>
    </>
  );
}
