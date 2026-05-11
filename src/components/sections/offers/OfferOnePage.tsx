"use client";

import OfferShell, { Deliverables } from "./OfferShell";

export default function OfferOnePage() {
    return (
        <OfferShell
            id="offer-one-page"
            indexLabel="02 / One-Page Site"
            headline="A clean site, ready to send."
            subhead="For contractors running off Facebook. One page, well-built, deployed, yours."
            price="$999"
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
                    "Deployed with domain setup",
                ]}
            />
        </OfferShell>
    );
}

function OnePageVisual() {
    return (
        <div className="relative border border-[#23262B] bg-[#121316] notch-corners">
            <div className="flex items-center justify-between border-b border-[#23262B] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E6FF3A]" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gray-500">
                    yoursite.com
                </span>
            </div>

            <div className="p-5 space-y-3">
                <div className="border border-[#23262B] bg-[#0F1013] p-4">
                    <div className="h-4 w-4/5 bg-white/90 mb-2" />
                    <div className="h-2 w-3/4 bg-white/20 mb-3" />
                    <div className="inline-block h-6 w-28 bg-[#E6FF3A]" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="border border-[#23262B] bg-[#0F1013] p-3">
                            <div className="h-1.5 w-2/3 bg-[#E6FF3A]/60 mb-2" />
                            <div className="h-1 w-full bg-white/10 mb-1" />
                            <div className="h-1 w-3/4 bg-white/10" />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-white/5 border border-[#23262B]" />
                    ))}
                </div>

                <div className="border border-[#23262B] bg-[#0F1013] p-4">
                    <div className="h-2.5 w-full bg-white/8 mb-1.5" />
                    <div className="h-2.5 w-full bg-white/8 mb-3" />
                    <div className="inline-block h-5 w-20 bg-[#D4DCE3]/30 border border-[#D4DCE3]/50" />
                </div>
            </div>
        </div>
    );
}
