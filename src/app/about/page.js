import VisionMissionGoals from "@/components/sections/VisionMissionGoals";
import AboutUsSection from "@/components/sections/AboutUsSection";
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
      <OurStory />
      <div className="space-y-0">
        <VisionMissionGoals />
        <OurAchievements />
      </div>
    </div>
  );
}
