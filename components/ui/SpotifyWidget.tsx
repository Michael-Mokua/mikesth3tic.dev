"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Music, Play } from "lucide-react";
import { motion } from "framer-motion";

type NowPlayingData = {
    album: string;
    albumImageUrl: string;
    artist: string;
    isPlaying: boolean;
    songUrl: string;
    title: string;
};

export function SpotifyWidget() {
    const [data, setData] = useState<NowPlayingData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const response = await fetch("/api/spotify/now-playing");
                const songData = await response.json();
                setData(songData);
            } catch (error) {
                console.error("Failed to fetch Spotify status", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNowPlaying();

        // Poll every 60 seconds since the route is cached anyway
        const interval = setInterval(fetchNowPlaying, 60000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] animate-pulse max-w-sm">
                <div className="w-12 h-12 rounded-xl bg-white/[0.05]" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/[0.05] rounded w-3/4" />
                    <div className="h-3 bg-white/[0.05] rounded w-1/2" />
                </div>
            </div>
        );
    }

    if (!data || !data.title) {
        return (
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] max-w-sm">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <Music className="w-5 h-5 text-green-500" />
                </div>
                <div>
                    <p className="text-sm font-bold text-foreground">Not Playing</p>
                    <p className="text-xs text-muted-foreground">Spotify Offline</p>
                </div>
            </div>
        );
    }

    return (
        <a
            href={data.songUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-green-500/30 transition-all max-w-sm"
        >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 filter grayscale-[20%] group-hover:grayscale-0 transition-all">
                <Image
                    src={data.albumImageUrl}
                    alt={data.album}
                    fill
                    className="object-cover"
                />
                {!data.isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-foreground truncate">
                        {data.title}
                    </p>
                    <div className="flex items-end gap-[2px] h-3.5 px-2 rounded-full bg-green-500/10 shrink-0">
                        {data.isPlaying ? (
                            <>
                                <motion.div className="w-[3px] bg-green-500 rounded-t-sm origin-bottom" animate={{ height: ["40%", "100%", "40%"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} />
                                <motion.div className="w-[3px] bg-green-500 rounded-t-sm origin-bottom" animate={{ height: ["80%", "40%", "80%"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} />
                                <motion.div className="w-[3px] bg-green-500 rounded-t-sm origin-bottom" animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} />
                                <motion.div className="w-[3px] bg-green-500 rounded-t-sm origin-bottom" animate={{ height: ["100%", "30%", "100%"] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.6 }} />
                            </>
                        ) : (
                            <span className="text-[9px] font-bold text-green-500 uppercase tracking-wider mb-0.5">PAUSED</span>
                        )}
                    </div>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                    {data.artist}
                </p>
            </div>
        </a>
    );
}
