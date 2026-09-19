import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
export default function WebCollectionPage() {
  return (
    <main className="afterimage-site">
      <Navbar />
      <header id="main-content" className="page-intro site-shell" tabIndex={-1}>
        <p className="eyebrow">
          The collection / Design, code, and everything between
        </p>
        <h1>
          Built with intention<span className="acid-text">.</span>
        </h1>
        <p>
          Live products, independent experiments, and practical tools. Every
          project is a different problem, thoughtfully solved.
        </p>
      </header>
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
