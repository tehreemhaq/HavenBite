import HeroSection from "../components/About/AboutHeroSection";
import OurRoots from "../components/About/OurRoots";
import CorePhilosophy from "../components/About/CorePhilosophy";
import GroundedInFlavor from "../components/About/GroundedInFlavor";

export default function AboutPage() {
  return (
    <main className="w-full">
      <HeroSection />
      <OurRoots />
      <CorePhilosophy />
    </main>
  );
}