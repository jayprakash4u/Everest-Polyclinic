"use client";

import { useEffect, useRef, useState } from "react";
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
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-slate-100 sm:h-48">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 768px) 300px, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/70 via-primary-900/20 to-transparent px-4 pb-3 pt-10">
          <p className="text-[11px] font-bold uppercase tracking-wider text-secondary-300">
            {doctor.specialist}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold leading-snug text-slate-900">
          {doctor.name}
        </h3>

        <div className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-600">
          <GraduationCap
            size={15}
            className="mt-0.5 shrink-0 text-primary-500"
            strokeWidth={1.75}
          />
          <span>{doctor.degree}</span>
        </div>

        {doctor.experience ? (
          <p className="mt-2 text-xs font-semibold text-primary-600">
            {doctor.experience} experience
          </p>
        ) : null}

        <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
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
