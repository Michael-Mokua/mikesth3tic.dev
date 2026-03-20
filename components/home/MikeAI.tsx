"use client";

import { useChat, type UIMessage as Message } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Terminal } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

interface MikeAIProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

export function MikeAI({ isOpen, setIsOpen }: MikeAIProps) {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status, error } = useChat<Message>({
        transport: new DefaultChatTransport({
            api: "/api/chat",
            fetch: typeof window !== 'undefined' ? window.fetch.bind(window) : undefined
        }),
        onError: (err) => {
            console.error("MikeAI Chat Error:", err);
        },
        messages: [
            {
                id: "welcome",
                role: "assistant",
                parts: [
                    {
                        type: "text",
                        text: "Niaje msee! Welcome to the Nexus. You're standing in a digital landscape engineered by Michael—the Supreme Architect. I'm MikeAI, his primary intelligence extension. How shall we explore his genius today? Uko rada?"
                    }
                ]
            }
        ]
    });

    const isLoading = status === "submitted" || status === "streaming";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const currentInput = input;
        setInput("");
        await sendMessage({ text: currentInput });
    };

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed bottom-8 right-8 z-[60] w-[400px] h-[600px] max-w-[90vw] max-h-[80vh] liquid-glass rounded-[2rem] border border-white/10 flex flex-col shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-electric-400/10 flex items-center justify-center">
                                <Bot className="w-6 h-6 text-electric-400" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-foreground">MikeAI Companion</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", error ? "bg-red-500" : "bg-green-500")} />
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                        {error ? "System Offline" : "System Active"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                            <X className="w-5 h-5 text-muted-foreground" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
                    >
                        {messages.map((m: Message) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex flex-col gap-2 max-w-[85%]",
                                    m.role === "user" ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div className={cn(
                                    "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                    m.role === "user"
                                        ? "bg-electric-400 text-black font-medium"
                                        : "glass border border-white/5 text-foreground"
                                )}>
                                    {m.parts ? m.parts.map((p, idx) => p.type === "text" ? p.text : null) : (m as any).content}
                                </div>
                                <span className="text-[9px] font-mono text-muted-foreground uppercase opacity-50 px-1">
                                    {m.role === "user" ? "Client" : "System"}
                                </span>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-2 items-center text-muted-foreground">
                                <Terminal className="w-3 h-3 animate-spin" />
                                <span className="text-[10px] font-mono uppercase tracking-widest">Processing...</span>
                            </div>
                        )}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20 text-red-400 text-xs font-mono">
                                [CONNECTION_ERROR]: {error.message || "Failed to establish link with MikeAI core. Verify network protocols."}
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 bg-white/[0.02] border-t border-white/10"
                    >
                        <div className="relative">
                            <input
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Ask about origins, stack, or project protocols..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 pr-12 text-sm focus:outline-none focus:border-electric-400/50 transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1.5 p-2 rounded-lg bg-electric-400/10 text-electric-400 hover:bg-electric-400 hover:text-black transition-all disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

