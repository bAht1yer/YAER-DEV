import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import PackagesDivider from "@/components/sections/PackagesDivider";
import OfferQuickFix from "@/components/sections/offers/OfferQuickFix";
import OfferOnePage from "@/components/sections/offers/OfferOnePage";
import OfferLeadSystem from "@/components/sections/offers/OfferLeadSystem";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import Scene from "@/components/canvas/Scene";
import CodeCubes from "@/components/canvas/CodeCubes";
import AuroraGlow from "@/components/canvas/AuroraGlow";
import GridOverlay from "@/components/canvas/GridOverlay";

/**
 * Homepage composition.
 *
 * Background stack (back -> front):
 *   z-0   Aurora - drifting CSS blobs (lime + steel), breathing
 *   z-[1] CodeCubes - 3D scene, transparent canvas, industrial palette
 *   z-[2] GridOverlay - structural grid + vignette
 *
 * Content flow:
 *   Navbar -> Hero (AI/SaaS architect spine) ->
 *   PackagesDivider (animated chapter break) ->
 *   Three contractor offer sections (Quick Fix -> One-Page -> Lead System) ->
 *   Skills -> Projects -> Contact -> Footer
 */
export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#0A0B0D] selection:bg-[#E6FF3A]/30 selection:text-black">
            {/* Layer 1 - aurora */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AuroraGlow intensity="full" />
            </div>

            {/* Layer 2 - 3D cubes */}
            <div className="fixed inset-0 z-[1] pointer-events-none">
                <Scene className="w-full h-full">
                    <CodeCubes />
                </Scene>
            </div>

            {/* Layer 3 - grid + vignette */}
            <div className="fixed inset-0 z-[2] pointer-events-none">
                <GridOverlay />
            </div>

            {/* Layer 4 - content */}
            <div className="relative z-10">
                <Navbar hideOnTop={true} />
                <Hero />

                <PackagesDivider />

                <OfferQuickFix />
                <OfferOnePage />
                <OfferLeadSystem />

                <Skills />
                <Projects />
                <Contact />
                <Footer />
            </div>
        </main>
    );
}
