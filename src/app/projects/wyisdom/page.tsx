import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProjectIntro from "@/components/projects/ProjectIntro";
import Features from "@/components/projects/wyisdom/Features";
export default function WyisdomPage() {
  return (
    <main className="afterimage-site project-page">
      <Navbar />
      <ProjectIntro id="wyisdom" liveUrl="https://calclife.vercel.app/" />
      <Features />
      <Footer />
    </main>
  );
}
