import Image from "next/image";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { Suspense } from "react";

export const metadata = {
  title: "Our Services - Everest International Polyclinic",
  description: "Comprehensive healthcare services including cardiology, orthopedics, pediatrics, and more at Everest International Polyclinic.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Full bleed image only */}
      <section className="relative h-[30vh] min-h-[300px] w-full">
        <Image
          src="/images/services/hero.png"
          alt="Medical Services"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Services Section */}
      <Suspense fallback={<div>Loading services...</div>}>
        <ServicesGrid />
      </Suspense>
    </main>
  );
}
