"use client";

import React from "react";
import { BaseEdge, EdgeProps, getBezierPath } from "@xyflow/react";

export function DataFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={{ ...style, strokeWidth: 1, strokeOpacity: 0.2 }} />
      
      {/* Animated Data Packet */}
      <circle r="2" fill="#8bd3e6" className="shadow-[0_0_10px_#8bd3e6]">
        <animateMotion
          dur="2s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1"
          keyTimes="0;1"
        />
      </circle>
      
      {/* Secondary Packet with delay */}
      <circle r="1.5" fill="#8bd3e6" className="opacity-50">
        <animateMotion
          dur="2s"
          begin="0.7s"
          repeatCount="indefinite"
          path={edgePath}
          keyPoints="0;1"
          keyTimes="0;1"
        />
      </circle>
    </>
  );
}
