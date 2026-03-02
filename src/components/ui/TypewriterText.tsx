"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
    cursor?: boolean;
}

export default function TypewriterText({
    text,
    delay = 0,
    speed = 50,
    className = "",
    cursor = true,
    hideCursorOnComplete = false,
}: TypewriterTextProps & { hideCursorOnComplete?: boolean }) {
    // Start with the full text for SSR / SEO
    const [displayedText, setDisplayedText] = useState(text);
    const [started, setStarted] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Once mounted on client, we can clear the text and prepare for animation
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!started || !mounted) return;

        let currentIndex = 0;
        setDisplayedText("");
        setCompleted(false);

        const interval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayedText(text.slice(0, currentIndex));
                currentIndex++;
            } else {
                setCompleted(true);
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [started, text, speed]);

    useEffect(() => {
        if (!mounted) return;
        setDisplayedText("");
        setStarted(false);
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [text, delay, mounted]);

    const showCursor = cursor && mounted && (!hideCursorOnComplete || !completed);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && (
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-[0.5em] h-[1em] bg-primary ml-1 align-middle"
                />
            )}
        </span>
    );
}
