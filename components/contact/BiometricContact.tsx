"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Scan, CheckCircle, Smartphone, Send, ArrowRight, Lock } from "lucide-react";

export function BiometricContact() {
    const [step, setStep] = useState(1); // 1: Initial, 2: Scanning, 3: Form, 4: Success
    const [progress, setProgress] = useState(0);

    const startScan = () => {
        setStep(2);
        let p = 0;
        const interval = setInterval(() => {
            p += 2;
            setProgress(p);
            if (p >= 100) {
                clearInterval(interval);
                setStep(3);
            }
        }, 30);
    };

    return (
        <section className="section-padding bg-dark-950/80 border-t border-white/5">
            <div className="container-custom max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-[10px] font-mono text-electric-400 uppercase tracking-[0.5em] font-bold block mb-4">
                        // PROTOCOL_256
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        Secure <span className="text-gradient">Handshake</span>
                    </h2>
                </div>

                <div className="liquid-glass rounded-[3rem] p-8 md:p-16 border-white/10 relative overflow-hidden min-h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div 
                                key="step1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-center"
                            >
                                <div className="w-24 h-24 rounded-full bg-electric-400/10 flex items-center justify-center mx-auto mb-8 border border-electric-400/20 group hover:border-electric-400 transition-colors">
                                    <Shield className="w-10 h-10 text-electric-400" />
                                </div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-wider">Initialize Project Node</h3>
                                <p className="text-muted-foreground mb-12 max-w-sm mx-auto text-sm leading-relaxed">
                                    Our systems require a biometric-style verification of your project intent before establishing a secure channel.
                                </p>
                                <button 
                                    onClick={startScan}
                                    className="px-8 py-4 rounded-full bg-electric-400 text-dark-950 font-black uppercase text-xs tracking-[0.2em] flex items-center gap-3 mx-auto hover:scale-105 active:scale-95 transition-all"
                                >
                                    Start System Scan <Scan className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div 
                                key="step2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full max-w-md text-center"
                            >
                                <div className="relative w-full aspect-square md:aspect-video rounded-3xl bg-black/40 border border-white/10 overflow-hidden mb-8">
                                    {/* Scan Line */}
                                    <motion.div 
                                        className="absolute left-0 right-0 h-1 bg-electric-400 shadow-[0_0_20px_var(--color-electric-400)] z-20"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 border-2 border-electric-400/20 rounded-full flex items-center justify-center">
                                            <div className="w-16 h-16 border-4 border-electric-400 rounded-full border-t-transparent animate-spin" />
                                        </div>
                                        <p className="mt-6 text-[10px] font-mono text-electric-400 uppercase tracking-[0.3em] font-bold">
                                            Analyzing_Visitor_Pattern... {progress}%
                                        </p>
                                    </div>
                                    <div className="absolute inset-x-8 bottom-8 h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-electric-400"
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs font-mono text-white/20 uppercase tracking-widest">
                                    Awaiting_Verification...
                                </p>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div 
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-full max-w-xl"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <CheckCircle className="w-8 h-8 text-green-400" />
                                    <div>
                                        <h3 className="text-xl font-bold uppercase tracking-wider">Pattern Verified</h3>
                                        <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Handshake_Permitted</p>
                                    </div>
                                </div>
                                
                                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(4); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="IDENTITY_DESC" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs uppercase font-mono focus:border-electric-400 outline-none" required />
                                        <input type="email" placeholder="SIGNAL_CHANNEL (EMAIL)" className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs uppercase font-mono focus:border-electric-400 outline-none" required />
                                    </div>
                                    <textarea placeholder="PROJECT_SPECIFICATIONS" rows={4} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-xs uppercase font-mono focus:border-electric-400 outline-none resize-none" required />
                                    <button className="w-full py-4 rounded-xl bg-electric-400 text-dark-950 font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-white hover:text-dark-950 transition-all">
                                        Execute Handshake <Send className="w-4 h-4" />
                                    </button>
                                </form>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div 
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-8">
                                    <div className="absolute inset-0 bg-green-400/20 blur-2xl rounded-full" />
                                    <div className="relative w-full h-full rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                                        <CheckCircle className="w-12 h-12 text-green-400" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-wider">Handshake Successful</h3>
                                <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-10 leading-relaxed font-mono italic">
                                    "Project packet encrypted and queued for manual system architect review. Expect signal return within 12 cycles."
                                </p>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="px-4 py-2 bg-white/5 rounded-md border border-white/10 flex items-center gap-2">
                                        <Lock className="w-3 h-3 text-white/40" />
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">AES_256_ACTIVE</span>
                                    </div>
                                    <div className="px-4 py-2 bg-green-400/10 rounded-md border border-green-400/20 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">SIGNAL_SENT</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 p-4">
                        <ArrowRight className="w-4 h-4 text-white/5 rotate-45" />
                    </div>
                </div>
            </div>
        </section>
    );
}
