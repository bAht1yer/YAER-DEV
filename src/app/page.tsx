import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
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
 *   z-0  Aurora - drifting CSS blobs (lime + steel)
 *   z-[1] CodeCubes - 3D scene, transparent canvas, industrial palette
 *   z-[2] GridOverlay - structural grid + vignette
 *
 * Content flow:
 *   Navbar -> Hero (AI/SaaS architect spine) ->
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

                {/* Section divider - separates AI/SaaS hero from contractor offer funnel */}
                <SectionDivider label="Contractor Website Packages" sublabel="Three ways to work together" />

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

function SectionDivider({ label, sublabel }: { label: string; sublabel: string }) {
    return (
        <div className="relative py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-[#E6FF3A]/40" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#E6FF3A]">
                            {label}
                        </span>
                        <span className="h-px w-12 bg-[#E6FF3A]/40" />
                    </div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gray-500">
                        {sublabel}
                    </p>
                </div>
            </div>
        </div>
    );
}
