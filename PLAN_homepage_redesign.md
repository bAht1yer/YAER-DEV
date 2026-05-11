# Homepage Redesign Plan — Neil Bahtiyer Portfolio

**Date:** 2026-05-11
**Scope:** Reposition homepage, add three contractor offer sections, redesign visual language from cyberpunk to near-future industrial, build initial outreach pipeline.
**Status:** Draft for review. No code changed yet.

---

## 1. Confirmed Decisions

| Decision | Choice |
|---|---|
| Primary brand identity | AI / SaaS architect (unchanged) |
| Contractor offers | Three separate sections directly under Hero |
| Visual language | Cyberpunk → near-future industrial |
| Outreach pipeline | None yet — build from zero |
| Pricing on homepage | Yes, each offer shows price (per your call) |

---

## 2. New Information Architecture

```
Navbar
Hero                          ← AI / SaaS architect positioning (unchanged copy spine)
Offer Section 1 — Quick Fix   ← $499 / 48–72h
Offer Section 2 — One-Page    ← $999 / ~1 week
Offer Section 3 — Lead System ← $1,500–$2,000 / 2–3 weeks  (主推, Bossimating-backed)
Bossimating Proof Block       ← contractor authority callout (lives inside Section 3 or its own band)
Skills                        ← rename + retitle, keep
Selected Work                 ← Bossimating featured card refined
Contact                       ← form gains Project Type dropdown
Footer
```

**Why three separate sections, not one combined grid:**
Each offer addresses a different buyer state (broken site / no site / wants lead engine). Combined cards force comparison; separated sections let each one land its own story and CTA.

---

## 3. Visual Language Shift — Cyberpunk → Near-Future Industrial

