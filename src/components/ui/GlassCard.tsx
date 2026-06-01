"use client";

import { useRef, useEffect, useState, type ReactNode, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";

/**
 * GlassCard — the single source of the Cyan Chrome "glass feel".
 *
 * Frosted glass (.glass-panel) + a diagonal light beam (.sheen-animate) +
 * cursor reactivity. The cursor-follow glow (--mx/--my/--glow-opacity) and the
 * 3D tilt are driven by ONE continuous requestAnimationFrame loop that lerps
 * the live values toward their targets, so the light smoothly trails the
 * pointer and smoothly eases back to rest on leave — no snapping, and no
 * pointermove/leave race. The loop sleeps once everything has settled.
 * Used by the hero card AND every project card. Honors prefers-reduced-motion.
 */
interface GlassCardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
    /** Max tilt in degrees. */
    maxTilt?: number;
    /** Show the sweeping diagonal light beam. Default true. */
    beam?: boolean;
    onClick?: () => void;
}

export default function GlassCard({
    children,
    className = "",
    interactive = true,
    maxTilt = 5,
    beam = true,
    onClick,
}: GlassCardProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [reduced, setReduced] = useState(false);

    // Live/target motion state, lerped every frame by `tick`.
    const s = useRef({
        mx: 50, my: 50, tmx: 50, tmy: 50,   // glow position (%)
        rx: 0, ry: 0, trx: 0, trry: 0,       // tilt (deg)
        glow: 0, tglow: 0,                   // glow opacity (0..1)
        raf: 0, running: false,
    });

    useEffect(() => {
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    useEffect(() => () => {
        if (s.current.raf) cancelAnimationFrame(s.current.raf);
    }, []);

    const tick = () => {
        const el = ref.current;
        const v = s.current;
        if (!el) { v.running = false; return; }
        const ease = 0.14;
        v.mx += (v.tmx - v.mx) * ease;
        v.my += (v.tmy - v.my) * ease;
        v.rx += (v.trx - v.rx) * ease;
        v.ry += (v.trry - v.ry) * ease;
        v.glow += (v.tglow - v.glow) * 0.12;
        el.style.setProperty("--mx", `${v.mx.toFixed(2)}%`);
        el.style.setProperty("--my", `${v.my.toFixed(2)}%`);
        el.style.setProperty("--glow-opacity", v.glow.toFixed(3));
        el.style.transform = `perspective(900px) rotateX(${v.rx.toFixed(2)}deg) rotateY(${v.ry.toFixed(2)}deg)`;

        const settled =
            Math.abs(v.tmx - v.mx) < 0.1 && Math.abs(v.tmy - v.my) < 0.1 &&
            Math.abs(v.trx - v.rx) < 0.02 && Math.abs(v.trry - v.ry) < 0.02 &&
            Math.abs(v.tglow - v.glow) < 0.004;
        // Keep running until the glow has fully faded out; otherwise sleep.
        if (settled && v.tglow === 0) { v.running = false; v.glow = 0; el.style.setProperty("--glow-opacity", "0"); return; }
        v.raf = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
        const v = s.current;
        if (!v.running) { v.running = true; v.raf = requestAnimationFrame(tick); }
    };

    const handleMove = (e: ReactPointerEvent) => {
        if (!interactive || reduced) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        const v = s.current;
        v.tmx = px * 100;
        v.tmy = py * 100;
        v.tglow = 1;
        v.trry = (px - 0.5) * 2 * maxTilt;   // rotateY target
        v.trx = -(py - 0.5) * 2 * maxTilt;   // rotateX target
        ensureRunning();
    };

    const handleLeave = () => {
        const v = s.current;
        v.tmx = 50; v.tmy = 50;
        v.trx = 0; v.trry = 0;
        v.tglow = 0;
        ensureRunning();
    };

    const handleKeyDown = (e: ReactKeyboardEvent) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
        }
    };

    return (
        <div
            ref={ref}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            onClick={onClick}
            onKeyDown={onClick ? handleKeyDown : undefined}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            className={`glass-panel glass-glow ${beam ? "sheen-animate " : ""}focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014] ${className}`}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            {children}
        </div>
    );
}
