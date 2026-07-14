"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * Magnetic -- wraps an interactive element so it leans toward the cursor.
 * Pure transform (GPU-friendly), springs back on leave, disabled for
 * reduced-motion users and coarse pointers (touch has no hover).
 */
export default function Magnetic({
    children,
    strength = 0.35,
    className = "",
}: {
    children: ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        if (reducedMotion || e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const onPointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            style={{ x: sx, y: sy }}
            className={`inline-block will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
}
