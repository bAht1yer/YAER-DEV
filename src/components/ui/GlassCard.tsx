"use client";

import { useRef, useCallback, useEffect, useState, type ReactNode, type KeyboardEvent } from "react";

/**
 * GlassCard — the single source of the Cyan Chrome "glass feel".
 *
 * Frosted glass (.glass-panel) + HUD corners + cursor reactivity:
 *  - radial cyan/violet glow that follows the pointer (--mx/--my)
 *  - subtle 3D tilt toward the pointer (max ~5deg), springy reset on leave
 *  - holographic sheen offset nudged by the pointer
 * Used by the hero main card AND every project/offer card so the
 * interaction is identical everywhere. Honors prefers-reduced-motion.
 */
interface GlassCardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
    /** Max tilt in degrees. */
    maxTilt?: number;
    onClick?: () => void;
}

export default function GlassCard({
    children,
    className = "",
    interactive = true,
    maxTilt = 5,
    onClick,
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const frame = useRef<number | null>(null);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    const handleMove = useCallback((e: React.PointerEvent) => {
        if (!interactive || reduced) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.setProperty("--mx", `${px * 100}%`);
            el.style.setProperty("--my", `${py * 100}%`);
            el.style.setProperty("--glow-opacity", "1");
            el.style.setProperty("--sheen-x", `${px * 100}%`);
            const ry = (px - 0.5) * 2 * maxTilt;           // rotateY
            const rx = -(py - 0.5) * 2 * maxTilt;          // rotateX
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
    }, [interactive, reduced, maxTilt]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    }, [onClick]);

    const handleLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--glow-opacity", "0");
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }, []);

    return (
        <div
            ref={ref}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            onClick={onClick}
            onKeyDown={onClick ? handleKeyDown : undefined}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`glass-panel glass-glow sheen-animate transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014] ${className}`}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            {children}
        </div>
    );
}
