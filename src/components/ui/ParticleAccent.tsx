"use client";

import type { CSSProperties, ReactNode } from "react";

type ParticleVariant = "price" | "button";

type ParticleStyle = CSSProperties & {
    "--x": string;
    "--y": string;
    "--tx": string;
    "--ty": string;
    "--delay": string;
    "--duration": string;
    "--size": string;
};

interface ParticleAccentProps {
    children: ReactNode;
    variant?: ParticleVariant;
    /**
     * Legacy prop -- the dot-particle version ignores text labels.
     * Kept in the signature so existing consumers don't break.
     */
    labels?: string[];
    className?: string;
}

/**
 * 14 randomised dot positions around the wrapped element. The dots
 * stay invisible at rest and only emerge on hover / focus to keep
 * the UI calm by default.
 */
const dotPositions: Array<{
    x: string; y: string; tx: string; ty: string; delay: string; duration: string; size: string;
}> = [
    { x: "8%",  y: "14%", tx: "-12px", ty: "-10px", delay: "0s",    duration: "3.6s", size: "3px" },
    { x: "26%", y: "-4%", tx: "-4px",  ty: "-14px", delay: "0.2s",  duration: "4.2s", size: "2px" },
    { x: "48%", y: "-8%", tx: "0px",   ty: "-18px", delay: "0.6s",  duration: "3.8s", size: "4px" },
    { x: "72%", y: "-4%", tx: "6px",   ty: "-14px", delay: "0.3s",  duration: "4s",   size: "2px" },
    { x: "92%", y: "16%", tx: "14px",  ty: "-8px",  delay: "0.5s",  duration: "3.4s", size: "3px" },
    { x: "104%", y: "44%", tx: "16px",  ty: "0px",   delay: "0.1s",  duration: "4.4s", size: "2px" },
    { x: "92%", y: "80%", tx: "12px",  ty: "10px",  delay: "0.7s",  duration: "3.6s", size: "3px" },
    { x: "70%", y: "104%", tx: "4px",   ty: "16px",  delay: "0.4s",  duration: "4.2s", size: "2px" },
    { x: "48%", y: "108%", tx: "0px",   ty: "18px",  delay: "0.2s",  duration: "3.8s", size: "4px" },
    { x: "26%", y: "104%", tx: "-4px",  ty: "16px",  delay: "0.6s",  duration: "4s",   size: "2px" },
    { x: "8%",  y: "80%",  tx: "-12px", ty: "10px",  delay: "0.3s",  duration: "3.6s", size: "3px" },
    { x: "-4%", y: "44%",  tx: "-16px", ty: "0px",   delay: "0s",    duration: "4.6s", size: "2px" },
    { x: "16%", y: "44%",  tx: "-8px",  ty: "-4px",  delay: "0.8s",  duration: "3.4s", size: "2px" },
    { x: "84%", y: "44%",  tx: "8px",   ty: "4px",   delay: "0.5s",  duration: "4s",   size: "2px" },
];

export default function ParticleAccent({
    children,
    variant = "price",
    className = "",
}: ParticleAccentProps) {
    return (
        <span className={`particle-accent particle-accent--${variant} ${className}`}>
            <span className="particle-accent__content">{children}</span>
            <span className="particle-accent__field" aria-hidden="true">
                {dotPositions.map((dot, index) => {
                    const style: ParticleStyle = {
                        "--x": dot.x,
                        "--y": dot.y,
                        "--tx": dot.tx,
                        "--ty": dot.ty,
                        "--delay": dot.delay,
                        "--duration": dot.duration,
                        "--size": dot.size,
                    };
                    return (
                        <span
                            key={`${variant}-${index}`}
                            className="particle-accent__mote"
                            style={style}
                        />
                    );
                })}
            </span>
        </span>
    );
}
