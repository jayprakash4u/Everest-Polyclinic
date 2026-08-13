"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Clock,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import HorizontalSnapCarousel, {
  CarouselItem,
} from "@/components/ui/HorizontalSnapCarousel";

function SpecialistCard({ doctor, onBook }) {
  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-e1 transition duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-e2">
      {/* 128px was too short for a portrait — `object-top` saved the face but
          the crop landed mid-chest and the card read as a thumbnail. */}
      <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-52">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          sizes="(max-width: 639px) 45vw, 320px"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-900/80 via-primary-900/25 to-transparent px-3 pb-2 pt-6 sm:px-4 sm:pb-3 sm:pt-10">
          <p className="truncate text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90">
            {doctor.specialist}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h3 className="text-sm font-semibold leading-snug tracking-[-0.01em] text-slate-900 sm:text-lg">
          <span className="line-clamp-2">{doctor.name}</span>
        </h3>

        <div className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
          <GraduationCap
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary-500 sm:h-4 sm:w-4"
            strokeWidth={1.75}
          />
          <span className="line-clamp-2">{doctor.degree}</span>
        </div>

        {/* Years of practice is the strongest signal on the card, so it gets a
            pill rather than a fourth line of grey text competing with the rest. */}
        {doctor.experience ? (
          <p className="mt-2.5 w-fit rounded-full bg-primary-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] text-primary-700 ring-1 ring-inset ring-primary-100 sm:text-[11px]">
            {doctor.experience}
            <span className="hidden sm:inline"> experience</span>
            <span className="sm:hidden"> exp.</span>
          </p>
        ) : null}

        <div className="hidden space-y-2.5 border-t border-slate-100 pt-4 sm:mt-4 sm:block">
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

        {/* The card lifts, shadows and zooms its photograph on hover but had
            nothing to click — four affordances promising an action that did not
            exist. There is no per-doctor route to link to, so the honest
            destination is the booking flow, prefilled with this clinician. */}
        <div className="mt-auto pt-3.5 sm:pt-4">
          <Button
            type="button"
            onClick={() => onBook?.(doctor)}
            fullWidth
            size="sm"
            variant="outline"
            className="group-hover:border-primary-300 group-hover:bg-primary-50 group-hover:text-primary-700"
          >
            Book
            <span className="hidden sm:inline">&nbsp;appointment</span>
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function DoctorsSection({ specialists = [] }) {
  const doctors = specialists.length > 0 ? specialists : [];
  const [bookingDoctor, setBookingDoctor] = useState(null);

  if (doctors.length === 0) {
    return null;
  }

  return (
    <Section tone="muted">
      <SectionHeader
        eyebrow="Expert clinicians"
        title="Our specialists"
        subtitle="Board-certified doctors across key specialties — available for consultation with clear schedules and direct contact details."
        action={
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
          >
            View all doctors
            <ArrowRight size={16} />
          </Link>
        }
      />

      <HorizontalSnapCarousel
        prevLabel="Previous specialists"
        nextLabel="Next specialists"
        arrowsClassName="top-[42%]"
      >
        {doctors.map((doc) => (
          <CarouselItem key={doc.id ?? doc.name}>
            <SpecialistCard doctor={doc} onBook={setBookingDoctor} />
          </CarouselItem>
        ))}
      </HorizontalSnapCarousel>

      <BookAppointmentModal
        isOpen={Boolean(bookingDoctor)}
        onClose={() => setBookingDoctor(null)}
        bookingDoctor={bookingDoctor}
      />
    </Section>
  );
}
