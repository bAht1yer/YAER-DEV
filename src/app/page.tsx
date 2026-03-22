import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import Scene from "@/components/canvas/Scene";
import CodeCubes from "@/components/canvas/CodeCubes";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-primary/30">
      {/* Global 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene className="w-full h-full">
          <CodeCubes />
        </Scene>
      </div>

      <div className="relative z-10">
        <Navbar hideOnTop={true} />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
