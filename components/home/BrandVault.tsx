"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const LOGO_ANIMATIONS = [
    "/logos/grok_video_2026-03-13-09-56-00.mp4",
    "/logos/grok_video_2026-03-13-09-58-17.mp4",
    "/logos/grok_video_2026-03-13-09-59-11.mp4",
    "/logos/grok_video_2026-03-13-10-00-10.mp4",
    "/logos/grok_video_2026-03-13-10-00-53.mp4",
    "/logos/grok_video_2026-03-13-10-04-05.mp4",
    "/logos/grok_video_2026-03-13-10-06-49.mp4",
    "/logos/grok_video_2026-03-13-10-08-18.mp4",
    "/logos/grok_video_2026-03-13-10-09-59.mp4",
    "/logos/grok_video_2026-03-13-10-11-11.mp4",
    "/logos/grok_video_2026-03-13-10-15-27.mp4",
    "/logos/grok_video_2026-03-13-10-21-16.mp4",
    "/logos/grok_video_2026-03-13-10-24-40.mp4",
    "/logos/grok_video_2026-03-13-10-26-58.mp4",
    "/logos/grok_video_2026-03-13-10-28-01.mp4",
    "/logos/grok_video_2026-03-13-10-32-14.mp4"
];

function VaultItem({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <motion.div
            className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/5 hover:border-electric-400/50 transition-colors group cursor-crosshair"
            onHoverStart={() => videoRef.current?.play()}
            onHoverEnd={() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[10px] font-mono text-electric-400 tracking-widest uppercase">
                    SYS.IDENT_{src.slice(-10, -4)}
                </span>
            </div>
        </motion.div>
    );
}

export function BrandVault() {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xs font-mono text-electric-400 mb-4 tracking-widest uppercase">// BRAND IDENTITY</p>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                            The <span className="text-gradient">Vault</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        className="text-muted-foreground max-w-md text-sm md:text-base"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Hover to initialize core generation layers. These 16 dynamic sequences form the visual intelligence of the studio.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {LOGO_ANIMATIONS.map((src, idx) => (
                        <motion.div
                            key={src}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <VaultItem src={src} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric-400/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        </section>
    );
}