### What's changing in plain terms
Cyberpunk = glitch, neon, scanlines, mix-blend-difference, multi-accent (#00FBFB cyan + #39FF14 green + #7000FF purple + #ff6b16 orange). Reads like a hacker dashboard.

Near-future industrial = matte surfaces, structural geometry, single dominant accent, machined typography, sparse glow. Reads like a spec sheet for a piece of hardware. Think SpaceX deck, Rivian dashboard, Linear's marketing pages, Arc Raiders UI — disciplined, engineered, calm.

### Concrete token shift

| Token | Cyberpunk (current) | Industrial (new) |
|---|---|---|
| Background | `#050505` solid + 3D CodeCubes canvas (bright neon cubes, full density) | `#0A0B0D` base + slow aurora glow layer (lime + steel) + re-materialized CodeCubes (matte / wireframe / glass) + faint structural grid + vignette. Full spec in Section 3.5. |
| Primary accent | `#39FF14` neon green | `#E6FF3A` industrial lime (less saturated, no glow halo) |
| Secondary accent | `#00FBFB` cyan | `#D4DCE3` brushed steel / cool grey |
| Warning / signal | `#ff6b16` orange | `#FF5A1F` safety orange (kept, lowered glow) |
| Surface | `bg-black/40 backdrop-blur-md` glass | `#121316` matte panel with 1px `#23262B` border, no blur |
| Text body | `text-gray-400` | `#9CA3AF` (no change to value, but kill `font-mono` body text — keep mono only for labels and data) |
| Glow / shadow | `0_0_30px_rgba(57,255,20,0.5)` heavy | `0_1px_0_rgba(255,255,255,0.04)_inset, 0_8px_24px_rgba(0,0,0,0.4)` structural shadow |
| Border treatment | Animated gradient borders, neon corners | Hairline `#23262B` + 1–2px corner notches (cut, not glow) |
| Effects to remove | `mix-blend-difference`, glitch text, animated gradient, scanlines, CMS dashboard sidebar/topbar | — |
| Effects to keep | Framer Motion enter animations, hover scale | — |
| Typography | `font-space` black + `font-mono` body | `font-space` retained for display; switch body to Inter at slightly looser tracking; mono reserved for `[10–11px]` labels, prices, and data |
| Imagery treatment | `grayscale group-hover:grayscale-0` | Drop the grayscale flip — show product screenshots in color, full fidelity |
| Decorative geometry | Cyber-grid radial mask, CodeCubes 3D | Replace with thin diagonal hatch panels, framework callouts (think technical drawing), exploded-view dividers between sections |

### Components that need rebuild (not just restyle)
1. `Hero.tsx` — drop the fixed CMS sidebar + topbar. They are the strongest cyberpunk signal on the site and they fight the new visual brief.
2. `globals.css` — strip `.neon-border`, `.text-glow`, `.gradient-border`, `.cyber-grid`. Replace with `.panel-industrial`, `.hairline`, `.notch-corners`.
3. `CodeCubes.tsx` — **kept**, but re-materialized from neon emissive cubes to engineered geometry (matte + wireframe or glass). Reduced density and motion. Full spec in Section 3.5.
4. `GlitchText.tsx` — delete from homepage usage. Keep available if needed for project sub-pages.

### Components that restyle only
- `Skills.tsx`, `Projects.tsx`, `Contact.tsx`, `Footer.tsx`, `Navbar.tsx` — palette + border + typography swap, structure unchanged.

---

## 3.5 Background Composition — Keeping CodeCubes, Adding Aurora

The 3D `CodeCubes` scene stays. It earns its keep by carrying motion and depth that flat industrial pages lack. The fix is not removal — it is **re-materializing the cubes** so they read as engineered geometry, not neon code, and **layering a soft aurora glow behind them** in the spirit of Upwork's atmospheric green wash.

### Layered composition (back to front)

| # | Layer | Purpose | Implementation |
|---|---|---|---|
| 0 | Base fill | Anchor | `bg-[#0A0B0D]` solid |
| 1 | **Aurora glow** | Atmospheric depth, slow drift, premium feel | 3–4 large radial-gradient blooms. Lime `#E6FF3A` at 8–12% alpha + steel `#D4DCE3` at 4–6% alpha. Diameter 600–900px each. Heavy CSS blur (`filter: blur(120px)`). Drift on 40–60s cycles via CSS keyframes (cheap) or Framer Motion. |
| 2 | **CodeCubes (re-materialized)** | Engineered geometry, depth, motion | Same Three.js scene, two material options (pick one — see below). Cube density reduced 40–50%. Rotation / drift slowed 50%. Overall canvas opacity 50–60%. Add depth-of-field blur on far cubes. |
| 3 | Structural grid | Quiet technical-drawing anchor | CSS background `80×80px`, lines `rgba(255,255,255,0.025)`, radial mask to fade at edges. |
| 4 | Vignette | Pull eye toward content | Radial dark gradient at viewport corners, ~30% alpha. |

### Cube material — two paths, my recommendation: wireframe first

**Path A — Matte + wireframe (recommended, ships faster)**
- `MeshStandardMaterial` body, `color: #2A2D33`, `roughness: 0.7`, `metalness: 0.3`
- Add `EdgesGeometry` + `LineBasicMaterial`, `color: #E6FF3A`, `opacity: 0.35`
- Reads as technical / engineered. Performant on mobile.

**Path B — Glass (upgrade path)**
- `MeshPhysicalMaterial`, `transmission: 0.6`, `roughness: 0.2`, `ior: 1.3`, `thickness: 0.5`
- The aurora layer lights the cubes from behind — they refract subtly
- More premium, costs ~20% more GPU. Test on mid-tier mobile before committing.

Start with Path A. If the result feels too sketchy, swap the material — geometry stays the same.

### Per-section background rhythm

Backgrounds should not be uniform across the page — that flattens it. Vary by section, controlled by props on the `Scene` component:

| Section | Aurora | Cubes | Grid |
|---|---|---|---|
| Hero | Full intensity (3 blooms) | Full density, opacity 60% | Yes |
| Offer 01 — Quick Fix | Single bloom upper-right | Hidden | Yes |
| Offer 02 — One-Page | Single bloom lower-left | Hidden | Yes |
| Offer 03 — Lead System ★ | Two blooms, lime-weighted | Visible at opacity 35% | Yes |
| Skills / Capabilities | Off | Hidden | Yes |
| Selected Work | Subtle single bloom | Full density, opacity 50% | Yes |
| Contact | Off | Hidden | Yes |

This gives the page a breathing pattern — atmospheric / quiet / atmospheric / quiet — and makes the Hero and the Lead System section feel like the most alive moments, which is correct.

### Why each layer earns its slot

- **Aurora** is the Upwork reference — emotional atmosphere without specific shapes. This is the layer doing the "soft, premium, alive" work.
- **Re-materialized cubes** preserves your investment in the Three.js scene but stops it from carrying the cyberpunk brand. Matte + wireframe = engineering. Glass = engineering with money.
- **Structural grid** quietly anchors the page as "technical drawing" rather than "free-floating space".
- **Vignette** is the cheap trick that turns a busy composition into a composed one.

### Implementation cost (rolled into Phase 1's 4-day estimate)

- Aurora layer: 1–2 hours (pure CSS, no canvas).
- CodeCubes re-material + density/speed tuning: 2–3 hours including mobile perf testing.
- Per-section background props on `Scene`: 1–2 hours.
- Grid + vignette utilities: 30 min.
- **Total addition:** ~6 hours.

---

## 4. Hero Spec (Rebuilt)

**Headline (kept spine, tighter):**
> AI systems that ship.

**Subhead (new, broader):**
> I design and build SaaS, internal tools, and lead systems for teams that need software working in production — not in a demo.

**Primary CTA:** `See Work` → `#projects`
**Secondary CTA:** `Start a Project` → opens Contact modal with no preset
**Tertiary inline link (small, under CTAs):** `Run a small business? Jump to packages →` → `#offer-quick-fix`

**Right-side hero panel:** Bossimating product card (mostly the current `HeroOverview` right column, but restyled to industrial and color-corrected screenshot).

**Removed:** the fixed CMS sidebar/topbar overlay. It's the single biggest carrier of the cyberpunk brand and adds no business value.

---

## 5. Three Offer Sections — Spec

Each section is full-width on a distinct dark panel band, vertically separated by a thin engineered divider (e.g., a labeled section index `01 / QUICK FIX` in mono caps top-left).

### 5.1 Section: Quick Fix Package — $499

| Field | Content |
|---|---|
| Section index | `01 / QUICK FIX` |
| Headline | Make the site you already have stop costing you customers. |
| Subhead | A 48–72 hour pass on your existing site. Mobile fixed, hero rewritten, contact path obvious, basic SEO in place. |
| Deliverables (5 bullets, mono labels) | Homepage refresh · Mobile layout cleanup · Contact form or booking button · Google Maps & phone CTA · Basic SEO title and description |
| Timeline | 48–72 hours |
| Best for | Existing sites that look outdated, break on mobile, or hide the contact button |
| Not included | Logo design, multi-page rebuild, long copywriting cycles |
| Price | `$499 fixed` · 50% deposit option `$250` |
| CTA | `Book a Quick Fix` → opens Contact with Project Type preset = `Quick Fix` |
| Visual element | Before/after split mockup (placeholder until we have a real one) |

### 5.2 Section: One-Page Website — $999

| Field | Content |
|---|---|
| Section index | `02 / ONE-PAGE SITE` |
| Headline | A clean one-page site, ready to send to customers. |
| Subhead | For trades and local businesses running off Facebook or Instagram. One page, well-built, deployed, and yours. |
| Deliverables | One-page professional site · Services section · Gallery / before-after · Contact form · Mobile optimized · Vercel / Netlify deploy · Domain setup guidance |
| Timeline | ~1 week |
| Best for | Trades and contractors with no website or only social media presence |
| Price | `$999 fixed` |
| CTA | `Start a One-Page Site` → opens Contact with Project Type preset = `One-Page Site` |
| Visual element | A live-style mockup of the one-page layout (single browser frame, scrollable preview) |

### 5.3 Section: Contractor Lead System — $1,500–$2,000  ★ Featured

This is the highest-visual-weight section of the three. Larger panel, lime accent, structural diagram on the right.

| Field | Content |
|---|---|
| Section index | `03 / LEAD SYSTEM` · tag `RECOMMENDED` |
| Headline | A site that asks the right questions and turns visitors into estimates. |
| Subhead | Lead capture, intake flow, quote scaffolding, and the operational glue around them. Built from real contractor workflow. |
| Deliverables | Professional site / landing page · Estimate request form · PDF quote / intake flow concept · Google Business Profile optimization checklist · Simple CRM lead sheet / email notification · Optional AI chatbot demo |
| Timeline | 2–3 weeks |
| Best for | Contractors who already get leads inconsistently and want to convert more of them |
| Price | `$1,500–$2,000` (scope dependent) |
| CTA | `Build My Lead System` → opens Contact with Project Type preset = `Lead System` |
| Bossimating callout (inline, right column or bottom band) | *I built Bossimating, a contractor-focused estimating platform, so I understand how contractors quote jobs and capture leads.* — followed by 3 proof chips: `Estimate forms that ask the right questions` · `Quote and approval flow thinking` · `Contractor-friendly dashboards and follow-up paths` |
| Visual element | A schematic-style diagram (technical drawing aesthetic): visitor → form → email + sheet → estimate → follow-up. Industrial line art, not screenshots. |

---

## 6. Bossimating's Role

Bossimating stays in two places:

1. **Hero right panel** — product showcase, brand authority. Restyled to industrial; screenshot shown in full color (drop the grayscale).
2. **Inside Section 03 (Lead System)** — quoted authority callout (above). This is where it earns its keep as a sales asset, not just a portfolio item.

In `Projects.tsx` `Selected Work`, Bossimating's featured card description gets one line added at the end of the existing copy:

> Built to understand how contractors quote, approve, and get paid — the same thinking goes into every Lead System engagement.

No new section just for Bossimating. The Hero panel + Section 03 callout + Selected Work featured card is enough triangulation.

---

## 7. Contact Form Change

Add `Project Type` dropdown above the existing message field:

```
Project Type *
  ── Select ──
  Quick Fix ($499)
  One-Page Site ($999)
  Lead System ($1,500–$2,000)
  AI / SaaS work
  Other
```

Each offer CTA pre-selects its option via URL hash or query param (`/#contact?type=lead-system`). When the form is submitted, the project type goes into the email subject so you can triage in 5 seconds.

---

## 8. Outreach Pipeline — Building From Zero

You said you have no pipeline. The homepage alone will not generate contractor leads — it serves people who already know about you. To make the $999 and $1,500–$2,000 offers actually sell, here is the minimum viable outreach stack.

### 8.1 Week 1–2: Foundation (free / cheap)
1. **Build a local prospect list.** 30–50 contractors in your region (roofing, painting, paving, landscaping, HVAC, general contracting). Sources: Google Maps within a 30km radius, Yelp, local trade associations, your own network. For each: business name, owner name (if findable), phone, email, current website URL, one specific weakness you noted ("no mobile site", "no contact form", "Facebook-only").
2. **Set up Google Business Profile for yourself** as `Neil Bahtiyer — Web & Lead Systems for Contractors`. Free, gives you local SEO surface and a place to collect reviews later.
3. **Build `/contractor-websites` landing page** (P2 task from previous plan). Same offers, but the page is single-purpose, no AI / SaaS distraction. This is where cold outreach links go, not the homepage.

### 8.2 Week 2–4: Outbound (manual, high-signal)
4. **Cold email, not cold call, not LinkedIn.** Trades respond to email more than DMs. Template structure (do not copy as-is, personalize):
   > Subject: Quick note on {{their business name}}'s site
   >
   > Hi {{name}}, saw {{specific observation}} on your site — your contact form / phone number / mobile layout / etc. I build small fast lead systems for contractors (I built bossimating.com, an estimating platform for trades). Happy to send a 2-minute Loom showing exactly what I'd change for {{their business}} — no obligation. Worth a look?
5. **Volume target:** 10 personalized emails per business day. Track in a Google Sheet: business, status (sent / replied / booked / closed), notes.
6. **The Loom video is the conversion mechanic.** When someone replies "show me", you record a 2–3 min screen recording walking through their existing site, point out 3 specific issues, sketch the fix. This is what converts. Trades buy from people who already showed they understood the problem.

### 8.3 Week 3+: Referral and proof loop
7. **First client = free testimonial + before/after screenshots.** Bake this into the deal: "If we ship in 7 days and you're happy, can I use your site as a portfolio piece and ask you for a one-paragraph testimonial?" Trades say yes.
8. **Local Facebook groups** for trades and small business owners. Don't spam; answer questions about websites/leads for 2 weeks, then post one before/after when you have it.
9. **Reciprocal partnerships.** One local SEO consultant, one bookkeeper-for-trades. Each refers you a client a quarter if you refer back. Worth 2 emails to set up.

### 8.4 Realistic 90-day target
- Weeks 1–4: 0 sales, 200 outbound, ~10 replies, ~2 conversations, **1 booked Quick Fix or One-Page**.
- Weeks 5–8: 1–2 closed deals from outbound + 1 referral.
- Weeks 9–12: **2–3 total $999+ deals closed** (matches the original three-week target, just delayed to a realistic ramp).

If you cannot do 10 emails/day for 30 straight days, the offer funnel doesn't matter. The homepage redesign is necessary but not sufficient.

---

## 9. File-Level Change Map

| File | Change | Type |
|---|---|---|
| `src/app/page.tsx` | Insert three offer section components between `<Hero />` and `<Skills />`. Optionally remove `Scene` + `CodeCubes` background. | Edit |
| `src/app/globals.css` | New industrial utilities, retire neon utilities (keep for project sub-pages or namespace them). | Edit |
| `src/components/sections/Hero.tsx` | Strip CMS sidebar/topbar overlay. Simpler 2-column layout. Drop `mix-blend-difference`. | Rewrite |
| `src/components/sections/hero-tabs/HeroOverview.tsx` | Restyle to industrial. Remove grayscale flip on Bossimating screenshot. Update CTAs. | Edit |
| `src/components/sections/hero-tabs/*` (Case Files, Blueprint, Start) | Decision needed: keep tab system or collapse into single Hero? See open question 1. | TBD |
| `src/components/sections/offers/OfferQuickFix.tsx` | New file. | Create |
| `src/components/sections/offers/OfferOnePage.tsx` | New file. | Create |
| `src/components/sections/offers/OfferLeadSystem.tsx` | New file (includes Bossimating callout). | Create |
| `src/components/sections/Skills.tsx` | Restyle (palette + border). Possibly rename section to `Capabilities`. | Edit |
| `src/components/sections/Projects.tsx` | Restyle. Add 1 line to Bossimating description. Drop grayscale. | Edit |
| `src/components/sections/Contact.tsx` | Restyle. | Edit |
| `src/components/ui/ContactForm.tsx` | Add `Project Type` dropdown. Read from URL hash/query to preselect. | Edit |
| `src/components/ui/ContactModal.tsx` | Same dropdown change as ContactForm. | Edit |
| `src/components/ui/Navbar.tsx` | Restyle + add `Packages` nav item that anchors to first offer section. | Edit |
| `src/components/ui/Footer.tsx` | Restyle. | Edit |
| `src/components/canvas/CodeCubes.tsx` | Re-material (matte + lime wireframe), reduce density 40–50%, slow motion 50%, accept density/opacity props for per-section control. | Edit |
| `src/components/canvas/AuroraGlow.tsx` | New file. CSS-based slow-drifting radial blooms with section variant props. | Create |
| `src/components/canvas/Scene.tsx` | Accept `variant` prop (hero / quiet / accent / etc.) to control aurora and cube density per section. | Edit |
| `src/components/ui/GlitchText.tsx` | Remove from homepage usage. | No file change, remove usage |
| `src/app/contractor-websites/page.tsx` | New landing page (P2). | Create later |

---

## 10. Phased Rollout

**Phase 1 — Homepage redesign + offer sections (this engagement)**
1. New industrial style tokens in `globals.css`
2. Rebuild Hero (drop CMS overlay, restyle Bossimating panel)
3. Create three offer section components
4. Wire CTAs into Contact form with `Project Type` preselect
5. Restyle Skills / Projects / Contact / Footer / Navbar to industrial palette
6. Add Bossimating line to featured card and Lead System callout

**Phase 2 — Standalone landing page (`/contractor-websites`)**
Single-purpose page mirroring the three offer sections, no AI / SaaS distractions. This is the URL you send in cold emails.

**Phase 3 — Outreach execution**
Prospect list + cold email cadence + Loom workflow per Section 8.

**Phase 4 — Iterate with real data**
Once 2–3 deals close, pull the actual deliverables, testimonial quotes, and before/after screenshots back into the offer sections.

---

## 11. Risks & Honest Caveats

1. **Brand collision risk.** Mixing AI / SaaS architect (premium, technical buyer) with $499 small-business offers on the same page is unusual. The industrial visual style mitigates this because both audiences can read industrial as "competent and serious". But the second a contractor sees `RAG` or `LLM workflows` in Skills, some will bounce. Mitigation: don't change Skills to hide the AI work — keep it. The contractor audience that bounces wasn't going to convert anyway. The ones who stay see proof of capability.
2. **Pricing on homepage limits negotiation flexibility.** Once `$499` is visible, every prospect anchors there. If you want enterprise contractor deals later ($5k+), you'll need to remove or hide pricing or move premium offers elsewhere. Acceptable trade-off short-term.
3. **The redesign is a 3–5 day build, honestly.** Not a 1-day job. Industrial visual language requires more taste calls than cyberpunk because the latter hides imperfection behind glow effects. Confidence on timeline: **medium**. I'd quote 4 working days for a clean Phase 1.
4. **Outreach is the bottleneck, not the site.** If the outreach pipeline doesn't happen, expect 0–1 sales from the redesign in the first 90 days. The site converts; it does not acquire.
5. **Bossimating screenshot fidelity.** Removing grayscale means the screenshot has to look good in full color. If `bossimating-home.png` isn't a polished marketing-grade screenshot, we need to retake it before launch.

---

## 12. Open Decisions I Need Before Coding

1. **Hero tabs (`Overview` / `Case Files` / `Blueprint` / `Start`):** Keep all four, simplify to one, or drop the tab pattern entirely? My recommendation: drop tabs, single clean Hero. The tabs are part of the cyberpunk identity and slow first-paint comprehension. But this is a significant content decision.
2. **Cube material — wireframe (Path A) or glass (Path B)?** See Section 3.5. My recommendation: ship Path A first, upgrade to glass only if the result feels too sketchy in the preview. Geometry is identical either way, so swapping later is cheap.
3. **Should `Skills` section rename to `Capabilities`?** My recommendation: yes — `Capabilities` reads as engineering / industrial, `Skills` reads as résumé.
4. **Pricing visibility on the homepage vs gating behind a click:** You said show price. Confirming: full price shown on each offer section, not hidden until contact form. Correct?
5. **Visual asset for Section 03 schematic diagram:** I can build it as inline SVG. Confirm OK to ship without your design review, or you want to see it first?
6. **Light/dark mode:** Currently dark-only. Industrial works in both, but adds 30%+ scope. Stay dark-only for Phase 1? My recommendation: yes.

---

## 13. What Happens After You Approve This Plan

1. You answer the six open decisions above.
2. I create a feature branch, build Phase 1 in 4 working days, push to a preview deploy on Vercel.
3. You review the preview, send a list of changes.
4. Iterate once, merge to production.
5. We start Phase 2 (`/contractor-websites` landing page) only after Phase 1 is live and stable.

**Confidence on this plan, end-to-end:** Medium-high on the homepage redesign and offer sections. Medium on outreach execution (depends entirely on your follow-through). Low on revenue forecasting — I can build the funnel, but I can't predict close rates without market data from your region.
