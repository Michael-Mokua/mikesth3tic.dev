"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, Bot, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function ContactForm() {
    const [isListening, setIsListening] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const startListening = () => {
        if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            // Simple logic to map speech to fields
            if (transcript.toLowerCase().includes("my name is ")) {
                setFormData(prev => ({ ...prev, name: transcript.toLowerCase().split("my name is ")[1] }));
            } else if (transcript.toLowerCase().includes("message is ")) {
                setFormData(prev => ({ ...prev, message: transcript.toLowerCase().split("message is ")[1] }));
            } else {
                setFormData(prev => ({ ...prev, message: prev.message + " " + transcript }));
            }
        };

        recognition.start();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("idle");
        // Simulate API call
        setTimeout(() => setStatus("success"), 1500);
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="container-custom max-w-4xl">
                <motion.div
                    className="liquid-glass p-8 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <p className="text-xs font-mono text-electric-400 mb-4 tracking-[0.3em] uppercase">// START_INITIATIVE</p>
                            <h2 className="text-4xl font-black text-foreground mb-6 leading-tight tracking-tighter">
                                Ready to build the <br />
                                <span className="text-gradient">next big system?</span>
                            </h2>
                            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                                Use the form or tap the mic to dictate your project requirements directly into our system.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-electric-400/10 flex items-center justify-center">
                                        <Bot className="w-5 h-5 text-electric-400" />
                                    </div>
                                    <span className="text-xs font-mono text-foreground/70 uppercase tracking-widest leading-none">Voice UI Enabled</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-4">Identification</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-electric-400/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-4">Communication Node</label>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-electric-400/50 transition-colors"
                                    required
                                />
                            </div>

                            <div className="relative space-y-2">
                                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest ml-4">System Requirements</label>
                                <textarea
                                    placeholder="Tell me about your vision..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-electric-400/50 transition-colors min-h-[150px] resize-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={startListening}
                                    className={cn(
                                        "absolute right-4 bottom-4 p-3 rounded-full transition-all",
                                        isListening 
                                            ? "bg-red-500 scale-110 animate-pulse text-white" 
                                            : "bg-electric-400/10 text-electric-400 hover:bg-electric-400 hover:text-black"
                                    )}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-4 rounded-2xl bg-electric-400 text-black font-bold text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-electric-400/20"
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="w-4 h-4" />
                                Deploy Inquiry
                            </motion.button>

                            <AnimatePresence>
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-2 text-green-400 justify-center font-mono text-[10px] uppercase tracking-widest"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Inquiry Sent Successfully. Status: PENDING_REVIEW
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>

                    {/* Background glow */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-electric-400/10 rounded-full blur-[100px] -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
