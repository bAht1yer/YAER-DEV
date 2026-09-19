import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import ProjectIntro from "@/components/projects/ProjectIntro";
import BilingualRecitation from "@/components/projects/digitao/BilingualRecitation";
import MergedFeatures from "@/components/projects/digitao/MergedFeatures";
export default function DigiTaoPage() {
  return (
    <main className="afterimage-site project-page">
      <Navbar />
      <ProjectIntro
        id="digitao"
        liveUrl="https://tao-blue.vercel.app/"
        note="Web app available / iOS & Android coming soon"
      />
      <BilingualRecitation />
      <MergedFeatures />
      <Footer />
    </main>
  );
}
