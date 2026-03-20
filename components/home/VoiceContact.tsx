"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Phone, X, MessageCircle } from "lucide-react";

interface VoiceContactProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    isListening: boolean;
    setIsListening: (listening: boolean) => void;
    voiceStatus: string;
    setVoiceStatus: (status: string) => void;
}

export function VoiceContact({ 
    showModal, 
    setShowModal, 
    isListening, 
    setIsListening, 
    voiceStatus, 
    setVoiceStatus 
}: VoiceContactProps) {


    const toggleVoice = () => {
        setIsListening(!isListening);
        if (!isListening) {
            setVoiceStatus("LISTENING_FOR_COMMANDS...");
            setTimeout(() => {
                setVoiceStatus("COMMAND_RECOGNIZED: CALL_MIKE");
                setTimeout(() => {
                    setShowModal(true);
                    setIsListening(false);
                    setVoiceStatus("READY_FOR_VOICE");
                }, 1000);
            }, 2000);
        }
    };

    return (
        <>
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-dark-950/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="liquid-glass p-8 rounded-[2rem] max-w-md w-full border border-electric-400/30"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[10px] font-mono text-electric-400 mb-1 block uppercase tracking-widest">// QUICK_CONTACT_INITIALIZED</span>
                                    <h3 className="text-2xl font-black text-white tracking-tight uppercase">Connection Ready.</h3>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <X className="w-5 h-5 text-white/40" />
                                </button>
                            </div>

                            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                                Our spatial contact interface is active. How would you like to initiate the handshake?
                            </p>

                            <div className="grid grid-cols-1 gap-3">
                                <a href="tel:+254700000000" className="flex items-center gap-4 p-4 rounded-xl bg-electric-400/10 border border-electric-400/20 hover:bg-electric-400 hover:text-dark-950 transition-all group">
                                    <Phone className="w-5 h-5" />
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-wider">Voice Call (Kenya)</p>
                                        <p className="text-[10px] opacity-70 font-mono">+254 7XX XXX XXX</p>
                                    </div>
                                </a>
                                <a href="https://wa.me/254700000000" className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                                    <MessageCircle className="w-5 h-5 text-electric-400" />
                                    <div>
                                        <p className="text-sm font-bold uppercase tracking-wider">WhatsApp Status</p>
                                        <p className="text-[10px] opacity-70 font-mono">ENCRYPTED_SIGNAL</p>
                                    </div>
                                </a>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 text-center">
                                <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">SECURE_HANDSHAKE_AES_256</p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
