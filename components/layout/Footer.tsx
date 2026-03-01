"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Github, Twitter, Youtube, Instagram, Mail, ArrowUp, Lock } from "lucide-react";
import { SpotifyWidget } from "@/components/ui/SpotifyWidget";
import { Logo } from "@/components/ui/Logo";

const socialLinks = [
    { href: "https://github.com/Michael-Mokua", label: "GitHub", icon: Github },
    { href: "https://twitter.com/Mikesth3tic_dev", label: "Twitter/X", icon: Twitter },
    { href: "https://instagram.com/whoismichaia", label: "Instagram (Personal)", icon: Instagram },
    { href: "https://instagram.com/mikesth3tic.dev", label: "Instagram (Dev)", icon: Instagram },
    { href: "mailto:mikestheticdev@gmail.com", label: "Email", icon: Mail },
];

const footerLinks = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Now", href: "/now" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
];

export function Footer() {
    const [mounted, setMounted] = useState(false);
    const router = useRouter();

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    useEffect(() => {
        setMounted(true);
        // Hidden keyboard shortcut: Ctrl+Shift+A → Admin dashboard
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "A") {
                e.preventDefault();
                router.push("/dashboard/login");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    return (
        <footer className="relative border-t border-white/[0.06] bg-background mt-auto">
            {/* Top gradient line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-electric-400/50 to-transparent" />

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block shrink-0">
                            <Logo />
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-xs">
                            Software-First Technology Studio designing, building, and scaling modern digital products.
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                            <span className="text-electric-400">▸</span> Nairobi, Kenya 🇰🇪
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-electric-400 transition-colors duration-200 link-hover"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map(({ href, label, icon: Icon }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="p-2.5 rounded-xl glass-hover text-muted-foreground hover:text-electric-400 transition-all duration-200 hover:shadow-electric-sm group"
                                >
                                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                </a>
                            ))}
                        </div>
                        <div className="mt-6">
                            <p className="text-xs text-muted-foreground mb-2">Ready to scale your idea?</p>
                            <Link
                                href="/start-project"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-electric-400/10 border border-electric-400/20 text-electric-400 text-sm font-medium hover:bg-electric-400/20 transition-all duration-200"
                            >
                                <Mail className="w-3.5 h-3.5" />
                                Start a Project
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1 w-full md:w-auto">
                        <SpotifyWidget />
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-between w-full md:w-auto gap-4">
                        <p className="text-xs text-muted-foreground text-center sm:text-left flex flex-wrap items-center justify-center sm:justify-start gap-4">
                            <span>© {new Date().getFullYear()} Michael Ogutu.</span>
                            <span className="text-electric-400/70 shrink-0">Developed by mikesth3tic.dev</span>
                            <span className="flex items-center gap-4">
                                <Link href="/privacy" className="hover:text-electric-400 transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-electric-400 transition-colors">Terms</Link>
                                <Link href="/cookies" className="hover:text-electric-400 transition-colors">Cookies</Link>
                            </span>
                            {/* Hidden admin access — subtle lock icon, invisible to casual visitors */}
                            <Link
                                href="/dashboard/login"
                                className="opacity-0 hover:opacity-30 transition-opacity duration-500 text-muted-foreground"
                                aria-label="Admin"
                                tabIndex={-1}
                            >
                                <Lock className="w-2.5 h-2.5" />
                            </Link>
                        </p>
                        <button
                            onClick={scrollToTop}
                            className="p-2 rounded-lg glass-hover text-muted-foreground hover:text-electric-400 transition-all duration-200 group shrink-0"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
