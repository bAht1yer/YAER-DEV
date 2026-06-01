"use client";

import Navbar from "../../../components/ui/Navbar";
import Footer from "../../../components/ui/Footer";
import Hero from "../../../components/projects/wyisdom/Hero";
import Features from "../../../components/projects/wyisdom/Features";

export default function WyisdomPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-[#E6D9BE] overflow-x-hidden selection:bg-[#C75B43]/30">
            <Navbar />

            {/* Background texture/gradient — warm ink with a vermilion bloom */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C75B43]/20 via-[#0A0A0A] to-[#0A0A0A]" />

            <div className="pt-20 relative z-10">
                <Hero />
                <Features />
            </div>
            <Footer />
        </main>
    );
}
