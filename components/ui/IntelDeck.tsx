"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera, Text, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

function DataSlab({ position, title, slug, index }: { position: [number, number, number], title: string, slug: string, index: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
            meshRef.current.rotation.y,
            hovered ? 0.3 : 0,
            0.1
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
            meshRef.current.position.y,
            position[1] + (hovered ? 0.2 : 0),
            0.1
        );
    });

    return (
        <group position={position} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onClick={() => router.push(`/intel/${slug}`)}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <RoundedBox
                    args={[2, 2.8, 0.1]}
                    radius={0.1}
                    smoothness={4}
                    ref={meshRef}
                >
                    <meshStandardMaterial 
                        color={hovered ? "#00d4ff" : "#111"} 
                        emissive={hovered ? "#00d4ff" : "#000"} 
                        emissiveIntensity={hovered ? 0.5 : 0}
                        roughness={0.1} 
                        metalness={0.9} 
                        transparent 
                        opacity={0.95}
                    />
                </RoundedBox>
            </Float>
            
            <Text
                position={[0, 0, 0.1]}
                fontSize={0.15}
                color="white"
                anchorX="center"
                anchorY="middle"
                maxWidth={1.5}
            >
                {title.toUpperCase()}
            </Text>

            <mesh position={[0, -1.2, 0.1]}>
                <circleGeometry args={[0.05, 32]} />
                <meshBasicMaterial color={hovered ? "white" : "#444"} />
            </mesh>
        </group>
    );
}

export function IntelDeck() {
    return (
        <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative">
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                
                <group position={[0, 0, 0]}>
                    <DataSlab position={[-3, 0, 0]} title="The Manifesto" slug="manifesto" index={0} />
                    <DataSlab position={[0, 0, 0]} title="Systems Architecture" slug="systems" index={1} />
                    <DataSlab position={[3, 0, 0]} title="AI Research Portfolio" slug="ai-research" index={2} />
                </group>

                <Environment preset="city" />
            </Canvas>

            {/* Instruction Overlay */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none text-center">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">
                    Click Data Core to Decrypt
                </p>
            </div>
        </div>
    );
}
