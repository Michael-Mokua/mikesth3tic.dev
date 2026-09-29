"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { ExploreModeTrigger } from "@/components/explore/ExploreModeTrigger";
import { getFeaturedProjects } from "@/lib/projects";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/now", label: "Now" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const featuredProjects = getFeaturedProjects();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-dark-950/85 backdrop-blur-xl border-b border-white/[0.08] shadow-glass"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo & Location Badge */}
        <div className="flex items-center gap-4">
          <Link href="/" className="shrink-0 group flex items-center gap-2.5">
            <Logo />
          </Link>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-mono font-medium text-amber-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400"></span>
            </span>
            <span>Nairobi 🇰🇪 · Open for Projects</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.06] rounded-full px-3 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
                  isActive
                    ? "text-dark-950 font-bold bg-gradient-to-r from-amber-400 to-ochre-400 shadow-sm"
                    : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Triggers */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* 3D Explore Pill */}
          <ExploreModeTrigger projects={featuredProjects} variant="pill" />

          <a
            href="https://www.linkedin.com/in/michael-mokua-251390302/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Michael Mokua on LinkedIn"
            className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all hover:bg-white/[0.03]"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Michael-Mokua"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Michael Mokua on GitHub"
            className="p-2 rounded-full border border-white/10 text-zinc-400 hover:text-amber-400 hover:border-amber-400/30 transition-all hover:bg-white/[0.03]"
          >
            <Github className="w-4 h-4" />
          </a>
          <Link
            href="/start-project"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all duration-200 shadow-warm hover:scale-105 active:scale-95"
          >
            Start Project
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-white/[0.08] bg-dark-950/95 backdrop-blur-2xl px-6 py-6"
          >
            <div className="flex flex-col gap-2 mb-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold"
                        : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ExploreModeTrigger projects={featuredProjects} variant="pill" />
                <a
                  href="https://www.linkedin.com/in/michael-mokua-251390302/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-amber-400"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/Michael-Mokua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-amber-400"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>

              <Link
                href="/start-project"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-ochre-600 text-dark-950 font-bold text-xs uppercase tracking-wider"
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
