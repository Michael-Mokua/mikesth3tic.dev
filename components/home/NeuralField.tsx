"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 5000 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const { mouse, viewport } = useThree();

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        const randoms = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            sizes[i] = Math.random() * 0.05 + 0.02;
            randoms[i] = Math.random();
        }
        return { positions, sizes, randoms };
    }, [count]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (!pointsRef.current) return;

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            
            // Base movement
            positions[i3 + 1] += Math.sin(time + particles.randoms[i] * 10) * 0.002;
            positions[i3] += Math.cos(time + particles.randoms[i] * 10) * 0.002;

            // Mouse interaction (elastic recoil)
            const mx = (mouse.x * viewport.width) / 2;
            const my = (mouse.y * viewport.height) / 2;
            
            const dx = positions[i3] - mx;
            const dy = positions[i3 + 1] - my;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 1.5) {
                const force = (1.5 - dist) / 1.5;
                positions[i3] += dx * force * 0.1;
                positions[i3 + 1] += dy * force * 0.1;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
        
        pointsRef.current.rotation.y = time * 0.05;
        pointsRef.current.rotation.x = time * 0.02;
    });

    return (
        <Points ref={pointsRef} positions={particles.positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#00d4ff"
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

function Connections({ count = 80 }) {
    const linesRef = useRef<THREE.Group>(null);
    const { mouse, viewport } = useThree();

    const linePoints = useMemo(() => {
        const pts = [];
        for (let i = 0; i < count; i++) {
            const start = new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
            const end = start.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2));
            pts.push(start, end);
        }
        return pts;
    }, [count]);

    useFrame((state) => {
        if (!linesRef.current) return;
        linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        
        const mx = (mouse.x * viewport.width) / 2;
        const my = (mouse.y * viewport.height) / 2;
        linesRef.current.position.x = THREE.MathUtils.lerp(linesRef.current.position.x, mx * 0.05, 0.1);
        linesRef.current.position.y = THREE.MathUtils.lerp(linesRef.current.position.y, my * 0.05, 0.1);
    });

    return (
        <group ref={linesRef}>
            {Array.from({ length: count }).map((_, i) => (
                <line key={i}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute
                            attach="attributes-position"
                            args={[
                                new Float32Array([
                                    linePoints[i * 2].x, linePoints[i * 2].y, linePoints[i * 2].z,
                                    linePoints[i * 2 + 1].x, linePoints[i * 2 + 1].y, linePoints[i * 2 + 1].z
                                ]),
                                3
                            ]}
                            count={2}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial attach="material" color="#00d4ff" transparent opacity={0.1} />
                </line>
            ))}
        </group>
    );
}

export function NeuralField() {
    return (
        <div className="w-full h-full bg-[#030303]">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: true }}>
                <color attach="background" args={["#030303"]} />
                <fog attach="fog" args={["#030303", 5, 15]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
                <Particles />
                <Connections />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-950/20 to-dark-950 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,3,3,0.8)_100%)] pointer-events-none" />
        </div>
    );
}
