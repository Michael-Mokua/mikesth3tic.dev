"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Bell, Key, Palette, Shield, Save, Eye, EyeOff } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [showApiKey, setShowApiKey] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const tabs = [
        { id: "general", label: "General", icon: Settings },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "api", label: "API Keys", icon: Key },
        { id: "security", label: "Security", icon: Shield },
        { id: "appearance", label: "Appearance", icon: Palette },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-3xl">
                <div>
                    <p className="text-xs font-mono text-electric-400 uppercase tracking-widest mb-1">// CONFIG</p>
                    <h1 className="text-2xl font-black text-foreground">Settings</h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-electric-400/20 text-electric-400 border border-electric-400/30" : "bg-white/[0.04] border border-white/[0.06] text-muted-foreground hover:border-white/20"}`}
                        >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 space-y-6"
                >
                    {activeTab === "general" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Site Settings</h2>
                            <div className="grid gap-4">
                                {[
                                    { label: "Site Name", value: "MIKESTH3TIC.DEV", placeholder: "Your site name" },
                                    { label: "Tagline", value: "Engineering Intelligent Systems", placeholder: "Your tagline" },
                                    { label: "Contact Email", value: "mikestheticdev@gmail.com", placeholder: "admin@example.com" },
                                    { label: "Site URL", value: "https://mikesth3tic.dev", placeholder: "https://..." },
                                ].map(field => (
                                    <div key={field.label}>
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">{field.label}</label>
                                        <input
                                            defaultValue={field.value}
                                            placeholder={field.placeholder}
                                            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-electric-400/30 outline-none transition-all"
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "notifications" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Notification Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { label: "New contact form submission", checked: true },
                                    { label: "New newsletter subscriber", checked: true },
                                    { label: "Blog post comments", checked: false },
                                    { label: "System alerts", checked: true },
                                ].map(n => (
                                    <div key={n.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                                        <p className="text-sm text-foreground">{n.label}</p>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={n.checked} className="sr-only peer" />
                                            <div className="w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-electric-400" />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "api" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">API Configuration</h2>
                            <div className="space-y-4">
                                {[
                                    { label: "Groq API Key", value: "gsk_***********************" },
                                    { label: "Resend API Key", value: "re_***********************" },
                                    { label: "Spotify Client ID", value: "4a39a307a***************" },
                                    { label: "Firebase Project ID", value: "mikesth3ticdev" },
                                ].map(k => (
                                    <div key={k.label}>
                                        <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">{k.label}</label>
                                        <div className="relative">
                                            <input
                                                type={showApiKey ? "text" : "password"}
                                                defaultValue={k.value}
                                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 pr-10 text-sm font-mono focus:border-electric-400/30 outline-none transition-all"
                                            />
                                            <button onClick={() => setShowApiKey(!showApiKey)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === "security" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Security</h2>
                            <div className="space-y-4">
                                <div className="p-4 bg-green-400/5 border border-green-400/20 rounded-xl flex items-center gap-3">
                                    <Shield className="w-5 h-5 text-green-400 shrink-0" />
                                    <div>
                                        <p className="text-sm font-bold text-green-400">Firebase Auth Active</p>
                                        <p className="text-xs text-muted-foreground">All logins are protected by Firebase Authentication.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">New Password</label>
                                    <input type="password" placeholder="Enter new password" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                                <div>
                                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider block mb-2">Confirm Password</label>
                                    <input type="password" placeholder="Confirm new password" className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-electric-400/30 transition-all" />
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === "appearance" && (
                        <>
                            <h2 className="text-base font-bold text-foreground">Theme</h2>
                            <p className="text-sm text-muted-foreground">The site uses a dark theme by default. The theme toggle in the navbar lets users switch between dark and light modes.</p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl border-2 border-electric-400 bg-dark-950 cursor-pointer">
                                    <p className="text-xs font-mono text-electric-400 mb-2">DARK MODE</p>
                                    <div className="space-y-1">
                                        <div className="h-2 bg-white/10 rounded w-3/4" />
                                        <div className="h-2 bg-electric-400/40 rounded w-1/2" />
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl border-2 border-transparent border-white/10 bg-white/90 cursor-pointer hover:border-electric-400/50 transition-all">
                                    <p className="text-xs font-mono text-dark-900 mb-2">LIGHT MODE</p>
                                    <div className="space-y-1">
                                        <div className="h-2 bg-dark-900/20 rounded w-3/4" />
                                        <div className="h-2 bg-electric-600/40 rounded w-1/2" />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end pt-4 border-t border-white/[0.06]">
                        <button
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${saved ? "bg-green-500 text-white" : "bg-electric-400 text-dark-950 hover:bg-electric-300"}`}
                        >
                            <Save className="w-4 h-4" />
                            {saved ? "Saved!" : "Save Changes"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
}
