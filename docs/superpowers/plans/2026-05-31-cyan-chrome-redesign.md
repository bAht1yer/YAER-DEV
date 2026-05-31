# Cyan Chrome Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the portfolio into a cohesive "Cyan Chrome" (glassmorphism + retro-futurism) identity — single-focused hero, holographic-glass background cubes with new motion, one shared cursor-reactive glass material for the hero card and every project card, and consistent global tokens across the whole site.

**Architecture:** A design-token foundation in `globals.css` + `tailwind.config.ts` drives everything. One reusable client component (`GlassCard`) owns the interactive glass "feel" (cursor-follow glow + sheen + tilt). The hero is rebuilt as a single `GlassCard`; the old 4-tab content is un-tabbed into stacked sections. The Three.js cube system (`CodeCubes`) is re-materialized as faux-glass holograms with orbital + scroll-reactive motion; `AuroraGlow`/`GridOverlay` are recolored to match. Section files migrate to the new tokens.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 3.4, Framer Motion, `@react-three/fiber` + `three`, JetBrains Mono + Inter.

**Testing note:** This repo has no unit-test runner (only `next lint` and `next build`). Verification gates are therefore: `npm run build` succeeds, `npm run lint` is clean, and **visual confirmation** in `npm run dev` (a browser/Playwright screenshot at desktop + mobile, with `prefers-reduced-motion` toggled). Each task ends with a commit.

---

## Color token mapping (reference for all re-skin tasks)

Apply this mapping anywhere a hard-coded old value appears. Prefer CSS variables / Tailwind tokens over hex where practical.

| Old value | New value | Meaning |
|---|---|---|
| `#0A0B0D` / `#0a0a0a` / `--background` | `#0A1014` / `--bg` | base background |
| `#121316` (`--panel`) | `#0E171D` | solid panel |
| `#23262B` (`--panel-edge`) | `#1C2A30` | hairline border |
| `#E6FF3A` / `#39FF14` / `--lime` / `--primary` | `#34E5FF` / `--cyan` | primary accent + CTA |
| `#00FBFB` / `#00f0ff` | `#34E5FF` / `--cyan` | (dedupe cyan) |
| `#D4DCE3` / `--steel` / `--accent` | `#CBD2D9` / `--chrome` | neutral steel |
| `#FF5A1F` / `--safety` | `#FF5FD2` / `--signal` | live/alert badge |
| `#ECEEF1` / `--foreground` | `#EAF7FB` | body text |
| `#9CA3AF` / `--muted` | `#8AA3AD` | secondary text |

---

## Task 1: Cyan Chrome design tokens + utilities

**Files:**
- Modify: `src/app/globals.css:9-27` (`:root`), `:49` onward (`@layer utilities`), keyframes block
- Modify: `tailwind.config.ts:11-26` (colors)

- [ ] **Step 1: Replace the `:root` token block**

In `src/app/globals.css`, replace the entire `:root { ... }` (lines ~9-27) with:

```css
:root {
  /* Cyan Chrome — glassmorphism + retro-future */
  --bg: #0A1014;
  --bg-deep: #070B0E;
  --background: #0A1014;            /* legacy alias */
  --foreground: #EAF7FB;
  --muted: #8AA3AD;

  --panel: #0E171D;
  --panel-edge: #1C2A30;
  --hairline: rgba(120, 200, 230, 0.08);

  --cyan: #34E5FF;                  /* primary accent + action color */
  --cyan-bright: #7AF0FF;
  --cyan-soft: rgba(52, 229, 255, 0.08);
  --violet: #9B7BFF;                /* iridescent secondary */
  --chrome: #CBD2D9;               /* steel / silver neutral */
  --signal: #FF5FD2;               /* live / alert (badges only) */

  /* Legacy aliases — remapped so existing references keep working during migration */
  --primary: #34E5FF;
  --accent: #CBD2D9;
  --lime: #34E5FF;
  --lime-soft: rgba(52, 229, 255, 0.08);
  --steel: #CBD2D9;
  --safety: #FF5FD2;
}
```

- [ ] **Step 2: Add the new glass + HUD + retro utilities**

In `src/app/globals.css`, inside `@layer utilities { ... }`, ADD the following (place near the top of the layer, after the opening brace):

