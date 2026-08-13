"use client";

import { createElement } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants/services/catalog";
import { getHomepageServiceImage } from "@/constants/services/homepageServiceImages";
import { getServiceIcon } from "@/lib/service-icons";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import BrandIconImage from "@/components/ui/BrandIconImage";
import HorizontalSnapCarousel, {
  CarouselItem,
} from "@/components/ui/HorizontalSnapCarousel";

const ICON_FRAME =
  "shadow-e1 ring-1 ring-slate-200 transition-colors duration-300 group-hover:ring-primary-200";

/**
 * `getServiceIcon` returns a component from a fixed lookup table, so the
 * identity is stable across renders — but binding it to a capitalised local and
 * rendering `<Icon />` reads as a component created during render. createElement
 * expresses the same thing without the ambiguity.
 */
function ServiceIcon({ iconKey, className }) {
  return createElement(getServiceIcon(iconKey), { className, strokeWidth: 1.5 });
}

function ServiceCard({ service }) {
  const image = service.homepageImage || getHomepageServiceImage(service.slug);
  const summary =
    service.shortDescription ||
    service.hero?.description ||
    "Expert consultation and coordinated care at Everest Polyclinic.";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full w-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-e1 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-e2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 sm:p-5"
    >
      {image ? (
        <>
          <BrandIconImage
            src={image}
            alt=""
            size={44}
            rounded="xl"
            variant="white"
            className={`${ICON_FRAME} sm:hidden`}
          />
          <BrandIconImage
            src={image}
            alt=""
            size={56}
            rounded="xl"
            variant="white"
            className={`hidden ${ICON_FRAME} sm:flex`}
          />
        </>
      ) : (
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary-600 sm:h-14 sm:w-14 ${ICON_FRAME}`}
        >
          <ServiceIcon
            iconKey={service.icon}
            className="h-5 w-5 sm:h-6 sm:w-6"
          />
        </span>
      )}

      <h3 className="mt-4 text-sm font-semibold leading-snug tracking-[-0.01em] text-slate-900 transition-colors duration-300 group-hover:text-primary-700 sm:mt-5 sm:text-base">
        <span className="line-clamp-2">{service.title}</span>
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:line-clamp-3 sm:text-sm">
        {summary}
      </p>

      <span className="mt-auto flex items-center gap-1.5 pt-4 text-xs font-semibold text-primary-600 sm:pt-5 sm:text-sm">
        View
        <span className="hidden sm:inline">service</span>
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </span>
    </Link>
  );
}

export default function Services({ services = SERVICES }) {
  const items = services?.length ? services : SERVICES;

  return (
    <Section tone="muted" id="services-list">
      <SectionHeader
        eyebrow="Comprehensive care"
        title="Our medical services"
        subtitle="Specialist-led departments for prevention, diagnosis, treatment and follow-up — all under one roof."
        action={
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        }
      />

      <HorizontalSnapCarousel
        prevLabel="Scroll services left"
        nextLabel="Scroll services right"
        arrowsClassName="top-[42%]"
      >
        {items.map((service) => (
          <CarouselItem key={service.slug}>
            <ServiceCard service={service} />
          </CarouselItem>
        ))}
      </HorizontalSnapCarousel>
    </Section>
  );
}
