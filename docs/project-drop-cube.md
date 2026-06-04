# Project Drop Cube — animation mechanism

`src/components/sections/ProjectDropCube.tsx` renders the homepage "Selected Work" experience: a holographic cube that surfaces from beneath the hero card, tumbles through the projects while the section is pinned, and rides up out of frame into the next section. The left-hand text card stays in sync with whichever project is currently facing the camera.

The whole thing is **data-driven by the `projects` array** (from `Projects.tsx`). Add a project there and the cube, its rotation phases, the progress dots, and the section length all update automatically — there are no per-project constants to edit.

## Layering (why the cube can come from "behind" the hero card)

The cube canvas is **not** rendered inside the projects section. It is portaled to `document.body` as a fixed, full-viewport, `pointer-events-none` layer at `z-[5]`:

```
z-0   AuroraGlow         (page background)
z-1   CodeCubes          (page background)
z-2   GridOverlay        (page background)
z-5   ProjectDropCube canvas   <-- portaled here, behind content
z-10  page content (Navbar, Hero card, the projects text card, …)
```

Because `z-5` sits below the `z-10` content, the cube is occluded by the hero card and emerges from under it as the page scrolls. The projects `<section>` itself is transparent (no opaque fill or private grid), so it shares the same page background as every other section.

## Scroll timeline

A single `useScroll({ target: sectionRef, offset: ["start end", "end start"] })` drives the whole journey. `offset` is deliberately "start end → end start" so progress starts climbing the moment the section enters from the bottom (i.e. while the hero is still leaving) and only reaches `1` once the section has fully left the top — that trailing range is what lets the cube ride out on-screen instead of disappearing.

`progress` (0→1) maps to three phases:

| Phase | Range | What happens |
|---|---|---|
| Emerge | `0 → DROP_END` | Cube surfaces from the hero card's bottom edge: starts tiny (`START_SCALE`) and grows, gliding to its resting spot with a gentle ease. |
| Cycle | `DROP_END → CYCLE_END` | Section is pinned; cube tumbles through the project faces, dwelling on each. The text card is visible and tracks the active project. |
| Ride-out | `CYCLE_END → 1` | Cube stays fully visible and translates straight up (`viewport.height + CUBE_SIZE`) in lockstep with the section scrolling away, then clears the top. |

### Thresholds are computed, not hardcoded

`DROP_END` and `CYCLE_END` are measured at runtime (on mount, resize, and load) from the actual section and viewport heights:

```
span       = sectionHeightPx + viewportHeightPx
DROP_END   = viewportHeightPx / span      // emerge takes ~one viewport of scroll
CYCLE_END  = sectionHeightPx / span       // cycle ends when the pin ends
```

`DEFAULT_DROP_END` / `DEFAULT_CYCLE_END` are only fallbacks used before the first measurement. Because the values come from measurement, the timing stays correct even when the section grows with more projects, or the hero/viewport height differs.

### Emerge anchor

The cube's start point is the **hero card's bottom-center**, read from the DOM (`#hero-card`, set in `Hero.tsx`) and converted from screen fractions to Three.js world units each frame. So the cube surfaces from the real card edge regardless of the card's height.

## Multi-axis tumble

Rather than spinning one direction, each project→next transition rotates the cube **90° about a varied axis**, cycling through `TURN_SEQUENCE`:

1. Y axis, −90° — turn left → right
2. X axis, −90° — flip top over (upside down)
3. Y axis, +90° — turn right → left
4. X axis, +90° — flip up

Resting orientations are precomputed as quaternions (`buildOrientations`), composing the turns. During the cycle the cube's orientation is a `slerp` between the two nearest resting orientations, eased per segment so it holds on each project then tumbles to the next. A fading emerge-yaw, a slight camera tilt, and a tiny idle wobble are layered on for life.

This was validated numerically (see "Verification"): every project still lands square to the camera at its dwell, and the variety reads as "turn, flip, turn, flip…".

### Content stays upright

Because the cube flips upside down and sideways, the textures would otherwise land rotated. To prevent that, every frame each face plane is re-oriented so its texture's "up" points to screen-up: the plane keeps its (rotated) outward normal `nW`, and its up-axis is set to world-up projected onto the face (`tUp`). A basis `(tUp × nW, tUp, nW)` becomes the plane's world orientation, converted to a local orientation under the cube. For the front face `nW ≈ +z`, so the up-axis is exactly `+y` and the image/text are guaranteed upright — no matter how the cube has tumbled. The cube cage and body still tumble; only the pictures are kept readable. At a dwell the correction is a clean 90° snap (full face coverage); mid-flip any corner overhang is hidden because the face is edge-on and faded out by the facing-based opacity.

## Face textures + the scalable carousel

A cube has 6 faces but a project list can be any length, so faces are **re-skinned** rather than fixed 1:1 to projects:

- Each project gets a canvas texture: its screenshot (`project.image`, cover-fit) with a neon name bar; no image falls back to a label-only bar.
- `frontFaceOf(orientation)` determines which physical face is square to the camera at each resting project. Faces that serve as a "front" build a **schedule** of the projects they present.
- Each frame, `projectForFace` assigns every face the nearest scheduled project (or a stable fallback so non-front faces still show content and never swap). Because a face's scheduled projects are always a half-turn or more apart, a texture swap only happens while that face is rotated **out of view** — no visible pop.
- Per-face opacity fades by how squarely the face points at the camera (`smoothstep` on the rotated normal's z).

This is why the animation scales past 4 projects: the 6 faces cycle their textures like a carousel.

## What scales with the project count `N`

- **Rotation phases** — `buildPhaseKeys(N)` produces a dwell-then-turn keyframe per project; `buildOrientations(N)` produces a resting orientation per project.
- **Section height** — `sectionVhForCount(N) = 100 + (N − 1) × 70` vh, so each project keeps a comparable scroll budget.
- **Progress dots** — the dot grid is `repeat(N, …)`.
- **Active project / text card** — `activeIndexFromState` rounds the current phase to pick the project shown in the side card.

## Add a project (the only thing you need to do)

Append to the `projects` array in `src/components/sections/Projects.tsx`:

```ts
{
  title: "New Project",
  eyebrow: "Short category line",
  description: "One or two sentences.",
  tags: ["Next.js", "…"],
  image: "/projects/new-project/home.png", // used on the cube face
  links: { demo: "https://…", github: "https://…" },
  icon: SomeLucideIcon,
  external: true, // if demo opens in a new tab
}
```

Everything else (cube phase, face texture, dot, section length, timing) follows automatically.

## Tunable constants (top of `ProjectDropCube.tsx`)

| Constant / function | Effect |
|---|---|
| `START_SCALE` | How tiny the cube is when it first surfaces. |
| `CUBE_SIZE` | Cube edge length in world units. |
| `sectionVhForCount(n)` | Scroll length per project (pacing of the cycle). |
| `buildPhaseKeys` (`holdW`, `turnW`) | Dwell time on each project vs. turn duration. |
| `TURN_SEQUENCE` | The axes/directions of the tumble. Add entries for more variety. |
| Emerge yaw / tilt / idle (in `useFrame`) | The −40° fading entry yaw, −12° resting tilt, and idle wobble amplitudes. |

## Accessibility / fallbacks

- `prefers-reduced-motion`: the cube skips the emerge, idle, and tumble easing and simply presents the active face with a slight 