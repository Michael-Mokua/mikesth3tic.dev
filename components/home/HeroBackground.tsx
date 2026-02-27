"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Grid } from "@react-three/drei";
import * as THREE from "three";

function ParticleCloud() {
    const meshRef = useRef<THREE.Points>(null!);
    const count = 4000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.1;
    });

    return (
        <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00d4ff"
                size={0.012}
                sizeAttenuation
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

            <ParticleCloud />

            {/* Grid Floor for depth */}
            <group position={[0, -2, 0]}>
                <Grid
                    infiniteGrid
                    fadeDistance={30}
                    fadeStrength={5}
                    cellSize={1}
                    sectionSize={4}
                    sectionThickness={1}
                    sectionColor="#00d4ff"
                    cellColor="#00d4ff"
                />
            </group>

            {/* Floating geometric accents */}
            <mesh position={[4, 1, -5]} rotation={[0.5, 0.5, 0]}>
                <octahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color="#00d4ff" wireframe transparent opacity={0.1} />
            </mesh>
            <mesh position={[-4, -1, -3]} rotation={[-0.5, -0.5, 0]}>
                <octahedronGeometry args={[0.6, 0]} />
                <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.1} />
            </mesh>
        </>
    );
}

export function HeroBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 z-0 bg-dark-950" />;
    }

    return (
        <div className="absolute inset-0 z-0 bg-dark-950">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 60 }}
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                aria-hidden="true"
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
            {/* Gradient overlay to blend canvas into page */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/0 to-background pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </div>
    );
}
