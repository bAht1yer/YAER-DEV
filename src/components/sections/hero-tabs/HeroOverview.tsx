"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ContactModal from "../../ui/ContactModal";
import Image from "next/image";
import {
    ArrowRight,
    Bot,
    CheckCircle2,
    ExternalLink,
    ReceiptText,
    Send,
    ShieldCheck,
    Workflow,
} from "lucide-react";

/**
 * HeroOverview -- industrial restyle with Toronto local accent.
 *
 *  - Bossimating screenshot in full color (no grayscale)
 *  - Toronto label + recognizable CN Tower glyph signals local market
 *  - Metric cells use horizontal layout (value on left, label+detail on right)
 *    to remove the dead whitespace the old vertical stack produced
 */

const projectMetrics = [
    { label: "Estimate", value: "5 min", detail: "brief to PDF" },
    { label: "Catalog", value: "422+", detail: "trade items" },
    { label: "Seats", value: "$0", detail: "small crews" },
];

const productModules = [
    { icon: ReceiptText, label: "Estimates", value: "PDF scopes" },
    { icon: Workflow, label: "Projects", value: "ops dashboard" },
    { icon: Bot, label: "AI Suite", value: "8 helpers" },
    { icon: ShieldCheck, label: "Contracts", value: "approval trail" },
];

/**
 * Mini CN Tower glyph -- 16x24 inline SVG, optimised for 12-20px display.
 * Wide pod clearly overhangs a tapered body so the silhouette reads as the
 * Toronto landmark instantly, not a generic cross.
 */
function CNTowerGlyph({ className = "" }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 16 24"
            className={className}
            fill="currentColor"
            aria-hidden="true"
        >
            {/* Antenna mast */}
            <rect x="7.6" y="0" width="0.8" height="5" />
            {/* Spire above pod */}
            <polygon points="7.2,7 8.8,7 8.4,4 7.6,4" />
            {/* Main pod -- wide ellipse, the iconic disc */}
            <ellipse cx="8" cy="8" rx="3.6" ry="1.4" />
            {/* Lower restaurant level */}
            <ellipse cx="8" cy="9.6" rx="2.6" ry="0.7" opacity="0.85" />
            {/* Tapered body */}
            <polygon points="7.2,11 8.8,11 9.6,22 6.4,22" />
            {/* Ground plinth */}
            <rect x="5.6" y="22" width="4.8" height="2" />
        </svg>
    );
}

export default function HeroOverview() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="w-full pt-8 px-4 md:px-10 pb-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center mt-4 lg:mt-8">
                {/* Left column -- intro */}
                <div className="flex flex-col gap-6 text-left order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tight leading-[0.9] text-white mb-6">
                            AI SYSTEMS<br />
                            <span className="warm-pulse text-[#FF5A1F]">THAT SHIP</span>
                        </h1>

                        <p className="max-w-xl text-base leading-7 text-gray-400 md:text-lg">
                            I design and build <span className="text-white">SaaS</span>, internal tools, and
                            <span className="text-[#E6FF3A]"> lead systems</span>. Software that runs in
                            <span className="text-[#D4DCE3]"> production</span>, not just demos.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 mt-4"
                    >
                        <a href="#projects" className="btn-industrial-primary">
                            See work
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <button onClick={() => setIsContactOpen(true)} className="btn-industrial-secondary">
                            Start a project
                            <Send className="h-4 w-4" />
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.75 }}
                        className="mt-1 inline-flex items-center gap-2 text-gray-500"
                    >
                        <CNTowerGlyph className="h-5 w-4 text-[#E6FF3A]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                            Based in Toronto · supporting local businesses
                        </span>
                    </motion.div>
                </div>

                {/* Right column -- Bossimating showcase */}
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="order-1 lg:order-2"
                >
                    <a
                        href="https://bossimating.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Bossimating live product"
                        className="group block overflow-hidden border border-[#23262B] bg-[#121316] transition-all duration-300 hover:border-[#E6FF3A]/45"
                        style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
                    >
                        <div className="border-b border-[#23262B] px-4 py-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="h-2 w-2 rounded-full bg-[#E6FF3A]" />
                                <span className="ml-1 truncate font-mono text-[10px] uppercase tracking-[0.22em] text-gray-400">
                                    Live snapshot / contractor SaaS
                                </span>
                            </div>
                            <ExternalLink className="h-4 w-4 shrink-0 text-gray-500 transition-colors group-hover:text-[#E6FF3A]" />
                        </div>

                        <div className="relative aspect-[16/10] overflow-hidden border-b border-[#23262B] bg-black">
                            <Image
                                src="/projects/bossimating-home.png"
                                alt="Bossimating homepage showing Estimate Like a Boss hero and dashboard preview"
                                fill
                                priority
                                sizes="(min-width: 1024px) 48vw, 92vw"
                                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-2 border border-[#FF5A1F]/50 bg-[#FF5A1F]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF5A1F]">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Live SaaS
                                    </span>
                                    <span className="border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80">
                                        Bossimating.com
                                    </span>
                                </div>
                                <h2 className="max-w-md text-2xl sm:text-3xl font-black tracking-tight text-white">
                                    Contractor estimates, invoices, and AI.
                                </h2>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">
                            <p className="text-sm leading-7 text-gray-400">
                                <span className="font-semibold text-white">Bossimating</span> puts
                                <span className="text-[#E6FF3A]"> estimates</span>,
                                <span className="text-[#D4DCE3]"> invoices</span>, payments, approvals, dashboards, and AI helpers in one product.
                            </p>

                            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {projectMetrics.map((metric) => (
                                    <div
                                        key={metric.label}
                                        className="border border-[#23262B] bg-white/[0.02] px-3 py-2 flex items-center gap-3"
                                    >
                                        <div className="text-lg font-black text-white whitespace-nowrap leading-none">
                                            {metric.value}
                                        </div>
                                        <div className="min-w-0 flex-1 border-l border-[#23262B] pl-3">
                                            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-500 truncate">
                                                {metric.label}
                                            </div>
                                            <div className="text-[10px] leading-tight text-gray-500 truncate">
                                                {metric.detail}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                {productModules.map((module) => (
                                    <div key={module.label} className="border border-[#23262B] bg-white/[0.02] p-3">
                                        <div className="flex items-center gap-2 text-[#D4DCE3]">
                                            <module.icon className="h-4 w-4" />
                                            <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                                                {module.label}
                                            </span>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-400">{module.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </a>
                </motion.div>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
}
