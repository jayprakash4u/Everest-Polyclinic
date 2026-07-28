"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Clock,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import HorizontalSnapCarousel, {
  CarouselItem,
} from "@/components/ui/HorizontalSnapCarousel";

function SpecialistCard({ doctor }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md sm:rounded-2xl">
      <div className="relative h-28 overflow-hidden bg-slate-100 sm:h-48">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 639px) 45vw, 320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/80 via-primary-900/25 to-transparent px-2.5 pb-2 pt-6 sm:px-4 sm:pb-3 sm:pt-10">
          <p className="truncate text-[9px] font-bold uppercase tracking-wider text-secondary-300 sm:text-[11px]">
            {doctor.specialist}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <h3 className="font-heading text-[13px] font-bold leading-snug text-slate-900 sm:text-lg">
          <span className="line-clamp-2">{doctor.name}</span>
        </h3>

        <div className="mt-1 flex items-start gap-1.5 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:gap-2 sm:text-sm sm:leading-relaxed">
          <GraduationCap
            className="mt-0.5 h-3 w-3 shrink-0 text-primary-500 sm:h-[15px] sm:w-[15px]"
            strokeWidth={1.75}
          />
          <span className="line-clamp-2">{doctor.degree}</span>
        </div>

        {doctor.experience ? (
          <p className="mt-1.5 text-[10px] font-semibold text-primary-600 sm:mt-2 sm:text-xs">
            {doctor.experience}
            <span className="hidden sm:inline"> experience</span>
            <span className="sm:hidden"> exp.</span>
          </p>
        ) : null}

        <div className="mt-auto hidden space-y-2.5 border-t border-slate-100 pt-4 sm:mt-4 sm:block">
          {doctor.timing ? (
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-50 text-secondary-600">
                <Clock size={14} strokeWidth={1.75} />
              </span>
              <span className="leading-snug">{doctor.timing}</span>
            </div>
          ) : null}
          {doctor.phone ? (
            <div className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                <Phone size={14} strokeWidth={1.75} />
              </span>
              <span className="leading-snug">{doctor.phone}</span>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function DoctorsSection({ specialists = [] }) {
  const doctors = specialists.length > 0 ? specialists : [];

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-slate-50/60 py-16 md:py-20">
      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="primary" className="mb-4">
              Expert clinicians
            </Badge>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Our Specialists
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600 md:text-lg">
              Board-certified doctors across key specialties — available for
              consultation with clear schedules and direct contact details.
            </p>
          </div>

          <Link
            href="/doctors"
            className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-semibold text-primary-600 transition hover:gap-2.5 hover:text-primary-700 md:self-auto"
          >
            View all doctors
            <ArrowRight size={16} />
          </Link>
        </div>

        <HorizontalSnapCarousel
          prevLabel="Previous specialists"
          nextLabel="Next specialists"
          arrowsClassName="top-[42%]"
        >
          {doctors.map((doc) => (
            <CarouselItem key={doc.id ?? doc.name}>
              <SpecialistCard doctor={doc} />
            </CarouselItem>
          ))}
        </HorizontalSnapCarousel>
      </div>
    </section>
  );
}
