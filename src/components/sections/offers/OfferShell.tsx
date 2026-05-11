"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import ContactModal from "../../ui/ContactModal";
import type { ProjectType } from "../../ui/ContactForm";

/**
 * OfferShell -- shared layout for the three contractor offer sections.
 *
 * Tightened from prior version: only one display headline, one subhead,
 * one body slot. No "Best for --" or "Not included" filler. Scan-friendly.
 */
interface OfferShellProps {
    id: string;
    indexLabel: string;
    recommended?: boolean;
    headline: string;
    subhead: string;
    price: string;
    priceMeta: string;
    ctaLabel: string;
    projectType: ProjectType;
    children: ReactNode;
    rightColumn: ReactNode;
    accentSide?: "soft" | "loud";
}

export default function OfferShell({
    id,
    indexLabel,
    recommended = false,
    headline,
    subhead,
    price,
    priceMeta,
    ctaLabel,
    projectType,
    children,
    rightColumn,
    accentSide = "soft",
}: OfferShellProps) {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section
            id={id}
            className={`relative w-full ${accentSide === "loud" ? "py-28" : "py-20"}`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-10 flex items-center gap-3"
                >
                    <span className="h-px w-12 bg-[#E6FF3A]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#E6FF3A]">
                        {indexLabel}
                    </span>
                    {recommended && (
                        <span className="border border-[#E6FF3A] bg-[#E6FF3A]/[0.08] text-[#E6FF3A] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em]">
                            Recommended
                        </span>
                    )}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.02] text-white mb-5 max-w-md">
                            {headline}
                        </h2>
                        <p className="text-[15px] leading-7 text-gray-400 mb-8 max-w-md">
                            {subhead}
                        </p>

                        {children}

                        <div className="flex items-baseline gap-4 mt-2 mb-6">
                            <span className="text-3xl md:text-4xl font-black tracking-tight text-white">
                                {price}
                            </span>
                            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-500">
                                {priceMeta}
                            </span>
                        </div>

                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="btn-industrial-primary"
                        >
                            {ctaLabel}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                    >
                        {rightColumn}
                    </motion.div>
                </div>
            </div>

            <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                projectType={projectType}
            />
        </section>
    );
}

/**
 * Deliverables -- minimal scannable list. Max 5 items recommended.
 * Single typeface, single weight, lime tick marks.
 */
export function Deliverables({ items }: { items: string[] }) {
    return (
        <ul className="grid grid-cols-1 gap-2 mb-8 max-w-md">
            {items.map((item) => (
                <li
                    key={item}
                    className="flex items-center gap-3 text-[14px] leading-6 text-[#D4DCE3]"
                >
                    <span className="h-px w-4 bg-[#E6FF3A] flex-shrink-0" />
                    {item}
                </li>
            ))}
        </ul>
    );
}
