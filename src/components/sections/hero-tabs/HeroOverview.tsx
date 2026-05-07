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

const projectMetrics = [
    { label: "Estimate", value: "5 min", detail: "brief to PDF" },
    { label: "Catalog", value: "422+", detail: "trade-ready items" },
    { label: "Seats", value: "$0", detail: "small crew friendly" },
];

const productModules = [
    { icon: ReceiptText, label: "Estimates", value: "PDF scopes" },
    { icon: Workflow, label: "Projects", value: "ops dashboard" },
    { icon: Bot, label: "AI Suite", value: "8 helpers" },
    { icon: ShieldCheck, label: "Contracts", value: "approval trail" },
];

export default function HeroOverview() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <div className="w-full min-h-full flex flex-col pt-8 px-4 md:px-10 pb-20 max-w-7xl mx-auto pointer-events-auto">
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-14 items-center mt-4 lg:mt-8">

                {/* Left Column: Intro & Actions */}
                <div className="flex flex-col gap-6 text-left order-2 lg:order-1 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tight leading-[0.9] font-space text-white mb-6">
                            AI SYSTEMS<br />
                            <span className="text-[#ff6b16]" style={{ textShadow: "0 0 22px rgba(255, 107, 22, 0.45)" }}>THAT SHIP</span>
                        </h1>

                        <p className="max-w-xl font-mono text-sm leading-7 text-gray-400 md:text-base">
                            I turn messy <span className="text-white">workflows</span> into shipped software:
                            <span className="text-[#00FBFB]"> AI</span>, <span className="text-[#39FF14]">data</span>,
                            <span className="text-[#ff8b3d]"> payments</span>, and screens people actually use.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4 mt-6"
                    >
                        {/* Solid Green Button */}
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#39FF14] text-black font-space font-bold uppercase tracking-widest text-sm hover:bg-[#39FF14]/80 transition-all duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)]"
                        >
                            See Work
                            <ArrowRight className="h-4 w-4" />
                        </a>

                        {/* Hollow Cyan Button */}
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-transparent border-2 border-[#00FBFB] text-[#00FBFB] font-space font-bold uppercase tracking-widest text-sm hover:bg-[#00FBFB]/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,251,251,0.2)]"
                        >
                            Message Me
                            <Send className="h-4 w-4" />
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                    className="order-1 lg:order-2"
                >
                    <a
                        href="https://bossimating.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open Bossimating live product"
                        className="group block overflow-hidden border border-[#ff6b16]/35 bg-[#050505]/90 shadow-[0_0_55px_rgba(255,107,22,0.12)] backdrop-blur-xl transition-all duration-300 hover:border-[#ff6b16]/75 hover:shadow-[0_0_70px_rgba(255,107,22,0.22)]"
                    >
                        <div className="border-b border-[#ff6b16]/25 px-4 py-3 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b16]/90" />
                                <span className="ml-2 truncate font-mono text-[11px] uppercase tracking-widest text-gray-400">
                                    live snapshot / contractor SaaS
                                </span>
                            </div>
                            <ExternalLink className="h-4 w-4 shrink-0 text-[#00FBFB] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>

                        <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-black">
                            <Image
                                src="/projects/bossimating-home.png"
                                alt="Bossimating homepage showing Estimate Like a Boss hero and dashboard preview"
                                fill
                                priority
                                sizes="(min-width: 1024px) 48vw, 92vw"
                                className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-flex items-center gap-2 border border-[#ff6b16]/50 bg-[#ff6b16]/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[#ff8b3d]">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Live SaaS
                                    </span>
                                    <span className="border border-white/20 bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-white/80">
                                        Bossimating.com
                                    </span>
                                </div>
                                <h2 className="max-w-md text-2xl sm:text-4xl font-black tracking-tight text-white">
                                    Contractor estimates, invoices, and AI.
                                </h2>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6">

                            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-400">
                                <span className="font-bold text-white">Bossimating</span> puts
                                <span className="text-[#39FF14]"> estimates</span>,
                                <span className="text-[#00FBFB]"> invoices</span>,
                                <span className="text-[#ff8b3d]"> payments</span>, approvals, dashboards, and AI helpers in one product.
                            </p>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {projectMetrics.map((metric) => (
                                    <div key={metric.label} className="border border-white/10 bg-white/[0.03] p-3">
                                        <div className="font-mono text-[10px] uppercase tracking-widest text-gray-500">
                                            {metric.label}
                                        </div>
                                        <div className="mt-2 text-xl font-black text-white">{metric.value}</div>
                                        <div className="mt-1 text-[11px] leading-5 text-gray-500">{metric.detail}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                {productModules.map((module) => (
                                    <div key={module.label} className="border border-white/10 bg-white/[0.02] p-3">
                                        <div className="flex items-center gap-2 text-[#00FBFB]">
                                            <module.icon className="h-4 w-4" />
                                            <span className="font-mono text-[10px] uppercase tracking-widest">
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
