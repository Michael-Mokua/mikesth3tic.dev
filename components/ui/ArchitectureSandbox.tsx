"use client";

import { useCallback, useState } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
    NodeChange,
    EdgeChange,
    Node,
    Edge,
    Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Maximize2 } from "lucide-react";

interface ArchitectureSandboxProps {
    initialNodes?: Node[];
    initialEdges?: Edge[];
}

const defaultNodes: Node[] = [
    {
        id: "1",
        position: { x: 250, y: 50 },
        data: { label: "Next.js Frontend (Vercel)" },
        style: { background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px" },
    },
    {
        id: "2",
        position: { x: 100, y: 200 },
        data: { label: "PostgreSQL DB" },
        style: { background: "rgba(139, 211, 230, 0.1)", border: "1px solid rgba(139, 211, 230, 0.5)", color: "#8bd3e6", borderRadius: "8px" },
    },
    {
        id: "3",
        position: { x: 400, y: 200 },
        data: { label: "Python AI Microservice" },
        style: { background: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "8px" },
    },
];

const defaultEdges: Edge[] = [
    { id: "e1-2", source: "1", target: "2", animated: true, style: { stroke: "#8bd3e6" } },
    { id: "e1-3", source: "1", target: "3", animated: true, style: { stroke: "#8bd3e6" } },
];

export function ArchitectureSandbox({ initialNodes = defaultNodes, initialEdges = defaultEdges }: ArchitectureSandboxProps) {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    return (
        <div className={`relative w-full border border-white/10 rounded-xl overflow-hidden bg-black transition-all duration-500 z-10 ${isFullscreen ? 'fixed inset-4 z-[9999] h-auto' : 'h-[400px]'}`}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                proOptions={{ hideAttribution: true }}
                colorMode="dark"
                fitView
            >
                <Background color="#ffffff" gap={16} size={1} className="opacity-5" />
                <Controls showInteractive={false} className="border-white/10 fill-white/50" />
                
                <Panel position="top-right" className="m-4">
                    <button 
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/50 hover:text-white transition-all backdrop-blur-md"
                        title="Toggle Fullscreen"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </Panel>
                
                <Panel position="bottom-left" className="m-4 max-w-xs pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl">
                        <h4 className="font-mono text-[10px] text-electric-400 font-bold uppercase tracking-widest mb-2 border-b border-white/10 pb-2">
                            Interactive Sandbox
                        </h4>
                        <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                            Drag nodes to explore the system architecture. This graph maps the technical execution layers of the case study.
                        </p>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}
