import Hero from "@/components/sections/Hero";
import WelcomeSection from "@/components/sections/WelcomeSection";
import CenterOfExcellenceSection from "@/components/sections/CenterOfExcellenceSection";
import LatestDiseases from "@/components/sections/LatestDiseases";
import DoctorsSection from "@/components/sections/DoctorsSection";
import DownloadReportBookVisit from "@/components/sections/DownloadReportBookVisit";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import { getHomepageHealthPackages } from "@/lib/data/healthPackages";
import { getHomepageSpecialists } from "@/lib/data/doctors";
import { getTestimonials } from "@/lib/data/testimonials";
import { getAllServices } from "@/lib/data/services";
import { getCentersOfExcellence } from "@/lib/data/centersOfExcellence";
import { getWhyChooseUsItems } from "@/lib/data/whyChooseUs";

export const metadata = {
  title: "Everest International Polyclinic — World-Class Healthcare in Nepal",
};

export default async function HomePage() {
  const [
    testimonials,
    specialists,
    healthPackages,
    services,
    centers,
    whyChooseUs,
  ] = await Promise.all([
    getTestimonials(),
    getHomepageSpecialists(),
    getHomepageHealthPackages(),
    getAllServices(),
    getCentersOfExcellence(),
    getWhyChooseUsItems(),
  ]);

  return (
    <>
      <Hero />
      <WelcomeSection />
      <CenterOfExcellenceSection items={centers} />
      <LatestDiseases packages={healthPackages} />
      <DoctorsSection specialists={specialists} />
      <DownloadReportBookVisit />
      <Services services={services} />
      <WhyChooseUs items={whyChooseUs} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}
