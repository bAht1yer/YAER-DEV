"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * SmoothScroll -- Lenis-powered easing wrapper + scroll-reset on route change.
 *
 * Why the scroll reset: Lenis keeps its own scroll position object alongside
 * the native scroll, and Next.js App Router preserves scroll on client-side
 * navigations. The combination causes some routes (e.g. /projects/digitao) to
 * mount at the previous page's scroll offset -- looks like the page opened
 * scrolled to the bottom. Manually resetting both Lenis and window scroll on
 * pathname change fixes it without breaking back/forward restoration on the
 * homepage hash anchors.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Reset scroll on route change. Skip when the URL has a hash so anchor
    // navigations (#projects, #contact) still work.
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.location.hash) return;

        const lenis = lenisRef.current;
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname]);

    return <>{children}</>;
}
