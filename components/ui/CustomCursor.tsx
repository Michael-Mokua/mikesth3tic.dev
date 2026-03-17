"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { useSound } from "@/hooks/useSound";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");

    // Use framer-motion springs for fluid, premium movement
    const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
    const { playHover, playClick, initAudio } = useSound();

    useEffect(() => {
        // Detect touch devices to disable custom cursor
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Initiate audio context immediately on first interaction
            if (e.type === "mouseover") initAudio();

            // Check if hovering over clickable elements
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                if (!isHovering) {
                    playHover();
                }
                setIsHovering(true);
                setCursorType("pointer");
            } else if (window.getComputedStyle(target).cursor === "text" || target.tagName.toLowerCase() === "p" || target.tagName.toLowerCase() === "h1") {
                setIsHovering(true);
                setCursorType("text");
            } else {
                setIsHovering(false);
                setCursorType("default");
            }
        };

        const handleClick = () => {
            if (cursorType === "pointer") {
                playClick();
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleClick);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleClick);
        };
    }, [cursorX, cursorY, isHovering, cursorType, playHover, playClick, initAudio]);

    // Don't render on mobile/touch interfaces
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const variants = {
        default: {
            width: 16,
            height: 16,
            x: "-50%",
            y: "-50%",
            backgroundColor: "transparent",
            border: "1px solid rgba(139, 211, 230, 0.5)", // electric-400
        },
        pointer: {
            width: 48,
            height: 48,
            x: "-50%",
            y: "-50%",
            backgroundColor: "rgba(139, 211, 230, 0.1)",
            border: "1px solid rgba(139, 211, 230, 0.8)",
            scale: 1.2,
        },
        text: {
            width: 4,
            height: 24,
            x: "-50%",
            y: "-50%",
            borderRadius: "2px",
            backgroundColor: "rgba(139, 211, 230, 0.8)",
            border: "none",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full hidden md:block mix-blend-screen"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        >
            <div className={`w-full h-full rounded-full transition-opacity duration-300 ${cursorType === 'pointer' ? 'bg-electric-400/20 blur-[2px]' : ''}`} />
        </motion.div>
    );
}
