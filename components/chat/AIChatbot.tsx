"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, X, Send, Minimize2, Loader2, Trash2 } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
}

const STORAGE_KEY = "mikesth3tic_chat_history";
const MAX_HISTORY = 30; // Max messages to persist

const DEFAULT_GREETING: Message = {
    role: "assistant",
    content: "Greetings. I am MikeAI, the intelligent layer of MIKESTH3TIC. Ask me about our systems, founder, or architecture! 🚀",
};

function loadMessages(): Message[] {
    if (typeof window === "undefined") return [DEFAULT_GREETING];
    try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
    } catch { }
    return [DEFAULT_GREETING];
}

function saveMessages(messages: Message[]) {
    if (typeof window === "undefined") return;
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_HISTORY)));
    } catch { }
}

export function AIChatbot() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([DEFAULT_GREETING]);

    // Load history after mount to prevent hydration mismatch
    useEffect(() => {
        const history = loadMessages();
        if (history.length > 1) {
            setMessages(history);
        }
    }, []);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Persist messages to sessionStorage whenever they change
    useEffect(() => {
        saveMessages(messages);
    }, [messages]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const clearHistory = useCallback(() => {
        setMessages([DEFAULT_GREETING]);
        sessionStorage.removeItem(STORAGE_KEY);
    }, []);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage,
                    history: messages.slice(-10),
                }),
            });

            if (!res.ok) throw new Error("Failed to get response");
            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || "Sorry, I couldn't process that." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Sorry, I'm having trouble connecting. Try again later!" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chatbox"
                        className="absolute bottom-16 right-0 w-80 sm:w-96 glass border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        style={{ height: "460px" }}
                        initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-electric-400/20 border border-electric-400/30 flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-electric-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">MikeAI Assistant</p>
                                    <div className="flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        <p className="text-xs text-muted-foreground">Online · Remembers this session</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearHistory}
                                    className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground hover:text-red-400 transition-colors"
                                    aria-label="Clear chat history"
                                    title="Clear conversation"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-1.5 rounded-lg hover:bg-white/[0.05] text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label="Close chat"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.role === "user"
                                            ? "bg-electric-400/20 border border-electric-400/30 text-foreground rounded-br-sm"
                                            : "bg-white/[0.05] border border-white/[0.06] text-muted-foreground rounded-bl-sm"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white/[0.05] border border-white/[0.06] rounded-2xl rounded-bl-sm px-3.5 py-2.5">
                                        <Loader2 className="w-4 h-4 text-electric-400 animate-spin" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input */}
                        <div className="px-3 py-3 border-t border-white/[0.06]">
                            <div className="flex items-center gap-2 bg-white/[0.04] rounded-xl border border-white/[0.06] px-3 py-2 focus-within:border-electric-400/30 transition-colors">
                                <textarea
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Ask me anything..."
                                    rows={1}
                                    className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none"
                                    aria-label="Chat message"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!input.trim() || loading}
                                    className={`p-1.5 rounded-lg transition-all duration-200 ${input.trim() && !loading
                                        ? "bg-electric-400/20 text-electric-400 hover:bg-electric-400/30"
                                        : "text-muted-foreground cursor-not-allowed"
                                        }`}
                                    aria-label="Send message"
                                >
                                    <Send className="w-3.5 h-3.5" />
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-1.5">
                                Powered by MIKESTH3TIC.DEV
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle button */}
            <motion.button
                onClick={() => setOpen((prev) => !prev)}
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${open
                    ? "bg-white/[0.08] border border-white/[0.12] text-foreground"
                    : "bg-electric-400 text-dark-900 hover:shadow-electric"
                    }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={open ? "Close AI assistant" : "Open AI assistant"}
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="minimize" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <Minimize2 className="w-5 h-5" />
                        </motion.div>
                    ) : (
                        <motion.div key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                            <Bot className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
                {/* Ping dot */}
                {!open && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
                )}
            </motion.button>
        </div>
    );
}
