"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, increment } from "firebase/firestore";

const REACTIONS = [
    { emoji: "🔥", label: "Fire" },
    { emoji: "💡", label: "Insightful" },
    { emoji: "🚀", label: "Rocket" },
    { emoji: "❤️", label: "Love" },
    { emoji: "👏", label: "Clap" },
];

interface BlogReactionsProps {
    slug: string;
}

export function BlogReactions({ slug }: BlogReactionsProps) {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    // Load reaction counts from Firestore
    useEffect(() => {
        const loadReactions = async () => {
            try {
                const docRef = doc(db, "blog-reactions", slug);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setCounts(docSnap.data() as Record<string, number>);
                }
            } catch (err) {
                console.error("Failed to load reactions:", err);
            } finally {
                setLoading(false);
            }
        };

        loadReactions();

        // Load user's own reactions from localStorage
        try {
            const stored = localStorage.getItem(`reactions_${slug}`);
            if (stored) setUserReactions(new Set(JSON.parse(stored)));
        } catch { }
    }, [slug]);

    const handleReaction = async (emoji: string) => {
        // Prevent double-reacting with the same emoji
        if (userReactions.has(emoji)) return;

        // Optimistic update
        setCounts((prev) => ({
            ...prev,
            [emoji]: (prev[emoji] || 0) + 1,
        }));

        const newUserReactions = new Set(userReactions).add(emoji);
        setUserReactions(newUserReactions);
        localStorage.setItem(`reactions_${slug}`, JSON.stringify([...newUserReactions]));

        // Persist to Firestore
        try {
            const docRef = doc(db, "blog-reactions", slug);
            await setDoc(docRef, { [emoji]: increment(1) }, { merge: true });
        } catch (err) {
            console.error("Failed to save reaction:", err);
        }
    };

    if (loading) return null;

    return (
        <div className="mt-16 pt-8 border-t border-white/[0.06]">
            <p className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">
                // React to this post
            </p>
            <div className="flex flex-wrap gap-3">
                {REACTIONS.map(({ emoji, label }) => {
                    const count = counts[emoji] || 0;
                    const hasReacted = userReactions.has(emoji);

                    return (
                        <motion.button
                            key={emoji}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleReaction(emoji)}
                            disabled={hasReacted}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${hasReacted
                                    ? "bg-electric-400/15 border-electric-400/30 text-electric-400"
                                    : "bg-white/[0.03] border-white/[0.06] text-muted-foreground hover:border-electric-400/20 hover:bg-white/[0.06]"
                                }`}
                            aria-label={`React with ${label}`}
                            title={hasReacted ? `You reacted with ${label}` : label}
                        >
                            <span className="text-lg">{emoji}</span>
                            {count > 0 && (
                                <span className="text-xs font-mono tabular-nums">{count}</span>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
