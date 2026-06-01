"use client";

import OfferShell, { Deliverables } from "./OfferShell";
import { MousePointerClick, ClipboardList, BellRing, BadgeDollarSign, ArrowDown } from "lucide-react";

/**
 * OfferLeadSystem -- the recommended offer.
 *
 * The visual is a simple, glanceable 4-step funnel (visitor -> paid) instead
 * of a dense schematic, so the value reads at a glance without studying a graph.
 */
export default function OfferLeadSystem() {
    return (
        <OfferShell
            id="offer-lead-system"
            indexLabel="03 / Lead System"
            recommended
            headline="From visitor to estimate, on rails."
            subhead="A site plus the system around it -- capture, qualify, notify, convert. Built from real contractor workflow."
            price="$799+"
            priceMeta="2-3 weeks"
            ctaLabel="Build my Lead System"
            projectType="lead-system"
            accentSide="loud"
            rightColumn={<LeadSystemFlow />}
        >
            <Deliverables
                items={[
                    "Site + multi-step intake form",
                    "Email + sheet lead notify",
                    "PDF quote flow",
                    "Google Business Profile setup",
                    "Optional AI chatbot",
                ]}
            />

            <div className="mb-8 max-w-md border-l-2 border-[#34E5FF] bg-[#34E5FF]/[0.04] px-5 py-3">
                <p className="text-[13px] leading-6 text-[#EAF7FB]">
                    Backed by{" "}
                    <a
                        href="https://bossimating.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white border-b border-[#34E5FF] hover:text-[#34E5FF] transition-colors"
                    >
                        Bossimating
                    </a>
                    , my contractor estimating platform.
                </p>
            </div>
        </OfferShell>
    );
}

const steps = [
    {
        icon: MousePointerClick,
        label: "Visitor lands",
        note: "Found through Google, search & referrals.",
    },
    {
        icon: ClipboardList,
        label: "Lead captured",
        note: "Multi-step intake form + optional AI chat.",
    },
    {
        icon: BellRing,
        label: "Sorted & you're notified",
        note: "Scored hot / warm / cold — pinged in real time.",
    },
    {
        icon: BadgeDollarSign,
        label: "Quoted & paid",
        note: "Branded PDF quote → approval → Stripe link.",
    },
];

/**
 * Simple 4-step lead funnel — glanceable, icon-led, one line each.
 */
function LeadSystemFlow() {
    return (
        <div className="relative border border-[#1C2A30] bg-[#0E171D] notch-corners p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    How it works
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#34E5FF]">
                    Visitor → Paid
                </span>
            </div>

            <ol className="space-y-2">
                {steps.map((step, i) => (
                    <li key={step.label}>
                        <div className="flex items-start gap-4 border border-[#1C2A30] bg-[#16181C] p-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-[#34E5FF]/40 bg-[#34E5FF]/10 text-[#34E5FF]">
                                <step.icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-mono text-[10px] text-gray-500">0{i + 1}</span>
                                    <span className="text-[15px] font-bold text-white">{step.label}</span>
                                </div>
                                <p className="mt-1 text-[13px] leading-5 text-[#8AA3AD]">{step.note}</p>
                            </div>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="flex justify-center py-1.5" aria-hidden="true">
                                <ArrowDown className="h-4 w-4 text-[#34E5FF]/50" />
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}
