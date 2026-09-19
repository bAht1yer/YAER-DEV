import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import PackageCards from "@/components/sections/offers/PackageCards";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Services & Pricing | YAER",
  description:
    "A one-page website, a CMS website, or custom web and cloud systems. A clear scope and a thoughtful build.",
};

export default function QuoteServicePage() {
  return (
    <main className="afterimage-site">
      <Navbar />
      <section
        id="main-content"
        className="page-intro site-shell"
        tabIndex={-1}
      >
        <p className="eyebrow">Services / A good place to start</p>
        <h1>
          Small beginnings.
          <br />
          <span className="acid-text">Real possibilities.</span>
        </h1>
        <p>
          A sharp website. A platform you can grow. An idea that needs someone
          to build it. Let&apos;s find the right starting point.
        </p>
        <div className="hero-actions">
          <a href="#packages" className="button-acid">
            Find your fit <ArrowDown size={18} />
          </a>
          <a href="#contact" className="text-link">
            Talk it through <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <PackageCards />
      <Contact />
      <Footer />
    </main>
  );
}
