"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import SpiritHero from "../../../components/projects/spirit-vein/SpiritHero";
import LoreAbout from "../../../components/projects/spirit-vein/LoreAbout";
import TechSystems from "../../../components/projects/spirit-vein/TechSystems";
import GameFeatures from "../../../components/projects/spirit-vein/GameFeatures";
import Roadmap from "../../../components/projects/spirit-vein/Roadmap";
import MediaGallery from "../../../components/projects/spirit-vein/MediaGallery";
import ElectricGrid from "../../../components/ui/ElectricGrid";

export default function SpiritVeinPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-purple-500/30">
            <ElectricGrid />
            <Navbar />

            <div className="pt-20">
                <SpiritHero />
                <LoreAbout />
                <TechSystems />
                <GameFeatures />
                <MediaGallery />
                <Roadmap />
            </div>

            <Footer />
        </main>
    );
}
