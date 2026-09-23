# YAER / Digital Afterimage

Implemented from the approved second visual direction. The identity pairs a custom angular YAER wordmark and folded Y monogram with a sculptural chrome signature. Background #101113, type #F1F0E9, accent #DFFF00, neutral panels #18191B. Typography uses the existing Inter and JetBrains Mono families.

## Implementation

- Shared theme and responsive layouts: `src/app/afterimage.css`.
- Vector identity: `src/components/ui/Brand.tsx` and `public/brand/afterimage-*.svg`.
- Homepage: oversized identity, pointer-responsive sculpture, real project gallery, about/process, contact.
- The capabilities strip is a noninteractive, three-column list covering engineering, intelligence, and experience. It flips through 12 skills every 4.2 seconds while visible, pauses in hidden tabs, and exposes every skill to assistive technology. Reduced-motion users see a still list.
- The four process steps use descriptive icons: a compass for Scope, a pen tool for Design, code brackets for Build, and a rocket for Launch. Directional arrows are reserved for navigation.
- GuanXiang's card and feature descriptions use plain, concise language. Its homepage, reading, casting, year-cycle, and learning images were recaptured from the upgraded live app on 2026-09-22 and saved as `public/projects/wyisdom/*-2026.webp` (about 224 KB combined). The source pages are `https://calclife.vercel.app/`, `/texts/yijing/3`, `/cast`, `/cycle`, and `/learn/bagua`. Local PNG captures and review screenshots are retained under `output/guanxiang-refresh/`.
- Shared identity applied to services, notes, article reader, project pages, login, and dashboard navigation.
- Existing project catalog, prices, authentication, and API behavior retained.
- Native contact dialog provides modal focus isolation, Escape dismissal, and focus restoration. Form instance IDs remain unique when inline and dialog forms coexist.
- Reduced-motion preferences hold the sculpture still and disable entrance motion and smooth scrolling; shared Framer Motion configuration respects the same preference.
- The hero renders the original folded-chrome sculpture (`afterimage-sculpture.webp`) with Next Image, its original gentle float, and spring-smoothed pointer tilt. The experimental liquid shader has been removed, and there is no caption beneath the artwork. Reduced-motion users see the still sculpture.
- The About monogram uses the original Y contours as a live extruded mesh, with a citron face, metallic beveled edges, and subtle pointer rotation. It loads only near the viewport, renders on demand, and releases its canvas when offscreen. Touch input and reduced-motion preferences retain a fixed angle. An SVG relief provides the loading and unsupported-WebGL fallback.

## Artwork provenance

The sculpture was generated with the built-in ImageGen tool using the approved concept as its reference; the homepage displays that original artwork with gentle float and pointer tilt. The wordmark, monogram, and favicon are editable SVGs. Social and Apple icons are built from those assets with `node scripts/build-afterimage-assets.cjs`.

Production files:

- `public/brand/afterimage-sculpture.webp`
- `public/brand/afterimage-wordmark.svg`
- `public/brand/afterimage-icon.svg`
- `public/brand/afterimage-apple.png`
- `public/brand/afterimage-social.png`

Final ImageGen prompt:

> Use case: background-extraction / production website hero asset. Reference image is the approved YAER website design. Create ONLY the large central flowing sculptural folded Y in liquid mirror titanium from that design, as a standalone high-resolution photorealistic 3D object. Preserve its dramatic angular two upraised arms, crossing folded ribbons and tapering standing base, chrome mirror material, subtle acid-yellow highlights and tiny subtle violet edge reflections, extraordinary precise polished folded metal. No words, no letters printed on object, no website, no panels, no mockup, no captions, no decorative lines. Center full sculpture, do not crop tips, use 5% empty margin, portrait composition around 1200x1500. Crucial background: truly transparent alpha, no checkerboard painted into image, no floor, no opaque black background, no ground plane. Object itself remains opaque dark chrome and bright silver with deep dark reflections. It must composite seamlessly over an ink-black website. This is the final production artwork, extremely high material quality, crisp elegant dramatic silhouette. Single sculpture only.

Local, git-ignored source backup, approved concept, and full-resolution generated artwork are in `output/redesign/`. Browser checks and preview screenshots are in `output/playwright/`. Contact submission checks intercept the API response: no real email is sent.

## Verification

- Production build and TypeScript passed; ESLint passed for the edited application files.
- Home, services, three project routes, login, and notes returned HTTP 200 in the local production preview.
- Checked 320, 390, 768, 1024, and 1440px widths without horizontal overflow.
- Read a real article from the existing database and checked its mobile layout.
- Verified reduced motion, mobile menu, native modal focus isolation, Escape dismissal, and return of focus to the originating package button.
- Verified package preselection, optional fields, email validation, preserved input on an intercepted 500 response, and success on retry. No live contact submission was made.
- Contact API and project catalog hashes match the pre-redesign workspace backup. Pre-existing changes in those files were preserved.
- Local production preview: `http://127.0.0.1:3002`. Its process uses `AUTH_TRUST_HOST=true` for the loopback preview only; no authentication configuration or environment files were changed. Vercel Analytics' hosted script is unavailable on a local production server, as expected.
