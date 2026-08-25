"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import Container from "@/components/ui/Container";
import { STATS } from "@/constants";

/* Loaded on demand — see the same note in DiagnosticCare.jsx and Hero.jsx.
   This is the fourth place on the homepage that opens this modal, and each
   keeps its own lazy import rather than sharing one eager instance. */
const BookAppointmentModal = dynamic(
  () => import("@/components/modals/BookAppointmentModal"),
  { ssr: false },
);

/*
 * A short, dark band between the diagnostics section and the disease list —
 * a beat of proof (real numbers, already shown in the Hero) before the page
 * moves on, rather than a second full section competing for attention.
 *
 * The three figures are `STATS`, the same constant `Stats.jsx` reads and the
 * same numbers the Hero's proof row shows — one set of claims about the
 * clinic, not a second set invented for this band. Sliced to three because
 * the fourth (`500+ Lab Tests Available`) belongs to the diagnostics section
 * just above this one, not to a general trust band.
 *
 * The left side has no figure to back a specific claim ("300+ this week" is
 * unverifiable and not tracked anywhere in this codebase), so it carries an
 * invitation instead — the avatars are plain silhouettes, not stand-ins for
 * real patient photos nobody has consented to publish.
 */
const PROOF_STATS = STATS.slice(0, 3);
const AVATAR_COUNT = 4;

export default function TrustBand() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <section className="bg-primary-900 py-12 sm:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        {/* ── Left: invitation, not a fabricated figure ── */}
        <button
          type="button"
          onClick={() => setBookingOpen(true)}
          className="group flex items-center gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
        >
          <span className="flex shrink-0 -space-x-3" aria-hidden="true">
            {Array.from({ length: AVATAR_COUNT }).map((_, i) => (
              <span
                key={i}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-2 ring-primary-900 sm:h-12 sm:w-12"
              >
                <User className="h-5 w-5 text-white/70" strokeWidth={1.75} />
              </span>
            ))}
          </span>

          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-secondary-300">
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={2} />
              Ready when you are
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-base font-bold text-white transition-colors duration-300 group-hover:text-secondary-200 sm:text-lg">
              Book your appointment today
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2.25}
              />
            </span>
          </span>
        </button>

        {/* ── Right: the same three figures the Hero already shows ── */}
        <dl className="grid grid-cols-3 divide-x divide-white/15 border-t border-white/15 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
          {PROOF_STATS.map(({ value, label }, index) => (
            <div key={label} className={index === 0 ? "pr-4 sm:pr-8" : "px-4 sm:px-8"}>
              <dt className="font-heading text-2xl font-bold text-white sm:text-3xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs text-primary-200 sm:text-sm">{label}</dd>
            </div>
          ))}
        </dl>
      </Container>

      {bookingOpen ? (
        <BookAppointmentModal isOpen onClose={() => setBookingOpen(false)} />
      ) : null}
    </section>
  );
}
