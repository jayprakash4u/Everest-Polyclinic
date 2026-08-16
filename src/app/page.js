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
import { getHeroSlides } from "@/lib/data/heroSlides";
import { getHomeSettings } from "@/lib/data/homeSettings";
import { HOME_SETTING_DEFAULTS } from "@/constants/homeSectionDefaults";

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
    homeSettings,
  ] = await Promise.all([
    getHomeTestimonials(),
    getHomepageHealthPackages(),
    getAllServices(),
    getCentersOfExcellence(),
    getWhyChooseUsItems(),
    getFaqs(),
    getHeroSlides(),
    getHomeSettings(HOME_SETTING_DEFAULTS),
  ]);

  return (
    <>
      <Hero slides={heroSlides} />
      <CenterOfExcellenceSection items={centers} />
      <DiagnosticCare />
      <LatestDiseases packages={healthPackages} />
      <DoctorsSection image={homeSettings.careTeamImage} />
      <ContactBooking />
      <Services services={services} />
      <WhyChooseUs items={whyChooseUs} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={faqs} />
    </>
  );
}
