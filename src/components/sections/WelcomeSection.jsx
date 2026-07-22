"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const HEX_CLIP =
  "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const BORDER_SCALE = 1.07;
const RING_SCALE = 1.03;

/** Big circle — main image (was the large square before) */
function FramedCircle({ src, alt }) {
  return (
    <div
      className={cn(
        "group absolute left-1/2 top-0 z-10 aspect-square w-[68%] -translate-x-1/2 sm:w-[72%]",
        "rounded-full bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.18)]",
        "ring-1 ring-primary-100 transition-transform duration-500 group-hover:scale-[1.015]",
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-primary-50">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 640px) 65vw, 320px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </div>
  );
}

/** Hex — overlaps the circle from below */
function FramedHex({ src, alt, className }) {
  return (
    <div
      className={cn(
        "group absolute z-20 aspect-[1/1.15] overflow-visible",
        className,
      )}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 group-hover:scale-[1.04]"
        style={{ filter: "drop-shadow(0 14px 30px rgba(15,23,42,0.18))" }}
      >
        <div
          className="absolute inset-0 bg-white"
          style={{ clipPath: HEX_CLIP, transform: `scale(${BORDER_SCALE})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-primary-200"
          style={{ clipPath: HEX_CLIP, transform: `scale(${RING_SCALE})` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: HEX_CLIP }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 40vw, 180px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

function YearsBadge({ className }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border-[3px] border-white bg-white px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.14)] ring-1 ring-primary-100",
        className,
      )}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-700">
        <span className="font-heading text-lg font-black leading-none text-white">
          15+
        </span>
      </div>
      <div>
        <p className="font-heading text-sm font-bold leading-tight text-text-dark">
          Years of
        </p>
        <p className="text-xs font-bold uppercase tracking-wider text-secondary-600">
          Care
        </p>
      </div>
    </div>
  );
}

function WelcomeImageCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px]">
      <div className="pointer-events-none absolute inset-4 rounded-full bg-gradient-to-b from-primary-50/70 to-secondary-50/50 blur-3xl" />

      <div className="relative mx-auto aspect-[4/5] w-full overflow-visible pb-14 sm:aspect-[4/4.8] sm:pb-16">
        <FramedCircle
          src="/images/main-medical.jpg"
          alt="Everest Polyclinic medical team"
        />

        <FramedHex
          src="/images/doctorchecking.jpg"
          alt="Doctor examining a patient at Everest Polyclinic"
          className="left-0 top-[40%] w-[42%] sm:top-[44%] sm:w-[38%]"
        />

        <FramedHex
          src="/images/patient-first.jpg"
          alt="Patient-first care at Everest Polyclinic"
          className="right-0 top-[30%] w-[40%] sm:top-[34%] sm:w-[36%]"
        />

        <YearsBadge className="absolute bottom-0 left-1/2 z-30 max-w-[calc(100%-1rem)] -translate-x-1/2 scale-[0.92] sm:bottom-[2%] sm:max-w-none sm:scale-100" />
      </div>
    </div>
  );
}

export default function WelcomeSection() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  return (
    <>
      <section className="overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-6xl items-center justify-items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:max-w-7xl xl:gap-20">
            <div className="order-2 w-full max-w-xl text-center lg:order-1 lg:max-w-none lg:text-left">
              <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                <span className="h-[2px] w-10 bg-primary-500" />
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary-600">
                  Welcome to
                </p>
              </div>

              <h2 className="font-heading text-2xl font-bold leading-tight text-text-dark sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
                Everest International{" "}
                <span className="text-primary-600">Polyclinic & Diagnostic</span>
              </h2>

              <p className="mt-4 text-sm font-medium italic text-text-light sm:text-base">
                &ldquo;Your Health is Our Mission&rdquo;
              </p>

              <div className="mx-auto mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-text sm:text-base lg:mx-0">
                <p>
                  Everest International Polyclinic & Diagnostic Centre Pvt. Ltd.
                  is a multi-speciality hospital established in 2070 B.S. in
                  Nepalgunj.
                </p>
                <p>
                  We are committed to delivering high-quality, ethical, and
                  patient-centered healthcare services with modern diagnostic
                  facilities and experienced medical professionals.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
                <Button
                  type="button"
                  onClick={() => setAppointmentOpen(true)}
                  variant="secondary"
                  size="lg"
                  fullWidth
                  className="w-full max-w-xs rounded-full px-7 text-xs uppercase tracking-wider shadow-md sm:w-auto sm:max-w-none"
                >
                  <Calendar size={18} />
                  Book Appointment
                </Button>
              </div>

              <div className="mx-auto mt-8 flex w-full max-w-sm items-center gap-3 rounded-2xl border border-primary-100 bg-primary-50 px-4 py-3 sm:mt-10 lg:mx-0 lg:inline-flex lg:w-auto">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                  <Clock size={18} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wide text-primary-700">
                    Always Open
                  </p>
                  <p className="text-sm font-semibold text-text-dark">
                    24 Hours Emergency Service
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 flex w-full justify-center lg:order-2">
              <WelcomeImageCollage />
            </div>
          </div>
        </div>
      </section>

      <BookAppointmentModal
        isOpen={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
      />
    </>
  );
}