```css
  /* ---- Cyan Chrome: glassmorphism ---- */
  .glass-panel {
    position: relative;
    background: rgba(12, 22, 28, 0.5);
    border: 1px solid rgba(52, 229, 255, 0.28);
    border-radius: 14px;
    backdrop-filter: blur(12px) saturate(120%);
    -webkit-backdrop-filter: blur(12px) saturate(120%);
    box-shadow:
      0 18px 50px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(150, 235, 255, 0.18),
      0 0 28px rgba(52, 229, 255, 0.1);
    overflow: hidden;
  }
  /* diagonal holographic sheen */
  .glass-panel::before {
    content: '';
    position: absolute;
    inset: -1px;
    pointer-events: none;
    background: linear-gradient(
      115deg,
      transparent 30%,
      rgba(120, 210, 255, 0.07) 45%,
      rgba(155, 123, 255, 0.07) 55%,
      transparent 70%
    );
    background-size: 300% 300%;
    background-position: var(--sheen-x, 50%) 50%;
  }
  /* cursor-follow glow (driven by --mx / --my from GlassCard) */
  .glass-glow::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: var(--glow-opacity, 0);
    transition: opacity 0.25s ease;
    background: radial-gradient(
      220px circle at var(--mx, 50%) var(--my, 50%),
      rgba(52, 229, 255, 0.16),
      rgba(155, 123, 255, 0.06) 40%,
      transparent 70%
    );
  }

  /* ---- HUD corner brackets ---- */
  .hud-corners { position: relative; }
  .hud-corners::before,
  .hud-corners::after {
    content: '';
    position: absolute;
    width: 14px; height: 14px;
    pointer-events: none;
    z-index: 2;
  }
  .hud-corners::before {
    top: 8px; left: 8px;
    border-top: 1px solid var(--cyan);
    border-left: 1px solid var(--cyan);
  }
  .hud-corners::after {
    bottom: 8px; right: 8px;
    border-bottom: 1px solid var(--cyan);
    border-right: 1px solid var(--cyan);
  }

  /* ---- retro-future overlays ---- */
  .scanlines {
    background-image: repeating-linear-gradient(
      0deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 3px
    );
  }
  .grid-tech {
    background-image:
      linear-gradient(rgba(52, 229, 255, 0.07) 1px, transparent 1px),
      linear-gradient(90deg, rgba(52, 229, 255, 0.07) 1px, transparent 1px);
    background-size: 48px 48px;
  }
```

- [ ] **Step 3: Repurpose existing glass/border utilities + add keyframes**

Still in `globals.css`, find the legacy `.glass-panel` definition under the "Legacy utilities" comment (around line 207) and DELETE that old `.glass-panel { @apply bg-[#121316] ... }` block (the new one in Step 2 supersedes it). Update `.neon-border` and `.cyber-grid` to cyan:

```css
  .neon-border {
    border: 1px solid var(--cyan);
    box-shadow: 0 0 18px rgba(52, 229, 255, 0.25);
  }
  .cyber-grid {
    background-size: 80px 80px;
    background-image:
      linear-gradient(to right, rgba(52,229,255,0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(52,229,255,0.04) 1px, transparent 1px);
    -webkit-mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 85%);
            mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 85%);
  }
```

Then at the end of the file ADD keyframes:

```css
@keyframes holo-sheen {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.5; }
  50%      { opacity: 1; }
}
.sheen-animate::before { animation: holo-sheen 9s linear infinite; }

@media (prefers-reduced-motion: reduce) {
  .sheen-animate::before { animation: none !important; }
}
```

- [ ] **Step 4: Update Tailwind color tokens**

In `tailwind.config.ts`, replace the `colors` object (lines 11-26) with:

```ts
            colors: {
                background: "var(--bg)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#34E5FF", // cyan
                    dark: "#2BC3E0",
                },
                secondary: {
                    DEFAULT: "#9B7BFF", // iridescent violet
                    dark: "#6D4FD6",
                },
                accent: {
                    DEFAULT: "#FF5FD2", // signal magenta
                },
                chrome: "#CBD2D9",
                "code-bg": "#0E171D",
            },
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: build completes (Tailwind picks up new utilities). Warnings about unused legacy CSS are fine.

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat(theme): add Cyan Chrome tokens, glass + HUD + retro utilities"
```

---

## Task 2: Shared interactive glass material (`GlassCard`)

**Files:**
- Create: `src/components/ui/GlassCard.tsx`

- [ ] **Step 1: Create `GlassCard.tsx`**

```tsx
"use client";

import { useRef, useCallback, useEffect, useState, type ReactNode, type ElementType } from "react";

/**
 * GlassCard — the single source of the Cyan Chrome "glass feel".
 *
 * Frosted glass (.glass-panel) + HUD corners + cursor reactivity:
 *  - radial cyan/violet glow that follows the pointer (--mx/--my)
 *  - subtle 3D tilt toward the pointer (max ~5deg), springy reset on leave
 *  - holographic sheen offset nudged by the pointer
 * Used by the hero main card AND every project/offer card so the
 * interaction is identical everywhere. Honors prefers-reduced-motion.
 */
interface GlassCardProps {
    children: ReactNode;
    as?: ElementType;
    className?: string;
    interactive?: boolean;
    /** Max tilt in degrees. */
    maxTilt?: number;
    onClick?: () => void;
}

export default function GlassCard({
    children,
    as: Tag = "div",
    className = "",
    interactive = true,
    maxTilt = 5,
    onClick,
}: GlassCardProps) {
    const ref = useRef<HTMLElement | null>(null);
    const frame = useRef<number | null>(null);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduced(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    const handleMove = useCallback((e: React.PointerEvent) => {
        if (!interactive || reduced) return;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;   // 0..1
        const py = (e.clientY - rect.top) / rect.height;   // 0..1
        if (frame.current) cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.setProperty("--mx", `${px * 100}%`);
            el.style.setProperty("--my", `${py * 100}%`);
            el.style.setProperty("--glow-opacity", "1");
            el.style.setProperty("--sheen-x", `${px * 100}%`);
            const ry = (px - 0.5) * 2 * maxTilt;           // rotateY
            const rx = -(py - 0.5) * 2 * maxTilt;          // rotateX
            el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
    }, [interactive, reduced, maxTilt]);

    const handleLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--glow-opacity", "0");
        el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    }, []);

    return (
        <Tag
            ref={ref}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            onClick={onClick}
            className={`glass-panel glass-glow hud-corners sheen-animate transition-transform duration-200 ease-out ${className}`}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
        >
            {children}
        </Tag>
    );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run build`
