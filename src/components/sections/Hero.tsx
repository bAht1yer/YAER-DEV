"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BriefcaseBusiness, LayoutDashboard, MessageSquareText, Network } from "lucide-react";
import HeroOverview from "./hero-tabs/HeroOverview";
import HeroCaseFiles from "./hero-tabs/HeroCaseFiles";
import HeroBlueprint from "./hero-tabs/HeroBlueprint";
import HeroStart from "./hero-tabs/HeroStart";

/**
 * Hero — industrial rebuild.
 *
 * Drops the fixed CMS sidebar/topbar overlay (the heaviest cyberpunk element on
 * the old hero) and the mix-blend-difference content layer. Tabs survive but as
 * a clean horizontal segmented control instead of a faux IDE sidebar — they're
 * the entry points to four content slices (Overview, Case Files, Blueprint, Start)
 * and removing them would lose meaningful surface area.
 */
const heroTabs = [
    {
        id: "overview",
        label: "Home",
        detail: "Start here",
        icon: LayoutDashboard,
    },
    {
        id: "casefiles",
        label: "Case Files",
        detail: "Real proof",
        icon: BriefcaseBusiness,
    },
    {
        id: "blueprint",
        label: "Blueprint",
        detail: "Build logic",
        icon: Network,
    },
    {
        id: "start",
        label: "Start",
        detail: "Ways in",
        icon: MessageSquareText,
    },
];

export default function Hero() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <section id="about" className="relative min-h-screen w-full bg-transparent pt-20 md:pt-24">
            {/* Industrial tab bar — horizontal segmented control inside the hero (not sticky;
                the navbar sits over it once the user scrolls past 50px) */}
            <div className="relative z-20 border-b border-[#23262B]/70 bg-[#0A0B0D]/40 backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 md:px-10">
                    <nav className="flex items-stretch gap-0 overflow-x-auto scrollbar-hide" aria-label="Hero sections">
                        {heroTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`group relative inline-flex shrink-0 items-center gap-2.5 px-5 py-3.5 transition-colors ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-500 hover:text-gray-300"
                                    }`}
                                    aria-pressed={isActive}
                                >
                                    <Icon className={`h-4 w-4 ${isActive ? "text-[#E6FF3A]" : ""}`} />
                                    <span className="flex flex-col items-start text-left">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
                                            {tab.label}
                                        </span>
                                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gray-600">
                                            {tab.detail}
                                        </span>
                                    </span>
                                    {/* Active underline — industrial accent */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="hero-tab-underline"
                                            className="absolute inset-x-0 bottom-0 h-[2px] bg-[#E6FF3A]"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Active tab content — no more mix-blend-difference, no CMS chrome */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <HeroOverview />
                        </motion.div>
                    )}
                    {activeTab === "casefiles" && (
                        <motion.div
                            key="casefiles"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <HeroCaseFiles />
                        </motion.div>
                    )}
                    {activeTab === "blueprint" && (
                        <motion.div
                            key="blueprint"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <HeroBlueprint />
                        </motion.div>
                    )}
                    {activeTab === "start" && (
                        <motion.div
                            key="start"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <HeroStart />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
