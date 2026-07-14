import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowLeft, Mail } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import PackagesDivider from "@/components/sections/PackagesDivider";
import OfferQuickFix from "@/components/sections/offers/OfferQuickFix";
import OfferOnePage from "@/components/sections/offers/OfferOnePage";
import OfferLeadSystem from "@/components/sections/offers/OfferLeadSystem";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import Scene from "@/components/canvas/Scene";
import CodeCubes from "@/components/canvas/CodeCubes";
import AuroraGlow from "@/components/canvas/AuroraGlow";
import GridOverlay from "@/components/canvas/GridOverlay";

export const metadata: Metadata = {
    title: "Quote Services | YAER.DEV",
    description:
        "Website fixes, one-page sites, and lead systems for small teams that need clearer quote paths and cleaner workflows.",
};

const servicePaths = [
    {
        label: "Already have a site",
        title: "Tighten the first impression",
        detail: "A focused cleanup for the pages, calls to action, and mobile details that decide whether someone reaches out.",
    },
    {
        label: "Need a real home base",
        title: "Launch one clear page",
        detail: "A polished, mobile-ready site that explains what you do and gives people a simple way to start a conversation.",
    },
    {
        label: "Need better follow-through",
        title: "Build the lead path",
        detail: "Forms, notifications, quote handoff, and practical AI where it saves time instead of adding noise.",
    },
];

export default function QuoteServicePage() {
    return (
        <main className="relative min-h-screen bg-[#0A1014] selection:bg-[#34E5FF]/30 selection:text-black">
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AuroraGlow intensity="full" />
            </div>

            <div className="fixed inset-0 z-[1] pointer-events-none">
                <Scene className="w-full h-full">
                    <CodeCubes />
                </Scene>
            </div>

            <div className="fixed inset-0 z-[2] pointer-events-none">
                <GridOverlay />
            </div>

            <div className="relative z-10">
                <Navbar />

                <section className="relative flex min-h-[92vh] w-full items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-px w-10 bg-[#34E5FF]" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">
                                Quote Services
                            </span>
                        </div>

                        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                            <div>
                                <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl md:text-7xl">
                                    Pick the build that matches the problem.
                                </h1>
                                <p className="mt-6 max-w-2xl text-base leading-8 text-[#8AA3AD] md:text-lg">
                                    If your site needs to earn more trust, catch better
                                    inquiries, or stop making every quote feel manual, this is
                                    the practical side of what I do.
                                </p>

                                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                                    <a
                                        href="#packages"
                                        className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#7AF0FF] to-[#2BC3E0] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#04181d] shadow-[0_0_20px_rgba(52,229,255,0.4)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                                    >
                                        Compare options
                                        <ArrowDown className="h-4 w-4" />
                                    </a>
                                    <Link
                                        href="/#projects"
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#CBD2D9] transition-colors hover:border-[#34E5FF]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                                    >
                                        See proof first
                                        <ArrowLeft className="h-4 w-4" />
                                    </Link>
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#8AA3AD] transition-colors hover:text-[#34E5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1014]"
                                    >
                                        Send a brief
                                        <Mail className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {servicePaths.map((path, index) => (
                                    <div
                                        key={path.title}
                                        className="border border-[#1C2A30] bg-[#0E171D]/80 p-5 backdrop-blur-md transition-colors hover:border-[#34E5FF]/45"
                                    >
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500">
                                                0{index + 1}
                                            </span>
                                            <span className="h-px flex-1 bg-[#1C2A30]" />
                                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#34E5FF]">
                                                {path.label}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-white">
                                            {path.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-6 text-[#8AA3AD]">
                                            {path.detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <PackagesDivider />
                <OfferQuickFix />
                <OfferOnePage />
                <OfferLeadSystem />
                <Contact />
                <Footer />
            </div>
        </main>
    );
}
