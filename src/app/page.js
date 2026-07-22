import Hero from "@/components/sections/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import CenterOfExcellenceSection from "@/components/sections/CenterOfExcellenceSection";
import LatestDiseases from "@/components/sections/LatestDiseases";
import DoctorsSection from "@/components/sections/DoctorsSection";
import DownloadReportBookVisit from "@/components/sections/DownloadReportBookVisit";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import { getHomepageSpecialists } from "@/lib/data/doctors";
import { getTestimonials } from "@/lib/data/testimonials";

export const metadata = {
  title: "Everest International Polyclinic — World-Class Healthcare in Nepal",
};

export default async function HomePage() {
  const [testimonials, specialists] = await Promise.all([
    getTestimonials(),
    getHomepageSpecialists(),
  ]);

  return (
    <>
      <Hero />
      <WelcomeSection />
      <CenterOfExcellenceSection />
      <LatestDiseases />
      <DoctorsSection specialists={specialists} />
      <DownloadReportBookVisit />
      <Services />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
