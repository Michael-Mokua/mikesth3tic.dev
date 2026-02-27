"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AnimatedCursor() {
    const [visible, setVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 30, stiffness: 400, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const trailSpringConfig = { damping: 40, stiffness: 200, mass: 0.8 };
    const trailX = useSpring(cursorX, trailSpringConfig);
    const trailY = useSpring(cursorY, trailSpringConfig);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setVisible(true);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);

        const checkPointer = (e: MouseEvent) => {
            const el = e.target as HTMLElement;
            if (!el) return;
            const style = window.getComputedStyle(el);
            const isLink =
                el.tagName === "A" ||
                el.tagName === "BUTTON" ||
                style.cursor === "pointer" ||
                el.getAttribute("role") === "button";
            setIsPointer(isLink);
        };

        const onMouseDown = () => setIsClicking(true);
        const onMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mousemove", checkPointer);
        window.addEventListener("mouseleave", onLeave);
        window.addEventListener("mouseenter", onEnter);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousemove", checkPointer);
            window.removeEventListener("mouseleave", onLeave);
            window.removeEventListener("mouseenter", onEnter);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [cursorX, cursorY]);

    return (
        <div className="custom-cursor pointer-events-none fixed inset-0 z-[99999] hidden lg:block">
            {/* Trail circle */}
            <motion.div
                className="absolute rounded-full bg-electric-400/10 border border-electric-400/20"
                style={{
                    x: trailX,
                    y: trailY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isPointer ? 48 : isClicking ? 20 : 36,
                    height: isPointer ? 48 : isClicking ? 20 : 36,
                    opacity: visible ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />

            {/* Main dot */}
            <motion.div
                className="absolute rounded-full bg-electric-400"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isClicking ? 6 : isPointer ? 8 : 6,
                    height: isClicking ? 6 : isPointer ? 8 : 6,
                    opacity: visible ? 1 : 0,
                    scale: isPointer ? 1.5 : 1,
                    backgroundColor: isPointer ? "#a855f7" : "#00d4ff",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
        </div>
    );
}
