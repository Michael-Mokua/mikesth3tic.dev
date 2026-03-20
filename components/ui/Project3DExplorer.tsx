"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, MeshWobbleMaterial, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type ExplorerType = "aura" | "strideos" | "agri" | "xgaffer";

function ExplorerScene({ type }: { type: ExplorerType }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
            
            {type === "aura" && (
                <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                    <Sphere args={[1, 64, 64]}>
                        <MeshDistortMaterial
                            color="#00d4ff"
                            speed={5}
                            distort={0.4}
                            radius={1}
                        />
                    </Sphere>
                </Float>
            )}

            {type === "strideos" && (
                <Float speed={3} rotationIntensity={1} floatIntensity={2}>
                    <group>
                        <mesh>
                            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                            <meshStandardMaterial color="#3b82f6" wireframe />
                        </mesh>
                    </group>
                </Float>
            )}

            {type === "agri" && (
                <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                    <group>
                        {[0, 1, 2].map((i) => (
                            <mesh key={i} position={[Math.sin(i * 2) * 1.5, Math.cos(i * 2) * 1.5, 0]}>
                                <boxGeometry args={[0.5, 0.5, 0.5]} />
                                <meshStandardMaterial color="#22c55e" wireframe />
                            </mesh>
                        ))}
                        <mesh scale={0.5}>
                            <octahedronGeometry />
                            <meshStandardMaterial color="#00d4ff" />
                        </mesh>
                    </group>
                </Float>
            )}

            {type === "xgaffer" && (
                <Float speed={4} rotationIntensity={0.5} floatIntensity={3}>
                    <group>
                        {[0, 1, 2, 3].map((i) => (
                            <mesh key={i} position={[(i - 1.5) * 0.8, (Math.sin(i + 1) * 0.5), 0]}>
                                <boxGeometry args={[0.4, 1.5 + Math.sin(i), 0.4]} />
                                <meshStandardMaterial color="#a855f7" />
                            </mesh>
                        ))}
                    </group>
                </Float>
            )}
            
            <OrbitControls enableZoom={false} enablePan={false} />
        </>
    );
}

export function Project3DExplorer({ type, className }: { type: ExplorerType; className?: string }) {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true }}>
                <ExplorerScene type={type} />
            </Canvas>
        </div>
    );
}
