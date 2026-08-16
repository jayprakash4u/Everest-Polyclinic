"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { SITE } from "@/constants";
import { encodePublicPath } from "@/lib/encode-public-path";

const MAIN_IMAGE = "/images/services/laboratory/laboratory1.jpg";
const INSET_IMAGE = "/images/services/laboratory/laboratory 2.jpg";

const TESTS = [
  "Complete Blood Count (CBC)",
  "HbA1c (Glycated Haemoglobin)",
  "Vitamin D, 25 - OH",
  "Liver Function Test",
  "Thyroid Profile Total",
  "Blood Glucose Fasting (FBS)",
  "Kidney Function Test",
  "C-Reactive Protein (CRP), Quantitative",
];

/*
 * `SITE.workingHours` is one string — "Sun – Fri: 8:00 AM – 8:00 PM" — so the
 * per-day rows are built from the days it actually covers. The design lists
 * Monday–Saturday at 7:30am, which would advertise hours the clinic does not
 * keep, and Saturday is a closing day here.
 */
const OPEN_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const OPEN_TIME = "8:00am - 8:00pm";

export default function DiagnosticCare() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    /* White, not a tint: this now sits directly under the tinted Centres of
       Excellence band, and two tints butted together read as one long section
       with a card grid and a photo jumbled inside it. */
    <section className="relative overflow-hidden bg-white py-14 sm:py-20 lg:py-24">
      <Container>
        {/* 5/7 rather than an even split: at half the container the headline
            broke across three lines instead of the two in the design. */}
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-14">
          {/* ── Left: layered image composition ── */}
          <div className="relative mx-auto w-full max-w-[520px] pl-6 pt-10 sm:pl-16 sm:pt-14 lg:col-span-5 lg:mx-0">
            <div className="relative aspect-[1200/1291] w-full overflow-hidden rounded-[28px] bg-slate-100 shadow-e2">
              <Image
                src={encodePublicPath(MAIN_IMAGE)}
                alt="A laboratory technician examining a sample under a microscope"
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="object-cover"
              />
            </div>

            {/* Inset frame, top-left. The white padding is the frame itself —
                it reads as a photo sitting on top of the larger one. */}
            <div className="absolute left-0 top-0 flex w-[58%] max-w-[290px] overflow-hidden rounded-[20px] bg-white p-1.5 shadow-e2">
              <span className="flex w-7 shrink-0 items-center justify-center rounded-l-[15px] bg-primary-900 sm:w-8">
                <span className="rotate-180 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.18em] text-white [writing-mode:vertical-rl] sm:text-[10px]">
                  Video call support
                </span>
              </span>

              <span className="relative aspect-[612/409] flex-1 overflow-hidden rounded-r-[15px] bg-slate-100">
                <Image
                  src={encodePublicPath(INSET_IMAGE)}
                  alt="Blood sample tubes beside a microscope"
                  fill
                  sizes="(min-width: 1024px) 16vw, 45vw"
                  className="object-cover"
                />
              </span>
            </div>

            {/* Opening hours card. Green is the site's action colour, so it
                carries the panel the design gives to magenta. */}
            <div className="absolute bottom-5 right-[-10px] w-[62%] max-w-[252px] rounded-[20px] bg-secondary-600 px-4 py-4 text-white shadow-e2 sm:right-[-28px] sm:px-5 sm:py-5">
              <span className="absolute -top-7 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary-900 ring-4 ring-white">
                <Clock className="h-6 w-6 text-white" strokeWidth={1.75} />
              </span>

              <h3 className="font-heading text-lg font-semibold tracking-[-0.01em] sm:text-xl">
                Open Hours
              </h3>

              <dl className="mt-2.5 space-y-1">
                {OPEN_DAYS.map((day) => (
                  <div
                    key={day}
                    className="flex items-baseline justify-between gap-2 text-xs sm:text-[13px]"
                  >
                    <dt className="text-white/85">{day}</dt>
                    <dd className="font-bold">{OPEN_TIME}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* ── Right: copy, test list, actions ── */}
          <div className="lg:col-span-7">
            {/*
              Uses the shared SectionHeader rather than a bare h2, so this
              section carries the same eyebrow-rule-title-subtitle structure and
              type scale as every other one. Written by hand it had no eyebrow,
              which is what made it read as a different kind of block.
            */}
            <SectionHeader
              accent="secondary"
              eyebrow="Advanced diagnostics"
              titleClassName="text-primary-900"
              title={
                <>
                  Comprehensive Diagnostic
                  <br className="hidden sm:block" /> Care For Every Need
                </>
              }
              subtitle="Experience the future of healthcare with our state-of-the-art diagnostic facilities. Equipped with the latest technology, we ensure accurate and timely results for precise medical decisions. Our advanced diagnostic tools, combined with expert analysis, provide a seamless and reliable healthcare experience."
              className="mb-7 sm:mb-8"
            />

            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {TESTS.map((test) => (
                <li key={test} className="flex items-start gap-2.5">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-secondary-600"
                    strokeWidth={3}
                  />
                  <span className="text-sm leading-snug text-slate-700 sm:text-[15px]">
                    {test}
                  </span>
                </li>
              ))}
            </ul>

            {/*
              One action group, not three stacked blocks with their own
              margins. On a phone both pills go full width so their left and
              right edges line up and the arrows sit on a common axis — as
              `w-fit` they were two different widths with ragged ends, which is
              what made this corner look unfinished. From sm they shrink back to
              their content and sit on one row with the phone number.
            */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/services/laboratory"
                className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-primary-900 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 sm:w-auto sm:justify-start sm:text-base"
              >
                View more
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex w-full items-center justify-between gap-3 rounded-full bg-primary-900 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2 sm:w-auto sm:justify-start sm:text-base"
              >
                Book Appointment
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary-900 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </div>

            {/* Given its own row with a hairline above it, so it reads as a
                separate way to reach the clinic rather than a third button. */}
            <a
              href={telHref}
              className="group mt-6 flex w-fit items-center gap-3 border-t border-slate-200 pt-6 sm:mt-7 sm:border-t-0 sm:pt-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                <Phone className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs text-slate-500">Contact us?</span>
                <span className="block text-base font-bold text-primary-900 transition-colors group-hover:text-primary-700">
                  {SITE.phone}
                </span>
              </span>
            </a>
          </div>
        </div>
      </Container>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
