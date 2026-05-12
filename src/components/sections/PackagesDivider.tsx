"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

/**
 * PackagesDivider -- chapter break between the AI/SaaS hero and the offer funnel.
 *
 * Composition: eyebrow + big display title + cascading chevron scroll cue with
 * a faintly pulsing label below.
 *
 * Audience framing is intentionally broad ("trades & small businesses") so the
 * Quick Fix and One-Page tiers don't read as contractor-only.
 */
export default function PackagesDivider() {
    const ref = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const lineWidthLeft = useTransform(scrollYProgress, [0.05, 0.45], ["0%", "100%"]);
    const lineWidthRight = useTransform(scrollYProgress, [0.05, 0.5], ["0%", "100%"]);
    const headlineScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1]);
    const headlineOpacity = useTransform(scrollYProgress, [0.05, 0.4], [0, 1]);
    const cueOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const cueY = useTransform(scrollYProgress, [0.4, 0.7], [12, 0]);

    return (
        <section
            ref={ref}
            className="relative w-full py-32 md:py-44"
            aria-label="Service packages"
        >
            <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
                {/* Eyebrow with scroll-driven hairlines on both sides */}
                <div className="mb-10 flex items-center justify-center gap-4">
                    <motion.span
                        style={{ width: lineWidthLeft }}
                        className="h-px max-w-[100px] bg-[#E6FF3A]"
                    />
                    <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-[#E6FF3A] whitespace-nowrap">
                        For Trades &amp; Small Businesses
                    </span>
                    <motion.span
                        style={{ width: lineWidthRight }}
                        className="h-px max-w-[100px] bg-[#E6FF3A]"
                    />
                </div>

                {/* Big display headline */}
                <motion.h2
                    style={{ scale: headlineScale, opacity: headlineOpacity }}
                    className="origin-center text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.02] text-white mx-auto max-w-4xl"
                >
                    Three ways to <span className="text-[#E6FF3A]">work together.</span>
                </motion.h2>

                {/* Scroll cue -- cascading chevrons + pulsing label, stacked vertically */}
                <motion.div
                    style={{ opacity: cueOpacity, y: cueY }}
                    className="mt-20 flex flex-col items-center gap-4 text-gray-500"
                >
                    {/* Chevron stack: 48px tall window, chevrons enter top / exit bottom */}
                    <div className="relative h-12 w-6 overflow-hidden">
                        {[0, 0.5, 1].map((delay, i) => (
                            <ChevronDown
                                key={i}
                                className="scroll-cue-chevron absolute top-0 h-5 w-5 text-[#E6FF3A]"
                                style={{
                                    // left: 50% + keyframe carries translateX(-50%) for true centering
                                    left: "50%",
                                    animation: "scroll-cue-wave 1.8s ease-in-out infinite",
                                    animationDelay: `${delay}s`,
                                }}
                                aria-hidden="true"
                            />
                        ))}
                    </div>
                    <span
                        className="scroll-cue-label font-mono text-[10px] uppercase tracking-[0.25em] text-gray-400"
                        style={{
                            animation: "scroll-cue-label-pulse 3.2s ease-in-out infinite",
                        }}
                    >
                        Scroll for details
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
