"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Home, Briefcase, FileText, Send, X, Terminal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useKernel } from "@/components/providers/KernelProvider";

const ACTIONS = [
  { id: "home", label: "Home", icon: Home, shortcut: "H", path: "/" },
  { id: "projects", label: "Projects", icon: Briefcase, shortcut: "P", path: "/projects" },
  { id: "blog", label: "Blog", icon: FileText, shortcut: "B", path: "/blog" },
  { id: "contact", label: "Start a Project", icon: Send, shortcut: "S", path: "/start-project" },
  { id: "kernel", label: "Toggle Kernel Mode", icon: Terminal, shortcut: "K", action: "kernel" },
];

export function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { toggleKernelMode } = useKernel();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredActions = ACTIONS.filter(action => 
    action.label.toLowerCase().includes(search.toLowerCase())
  );

  const executeAction = useCallback((action: typeof ACTIONS[0]) => {
    if (action.path) {
      router.push(action.path);
    } else if (action.action === "kernel") {
      toggleKernelMode();
    }
    setIsOpen(false);
    setSearch("");
  }, [router, toggleKernelMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      } else if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex(i => (i + 1) % filteredActions.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(i => (i - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredActions[selectedIndex]) {
            executeAction(filteredActions[selectedIndex]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredActions, selectedIndex, executeAction]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-2xl bg-black/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl pointer-events-auto relative z-10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands or navigate..."
                className="flex-1 bg-transparent border-none outline-none text-lg font-medium text-foreground placeholder-white/20"
              />
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                <span className="text-[10px] font-mono text-muted-foreground">ESC</span>
              </div>
            </div>

            {/* Results */}
            <div className="p-2 max-h-[60vh] overflow-y-auto scroller">
              {filteredActions.length > 0 ? (
                filteredActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => executeAction(action)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                        idx === selectedIndex 
                          ? "bg-electric-400/10 border border-electric-400/20 shadow-[0_0_20px_rgba(0,212,255,0.1)]" 
                          : "bg-transparent border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg transition-colors ${
                          idx === selectedIndex ? "bg-electric-400/20 text-electric-400" : "bg-white/5 text-muted-foreground"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className={`font-medium transition-colors ${
                          idx === selectedIndex ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {action.label}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {action.shortcut && (
                          <div className={`px-2 py-0.5 rounded-md border font-mono text-[10px] transition-colors ${
                            idx === selectedIndex 
                              ? "bg-electric-400/20 border-electric-400/30 text-electric-400" 
                              : "bg-white/5 border-white/10 text-muted-foreground/50"
                          }`}>
                            {action.shortcut}
                          </div>
                        )}
                        <ArrowRight className={`w-4 h-4 transition-all duration-300 ${
                          idx === selectedIndex ? "opacity-100 translate-x-1 text-electric-400" : "opacity-0 -translate-x-2"
                        }`} />
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                    No results found in <span className="text-electric-400">Core.Studio</span> system.<br/>
                    Try searching for <span className="text-white">'Contact'</span> or <span className="text-white">'Blog'</span>.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] text-muted-foreground font-mono">↑↓</div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Navigate</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] text-muted-foreground font-mono">ENTER</div>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Execute</span>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground font-mono">+ K</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
