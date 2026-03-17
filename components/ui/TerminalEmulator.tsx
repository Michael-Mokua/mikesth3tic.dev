"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKernel } from "@/components/providers/KernelProvider";

export function TerminalEmulator() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string[]>(["Mikesth3tic OS v1.0.0", "Type 'help' for available commands."]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { toggleKernelMode, isKernelMode } = useKernel();

    // Toggle via keyboard shortcut (Ctrl + ` or Cmd + `)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === '`') {
                e.preventDefault();
                setIsOpen(v => !v);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Scroll to bottom on new output
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        setInput("");
        
        let newOutput = [...output, `admin@mikestudio:~$ ${cmd}`];

        switch (cmd) {
            case "help":
                newOutput.push("Available commands: help, clear, whoami, hire, projects, kernel, sudo rm -rf /");
                break;
            case "kernel":
                toggleKernelMode();
                newOutput.push(`Kernel execution trace: ${!isKernelMode ? "ENABLED" : "DISABLED"}`);
                break;
            case "clear":
                setOutput(["Mikesth3tic OS v1.0.0"]);
                return;
            case "whoami":
                newOutput.push("Michael Ogutu Mokua - Software-First Technology Studio Founder.");
                break;
            case "projects":
                newOutput.push("Navigating to projects vault...");
                router.push("/projects");
                setTimeout(() => setIsOpen(false), 500);
                break;
            case "hire":
            case "contact":
                newOutput.push("Initializing project intake sequence...");
                router.push("/start-project");
                setTimeout(() => setIsOpen(false), 500);
                break;
            case "sudo rm -rf /":
                newOutput.push("Nice try. Core systems are protected by Llama 3 security protocols.");
                break;
            case "reboot":
                newOutput.push("Rebooting system...");
                setTimeout(() => window.location.reload(), 1000);
                break;
            case "":
                break;
            default:
                newOutput.push(`Command not found: ${cmd}`);
        }

        setOutput(newOutput);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-x-0 top-0 z-[1000] h-[50vh] bg-black/95 backdrop-blur-xl border-b border-electric-400/20 font-mono text-xs sm:text-sm text-green-400 shadow-2xl flex flex-col"
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5 text-white/60">
                        <div className="flex items-center gap-2">
                            <TerminalSquare className="w-4 h-4" />
                            <span>mikestudio-terminal</span>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            className="hover:text-white transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Output Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 scroller">
                        {output.map((line, i) => (
                            <div key={i} className={line.startsWith("admin@") ? "text-white/60" : "text-electric-400"}>
                                {line}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleCommand} className="p-4 border-t border-white/5 flex items-center gap-2">
                        <span className="text-white/60">admin@mikestudio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-electric-400 focus:ring-0 placeholder-white/20"
                            placeholder="Type a command..."
                            spellCheck={false}
                            autoComplete="off"
                        />
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
