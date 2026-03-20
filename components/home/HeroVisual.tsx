"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function SystemCore() {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointsRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.2;
            meshRef.current.rotation.y = time * 0.3;
        }
        if (pointsRef.current) {
            pointsRef.current.rotation.x = -time * 0.1;
            pointsRef.current.rotation.y = -time * 0.15;
        }
    });

    const particlesCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    return (
        <group>
            {/* Central Distorted Sphere */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Sphere ref={meshRef} args={[1.5, 64, 64]}>
                    <MeshDistortMaterial
                        color="#00d4ff"
                        speed={3}
                        distort={0.4}
                        radius={1.5}
                        emissive="#00d4ff"
                        emissiveIntensity={0.2}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </Sphere>
            </Float>

            {/* Orbiting Particles */}
            <Points ref={pointsRef} positions={positions} stride={3}>
                <PointMaterial
                    transparent
                    color="#00d4ff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Subtle Inner Glow */}
            <Sphere args={[1.2, 32, 32]}>
                <meshStandardMaterial
                    color="#00d4ff"
                    emissive="#00d4ff"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.1}
                />
            </Sphere>
        </group>
    );
}

export function HeroVisual() {
    return (
        <div className="w-full h-full relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
                <SystemCore />
            </Canvas>
            
            {/* Visual Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.4)_100%)] pointer-events-none" />
        </div>
    );
}
