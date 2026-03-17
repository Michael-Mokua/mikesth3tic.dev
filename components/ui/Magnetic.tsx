"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
    children: React.ReactElement;
    intensity?: number;
    actionArea?: number;
}

export function Magnetic({ children, intensity = 0.2, actionArea = 2 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();

        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            // Only apply magnetic effect if within action area
            if (
                Math.abs(middleX) < (width * actionArea) / 2 &&
                Math.abs(middleY) < (height * actionArea) / 2
            ) {
                setPosition({ x: middleX * intensity, y: middleY * intensity });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
}