Expected: build succeeds, no type errors for `GlassCard`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/GlassCard.tsx
git commit -m "feat(ui): add shared cursor-reactive GlassCard material"
```

---

## Task 3: Rebuild the hero (single focused, no tabs)

**Files:**
- Modify: `src/components/sections/Hero.tsx` (full replace)
- Reference (unchanged): `src/components/ui/ContactModal.tsx`, `src/components/ui/GlassCard.tsx`

The old tab content is preserved for Task 4 (we keep the `hero-tabs/` files on disk until then). Bossimating is NOT shown in the hero.

- [ ] **Step 1: Replace `Hero.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import ContactModal from "../ui/ContactModal";

/**
 * Hero — Cyan Chrome single-focused build.
 * No tab switcher. One glass card: status chip, headline, subhead,
 * one primary CTA (Start a project), one quiet secondary (See work),
 * and a HUD stat-readout strip.
 */
const stats = [
    "IN PRODUCTION",
    "5-MIN ESTIMATES",
    "TORONTO",
];

export default function Hero() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <section
            id="about"
            className="relative min-h-screen w-full bg-transparent flex items-center justify-center px-4 pt-28 pb-20 md:pt-32"
        >
            <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-3xl"
            >
                <GlassCard className="px-6 py-10 sm:px-12 sm:py-14 text-center">
                    {/* status chip */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#34E5FF]/40 bg-[#34E5FF]/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7AF0FF]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34E5FF] shadow-[0_0_8px_#34E5FF]" />
                        System Online · Toronto · Available
                    </span>

                    <h1 className="mt-7 text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-white">
                        AI systems<br />
                        <span className="text-[#34E5FF] drop-shadow-[0_0_18px_rgba(52,229,255,0.5)]">
                            that ship.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#8AA3AD] md:text-lg">
                        SaaS, internal tools &amp; lead systems running in
                        <span className="text-[#CBD2D9]"> production</span> — not just demos.
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <button
                            onClick={() => setIsContactOpen(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-b from-[#7AF0FF] to-[#2BC3E0] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#04181d] shadow-[0_0_20px_rgba(52,229,255,0.4)] transition-transform hover:scale-[1.03]"
                        >
                            Start a project
                            <Send className="h-4 w-4" />
                        </button>
                        <a
                            href="#projects"
                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/15 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[#CBD2D9] transition-colors hover:border-[#34E5FF]/50 hover:text-white"
                        >
                            See work
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>

                    {/* HUD stat-readout strip */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-6">
                        {stats.map((s) => (
                            <span
                                key={s}
                                className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#8AA3AD]"
                            >
                                <span className="mr-2 text-[#34E5FF]">/</span>{s}
                            </span>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </section>
    );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds. (The `hero-tabs/*` files are now unused by `Hero.tsx` but still present — that's fine until Task 4.)

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000`. Confirm: one centered glass card, glowing status chip, "AI systems that ship." headline, two buttons (primary cyan "Start a project" opens the contact modal), HUD stat strip. Move the mouse over the card → cyan glow follows the cursor and the card tilts slightly. No tab bar. No Bossimating screenshot.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(hero): single-focused Cyan Chrome hero on GlassCard, drop tabs"
```

---

## Task 4: Un-tab old content into stacked sections

**Files:**
- Create: `src/components/sections/WaysToStart.tsx`
- Modify: `src/app/page.tsx`
- Delete: `src/components/sections/Hero.tsx`'s former imports already gone; remove now-unused `src/components/sections/hero-tabs/HeroOverview.tsx`, `HeroCaseFiles.tsx`, `HeroBlueprint.tsx`, `HeroStart.tsx` only after porting (`HeroStart`'s track data is ported below; the others' content is already represented by existing `Projects`/`Skills` sections, so they are removed).

- [ ] **Step 1: Create `WaysToStart.tsx` (ported from HeroStart tracks, Cyan Chrome styled)**

```tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2, ClipboardList, MessageSquareText, Sparkles } from "lucide-react";
import Section from "../ui/Section";
import GlassCard from "../ui/GlassCard";
import ContactModal from "../ui/ContactModal";

const tracks = [
    { id: "audit", title: "AI System Audit", range: "3-5 days", summary: "Find the few AI moves worth building.", outputs: ["workflow map", "AI shortlist", "build plan"] },
    { id: "workflow", title: "Workflow Automation", range: "1-2 weeks", summary: "Automate one repeatable process end to end.", outputs: ["agent flow", "review UI", "ship checklist"] },
    { id: "saas", title: "Product Sprint", range: "2-4 weeks", summary: "Ship a focused slice: portal, dashboard, payments, or AI workflow.", outputs: ["usable MVP", "deployment", "handoff docs"] },
];

export default function WaysToStart() {
    const [active, setActive] = useState(tracks[2]);
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <Section id="ways-to-start" className="bg-transparent relative">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="h-px w-10 bg-[#34E5FF]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#34E5FF]">Ways to start</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                        Pick the <span className="text-[#34E5FF]">right starting point.</span>
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[#8AA3AD]">Audit, automate, or ship. No long warm-up.</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-6 lg:grid-cols-[0.48fr_0.52fr]">
                    <div className="space-y-3">
                        {tracks.map((track) => {
                            const selected = active.id === track.id;
                            return (
                                <button
                                    key={track.id}
                                    onClick={() => setActive(track)}
                                    className={`w-full rounded-xl border p-4 text-left transition-colors ${selected ? "border-[#34E5FF]/60 bg-[#34E5FF]/10" : "border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05]"}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <ClipboardList className={`mt-1 h-5 w-5 shrink-0 ${selected ? "text-[#34E5FF]" : "text-gray-500"}`} />
                                        <div>
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="font-bold text-white">{track.title}</span>
                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{track.range}</span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-[#8AA3AD]">{track.summary}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <GlassCard interactive={false} className="p-0">
                        <div className="border-b border-white/10 p-5 md:p-6">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-5 w-5 text-[#34E5FF]" />
                                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#34E5FF]">Best next move</p>
                            </div>
                            <h3 className="mt-3 text-3xl font-black text-white">{active.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-[#8AA3AD]">{active.summary}</p>
                        </div>
                        <div className="grid gap-4 p-5 md:grid-cols-3 md:p-6">
                            {active.outputs.map((output) => (
                                <div key={output} className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
                                    <CheckCircle2 className="h-5 w-5 text-[#34E5FF]" />
                                    <div className="mt-3 text-sm font-bold text-white">{output}</div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-white/10 p-5 md:p-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <a href="#projects" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#34E5FF]/40 px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-[#34E5FF] transition-colors hover:bg-[#34E5FF]/10">
                                    See the work <ArrowRight className="h-4 w-4" />
                                </a>
                                <button onClick={() => setIsContactOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#34E5FF] px-5 py-3 font-mono text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#7AF0FF]">
                                    Start conversation <MessageSquareText className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
            </div>
        </Section>
    );
}
```

- [ ] **Step 2: Wire `WaysToStart` into the page and remove dead hero-tab files**

In `src/app/page.tsx`, add the import after the `Projects` import:

```tsx
import WaysToStart from "@/components/sections/WaysToStart";
```

Then place `<WaysToStart />` between `<Projects />` and `<Contact />`:

```tsx
                <Skills />
                <Projects />
                <WaysToStart />
                <Contact />
                <Footer />
```

Delete the now-unused tab files:

```bash
git rm src/components/sections/hero-tabs/HeroOverview.tsx src/components/sections/hero-tabs/HeroCaseFiles.tsx src/components/sections/hero-tabs/HeroBlueprint.tsx src/components/sections/hero-tabs/HeroStart.tsx
```

- [ ] **Step 3: Verify no dangling imports**

Run: `npm run build`
Expected: succeeds with no "module not found" for the removed hero-tab files. If any other file imports them, update that import (none should outside `Hero.tsx`).

- [ ] **Step 4: Visual check**

Run `npm run dev`; confirm a "Ways to start" section appears before Contact with the three tracks and a glass detail card.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(sections): un-tab hero content into WaysToStart, remove hero-tabs"
```

---

## Task 5: Re-skin background cubes — holographic glass + new motion

**Files:**
- Modify: `src/components/canvas/CodeCubes.tsx` (full replace)

New motion: depth-layered cubes on slow continuous **orbital drift** around a loose vertical axis (parallax by depth) + gentle vertical bob + **scroll-reactive** speed boost + holographic glow pulse + subtle pointer parallax. Orbit loops naturally (no fall-and-respawn). Faux-glass material (translucent body + bright cyan edges + inner glow), no Three.js `transmission`.

- [ ] **Step 1: Replace `CodeCubes.tsx`**

```tsx
"use client";

import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CodeCubes — Cyan Chrome holographic glass.
 * Faux-glass cubes (translucent body + bright cyan wireframe + inner glow),
 * faces labelled with real tech + project names. Motion: orbital drift
 * around a vertical axis with depth parallax, vertical bob, scroll-reactive
 * speed, and a holographic glow pulse. Honors reduced motion.
 */

const LABELS = [
    "NEXT.JS", "REACT", "THREE.JS", "AI/LLM", "PRISMA", "STRIPE",
    "BOSSIMATING", "DIGITAO", "SPIRIT VEIN",
];

const DESKTOP_COUNT = 6;
const MOBILE_COUNT = 3;

const CYAN = "#34E5FF";
const VIOLET = "#9B7BFF";

interface CubeData {
    id: string;
    label: string;
    radius: number;       // orbit radius
    angle: number;        // initial orbit angle
    y: number;            // base height
    bobAmp: number;
    bobSpeed: number;
    orbitSpeed: number;   // radians/sec
    scale: number;
    spin: THREE.Vector3;
    phase: number;
}

interface PointerState { x: number; y: number; targetX: number; targetY: number; }
type CubeRegistry = MutableRefObject<Array<THREE.Group | null>>;

function makeLabelTexture(label: string) {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 512;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.clearRect(0, 0, 512, 512);
    ctx.shadowColor = CYAN;
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#EAF7FB";
    const size = label.length > 8 ? 46 : label.length > 6 ? 56 : 74;
    ctx.font = `700 ${size}px JetBrains Mono, Consolas, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, 256, 256);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 0.6;
    ctx.strokeStyle = CYAN;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(176, 320); ctx.lineTo(336, 320); ctx.stroke();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
}

function buildCubeData(count: number, compact: boolean): CubeData[] {
    return Array.from({ length: count }, (_, i) => {
        const t = i / count;
        return {
            id: `cube-${i}`,
            label: LABELS[i % LABELS.length],
            radius: (compact ? 1.8 : 3.0) + (i % 3) * (compact ? 0.5 : 0.9),
            angle: t * Math.PI * 2 + (i % 2) * 0.6,
            y: (t - 0.5) * (compact ? 5 : 7),
            bobAmp: 0.18 + (i % 3) * 0.06,
            bobSpeed: 0.3 + (i % 4) * 0.05,
            orbitSpeed: (compact ? 0.05 : 0.07) * (i % 2 ? 1 : -1) * (0.7 + (i % 3) * 0.2),
            scale: (compact ? 0.5 : 0.68) + (i % 2) * 0.08,
            spin: new THREE.Vector3(0.05 + (i % 3) * 0.01, 0.07 + (i % 2) * 0.012, 0.03),
            phase: i * 1.37,
        };
    });
}

// shared scroll velocity (module-scoped, updated by a window listener)
const scrollState = { velocity: 0 };

function CubeMesh({
    data, index, pointer, registerCube, reducedMotion,
}: {
    data: CubeData;
    index: number;
    pointer: MutableRefObject<PointerState>;
    registerCube: (i: number, g: THREE.Group | null) => void;
    reducedMotion: boolean;
}) {
    const groupRef = useRef<THREE.Group | null>(null);
    const edgeMat = useRef<THREE.LineBasicMaterial>(null);
    const coreMat = useRef<THREE.MeshBasicMaterial>(null);

    const faceTexture = useMemo(() => makeLabelTexture(data.label), [data.label]);
    const edgeGeometry = useMemo(() => {
        const box = new THREE.BoxGeometry(1.02, 1.02, 1.02);
        const edges = new THREE.EdgesGeometry(box);
        box.dispose();
        return edges;
    }, []);

    useEffect(() => () => { faceTexture?.dispose(); edgeGeometry.dispose(); }, [edgeGeometry, faceTexture]);

    const setRef = useCallback((node: THREE.Group | null) => {
        groupRef.current = node;
        registerCube(index, node);
    }, [index, registerCube]);

    useFrame((state, frameDelta) => {
        const g = groupRef.current;
        if (!g) return;
        const delta = Math.min(frameDelta, 0.045);
        const m = reducedMotion ? 0.12 : 1;
        const elapsed = state.clock.elapsedTime + data.phase;

        // orbital drift + scroll-reactive boost
        const speed = data.orbitSpeed * (1 + scrollState.velocity * 1.5);
        data.angle += speed * delta * m;
        const px = pointer.current.x * 0.4;
        const py = pointer.current.y * 0.3;
        g.position.x = Math.cos(data.angle) * data.radius + px;
        g.position.z = Math.sin(data.angle) * data.radius - 2.5;
        g.position.y = data.y + Math.sin(elapsed * data.bobSpeed) * data.bobAmp * m + py;

        g.rotation.x += data.spin.x * delta * m;
        g.rotation.y += data.spin.y * delta * m;
        g.rotation.z += data.spin.z * delta * m;

        // holographic glow pulse
        const pulse = (Math.sin(elapsed * 0.8) + 1) * 0.5;
        if (edgeMat.current) edgeMat.current.opacity = 0.5 + pulse * 0.3;
        if (coreMat.current) coreMat.current.opacity = 0.05 + pulse * 0.06;
    });

    return (
        <group ref={setRef} position={[Math.cos(data.angle) * data.radius, data.y, Math.sin(data.angle) * data.radius - 2.5]} scale={data.scale} name={`cube-${index}`}>
            {/* translucent glass body */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="#0E171D"
                    emissive={CYAN}
                    emissiveIntensity={0.06}
                    roughness={0.25}
                    metalness={0.1}
                    transparent
                    opacity={0.32}
                />
            </mesh>
            {/* bright cyan wireframe edges */}
            <lineSegments geometry={edgeGeometry}>
                <lineBasicMaterial ref={edgeMat} color={CYAN} transparent opacity={0.6} depthWrite={false} toneMapped={false} />
            </lineSegments>
            {/* inner violet glow core */}
            <mesh scale={0.86}>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial ref={coreMat} color={VIOLET} transparent opacity={0.06} depthWrite={false} toneMapped={false} />
            </mesh>
            {/* labelled faces (front + back) */}
            {faceTexture && (
                <>
                    <mesh position={[0, 0, 0.512]}>
                        <planeGeometry args={[0.88, 0.88]} />
                        <meshBasicMaterial map={faceTexture} transparent opacity={0.85} depthWrite={false} polygonOffset polygonOffsetFactor={-1} toneMapped={false} />
                    </mesh>
                    <mesh position={[0, 0, -0.512]} rotation={[0, Math.PI, 0]}>
                        <planeGeometry args={[0.88, 0.88]} />
                        <meshBasicMaterial map={faceTexture} transparent opacity={0.85} depthWrite={false} polygonOffset polygonOffsetFactor={-1} toneMapped={false} />
                    </mesh>
                </>
            )}
        </group>
    );
}

export default function CodeCubes() {
    const { size } = useThree();
    const groupRef = useRef<THREE.Group>(null);
    const cubeRefs: CubeRegistry = useRef([]);
    const pointer = useRef<PointerState>({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const [reducedMotion, setReducedMotion] = useState(false);
    const compact = size.width < 768;
    const count = compact ? MOBILE_COUNT : DESKTOP_COUNT;
    const cubes = useMemo(() => buildCubeData(count, compact), [count, compact]);

    const registerCube = useCallback((i: number, g: THREE.Group | null) => { cubeRefs.current[i] = g; }, []);

    useEffect(() => {
        const q = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReducedMotion(q.matches);
        update();
        q.addEventListener("change", update);
        return () => q.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            pointer.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.targetY = -((e.clientY / window.innerHeight) * 2 - 1);
        };
        let lastY = window.scrollY;
        let raf = 0;
        const onScroll = () => {
            const y = window.scrollY;
            scrollState.velocity = Math.min(Math.abs(y - lastY) / 40, 1.5);
            lastY = y;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => { scrollState.velocity *= 0.6; });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useFrame((_, delta) => {
        const d = Math.min(delta, 0.045);
        pointer.current.x = THREE.MathUtils.damp(pointer.current.x, pointer.current.targetX, 5, d);
        pointer.current.y = THREE.MathUtils.damp(pointer.current.y, pointer.current.targetY, 5, d);
        // decay scroll velocity each frame
        scrollState.velocity = THREE.MathUtils.damp(scrollState.velocity, 0, 3, d);
    });

    return (
        <group ref={groupRef}>
            <fog attach="fog" args={["#0A1014", 8, 22]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[6, 8, 5]} intensity={0.7} color="#ffffff" />
            <pointLight position={[-6, 4, 2]} intensity={0.4} color={CYAN} />
            <pointLight position={[7, -5, 1]} intensity={0.3} color={VIOLET} />
            {cubes.map((data, index) => (
                <CubeMesh key={data.id} data={data} index={index} pointer={pointer} registerCube={registerCube} reducedMotion={reducedMotion} />
            ))}
        </group>
    );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: succeeds, no TypeScript errors.

- [ ] **Step 3: Visual check**

Run `npm run dev`. Confirm: translucent cyan glass cubes with violet inner glow and labelled faces (NEXT.JS, BOSSIMATING, etc.) orbiting slowly around the center, gentle bob, edges pulsing. Scroll the page → cubes briefly speed up. Move the mouse → slight parallax shift. No console errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/canvas/CodeCubes.tsx
git commit -m "feat(canvas): holographic glass cubes with orbital + scroll-reactive motion"
```

---

## Task 6: Recolor Aurora + Grid background layers

**Files:**
- Modify: `src/components/canvas/AuroraGlow.tsx` (blob colors)
- Modify: `src/components/canvas/GridOverlay.tsx` (grid color, add scanlines + grid-horizon)

- [ ] **Step 1: Recolor the aurora blobs**

In `src/components/canvas/AuroraGlow.tsx`, change the four `smoothRadial(...)` RGB args:
- Bloom 1 (line ~69): `smoothRadial("52,229,255", 0.26 * k)` (cyan)
- Bloom 2 (line ~83): `smoothRadial("155,123,255", 0.18 * k)` (violet)
- Bloom 3 (line ~97): `smoothRadial("52,229,255", 0.15 * k)` (cyan)
- Bloom 4 (line ~111): `smoothRadial("155,123,255", 0.30 * k)` (violet)

- [ ] **Step 2: Recolor the grid + add scanlines and a grid-horizon**

In `src/components/canvas/GridOverlay.tsx`, replace the `showGrid` block's inline `backgroundImage` (lines ~31-33) with cyan lines:

```tsx
                        backgroundImage:
                            "linear-gradient(to right, rgba(52,229,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(52,229,255,0.05) 1px, transparent 1px)",
```

Then, inside the returned root `<div>`, AFTER the vignette block (after line ~49 `)}`), add a scanline overlay and a retro grid-horizon:

```tsx
            {/* faint CRT scanlines */}
            <div className="scanlines absolute inset-0 opacity-40" />
            {/* retro-future grid-horizon glow at the bottom */}
            <div
                className="absolute inset-x-0 bottom-0 h-[34vh]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(52,229,255,0.14) 0 1px, transparent 1px 28px), repeating-linear-gradient(0deg, rgba(52,229,255,0.14) 0 1px, transparent 1px 22px)",
                    transform: "perspective(220px) rotateX(68deg)",
                    transformOrigin: "bottom",
                    WebkitMaskImage: "linear-gradient(to top, black, transparent)",
                    maskImage: "linear-gradient(to top, black, transparent)",
                }}
            />
```

- [ ] **Step 3: Verify + visual check**

Run: `npm run build` (expected: succeeds). Then `npm run dev`: aurora reads cyan/violet (not lime), a faint cyan grid + scanlines sit over the scene, and a glowing cyan grid-horizon fades up from the bottom edge.

- [ ] **Step 4: Commit**

```bash
git add src/components/canvas/AuroraGlow.tsx src/components/canvas/GridOverlay.tsx
git commit -m "feat(canvas): recolor aurora + grid to Cyan Chrome, add scanlines + horizon"
```

---

## Task 7: Re-skin Projects (adopt GlassCard, new tokens)

**Files:**
- Modify: `src/components/sections/Projects.tsx`

- [ ] **Step 1: Swap the section eyebrow + heading accent colors**

In `Projects.tsx`, change the eyebrow rule (lines ~94-97): `bg-[#E6FF3A]` → `bg-[#34E5FF]`, and `text-[#E6FF3A]` → `text-[#34E5FF]`.

- [ ] **Step 2: Convert each project card to `GlassCard`**

Add the import at top:

```tsx
import GlassCard from "../ui/GlassCard";
```

Replace the inner card wrapper `<div onClick={...} className="group relative h-full flex flex-col cursor-pointer overflow-hidden border border-[#23262B] bg-[#121316] ... hover:border-[#E6FF3A]/45">` (lines ~114-117) with:

```tsx
                            <GlassCard
                                onClick={() => openProject(project)}
                                className="group h-full flex flex-col cursor-pointer !rounded-none"
                            >
```

and change its matching closing `</div>` (line ~228) to `</GlassCard>`. Delete the four manual corner `<span>` brackets (lines ~118-121) — `hud-corners` now provides them.

- [ ] **Step 3: Recolor remaining hard-coded hexes in this file**

Apply the Task-0 mapping to every remaining `#E6FF3A`→`#34E5FF`, `#23262B`→`#1C2A30`, `#D4DCE3`→`#CBD2D9`, `#0A0B0D`→`#0A1014`, `#121316`/`#0F1013`→`#0E171D` in `Projects.tsx` (image placeholder block, eyebrow text, metric chips, tags, hover text).

- [ ] **Step 4: Verify + visual check**

Run `npm run build` (expected: succeeds), then `npm run dev`: project cards are now cyan glass with HUD corners and tilt/glow on hover exactly like the hero card. Bossimating still appears here as a card.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat(projects): cards adopt shared GlassCard material + Cyan Chrome tokens"
```

---

## Task 8: Re-skin remaining homepage sections

**Files:**
- Modify: `src/components/sections/offers/OfferShell.tsx`, `OfferQuickFix.tsx`, `OfferOnePage.tsx`, `OfferLeadSystem.tsx`
- Modify: `src/components/sections/Skills.tsx`, `src/components/sections/Contact.tsx`, `src/components/sections/PackagesDivider.tsx`
- Modify: `src/components/ui/Navbar.tsx`, `src/components/ui/Footer.tsx`

- [ ] **Step 1: Apply the color mapping across these files**

For each file above, replace hard-coded old hexes per the Task-0 mapping table (`#E6FF3A`/`#39FF14`/`#00FBFB`→`#34E5FF`; `#23262B`→`#1C2A30`; `#D4DCE3`→`#CBD2D9`; `#FF5A1F`→`#FF5FD2`; `#121316`→`#0E171D`; `#0A0B0D`→`#0A1014`; `#ECEEF1`→`#EAF7FB`; `#9CA3AF`→`#8AA3AD`). Use editor find-in-file per file; verify each replacement is a color literal, not unrelated text.

- [ ] **Step 2: Adopt GlassCard for card-like surfaces in offers**

In `OfferShell.tsx`, if it renders a bordered panel wrapper (`border ... bg-[#121316]` or `.glass-panel`), replace that wrapper element with `<GlassCard interactive={false} className="...">` (import `GlassCard` from `../../ui/GlassCard`). Keep `interactive={false}` for large static panels; use default (interactive) only for clickable cards. This keeps the visual material consistent without tilt on big blocks.

- [ ] **Step 3: Verify + visual check**

Run: `npm run build` (expected: succeeds). `npm run dev`: scroll the whole homepage — offers, skills, contact, navbar, footer all read cyan/chrome with glass panels; no stray lime/green/orange remains. Confirm the navbar CTA is cyan.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections src/components/ui/Navbar.tsx src/components/ui/Footer.tsx
git commit -m "feat(sections): migrate offers, skills, contact, navbar, footer to Cyan Chrome"
```

---

## Task 9: Re-skin blog, dashboard, login, project subpages

**Files:**
- Modify: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/components/blog/*`
- Modify: `src/app/dashboard/*`, `src/components/dashboard/Sidebar.tsx`
- Modify: `src/app/login/page.tsx`
- Modify: `src/components/projects/**` (digitao, web-collection, spirit-vein heroes use neon colors)

- [ ] **Step 1: Grep for remaining legacy colors**

Run: `npx rg -n "#E6FF3A|#39FF14|#00FBFB|#00f0ff|#7000ff|#ff003c|#FF5A1F|#23262B|#D4DCE3|#121316|#0A0B0D" src/app src/components/blog src/components/dashboard src/components/projects`
Expected: a list of remaining occurrences to convert.

- [ ] **Step 2: Apply the color mapping to each match**

Edit each file from Step 1's output, replacing per the Task-0 mapping. For `#7000ff`→`#9B7BFF` (violet), `#ff003c`→`#FF5FD2` (signal), `#00f0ff`→`#34E5FF`.

- [ ] **Step 3: Verify clean**

Run the same `rg` command again.
Expected: no matches (or only intentional ones in code-block syntax themes for `rehype-pretty-code`, which may keep their own palette — leave those).

- [ ] **Step 4: Verify build + commit**

Run: `npm run build` (expected: succeeds).

```bash
git add -A
git commit -m "feat(pages): migrate blog, dashboard, login, project subpages to Cyan Chrome"
```

---

## Task 10: QA pass — motion, mobile, performance, accessibility

**Files:** none new; fixes applied where issues surface.

- [ ] **Step 1: Reduced-motion check**

In the browser devtools (Rendering tab) enable "Emulate prefers-reduced-motion: reduce". Confirm: hero card stops tilting, cube motion is near-static, aurora/scanline/sheen animations stop. If any animation ignores the setting, gate it behind the existing `@media (prefers-reduced-motion: reduce)` rule or the `reducedMotion` flag.

- [ ] **Step 2: Mobile viewport check**

Resize to 375px. Confirm: hero card fits and is readable, 3 cubes (not 6), buttons stack, no horizontal scroll. Fix overflow with responsive classes if needed.

- [ ] **Step 3: Performance sanity**

With the 3D scene running, open the Performance monitor; confirm steady ~60fps on desktop and no runaway memory (cube textures are disposed on unmount — already handled). If janky, reduce `DESKTOP_COUNT` to 5 in `CodeCubes.tsx`.

- [ ] **Step 4: Contrast check**

Confirm body text uses `--foreground`/`--chrome` (light) on dark, never cyan for paragraphs. Spot-check the hero subhead and project descriptions with a contrast checker (target ≥ 4.5:1). Adjust any cyan body text to `#CBD2D9`.

- [ ] **Step 5: WebGL fallback**

Temporarily force `setIsWebGLAvailable(false)` in `Scene.tsx` (or disable WebGL in devtools) and confirm the static dark fallback still renders without breaking the layout. Revert the temporary change.

- [ ] **Step 6: Final build + lint**

Run: `npm run lint` (expected: clean) and `npm run build` (expected: succeeds).

- [ ] **Step 7: Commit any QA fixes**

```bash
git add -A
git commit -m "fix(qa): reduced-motion, mobile, contrast, perf adjustments for Cyan Chrome"
```

---

## Done criteria

- Single-focused hero on a cursor-reactive `GlassCard`, one primary "Start a project" CTA, no tabs, no Bossimating in hero.
- Background cubes are cyan holographic glass with tech + project labels and orbital + scroll-reactive motion.
- Project cards (and offer cards) share the identical `GlassCard` material/feel as the hero.
- Aurora + grid + scanlines + grid-horizon read as one Cyan Chrome identity.
- No legacy lime/green/orange/old-cyan tokens remain across homepage, blog, dashboard, login, project subpages.
- `npm run build` and `npm run lint` pass; reduced-motion, mobile, contrast, and WebGL-fallback all verified.
