"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import Hero from "../../../components/projects/coinbot/Hero";
import ArchitectureDiagram from "../../../components/projects/coinbot/ArchitectureDiagram";
import FeaturesGrid from "../../../components/projects/coinbot/FeaturesGrid";
import TechDeepDive from "../../../components/projects/coinbot/TechDeepDive";
import BackendLogs from "../../../components/projects/coinbot/BackendLogs";
import StrategyShowcase from "../../../components/projects/coinbot/StrategyShowcase";
import ValueProposition from "../../../components/projects/coinbot/ValueProposition";

export default function CoinBotPage() {
    return (
        <main className="min-h-screen bg-transparent text-white overflow-x-hidden selection:bg-primary/30">
            <Navbar />
            <div className="pt-20"> {/* Add padding for fixed navbar */}
                <Hero />
                <ArchitectureDiagram />
                <BackendLogs />
                <FeaturesGrid />
                <TechDeepDive />
                <StrategyShowcase />
                <ValueProposition />
            </div>
            <Footer />
        </main>
    );
}
