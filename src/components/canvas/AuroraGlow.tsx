"use client";

/**
 * AuroraGlow -- atmospheric breathing background.
 *
 * Two production-grade techniques used here:
 *
 *  1. 5-stop eased gradient falloff per blob.
 *     A naive `radial-gradient(color-alpha, color-0)` produces visible
 *     concentric banding when heavy blur is applied because the GPU
 *     quantizes the smooth alpha into 8-bit steps. Adding intermediate
 *     stops with custom alpha values approximates a Gaussian falloff
 *     in piecewise-linear pieces and pushes banding below perception.
 *
 *  2. SVG fractalNoise dither overlay at ~4% opacity.
 *     Even with the eased gradient, on some monitors banding is still
 *     visible in the dim falloff region. A tiled noise texture mixed
 *     into the aurora layer breaks the bands by adding sub-pixel
 *     random variation -- same trick Apple/Vercel/Linear use.
 *
 * Motion: 4 blobs on co-prime long periods (50s/78s/64s/95s) with
 * multi-stage keyframes that mix position + scale + opacity. See
 * keyframes in globals.css.
 */
interface AuroraGlowProps {
    /** Visual intensity: "full" for hero/featured sections, "soft" for body, "off" disables. */
    intensity?: "full" | "soft" | "off";
    className?: string;
}

/**
 * Build a smooth radial gradient with 5 eased stops to kill banding.
 * Stops approximate a Gaussian-ish falloff: faster near the core, longer tail.
 */
function smoothRadial(rgb: string, peakAlpha: number) {
    return `radial-gradient(circle,
        rgba(${rgb}, ${peakAlpha.toFixed(3)}) 0%,
        rgba(${rgb}, ${(peakAlpha * 0.78).toFixed(3)}) 14%,
        rgba(${rgb}, ${(peakAlpha * 0.48).toFixed(3)}) 32%,
        rgba(${rgb}, ${(peakAlpha * 0.22).toFixed(3)}) 52%,
        rgba(${rgb}, ${(peakAlpha * 0.07).toFixed(3)}) 72%,
        rgba(${rgb}, 0) 88%
    )`;
}

// Tiny inline SVG noise tile, encoded as data URI. ~150 bytes; tiles at 240×240.
const NOISE_DATA_URI =
    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.85'/></svg>\")";

export default function AuroraGlow({ intensity = "full", className = "" }: AuroraGlowProps) {
    if (intensity === "off") return null;

    const isFull = intensity === "full";
    const k = isFull ? 1 : 0.55;

    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            {/* Bloom 1 - large cyan, upper-left, wide arc */}
            <div
                className="aurora-blob absolute rounded-full"
                style={{
                    width: 880,
                    height: 880,
                    top: -240,
                    left: -160,
                    background: smoothRadial("52,229,255", 0.26 * k),
                    filter: "blur(110px)",
                    animation: "aurora-drift-1 50s ease-in-out infinite",
                    willChange: "transform, opacity",
                }}
            />
            {/* Bloom 2 - violet, mid-right, slow heavy drift */}
            <div
                className="aurora-blob absolute rounded-full"
                style={{
                    width: 780,
                    height: 780,
                    top: "28%",
                    right: -200,
                    background: smoothRadial("155,123,255", 0.18 * k),
                    filter: "blur(110px)",
                    animation: "aurora-drift-2 78s ease-in-out infinite",
                    willChange: "transform, opacity",
                }}
            />
            {/* Bloom 3 - cyan, lower-mid */}
            <div
                className="aurora-blob absolute rounded-full"
                style={{
                    width: 720,
                    height: 720,
                    bottom: -220,
                    left: "28%",
                    background: smoothRadial("52,229,255", 0.15 * k),
                    filter: "blur(100px)",
                    animation: "aurora-drift-3 64s ease-in-out infinite",
                    willChange: "transform, opacity",
                }}
            />
            {/* Bloom 4 - small bright violet accent, fades in and out */}
            <div
                className="aurora-blob absolute rounded-full"
                style={{
                    width: 460,
                    height: 460,
                    top: "42%",
                    left: "40%",
                    background: smoothRadial("155,123,255", 0.30 * k),
                    filter: "blur(70px)",
                    animation: "aurora-drift-4 95s ease-in-out infinite",
                    willChange: "transform, opacity",
                }}
            />

            {/*
              Dither layer -- a tiled SVG turbulence noise texture sitting on top
              of the blobs at 4% opacity. Breaks remaining concentric banding by
              injecting sub-pixel random variation. mix-blend-overlay keeps the
              dark base intact and only modulates the bright aurora regions.
            */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: NOISE_DATA_URI,
                    backgroundSize: "240px 240px",
                    opacity: 0.05,
                    mixBlendMode: "overlay",
                }}
            />
        </div>
    );
}
