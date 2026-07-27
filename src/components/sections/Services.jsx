"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants/services/catalog";
import { getHomepageServiceImage } from "@/constants/services/homepageServiceImages";
import { getServiceIcon } from "@/lib/service-icons";
import Badge from "@/components/ui/Badge";
import BrandIconImage from "@/components/ui/BrandIconImage";
import HorizontalSnapCarousel, {
  CarouselItem,
} from "@/components/ui/HorizontalSnapCarousel";

function ServiceCard({ service }) {
  const Icon = getServiceIcon(service.icon);
  const image =
    service.homepageImage || getHomepageServiceImage(service.slug);
  const summary =
    service.shortDescription ||
    service.hero?.description ||
    "Expert consultation and coordinated care at Everest Polyclinic.";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_16px_40px_rgba(30,95,168,0.12)]"
    >
      <div className="h-1 w-full bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500" />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary-50/80 transition-transform duration-500 group-hover:scale-110" />

        <div className="relative mb-4">
          {image ? (
            <BrandIconImage
              src={image}
              alt={service.title}
              size={72}
              rounded="2xl"
              variant="brand"
              className="shadow-md ring-4 ring-primary-50 transition-transform duration-300 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-md ring-4 ring-primary-50">
              <Icon size={32} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <h3 className="relative font-heading text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary-700 sm:text-lg">
          {service.title}
        </h3>

        <p className="relative mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
          {summary}
        </p>

        <div className="relative mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-sm font-semibold text-primary-600">
            View service
          </span>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-md">
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Services({ services = SERVICES }) {
  const items = services?.length ? services : SERVICES;

  return (
    <section
      className="relative overflow-hidden border-y border-slate-100 bg-gradient-to-b from-slate-50/80 via-white to-white py-14 sm:py-16 md:py-20"
      id="services-list"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(30,95,168,0.06),transparent_65%)]" />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10 md:mb-12">
          <Badge variant="primary" className="mb-3 sm:mb-4">
            Comprehensive care
          </Badge>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
            Our medical services
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 sm:mt-3 sm:text-base md:text-lg">
            Specialist-led departments for prevention, diagnosis, treatment, and
            follow-up — all under one roof.
          </p>
        </div>

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
      </div>
    </section>
  );
}
