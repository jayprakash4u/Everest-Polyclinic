import Hero from "@/components/sections/Hero";
import CenterOfExcellenceSection from "@/components/sections/CenterOfExcellenceSection";
import LatestDiseases from "@/components/sections/LatestDiseases";
import DiagnosticCare from "@/components/sections/DiagnosticCare";
import DoctorsSection from "@/components/sections/DoctorsSection";
import ContactBooking from "@/components/sections/ContactBooking";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import FaqSection from "@/components/sections/FaqSection";
/* Reads via ODBC rather than the Prisma copy in lib/data/healthPackages.js —
   that one always falls through to static data while Prisma's MSSQL layer is
   broken, so admin edits would never reach the page. */
import { getHomepageHealthPackages } from "@/lib/data/homeHealthPackages";
import { getHomeTestimonials } from "@/lib/data/homeTestimonials";
import { getAllServices } from "@/lib/data/services";
import { getCentersOfExcellence } from "@/lib/data/centersOfExcellence";
import { getWhyChooseUsItems } from "@/lib/data/whyChooseUs";
import { getFaqs } from "@/lib/data/faqs";
import {
  getHomeCareTeamImage,
  getHomeHeroSlides,
} from "@/lib/data/pageSections";

export const metadata = {
  title: "Everest International Polyclinic — World-Class Healthcare in Nepal",
};

export default async function HomePage() {
  const [
    testimonials,
    healthPackages,
    services,
    centers,
    whyChooseUs,
    faqs,
    heroSlides,
    careTeamImage,
  ] = await Promise.all([
    getHomeTestimonials(),
    getHomepageHealthPackages(),
    getAllServices(),
    getCentersOfExcellence(),
    getWhyChooseUsItems(),
    getFaqs(),
    getHomeHeroSlides(),
    getHomeCareTeamImage(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <CenterOfExcellenceSection items={centers} />
      <DiagnosticCare />
      <LatestDiseases packages={healthPackages} />
      <DoctorsSection
        specialists={specialists}
        sideImage={careTeamImage.image}
        sideImageAlt={careTeamImage.alt}
      />
      <ContactBooking />
      <Services services={services} />
      <WhyChooseUs items={whyChooseUs} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={faqs} />
    </>
  );
}
