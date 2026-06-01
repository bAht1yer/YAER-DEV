"use client";

/**
 * GridOverlay — combined structural grid + vignette.
 *
 * Sits on top of the 3D scene to give the page a "technical drawing" anchor and
 * pull the eye toward the center where content lives.
 *
 * Pure CSS, no JS. Pointer-events disabled so clicks pass through to content.
 */
interface GridOverlayProps {
    showGrid?: boolean;
    showVignette?: boolean;
    className?: string;
}

export default function GridOverlay({
    showGrid = true,
    showVignette = true,
    className = "",
}: GridOverlayProps) {
    return (
        <div
            className={`pointer-events-none absolute inset-0 ${className}`}
            aria-hidden="true"
        >
            {showGrid && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, rgba(52,229,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(52,229,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        WebkitMaskImage:
                            "radial-gradient(circle at 50% 50%, black 35%, transparent 85%)",
                        maskImage:
                            "radial-gradient(circle at 50% 50%, black 35%, transparent 85%)",
                    }}
                />
            )}
            {showVignette && (
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.55) 100%)",
                    }}
                />
            )}
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
        </div>
    );
}
