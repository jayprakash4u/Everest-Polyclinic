import Hero from "@/components/sections/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import CenterOfExcellenceSection from "@/components/sections/CenterOfExcellenceSection";
import LatestDiseases from "@/components/sections/LatestDiseases";
import DoctorsSection from "@/components/sections/DoctorsSection";
import DownloadReportBookVisit from "@/components/sections/DownloadReportBookVisit";
import Services from "@/components/sections/Departments";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";

export const metadata = {
  title: "Everest International Polyclinic — World-Class Healthcare in Nepal",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WelcomeSection />
      <CenterOfExcellenceSection />
      <LatestDiseases />
      <DoctorsSection />
      <DownloadReportBookVisit />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
