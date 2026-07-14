"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * TiltCard -- 3D perspective tilt + cursor spotlight.
 * The card leans toward the pointer (rotateX/rotateY springs) while a
 * radial cyan glow follows the cursor across the surface. Transform-only,
 * disabled for reduced motion and touch pointers.
 */
export default function TiltCard({
    children,
    className = "",
    maxTilt = 7,
    spotlight = true,
}: {
    children: ReactNode;
    className?: string;
    maxTilt?: number;
    spotlight?: boolean;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion();

    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 260, damping: 20, mass: 0.5 });
    const sry = useSpring(ry, { stiffness: 260, damping: 20, mass: 0.5 });

    const mx = useMotionValue(50);
    const my = useMotionValue(50);
    const glow = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, rgba(52,229,255,0.10), transparent 65%)`;

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rx.set((0.5 - py) * maxTilt * 2);
        ry.set((px - 0.5) * maxTilt * 2);
        mx.set(px * 100);
        my.set(py * 100);
    };

    const onPointerLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", transformPerspective: 900 }}
            className={`group relative will-change-transform ${className}`}
        >
            {spotlight && (
                <motion.div
                    aria-hidden="true"
                    style={{ background: glow }}
                    className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
            )}
            {children}
        </motion.div>
    );
}
