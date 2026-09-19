# YAER / Digital Afterimage

Implemented from the approved second visual direction. The identity pairs a custom angular YAER wordmark and folded Y monogram with a sculptural chrome signature. Background #101113, type #F1F0E9, accent #DFFF00, neutral panels #18191B. Typography uses the existing Inter and JetBrains Mono families.

## Implementation

- Shared theme and responsive layouts: `src/app/afterimage.css`.
- Vector identity: `src/components/ui/Brand.tsx` and `public/brand/afterimage-*.svg`.
- Homepage: oversized identity, pointer-responsive sculpture, real project gallery, about/process, contact.
- Shared identity applied to services, notes, article reader, project pages, login, and dashboard navigation.
- Existing project catalog, prices, authentication, and API behavior retained.
- Native contact dialog provides modal focus isolation, Escape dismissal, and focus restoration. Form instance IDs remain unique when inline and dialog forms coexist.
- Reduced-motion preferences disable sculpture motion and smooth scrolling; shared Framer Motion configuration respects the same preference.
- The sculpture is an optimized transparent WebP (~136 KB). Its motion is a lightweight image transform, not a live 3D mesh.

## Artwork provenance

The sculpture was generated with the built-in ImageGen tool using the approved concept as its reference. The wordmark, monogram, and favicon are editable SVGs. Social and Apple icons are built from those assets with `node scripts/build-afterimage-assets.cjs`.

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
