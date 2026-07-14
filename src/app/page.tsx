import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

/**
 * Homepage composition.
 *
 * The Hero owns its opaque WebGL background. Everything after it shares one
 * restrained, static body surface so there is no section-to-section lighting
 * jump as fixed aurora blobs move or are re-enabled after the Hero exits.
 *
 * Content flow:
 *   Navbar -> Hero (personal exploration entry) ->
 *   Skills (Capabilities) -> Projects -> Contact -> Footer
 *
 * Service packages now live on /quote-service so the homepage can act as a
 * personal showcase instead of a pricing page.
 */
export default function Home() {
    return (
        <main className="relative min-h-screen bg-[#0A1014] selection:bg-[#34E5FF]/30 selection:text-black">
            <div className="relative">
                <Navbar />
                <Hero />

                <div className="homepage-body-surface">
                    <div className="homepage-body-content">
                        <Skills />
                        <Projects />
                        <Contact />
                        <Footer />
                    </div>
                </div>
            </div>
        </main>
    );
}
