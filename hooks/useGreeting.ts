"use client";

import { useState, useEffect } from "react";

const GREETINGS = [
    { text: "Hello", lang: "English" },
    { text: "Jambo", lang: "Swahili" },
    { text: "Konnichiwa", lang: "Japanese" },
    { text: "Habari", lang: "Swahili" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "Salama", lang: "Malagasy" },
];

export function useGreeting() {
    const [index, setIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentGreeting = GREETINGS[index].text;
        let timeout: NodeJS.Timeout;

        if (isDeleting) {
            if (displayText.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 50);
            } else {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % GREETINGS.length);
            }
        } else {
            if (displayText.length < currentGreeting.length) {
                timeout = setTimeout(() => {
                    setDisplayText(currentGreeting.slice(0, displayText.length + 1));
                }, 100);
            } else {
                timeout = setTimeout(() => {
                    setIsDeleting(true);
                }, 2000);
            }
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, index]);

    return {
        greeting: displayText,
        language: GREETINGS[index].lang
    };
}
