"use client";

import OfferShell, { Deliverables } from "./OfferShell";

/**
 * OfferLeadSystem -- the recommended offer.
 *
 * Trimmed copy + a denser blueprint schematic (5-stage vertical flow) to make
 * the $1.5-2k price feel substantiated. The visual carries the "comprehensive"
 * impression so the body text can stay short.
 */
export default function OfferLeadSystem() {
    return (
        <OfferShell
            id="offer-lead-system"
            indexLabel="03 / Lead System"
            recommended
            headline="From visitor to estimate, on rails."
            subhead="A site plus the system around it -- capture, qualify, notify, convert. Built from real contractor workflow."
            price="$1,500-$2,000"
            priceMeta="2-3 weeks"
            ctaLabel="Build my Lead System"
            projectType="lead-system"
            accentSide="loud"
            rightColumn={<LeadSystemBlueprint />}
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

/**
 * 5-stage vertical blueprint:
 *   01 ACQUIRE  -> 3 sources fan into capture
 *   02 CAPTURE  -> single site box with 3 internals
 *   03 QUALIFY + NOTIFY -> 2 parallel tracks
 *   04 CONVERT  -> 3 conversion artifacts
 *   05 LOOP     -> feedback arc back to top
 *
 * Pure SVG. ~720px tall, scales fluidly inside the panel.
 */
function LeadSystemBlueprint() {
    return (
        <div className="relative border border-[#1C2A30] bg-[#0E171D] notch-corners p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500">
                    System blueprint
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#34E5FF]">
                    5 stages
                </span>
            </div>
            <svg viewBox="0 0 480 760" className="w-full h-auto block" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <marker id="ar-lime" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#34E5FF" />
                    </marker>
                    <marker id="ar-steel" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#CBD2D9" />
                    </marker>
                </defs>

                {/* ===== 01 ACQUIRE ===== */}
                <text x="0" y="14" fill="#34E5FF" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">01 / ACQUIRE</text>
                <line x1="0" y1="22" x2="480" y2="22" stroke="#1C2A30" strokeWidth="1" />

                <g>
                    <rect x="0" y="38" width="146" height="58" fill="#0E171D" stroke="#34E5FF" strokeWidth="1" />
                    <text x="73" y="62" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Google Biz</text>
                    <text x="73" y="80" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">profile · maps</text>
                </g>
                <g>
                    <rect x="167" y="38" width="146" height="58" fill="#0E171D" stroke="#34E5FF" strokeWidth="1" />
                    <text x="240" y="62" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Search SEO</text>
                    <text x="240" y="80" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">titles · meta</text>
                </g>
                <g>
                    <rect x="334" y="38" width="146" height="58" fill="#0E171D" stroke="#34E5FF" strokeWidth="1" />
                    <text x="407" y="62" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Referrals</text>
                    <text x="407" y="80" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">social · word</text>
                </g>

                {/* Converging arrows */}
                <line x1="73" y1="96" x2="73" y2="130" stroke="#34E5FF" strokeWidth="1" />
                <line x1="240" y1="96" x2="240" y2="130" stroke="#34E5FF" strokeWidth="1" />
                <line x1="407" y1="96" x2="407" y2="130" stroke="#34E5FF" strokeWidth="1" />
                <line x1="73" y1="130" x2="407" y2="130" stroke="#34E5FF" strokeWidth="1" />
                <line x1="240" y1="130" x2="240" y2="160" stroke="#34E5FF" strokeWidth="1.2" markerEnd="url(#ar-lime)" />

                {/* ===== 02 CAPTURE ===== */}
                <text x="0" y="186" fill="#34E5FF" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">02 / CAPTURE</text>
                <line x1="0" y1="194" x2="480" y2="194" stroke="#1C2A30" strokeWidth="1" />

                <g>
                    <rect x="0" y="208" width="480" height="148" fill="#0E171D" stroke="#CBD2D9" strokeWidth="1" />
                    <text x="14" y="228" fill="#CBD2D9" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">SITE</text>

                    <rect x="14" y="242" width="148" height="98" fill="#16181C" stroke="#1C2A30" />
                    <text x="88" y="266" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">Landing</text>
                    <text x="88" y="282" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9">hero · cta</text>
                    <rect x="38" y="298" width="100" height="20" fill="#34E5FF" />
                    <text x="88" y="312" textAnchor="middle" fill="#0A1014" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="1.5">REQUEST QUOTE</text>

                    <rect x="174" y="242" width="148" height="98" fill="#16181C" stroke="#34E5FF" strokeWidth="1.5" />
                    <text x="248" y="266" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">Intake form</text>
                    <text x="248" y="282" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9">multi-step</text>
                    <line x1="194" y1="298" x2="302" y2="298" stroke="#34E5FF" strokeOpacity="0.5" />
                    <line x1="194" y1="308" x2="280" y2="308" stroke="#34E5FF" strokeOpacity="0.5" />
                    <line x1="194" y1="318" x2="290" y2="318" stroke="#34E5FF" strokeOpacity="0.5" />
                    <line x1="194" y1="328" x2="270" y2="328" stroke="#34E5FF" strokeOpacity="0.5" />

                    <rect x="334" y="242" width="132" height="98" fill="#16181C" stroke="#1C2A30" />
                    <text x="400" y="266" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600">AI chat</text>
                    <text x="400" y="282" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9">optional</text>
                    <circle cx="400" cy="312" r="14" fill="none" stroke="#CBD2D9" strokeWidth="1" />
                    <circle cx="400" cy="312" r="6" fill="#CBD2D9" fillOpacity="0.4" />
                </g>

                <line x1="240" y1="356" x2="240" y2="390" stroke="#34E5FF" strokeWidth="1.2" markerEnd="url(#ar-lime)" />

                {/* ===== 03 QUALIFY + NOTIFY ===== */}
                <text x="0" y="416" fill="#34E5FF" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">03 / QUALIFY · NOTIFY</text>
                <line x1="0" y1="424" x2="480" y2="424" stroke="#1C2A30" strokeWidth="1" />

                <g>
                    <rect x="0" y="440" width="230" height="100" fill="#0E171D" stroke="#34E5FF" strokeWidth="1" />
                    <text x="115" y="464" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Score &amp; tag</text>
                    <text x="115" y="480" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9">budget · scope · zip</text>
                    <g transform="translate(38, 498)">
                        <rect width="44" height="18" fill="#FF5FD2" fillOpacity="0.15" stroke="#FF5FD2" />
                        <text x="22" y="13" textAnchor="middle" fill="#FF5FD2" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">HOT</text>
                    </g>
                    <g transform="translate(94, 498)">
                        <rect width="44" height="18" fill="#34E5FF" fillOpacity="0.15" stroke="#34E5FF" />
                        <text x="22" y="13" textAnchor="middle" fill="#34E5FF" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">WARM</text>
                    </g>
                    <g transform="translate(150, 498)">
                        <rect width="44" height="18" fill="#CBD2D9" fillOpacity="0.12" stroke="#CBD2D9" />
                        <text x="22" y="13" textAnchor="middle" fill="#CBD2D9" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">COLD</text>
                    </g>
                </g>

                <g>
                    <rect x="250" y="440" width="230" height="100" fill="#0E171D" stroke="#34E5FF" strokeWidth="1" />
                    <text x="365" y="464" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Notify</text>
                    <text x="365" y="480" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9">real-time</text>
                    <g transform="translate(264, 496)">
                        <rect width="64" height="22" fill="none" stroke="#1C2A30" />
                        <text x="32" y="15" textAnchor="middle" fill="#CBD2D9" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">EMAIL</text>
                    </g>
                    <g transform="translate(334, 496)">
                        <rect width="64" height="22" fill="none" stroke="#1C2A30" />
                        <text x="32" y="15" textAnchor="middle" fill="#CBD2D9" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">SHEET</text>
                    </g>
                    <g transform="translate(404, 496)">
                        <rect width="62" height="22" fill="none" stroke="#1C2A30" />
                        <text x="31" y="15" textAnchor="middle" fill="#CBD2D9" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">SMS</text>
                    </g>
                </g>

                {/* Merge arrow */}
                <line x1="115" y1="540" x2="115" y2="568" stroke="#34E5FF" strokeWidth="1" />
                <line x1="365" y1="540" x2="365" y2="568" stroke="#34E5FF" strokeWidth="1" />
                <line x1="115" y1="568" x2="365" y2="568" stroke="#34E5FF" strokeWidth="1" />
                <line x1="240" y1="568" x2="240" y2="598" stroke="#34E5FF" strokeWidth="1.2" markerEnd="url(#ar-lime)" />

                {/* ===== 04 CONVERT ===== */}
                <text x="0" y="624" fill="#34E5FF" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">04 / CONVERT</text>
                <line x1="0" y1="632" x2="480" y2="632" stroke="#1C2A30" strokeWidth="1" />

                <g>
                    <rect x="0" y="648" width="150" height="60" fill="#0E171D" stroke="#FF5FD2" strokeWidth="1" />
                    <text x="75" y="672" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">PDF quote</text>
                    <text x="75" y="690" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">scoped · branded</text>
                </g>
                <g>
                    <rect x="165" y="648" width="150" height="60" fill="#0E171D" stroke="#FF5FD2" strokeWidth="1" />
                    <text x="240" y="672" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Approval</text>
                    <text x="240" y="690" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">signed · logged</text>
                </g>
                <g>
                    <rect x="330" y="648" width="150" height="60" fill="#0E171D" stroke="#FF5FD2" strokeWidth="1" />
                    <text x="405" y="672" textAnchor="middle" fill="#fff" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">Payment</text>
                    <text x="405" y="690" textAnchor="middle" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1">stripe link</text>
                </g>

                {/* Loop-back curve: convert → acquire (review fuels GBP/social) */}
                <path
                    d="M 480 678 Q 510 678 510 400 Q 510 60 480 60"
                    fill="none"
                    stroke="#CBD2D9"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    markerEnd="url(#ar-steel)"
                    opacity="0.6"
                />
                <text x="514" y="370" fill="#8AA3AD" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="1" transform="rotate(90 514 370)">REVIEW LOOP</text>

                {/* Footer stack indicator */}
                <line x1="0" y1="724" x2="480" y2="724" stroke="#1C2A30" strokeWidth="1" />
                <text x="0" y="744" fill="#5F6168" fontFamily="JetBrains Mono, monospace" fontSize="9" letterSpacing="2">STACK — NEXT.JS · RESEND · SHEET · GBP · STRIPE</text>
            </svg>
        </div>
    );
}
