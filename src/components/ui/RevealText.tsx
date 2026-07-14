"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const MOTION_TAGS = {
    span: motion.span,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    p: motion.p,
    div: motion.div,
} as const;

/**
 * RevealText -- word-level masked rise. Each word slides up out of an
 * overflow-hidden clip with a slight blur-to-sharp settle. Works either
 * on mount (`trigger="mount"`) or when scrolled into view (default).
 * Falls back to a simple fade for reduced-motion users.
 */
export default function RevealText({
    text,
    className = "",
    wordClassName = "",
    delay = 0,
    stagger = 0.055,
    duration = 0.7,
    trigger = "view",
    as: Tag = "span",
}: {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    trigger?: "view" | "mount";
    as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
    const reducedMotion = useReducedMotion();
    const words = text.split(" ");

    const container: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : stagger, delayChildren: delay } },
    };

    const word: Variants = reducedMotion
        ? {
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
          }
        : {
              hidden: { y: "115%", rotate: 3, filter: "blur(6px)", opacity: 0.6 },
              visible: {
                  y: "0%",
                  rotate: 0,
                  filter: "blur(0px)",
                  opacity: 1,
                  transition: { duration, ease: [0.22, 1, 0.36, 1] },
              },
          };

    const MotionTag = MOTION_TAGS[Tag];

    return (
        <MotionTag
            variants={container}
            initial="hidden"
            {...(trigger === "mount"
                ? { animate: "visible" }
                : { whileInView: "visible", viewport: { once: true, margin: "-80px" } })}
            className={className}
            aria-label={text}
        >
            {words.map((w, i) => (
                <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom" aria-hidden="true">
                    <motion.span
                        variants={word}
                        className={`inline-block will-change-transform origin-bottom-left ${wordClassName}`}
                    >
                        {w}
                    </motion.span>
                    {i < words.length - 1 ? " " : null}
                </span>
            ))}
        </MotionTag>
    );
}
