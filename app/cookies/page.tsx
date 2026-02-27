"use client";

import { motion } from "framer-motion";
import { Cookie, MousePointer2, Settings, Info } from "lucide-react";

export default function CookiesPage() {
    const lastUpdated = "February 28, 2026";

    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container-custom max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-400/10 border border-electric-400/20 text-electric-400 text-xs font-mono mb-6">
                        <Cookie className="w-3.5 h-3.5" />
                        <span>// COOKIE PROTOCOL</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-4">Cookie <span className="text-gradient">Policy.</span></h1>
                    <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-12">Last Updated: {lastUpdated}</p>

                    <div className="glass p-8 md:p-12 rounded-[2rem] border border-white/5 space-y-12 text-muted-foreground leading-relaxed">

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Info className="w-5 h-5 text-electric-400" />
                                1. What are Cookies?
                            </h2>
                            <p>
                                Cookies are small text files stored on your device that help us optimize your experience on MIKESTH3TIC.DEV. We use them sparingly to ensure system performance and remember your preferences.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <Settings className="w-5 h-5 text-electric-400" />
                                2. How We Use Cookies
                            </h2>
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                    <h3 className="text-foreground font-semibold mb-1">Essential Cookies</h3>
                                    <p className="text-sm">Necessary for the platform to function, such as session management for MikeAI and security protocols.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                    <h3 className="text-foreground font-semibold mb-1">Preference Cookies</h3>
                                    <p className="text-sm">Used to remember your theme selection (Dark/Light) and UI preferences.</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                                    <h3 className="text-foreground font-semibold mb-1">Interaction Data</h3>
                                    <p className="text-sm">Minimal, anonymized tracking to understand which sections of our architecture explorer are most engaging.</p>
                                </div>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <MousePointer2 className="w-5 h-5 text-electric-400" />
                                3. Your Control
                            </h2>
                            <p>
                                Most web browsers allow you to control cookies through their settings. You can delete all cookies currently on your device and set most browsers to prevent them from being placed. Note that disabling essential cookies may impact the performance of MikeAI and other interactive components.
                            </p>
                        </section>

                        <section className="space-y-4 border-t border-white/5 pt-8">
                            <h2 className="text-lg font-bold text-foreground">Consent</h2>
                            <p>
                                By continuing to use MIKESTH3TIC.DEV, you consent to our use of cookies according to this policy. If we make significant changes to our cookie protocol, we will update the "Last Updated" date at the top of this page.
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}
