"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import Hero from "../../../components/projects/digitao/Hero";
import BilingualRecitation from "../../../components/projects/digitao/BilingualRecitation";
import MergedFeatures from "../../../components/projects/digitao/MergedFeatures";

export default function DigiTaoPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-[#D4C4A8] overflow-x-hidden selection:bg-[#4A7856]/30">
            <Navbar />

            {/* Background Texture/Gradient */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4A7856]/20 via-[#0A0A0A] to-[#0A0A0A]" />

            <div className="pt-20 relative z-10"> {/* Add padding for fixed navbar */}
                <Hero />
                <BilingualRecitation />
                <MergedFeatures />
            </div>
            <Footer />
        </main>
    );
}
