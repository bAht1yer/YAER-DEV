"use client";

import OfferShell, { Deliverables } from "./OfferShell";

export default function OfferOnePage() {
    return (
        <OfferShell
            id="offer-one-page"
            indexLabel="02 / One-Page Site"
            headline="A polished one-page site you can send with confidence."
            subhead="For contractors and local services still relying on Facebook, Instagram, or referrals. One clean page, built fast, mobile-ready, and yours."
            price="$799"
            priceMeta="~1 week"
            ctaLabel="Start a One-Page Site"
            projectType="one-page-site"
            rightColumn={<OnePageVisual />}
        >
            <Deliverables
                items={[
                    "Professional one-page site",
                    "Services + gallery section",
                    "Contact form",
                    "Mobile optimized",
                    "Deployment + domain guidance",
                ]}
            />

            <p className="mb-8 max-w-md border-l-2 border-[#34E5FF]/70 pl-4 text-[13px] leading-6 text-[#8AA3AD]">
                Includes one revision round. Send rough photos and notes; I can
                clean up the copy and structure.
            </p>

            <div className="mb-8 max-w-md border-l-2 border-[#34E5FF] bg-[#34E5FF]/[0.04] px-5 py-3">
                <p className="text-[13px] leading-6 text-[#EAF7FB]">
                    Backed by{" "}
                    <a
                        href="https://www.revampsolutions.ca/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white border-b border-[#34E5FF] hover:text-[#34E5FF] transition-colors"
                    >
                        Revamp Solutions
                    </a>
                    , a local contractor-style website with clear service pages and AI support.
                </p>
            </div>
        </OfferShell>
    );
}

function OnePageVisual() {
    return (
        <div className="relative border border-[#1C2A30] bg-[#0E171D] notch-corners">
            <div className="flex items-center justify-between border-b border-[#1C2A30] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#34E5FF]" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gray-500">
                    yoursite.com
                </span>
            </div>

            <div className="p-5 space-y-3">
                <div className="border border-[#1C2A30] bg-[#0E171D] p-4">
                    <div className="h-4 w-4/5 bg-white/90 mb-2" />
                    <div className="h-2 w-3/4 bg-white/20 mb-3" />
                    <div className="inline-block h-6 w-28 bg-[#34E5FF]" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border border-[#1C2A30] bg-[#0E171D] p-3">
                            <div className="h-1.5 w-2/3 bg-[#34E5FF]/60 mb-2" />
                            <div className="h-1 w-full bg-white/10 mb-1" />
                            <div className="h-1 w-3/4 bg-white/10" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-white/5 border border-[#1C2A30]" />
                    ))}
                </div>

                <div className="border border-[#1C2A30] bg-[#0E171D] p-4">
                    <div className="h-2.5 w-full bg-white/8 mb-1.5" />
                    <div className="h-2.5 w-full bg-white/8 mb-3" />
                    <div className="inline-block h-5 w-20 bg-[#CBD2D9]/30 border border-[#CBD2D9]/50" />
                </div>
            </div>
        </div>
    );
}
