"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/Toaster";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            // Set the admin-token cookie for middleware (httpOnly cookies can't be set from client easily so we use a simple cookie here)
            // In production, you'd use a server action or API route to set an httpOnly cookie
            document.cookie = `admin-token=${token}; path=/; max-age=3600; SameSite=Lax`;

            toast("Login successful! Welcome back, Michael.", "success");
            router.push("/dashboard");
        } catch (error: any) {
            console.error("Login Error:", error);
            toast("Authentication failed. Please check your credentials.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-dark-950 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric-400/10 blur-[150px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-electric-400 transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to website
                </Link>

                <div className="glass border border-white/[0.1] rounded-3xl p-8 md:p-10 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-electric-400/10 border border-electric-400/20 text-electric-400 mb-4">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-black text-foreground">Admin Access</h1>
                        <p className="text-sm text-muted-foreground mt-2 font-mono">AUTHORIZED PERSONNEL ONLY</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground ml-1">ADMIN EMAIL</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-electric-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@mikesth3tic.dev"
                                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground ml-1">SECURE PASSWORD</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm focus:border-electric-400/30 transition-all outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-electric-400 text-dark-950 font-black text-sm hover:bg-electric-300 transition-all duration-200 glow-electric uppercase tracking-widest disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Authorize Session"
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
                        <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">
                            IP ADDRESS LOGGED. UNAUTHORIZED ATTEMPTS WILL TRIGGER BIOMETRIC LOCKDOWN.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
