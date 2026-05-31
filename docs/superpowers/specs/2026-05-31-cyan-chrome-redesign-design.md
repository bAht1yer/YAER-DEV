# Cyan Chrome — Site Redesign Design

**Date:** 2026-05-31
**Status:** Approved (pending spec review)
**Scope:** Full site re-skin — hero overhaul, background cube system, global design tokens, all sections, blog/dashboard/login.

## Problem

The site reads as unfinished and the message doesn't land:

- **The hero is tab-gated.** A 4-tab switcher (Home / Case Files / Blueprint / Start) hides ~75% of the pitch behind clicks. This is the "useless header" — it fragments the message instead of delivering it.
- **CTAs compete.** Four different buttons across tabs (`See work`, `Start a project`, `See the work`, `Start conversation`) — no single clear action.
- **The brand is inconsistent.** `HeroOverview` uses lime `#E6FF3A`; `HeroStart` still uses leftover cyberpunk `#39FF14` green + `#00FBFB` cyan. It doesn't read as one authored system.
- **Background cubes are generic.** Faces show verbs (SOLVE / DESIGN / AI / BUILD / SHIP) — they don't convey the real range of expertise.

## Goal

A distinctive, authentic, cohesive site in a **glassmorphism + retro-futurism** identity ("Cyan Chrome" — hologram/HUD), with a single focused hero, one clear CTA, and a background cube system that showcases real expertise (tech stack + live projects). ASCII aesthetic explicitly dropped.

## Decisions (locked during brainstorming)

| Decision | Choice |
|---|---|
| Aesthetic direction | **Cyan Chrome** — slate-black, electric cyan, iridescent violet, chrome; hologram/HUD; real glassmorphism |
| Primary CTA | **Start a project** (opens ContactModal) — one bright action, everywhere |
| Hero header | **Single focused hero**, no tabs; old tab content un-tabbed into scroll sections |
| Cube content | **Tech stack + live project names** |
| Cube behavior | Holographic glass + **new motion from scratch** (orbital drift, parallax, scroll-reactive) |
| Scope | **Full site re-skin** |
| Shared material | One **interactive glass material** (cursor-reactive sheen + glow + tilt) used by the hero main card AND every project card — identical feel |

## Design System — "Cyan Chrome"

Defined once in `src/app/globals.css` (`:root` tokens) and surfaced in `tailwind.config.ts`. Replaces the industrial/lime tokens and removes the `#39FF14`/`#00FBFB` inconsistency.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#0A1014` | slate-black base |
| `--bg-deep` | `#070B0E` | vignette / wells |
| `--panel-edge` | `#1C2A30` | hairline borders |
| `--cyan` | `#34E5FF` | **primary accent + the action color** (all CTAs) |
| `--cyan-bright` | `#7AF0FF` | hover / glow |
| `--violet` | `#9B7BFF` | iridescent secondary |
| `--chrome` | `#CBD2D9` | steel / silver neutral |
| `--signal` | `#FF5FD2` | "live / alert" magenta — badges only |
| `--foreground` | `#EAF7FB` | body text |
| `--muted` | `#8AA3AD` | secondary text |

Legacy variable names (`--primary`, `--accent`, `--lime`, `--steel`, `--safety`) are remapped to the new palette so existing references degrade gracefully during migration; usages get cleaned up per-section in Phase 4–5.

**Typography unchanged:** Inter for headings/body, JetBrains Mono for mono-labels (the `.mono-label` / wide letter-spacing vocabulary stays).

**Accessibility rule:** body text stays chrome/white (`--foreground`/`--chrome`); cyan/violet are accent-only. No cyan body copy on dark (fails contrast).

### New utilities (globals.css `@layer utilities`)

- `.glass-panel` — **redefined** to real glassmorphism: `background: rgba(12,22,28,.5)`, `backdrop-filter: blur(12px)`, 1px `rgba(52,229,255,.28)` border, inset rim-light highlight, diagonal holographic sheen via `::before`.
- `.hud-corners` — HUD corner brackets (repurposes the old `.notch-corners`; cyan ticks at all four corners).
- `.scanlines` — subtle repeating-linear-gradient overlay.
- `.grid-tech` — cyan technical grid background (radial-masked).
- Keyframes: `holo-sheen` (diagonal sweep), `glow-pulse`. All gated behind `@media (prefers-reduced-motion: reduce)`.

## Interactive Glass Material (shared component)

**`src/components/ui/GlassCard.tsx`** — the single source of the "feel". A client component wrapping content in `.glass-panel` + `.hud-corners` with pointer reactivity:

- **Cursor-follow highlight:** a radial cyan/violet glow tracks the pointer position within the card (CSS custom props `--mx`/`--my` updated on `pointermove`, consumed by a `radial-gradient` layer).
- **Holographic sheen** shifts angle slightly with the cursor.
- **Subtle 3D tilt:** `rotateX/rotateY` (max ~4–6°) toward the cursor, springy, resets on leave.
- Respects `prefers-reduced-motion` (disables tilt + sheen motion, keeps static glass).
- Props: `as`, `className`, `interactive` (default true), `glow` color override.

