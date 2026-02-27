"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Menu, X, Sun, Moon, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { SpotifyWidget } from "@/components/ui/SpotifyWidget";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/now", label: "Now" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Only the homepage has a dark 3D hero — transparent treatment only applies there
    const isHome = pathname === "/";
    // Gate on `mounted` so SSR and first client render both produce the same solid navbar,
    // preventing the hydration mismatch. After mount the client switches correctly.
    const isTransparent = mounted && isHome && !scrolled;

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const openCommandPalette = () => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
    };

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isTransparent
                    ? "py-5 bg-transparent"
                    : "py-3 bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-glass"
            )}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Logo className={cn(isTransparent ? "text-white" : "text-foreground")} />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                                pathname === link.href
                                    ? "text-electric-400"
                                    : isTransparent
                                        ? "text-white/70 hover:text-white"
                                        : "text-muted-foreground hover:text-foreground"
                            )}
                            aria-current={pathname === link.href ? "page" : undefined}
                        >
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="navbar-indicator"
                                    className={cn(
                                        "absolute inset-0 rounded-lg border",
                                        isTransparent
                                            ? "bg-electric-400/20 border-electric-400/40"
                                            : "bg-electric-400/10 border-electric-400/20"
                                    )}
                                    transition={{ type: "spring", duration: 0.5 }}
                                />
                            )}
                            <span className="relative">{link.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Right side controls */}
                <div className="flex items-center gap-4">
                    <div className="hidden lg:block w-64">
                        <SpotifyWidget />
                    </div>
                    {/* Command palette trigger */}
                    <button
                        onClick={openCommandPalette}
                        className={cn(
                            "hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border transition-all duration-200",
                            isTransparent
                                ? "text-white/60 border-white/10 bg-white/5 hover:border-white/30 hover:text-white"
                                : "text-muted-foreground border-white/[0.06] bg-white/[0.03] hover:border-electric-400/30 hover:text-foreground"
                        )}
                        aria-label="Open command palette"
                    >
                        <Command className="w-3 h-3" />
                        <span>K</span>
                    </button>

                    {/* Theme toggle */}
                    {mounted && (
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className={cn(
                                "p-2 rounded-lg transition-all duration-200",
                                isTransparent
                                    ? "text-white/60 hover:text-white hover:bg-white/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                            )}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {theme === "dark" ? (
                                    <motion.div
                                        key="sun"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Sun className="w-4 h-4" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="moon"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        <Moon className="w-4 h-4" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    )}

                    {/* Primary CTA */}
                    <Link
                        href="/start-project"
                        className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-electric-400 text-dark-950 font-bold text-xs hover:bg-electric-300 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_-5px_var(--electric-400)]"
                    >
                        Start a Project
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "md:hidden p-2 rounded-lg transition-all duration-200",
                            isTransparent
                                ? "text-white/70 hover:text-white hover:bg-white/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                        )}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <Menu className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl"
                    >
                        <nav className="container-custom py-4 flex flex-col gap-1" aria-label="Mobile navigation">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                            pathname === link.href
                                                ? "text-electric-400 bg-electric-400/10 border border-electric-400/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                                        )}
                                        aria-current={pathname === link.href ? "page" : undefined}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.05 }}
                                className="px-4 py-4"
                            >
                                <Link
                                    href="/start-project"
                                    className="flex items-center justify-center w-full py-4 rounded-xl bg-electric-400 text-dark-950 font-bold text-sm shadow-[0_0_30px_-5px_var(--electric-400)]"
                                >
                                    Start a Project
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
