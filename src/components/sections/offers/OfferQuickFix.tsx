"use client";

import OfferShell, { Deliverables } from "./OfferShell";

export default function OfferQuickFix() {
    return (
        <OfferShell
            id="packages"
            indexLabel="01 / Quick Fix"
            headline="Tighten the site you already have."
            subhead="A 48-hour pass on an existing site so it stops costing you customers."
            price="$499"
            priceMeta="Fixed price"
            ctaLabel="Book a Quick Fix"
            projectType="quick-fix"
            rightColumn={<QuickFixVisual />}
        >
            <Deliverables
                items={[
                    "Homepage refresh",
                    "Mobile layout cleanup",
                    "Contact form + phone CTA",
                    "Google Maps embed",
                    "Basic SEO setup",
                ]}
            />
        </OfferShell>
    );
}

function QuickFixVisual() {
    return (
        <div className="grid grid-cols-2 gap-3">
            <MockBrowser label="Before" tone="muted">
                <div className="h-3 w-2/3 bg-white/10 mb-2" />
                <div className="h-3 w-1/2 bg-white/10 mb-4" />
                <div className="h-16 w-full bg-white/[0.04] mb-3" />
                <div className="h-2 w-full bg-white/5 mb-1" />
                <div className="h-2 w-5/6 bg-white/5 mb-1" />
                <div className="h-2 w-3/4 bg-white/5" />
            </MockBrowser>
            <MockBrowser label="After" tone="active">
                <div className="h-4 w-4/5 bg-white mb-2" />
                <div className="h-2 w-2/3 bg-[#34E5FF] mb-4" />
                <div className="h-12 w-full bg-[#34E5FF]/15 border border-[#34E5FF]/40 mb-3 flex items-center px-2">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#34E5FF]">
                        Request a quote
                    </span>
                </div>
                <div className="h-2 w-full bg-white/15 mb-1" />
                <div className="h-2 w-5/6 bg-white/15 mb-1" />
                <div className="h-2 w-3/4 bg-white/15" />
            </MockBrowser>
        </div>
    );
}

function MockBrowser({
    label,
    tone,
    children,
}: {
    label: string;
    tone: "muted" | "active";
    children: React.ReactNode;
}) {
    const isActive = tone === "active";
    return (
        <div className={`relative border ${isActive ? "border-[#34E5FF]/30" : "border-[#1C2A30]"} bg-[#0E171D]`}>
            <div className="flex items-center justify-between border-b border-[#1C2A30] px-3 py-2">
                <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-[#34E5FF]" : "bg-white/15"}`} />
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-[0.22em] ${isActive ? "text-[#34E5FF]" : "text-gray-500"}`}>
                    {label}
                </span>
            </div>
            <div className="p-3 min-h-[160px]">{children}</div>
        </div>
    );
}