Used by:
- the **hero main card**, and
- **every project card** (`Projects.tsx`, `ProjectShowcase.tsx`, the Bossimating featured block, offer cards) — identical material and reaction across the site.

## Hero — single focused, no tabs

Retire `Hero.tsx`'s tab system and the four `hero-tabs/*` panels as the entry surface. New hero:

- One centered **`GlassCard`** (HUD corners) containing:
  - status chip → `● SYSTEM ONLINE · TORONTO · AVAILABLE`
  - headline → **AI systems `that ship.`** ("that ship." in cyan with neon glow)
  - subhead → "SaaS, internal tools & lead systems running in production — not demos."
  - **one** primary CTA `Start a project →` (opens `ContactModal`) + quiet secondary `See work` (`#projects`)
  - HUD **stat-readout strip** at the base → `IN PRODUCTION · 5-MIN ESTIMATES · TORONTO`

**Un-tabbing the old content (preserved, not deleted):**
- `HeroOverview` Bossimating block → a **Featured Project** scroll section.
- `HeroStart` tracks (Audit / Workflow / Product Sprint) → a **Ways to start** section above Contact.
- `HeroCaseFiles` / `HeroBlueprint` → folded into the existing `Projects` / `Skills` sections.

## Background cube system + new motion

Rework `CodeCubes.tsx`, `AuroraGlow.tsx`, `GridOverlay.tsx`:

- **Material:** translucent holographic glass cubes — low-opacity body, bright cyan `EdgesGeometry` wireframe, faint violet inner-glow core, additive sheen. **Faux-glass** (no Three.js `transmission`) to stay performant.
- **Labels:** real expertise — tech (`NEXT.JS`, `REACT`, `THREE.JS`, `AI/LLM`, `PRISMA`, `STRIPE`) + projects (`BOSSIMATING`, `DIGITAO`, `SPIRIT VEIN`).
- **New motion:** depth-layered slow **orbital drift** with parallax (replacing plain top-to-bottom fall) + **scroll-reactive stream** (scroll velocity nudges drift/rotation speed) + holographic glow pulse + retained subtle pointer parallax.
- `AuroraGlow`: recolor blobs lime/steel → cyan/violet.
- `GridOverlay`: cyan tech-grid + HUD vignette + faint scanlines + a retro **grid-horizon** glow at the bottom.
- Keeps existing safeguards: `prefers-reduced-motion`, mobile count reduction (5 desktop / 3 mobile), WebGL fallback in `Scene.tsx`.

## Section re-skin

Token + class migration to the new system (these already share the `.glass-panel` / mono-label vocabulary, so mostly swaps):
`OfferQuickFix/OnePage/LeadSystem`, `OfferShell`, `Skills`, `Projects`, `Contact`, `Navbar`, `Footer`, `PackagesDivider`, plus `blog/`, `dashboard/`, `login/`. Project/offer cards adopt `GlassCard`.

## Build order (phased, each phase shippable)

1. **Tokens & utilities** — `globals.css` + `tailwind.config.ts` → Cyan Chrome; new utilities/keyframes. (Foundation.)
2. **Shared material** — `GlassCard.tsx`.
3. **Hero rebuild** — single focused hero on `GlassCard`; un-tab old content into new sections.
4. **Cube system** — new holographic material + new motion; recolor Aurora/Grid.
5. **Section re-skins** — offers, skills, projects, contact, navbar, footer adopt tokens + `GlassCard`.
6. **Blog / dashboard / login** re-skin.
7. **QA** — reduced-motion, mobile, 3D perf, color contrast, `npm run build`, in-browser visual verification.

## Testing & verification

This is a visual change, so verification is primarily observational:
- `npm run build` and `npm run lint` pass.
- Run `next dev`, visually verify hero, cube motion, and the shared cursor-reactive glass on hero + project cards (via browser/Playwright screenshots).
- Toggle `prefers-reduced-motion` and a mobile viewport; confirm graceful behavior and no jank.
- Confirm WebGL fallback still renders.

## Risks & mitigations

- **3D glass performance** → faux-glass (edges + glow, no transmission); cap cube count; reduced-motion path.
- **Cyan-on-dark contrast** → accent-only rule; body text stays chrome/white.
- **Scope size** → strict phasing; phases 1–4 deliver the headline impact (hero + cubes + cohesive identity), 5–6 finish coverage.
- **Pointer-tilt on many cards** → throttle via `requestAnimationFrame`; disable under reduced-motion; CSS-transform only (no layout thrash).

## Out of scope

- Copywriting overhaul beyond the hero headline/CTA/stat strip.
- New features, routes, or backend/data changes.
- Logo redesign.
