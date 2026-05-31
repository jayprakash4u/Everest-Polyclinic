import VisionMissionGoals from "@/components/sections/VisionMissionGoals";
import AboutUsSection from "@/components/sections/AboutUsSection";
import OurAchievements from "@/components/sections/OurAchievements";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 
         Removed the 30vh banner entirely. 
         The AboutUsSection now handles the 'Intro' with a high-end typography layout.
      */}
      <AboutUsSection />
      
      <div className="space-y-0">
        <VisionMissionGoals />
        <OurAchievements />
      </div>
    </div>
  );
}