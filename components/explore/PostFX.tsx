"use client";

/**
 * PostFX.tsx
 * Post-processing effects for the 3D Nairobi explore mode.
 * Uses @react-three/postprocessing (wraps pmndrs/postprocessing).
 *
 * Loaded lazily from ExploreMode so standard-mode bundle pays 0KB.
 */

import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

const CHROMATIC_OFFSET = new THREE.Vector2(0.0018, 0.0008);

export function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      {/* Warm bloom – makes emissive lights glow beautifully */}
      <Bloom
        intensity={1.4}
        luminanceThreshold={0.45}
        luminanceSmoothing={0.85}
        mipmapBlur
        radius={0.72}
        levels={8}
      />

      {/* Subtle chromatic aberration – adds that VHS/retro CRT feel */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={CHROMATIC_OFFSET}
        radialModulation={false}
        modulationOffset={0.15}
      />

      {/* Vignette – darkens edges, focuses your eye on the scene */}
      <Vignette
        offset={0.32}
        darkness={0.55}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
