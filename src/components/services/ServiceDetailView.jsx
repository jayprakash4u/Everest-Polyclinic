import { normalizeServicePage } from "@/lib/normalize-service-page";
import ServiceHero from "./ServiceHero";
import AboutConditions from "./AboutConditions";
import ServiceOfferings from "./ServiceOfferings";
import WhyChooseUs from "./WhyChooseUs";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";

export default function ServiceDetailView({ service }) {
  const page = normalizeServicePage(service);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <ServiceHero page={page} />
      <AboutConditions page={page} />
      <ServiceOfferings page={page} />
      <WhyChooseUs page={page} />
      <FAQSection page={page} />
      <CTASection page={page} />
    </main>
  );
}
