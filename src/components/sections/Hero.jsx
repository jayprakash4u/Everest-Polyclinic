"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarDays,
  CirclePlay,
  Clock,
  FlaskConical,
  HandHeart,
  ShieldPlus,
  Stethoscope,
} from "lucide-react";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";

const HIGHLIGHTS = [
  {
    icon: Stethoscope,
    title: "Expert Doctors",
    description: "Experienced specialists across multiple departments.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Diagnostics",
    description: "Accurate results with modern equipment and technology.",
  },
  {
    icon: HandHeart,
    title: "Patient First",
    description: "Personalized care in a friendly and safe environment.",
  },
  {
    icon: ShieldPlus,
    title: "Comprehensive Care",
    description: "From consultation to treatment and follow-up — all under one roof.",
  },
  {
    icon: Clock,
    title: "Timely Service",
    description: "Quick appointment, minimal wait time, better experience.",
  },
];

export default function Hero() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="relative bg-white">
      {/*
        Desktop: the photo bleeds off the right edge and is feathered back into
        white so the headline sits on clean paper. Mobile stacks instead —
        a feathered edge over a narrow viewport just muddies the image.
      */}
      <div className="relative lg:min-h-[620px] xl:min-h-[680px]">
        <div className="absolute inset-y-0 right-0 hidden w-[62%] lg:block">
          <Image
            src="/images/hero section image1.png"
            alt="Reception at Everest International Polyclinic & Diagnostic Center"
            fill
            priority
            sizes="62vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #fff 0%, rgba(255,255,255,0.92) 14%, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.10) 52%, rgba(255,255,255,0) 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center py-12 sm:py-16 lg:min-h-[620px] lg:w-[52%] lg:py-24 xl:min-h-[680px]">
            <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
              <span className="h-[3px] w-9 rounded-full bg-secondary-500" />
              Your Health. Our Commitment.
            </p>

            <h1 className="mt-6 font-heading text-[34px] font-extrabold leading-[1.12] tracking-tight text-primary-900 sm:text-5xl xl:text-[56px]">
              Compassionate Care.
              <br />
              <span className="text-primary-600">Accurate Diagnosis.</span>
              <br />
              Better Living.
            </h1>

            <span className="mt-7 block h-[3px] w-16 rounded-full bg-slate-200" />

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Everest International Polyclinic &amp; Diagnostic Center provides
              comprehensive healthcare services under one roof with advanced
              technology and expert care.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-xl bg-secondary-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(47,168,79,0.30)] transition-all hover:-translate-y-0.5 hover:bg-secondary-700 hover:shadow-[0_14px_34px_rgba(47,168,79,0.36)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600"
              >
                <CalendarDays size={18} strokeWidth={2.5} />
                Book Appointment
              </button>

              <Link
                href="/departments"
                className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white/80 px-6 py-4 text-sm font-semibold text-primary-900 backdrop-blur transition-colors hover:border-primary-300 hover:bg-white hover:text-primary-700"
              >
                <CirclePlay size={18} strokeWidth={2.25} className="text-primary-600" />
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: the photo sits below the copy rather than behind it. */}
        <div className="relative aspect-[16/10] w-full sm:aspect-[2/1] lg:hidden">
          <Image
            src="/images/hero section image1.png"
            alt="Reception at Everest International Polyclinic & Diagnostic Center"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Highlight strip — overlaps the hero on desktop, flows normally on mobile */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.10)] sm:p-7 lg:-mt-16 lg:p-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {HIGHLIGHTS.map(({ icon: Icon, title, description }, index) => (
              <li
                key={title}
                className={
                  index > 0
                    ? "flex items-start gap-3.5 lg:border-l lg:border-slate-100 lg:pl-6"
                    : "flex items-start gap-3.5 lg:pr-6"
                }
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Icon size={20} strokeWidth={1.9} />
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-[14.5px] font-bold leading-snug text-primary-900">
                    {title}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-slate-500">
                    {description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
