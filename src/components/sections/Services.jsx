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
  const image = getHomepageServiceImage(service.slug);
  const summary =
    service.shortDescription ||
    service.hero?.description ||
    "Expert consultation and coordinated care at Everest Polyclinic.";

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:border-primary-200 hover:shadow-md"
    >
      <div className="flex h-44 items-center justify-center bg-white px-6 pt-6">
        {image ? (
          <BrandIconImage
            src={image}
            alt={service.title}
            size={132}
            rounded="full"
            variant="brand"
            className="shadow-lg ring-4 ring-primary-100/80 transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-primary-100 text-primary-700 ring-4 ring-primary-50">
            <Icon size={48} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-slate-900">
          {service.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
          {summary}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
          View service
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}

export default function Services() {
  return (
    <section
      className="relative overflow-hidden border-y border-slate-100 bg-white py-16 md:py-20"
      id="services-list"
    >
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <Badge variant="primary" className="mb-4">
            Comprehensive care
          </Badge>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Our medical services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
            Specialist-led departments for prevention, diagnosis, treatment, and
            follow-up — all under one roof.
          </p>
        </div>

        <HorizontalSnapCarousel
          prevLabel="Scroll services left"
          nextLabel="Scroll services right"
          arrowsClassName="top-[46%]"
        >
          {SERVICES.map((service) => (
            <CarouselItem key={service.slug}>
              <ServiceCard service={service} />
            </CarouselItem>
          ))}
        </HorizontalSnapCarousel>
      </div>
    </section>
  );
}
