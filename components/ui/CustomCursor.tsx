"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");

    // Use framer-motion springs for fluid, premium movement
    const cursorX = useSpring(-100, { stiffness: 600, damping: 30 });
    const cursorY = useSpring(-100, { stiffness: 600, damping: 30 });

    useEffect(() => {
        // Detect touch devices to disable custom cursor
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Check if hovering over clickable elements
            if (
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setCursorType("pointer");
            } else if (window.getComputedStyle(target).cursor === "text" || target.tagName.toLowerCase() === "p" || target.tagName.toLowerCase() === "h1") {
                setCursorType("text");
            } else {
                setCursorType("default");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile/touch interfaces
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const variants = {
        default: {
            width: 20,
            height: 20,
            x: "-50%",
            y: "-50%",
            backgroundColor: "transparent",
            border: "1px solid rgba(139, 211, 230, 0.4)",
        },
        pointer: {
            width: 40,
            height: 40,
            x: "-50%",
            y: "-50%",
            backgroundColor: "rgba(139, 211, 230, 0.08)",
            border: "1px solid rgba(139, 211, 230, 0.6)",
        },
        text: {
            width: 3,
            height: 20,
            x: "-50%",
            y: "-50%",
            borderRadius: "2px",
            backgroundColor: "rgba(139, 211, 230, 0.6)",
            border: "none",
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full hidden lg:block mix-blend-screen"
            style={{
                x: cursorX,
                y: cursorY,
            }}
            variants={variants}
            animate={cursorType}
            transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.4 }}
        />
    );
}
