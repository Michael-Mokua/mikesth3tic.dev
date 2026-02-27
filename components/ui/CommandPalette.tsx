"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { LucideIcon, Search, ArrowRight, Hash, FileText, Home, User, Briefcase, Mail, Zap } from "lucide-react";

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    href?: string;
    icon: LucideIcon;
    action?: () => void;
    category: string;
}

const commands: CommandItem[] = [
    { id: "home", label: "Home", description: "Go to the homepage", href: "/", icon: Home, category: "Pages" },
    { id: "about", label: "About", description: "Learn about Michael", href: "/about", icon: User, category: "Pages" },
    { id: "projects", label: "Projects", description: "View my projects", href: "/projects", icon: Briefcase, category: "Pages" },
    { id: "blog", label: "Blog", description: "Read my blog", href: "/blog", icon: FileText, category: "Pages" },
    { id: "now", label: "Now", description: "What I'm doing now", href: "/now", icon: Zap, category: "Pages" },
    { id: "contact", label: "Contact", description: "Get in touch", href: "/contact", icon: Mail, category: "Pages" },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const filtered = query
        ? commands.filter(
            (c) =>
                c.label.toLowerCase().includes(query.toLowerCase()) ||
                c.description?.toLowerCase().includes(query.toLowerCase())
        )
        : commands;

    const runItem = useCallback(
        (item: CommandItem) => {
            if (item.href) router.push(item.href);
            if (item.action) item.action();
            setOpen(false);
            setQuery("");
        },
        [router]
    );

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === "Escape") {
                setOpen(false);
                setQuery("");
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
            setSelectedIndex(0);
        }
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
            runItem(filtered[selectedIndex]);
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setOpen(false); setQuery(""); }}
                    />

                    {/* Palette */}
                    <motion.div
                        key="palette"
                        className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[201] w-full max-w-lg"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        role="dialog"
                        aria-label="Command palette"
                        aria-modal="true"
                    >
                        <div className="glass border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden">
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
                                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search pages, blog posts..."
                                    value={query}
                                    onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                                    aria-label="Search commands"
                                />
                                <kbd className="hidden sm:block px-2 py-0.5 text-xs rounded bg-white/[0.05] text-muted-foreground border border-white/[0.06]">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="py-2 max-h-72 overflow-y-auto no-scrollbar">
                                {filtered.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                        No results for &ldquo;{query}&rdquo;
                                    </div>
                                ) : (
                                    filtered.map((item, i) => (
                                        <button
                                            key={item.id}
                                            onClick={() => runItem(item)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 group ${i === selectedIndex
                                                ? "bg-electric-400/10 text-foreground"
                                                : "text-muted-foreground hover:bg-white/[0.04] hover:text-foreground"
                                                }`}
                                        >
                                            <div className={`p-1.5 rounded-lg ${i === selectedIndex ? "bg-electric-400/20" : "bg-white/[0.04]"}`}>
                                                {(() => {
                                                    const Icon = item.icon;
                                                    return <Icon className="w-3.5 h-3.5" />;
                                                })()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium">{item.label}</div>
                                                {item.description && (
                                                    <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                                                )}
                                            </div>
                                            <ArrowRight className={`w-3.5 h-3.5 flex-shrink-0 transition-opacity ${i === selectedIndex ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 border-t border-white/[0.06] flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">↑↓</kbd> navigate</span>
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">↵</kbd> select</span>
                                <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.06]">esc</kbd> close</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
