"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard, FileEdit, Users, Image as ImageIcon,
    Settings, LogOut, Bell, Menu, X, Globe, BarChart2,
    ChevronDown, Search, Moon, Sun, Shield, MessageSquare
} from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/posts", label: "Blog Posts", icon: FileEdit },
    { href: "/dashboard/contacts", label: "Messages", icon: MessageSquare },
    { href: "/dashboard/subscribers", label: "Subscribers", icon: Users },
    { href: "/dashboard/media", label: "Media Manager", icon: ImageIcon },
    { href: "/dashboard/content", label: "Site Content", icon: Globe },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Close sidebar on mobile by default
        if (window.innerWidth < 1024) setSidebarOpen(false);
    }, []);

    const handleLogout = () => {
        document.cookie = "admin-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/dashboard/login");
    };

    return (
        <div className="min-h-screen bg-dark-950 flex">
            {/* Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        {/* Mobile overlay */}
                        <motion.div
                            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                        />

                        <motion.aside
                            initial={{ x: -280, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -280, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-white/[0.06] flex flex-col"
                        >
                            {/* Logo area */}
                            <div className="h-16 flex items-center gap-3 px-6 border-b border-white/[0.06]">
                                <div className="w-8 h-8 rounded-xl bg-electric-400/20 border border-electric-400/30 flex items-center justify-center">
                                    <Shield className="w-4 h-4 text-electric-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-foreground tracking-tight">ADMIN</p>
                                    <p className="text-[10px] font-mono text-electric-400 uppercase tracking-widest">Command Center</p>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="ml-auto lg:hidden text-muted-foreground hover:text-foreground"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Nav items */}
                            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                                {navItems.map((item) => {
                                    const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                                active
                                                    ? "bg-electric-400/10 text-electric-400 border border-electric-400/20"
                                                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
                                            )}
                                        >
                                            <item.icon className="w-4 h-4 shrink-0" />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Sidebar footer */}
                            <div className="p-4 border-t border-white/[0.06]">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top navbar */}
                <header className="h-16 bg-dark-900/80 backdrop-blur border-b border-white/[0.06] flex items-center gap-4 px-4 lg:px-6 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Search */}
                    <div className="flex-1 max-w-xs relative hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            placeholder="Search dashboard..."
                            className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric-400/30 outline-none transition-all"
                        />
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        {/* Theme toggle */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all"
                            >
                                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                        )}

                        {/* Notifications */}
                        <button className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all">
                            <Bell className="w-4 h-4" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-electric-400 rounded-full" />
                        </button>

                        {/* Profile */}
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-all"
                            >
                                <div className="w-7 h-7 rounded-full bg-electric-400/20 border border-electric-400/30 flex items-center justify-center text-electric-400 text-xs font-black">M</div>
                                <span className="text-sm font-medium text-foreground hidden sm:block">Michael</span>
                                <ChevronDown className={cn("w-3 h-3 text-muted-foreground transition-transform", profileOpen && "rotate-180")} />
                            </button>
                            <AnimatePresence>
                                {profileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 top-full mt-1 w-48 bg-dark-800 border border-white/[0.08] rounded-2xl shadow-xl py-2 z-50"
                                    >
                                        <Link href="/" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all">View Website</Link>
                                        <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.05] transition-all">Settings</Link>
                                        <hr className="my-1 border-white/[0.06]" />
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all">Logout</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
