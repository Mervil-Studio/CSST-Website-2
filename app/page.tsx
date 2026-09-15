import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThemeSelectorSection from "@/components/ThemeSelectorSection";
import StatsBar from "@/components/StatsBar";
import DiverseThinkersSection from "@/components/DiverseThinkersSection";
import TheSpaceSection from "@/components/TheSpaceSection";
import ProgramTracks from "@/components/ProgramTracks";
import EcosystemSection from "@/components/EcosystemSection";
import CelebrationsSection from "@/components/CelebrationsSection";
import EventsSection from "@/components/EventsSection";
import TeamSection from "@/components/TeamSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import ImageBreak from "@/components/ImageBreak";

import leadershipData from "@/content/leadership.json";
import facultyData from "@/content/faculty.json";
import boardData from "@/content/board.json";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <ThemeSelectorSection />
      <HeroSection />
      <StatsBar />
      <EventsSection />

      {/* Life at CSST — Instagram feed (replaces static StudentLifeSection) */}
      <CelebrationsSection />

      {/* Break 1 — the hub open space */}
      <ImageBreak
        src="/csst/break-hub-space.jpg"
        alt="CSST students working in the open hub space"
        height={380}
      />

      <DiverseThinkersSection />

      {/* Break 2 — students in a project classroom */}
      <ImageBreak
        src="/csst/g08-full-class.jpg"
        alt="CSST students gathered around collaborative tables in a project classroom"
        height={380}
      />

      <TheSpaceSection />

      {/* Break — classroom in session, heading into curriculum */}
      <ImageBreak
        src="/csst/g04-classroom-wide.jpg"
        alt="CSST teacher working with students on laptops in a project classroom"
        height={380}
      />

      <ProgramTracks />

      {/* Break 3 — CSST brand screen */}
      <ImageBreak
        src="/csst/break-logo-screen.jpg"
        alt="Colorado Springs School of Technology branding on classroom screen"
        height={360}
      />

      <EcosystemSection />

      {/* Break 4 — campus hallway */}
      <ImageBreak
        src="/csst/break-hallway.jpg"
        alt="CSST campus hallway with open learning spaces"
        height={320}
      />

      <TeamSection
        leadership={leadershipData.members}
        faculty={facultyData.members}
        board={boardData.members}
      />
      <FAQSection />
      <Footer />
    </main>
  );
}
