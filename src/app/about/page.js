import VisionMissionIntro from "@/components/sections/VisionMissionIntro";
import OurValues from "@/components/sections/OurValues";
import AboutUsSection from "@/components/sections/AboutUsSection";
import AboutOverview from "@/components/sections/AboutOverview";
import OurStory from "@/components/sections/OurStory";
import OurAchievements from "@/components/sections/OurAchievements";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Everest International Polyclinic — our vision, mission, and commitment to patient care.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutUsSection />
      <VisionMissionIntro />
      <OurValues />
      <AboutOverview />
      <OurStory />
      <OurAchievements />
    </div>
  );
}
