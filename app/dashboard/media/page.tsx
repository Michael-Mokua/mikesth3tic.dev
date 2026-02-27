"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, FileText, Film, Trash2, Copy, Check } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

type MediaItem = {
    id: string;
    name: string;
    type: "image" | "video" | "document";
    size: string;
    url: string;
    preview?: string;
};

// Sample media — in production, load from Firebase Storage
const sampleMedia: MediaItem[] = [
    { id: "1", name: "hero-background.jpg", type: "image", size: "2.4 MB", url: "/og-image.jpg", preview: "/og-image.jpg" },
    { id: "2", name: "resume.pdf", type: "document", size: "180 KB", url: "/resume.pdf" },
];

const typeIcon: Record<MediaItem["type"], React.ElementType> = {
    image: ImageIcon,
    video: Film,
    document: FileText,
};

export default function MediaPage() {
    const [items, setItems] = useState<MediaItem[]>(sampleMedia);
    const [dragging, setDragging] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files: File[]) => {
        const newItems: MediaItem[] = files.map(f => ({
            id: Math.random().toString(36).substr(2, 9),
            name: f.name,
            type: f.type.startsWith("image/") ? "image" : f.type.startsWith("video/") ? "video" : "document",
            size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
            url: URL.createObjectURL(f),
            preview: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
        }));
        setItems(prev => [...newItems, ...prev]);
    };

    const copyUrl = (url: string, id: string) => {
        navigator.clipboard.writeText(window.location.origin + url);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const remove = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    const totalMB = items.reduce((acc, i) => acc + parseFloat(i.size), 0).toFixed(1);

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// ASSETS</p>
                        <h1 className="text-2xl font-black text-foreground">Media Manager</h1>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground font-mono">{items.length} files · {totalMB} MB used</p>
                        <div className="w-32 h-1.5 bg-white/[0.05] rounded-full mt-1 ml-auto">
                            <div className="h-full rounded-full bg-electric-400" style={{ width: `${Math.min((parseFloat(totalMB) / 1024) * 100, 100)}%` }} />
                        </div>
                    </div>
                </div>

                {/* Drop zone */}
                <div
                    onDragOver={e => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => inputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? "border-electric-400/60 bg-electric-400/5" : "border-white/[0.08] hover:border-electric-400/30 hover:bg-white/[0.02]"}`}
                >
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Images, videos, documents — up to 50MB each</p>
                    <input ref={inputRef} type="file" multiple className="hidden" onChange={e => handleFiles(Array.from(e.target.files || []))} />
                </div>

                {/* Media grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {items.map((item, i) => {
                        const iconKey = item.type as keyof typeof typeIcon;
                        const Icon = typeIcon[iconKey] || FileText;
                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
                            >
                                <div className="aspect-square bg-dark-800 flex items-center justify-center">
                                    {item.preview ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={item.preview} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 text-muted-foreground">
                                            {(() => {
                                                const IconComponent = Icon as any;
                                                return <IconComponent className="w-full h-full" />;
                                            })()}
                                        </div>
                                    )}
                                </div>
                                <div className="p-2">
                                    <p className="text-[10px] font-medium text-foreground truncate">{item.name}</p>
                                    <p className="text-[9px] text-muted-foreground">{item.size}</p>
                                </div>
                                <div className="absolute inset-0 bg-dark-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button onClick={() => copyUrl(item.url, item.id)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all">
                                        {copied === item.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button onClick={() => remove(item.id)} className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-all">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
