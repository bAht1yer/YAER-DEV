"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import WebHero from "../../../components/projects/web-collection/WebHero";
import ProjectShowcase from "../../../components/projects/web-collection/ProjectShowcase";
import MoreComing from "../../../components/projects/web-collection/MoreComing";
import CapabilitiesCTA from "../../../components/projects/web-collection/CapabilitiesCTA";
import ElectricGrid from "../../../components/ui/ElectricGrid";

export default function WebCollectionPage() {
    return (
        <main className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-primary/30 relative">
            {/* Global Background Effects matching Homepage/CoinBot */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <ElectricGrid />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />
            </div>

            <Navbar />

            <div className="pt-20 relative z-10">
                <WebHero />
                <ProjectShowcase />
                <MoreComing />
                <CapabilitiesCTA />
            </div>

            <Footer />
        </main>
    );
}
