"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface GlitchTextProps {
    text1: string;
    text2: string;
    className?: string;
}

export default function GlitchText({ text1, text2, className = "" }: GlitchTextProps) {
    const [currentText, setCurrentText] = useState(text1);
    const [isGlitching, setIsGlitching] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const interval = setInterval(() => {
            // Trigger glitch effect randomly
            if (Math.random() > 0.7) {
                setIsGlitching(true);

                // Rapidly switch between texts
                let toggleCount = 0;
                const toggleInterval = setInterval(() => {
                    setCurrentText((prev) => (prev === text1 ? text2 : text1));
                    toggleCount++;

                    if (toggleCount > 5) {
                        clearInterval(toggleInterval);
                        setIsGlitching(false);
                        setCurrentText(text1); // Reset to primary text
                    }
                }, 100);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [text1, text2, mounted]);

    if (!mounted) return <span className={className}>{text1}</span>;

    return (
        <motion.span
            className={`relative inline-block font-mono font-bold ${className}`}
            animate={{
                textShadow: isGlitching
                    ? [
                        "2px 0 #ff003c, -2px 0 #00f0ff",
                        "-2px 0 #ff003c, 2px 0 #00f0ff",
                        "0 0 0 transparent",
                    ]
                    : "0 0 0 transparent",
            }}
            transition={{ duration: 0.2 }}
        >
            {currentText}
            {isGlitching && (
                <>
                    <span className="absolute top-0 left-0 -ml-[2px] text-primary opacity-70 animate-pulse">
                        {text2}
                    </span>
                    <span className="absolute top-0 left-0 ml-[2px] text-accent opacity-70 animate-pulse">
                        {text2}
                    </span>
                </>
            )}
        </motion.span>
    );
}
