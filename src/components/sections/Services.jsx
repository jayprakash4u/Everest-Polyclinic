import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants/services/catalog";
import { HOMEPAGE_SERVICE_SLUGS } from "@/constants/services/homepageServiceImages";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "./ServiceCard";

export default function Services({ services = SERVICES }) {
  const catalog = services?.length ? services : SERVICES;

  /*
    Fixed eight, in a fixed order, resolved by slug — see HOMEPAGE_SERVICE_SLUGS.
    `filter(Boolean)` covers a slug that has been retired upstream: the grid
    loses a tile rather than rendering a broken card.
  */
  const items = HOMEPAGE_SERVICE_SLUGS.map((slug) =>
    catalog.find((service) => service.slug === slug),
  ).filter(Boolean);

  return (
    <Section tone="muted" id="services-list">
      <SectionHeader
        align="center"
        accent="secondary"
        eyebrow="Our medical services"
        titleClassName="text-primary-900"
        title={
          <>
            Comprehensive Care,{" "}
            <span className="text-secondary-600">All in One Place</span>
          </>
        }
      />

      {/*
        A static grid, not the carousel this section used to be. Eight tiles fit
        4×2 on a desktop with room to spare, and a carousel hides half of them
        behind a scroll gesture for no gain — the whole point of the section is
        that the range is visible at a glance.
      */}
      <Reveal
        as="div"
        stagger
        className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
      >
        {items.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </Reveal>

      {/* Rules either side keep the button from floating loose under the grid
          and close the section deliberately. */}
      <div className="mt-10 flex items-center justify-center gap-4 sm:mt-12 sm:gap-6">
        <span aria-hidden="true" className="hidden h-px w-12 bg-slate-300 sm:block lg:w-20" />

        <Link
          href="/services"
          className="group inline-flex items-center gap-3 rounded-full bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:px-7 sm:py-3.5"
        >
          View All Medical Services
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary-500 text-white transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
        </Link>

        <span aria-hidden="true" className="hidden h-px w-12 bg-slate-300 sm:block lg:w-20" />
      </div>
    </Section>
  );
}
