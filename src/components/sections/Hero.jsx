"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, CalendarDays } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { HOME_HERO_SLIDES } from "@/constants/homepageSections";

/**
 * Full-bleed carousel: the photography runs the whole viewport width and the
 * copy sits on it.
 *
 * The one thing that dictates the design — three of these five photographs
 * carry headline type painted on the left-hand wall ("Advanced Diagnostics.
 * Trusted Results.", "Advanced Imaging…", the logo wall in reception). Laying a
 * white h1 over the raw photo would put our headline on top of theirs.
 *
 * So the scrim is not the usual even 40% wash. It is near-opaque navy across
 * the left of the frame — exactly where that painted type lives — and ramps to
 * nothing by the right edge. The wall text sinks into the panel and reads as
 * texture, our headline gets a guaranteed 10:1 background, and the half of the
 * photograph worth showing (the people, the theatre, the scanner) stays bright
 * and untouched.
 */
/* The frames are admin-managed (Admin → Pages → Home Page). HOME_HERO_SLIDES
   is what the site shipped with and what renders if nothing is stored. */

const PROOF = [
  { value: "25,000+", label: "Patients treated" },
  { value: "50+", label: "Specialists" },
  // Kept short so all three labels sit on one line in a third of a phone width.
  { value: "15+", label: "Years of care" },
];

const SLIDE_MS = 3500;

/* primary-900 (#0B2951) at varying alpha. Written out rather than composed from
   Tailwind's `via-` stops because the ramp needs five hand-placed stops: full
   opacity out past the end of the longest line of copy, then a fall steep
   enough to clear the subject of the photograph before the right edge.
   Only used from lg, where the copy actually sits on the image. */
const SCRIM_DESKTOP =
  "linear-gradient(90deg, rgba(11,41,81,1) 0%, rgba(11,41,81,1) 34%, rgba(11,41,81,0.97) 44%, rgba(11,41,81,0.72) 58%, rgba(11,41,81,0.30) 74%, rgba(11,41,81,0.05) 90%, rgba(11,41,81,0) 100%)";

export default function Hero({ slides }) {
  /* An admin can delete their way down to nothing. Falling back here rather
     than rendering an empty carousel keeps the top of the page from collapsing. */
  const SLIDES = useMemo(
    () => (slides?.length ? slides : HOME_HERO_SLIDES),
    [slides],
  );

  const [bookingOpen, setBookingOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  /* Which slides are allowed into the DOM. At 100vw these are large downloads
     and all five in the markup would have the browser fetching them in
     parallel with the LCP image. Each slide instead mounts one step ahead of
     itself, so the document ships with the frame on screen and the one after
     it — enough that a transition never lands on an image still in flight. */
  const [mounted, setMounted] = useState(() => new Set([0, 1]));

  const slideRefs = useRef([]);
  const rootRef = useRef(null);
  const budgetRef = useRef({ slide: 0, ms: SLIDE_MS });

  const go = useCallback((next) => {
    setActive(next);
    setMounted((current) => {
      const upcoming = (next + 1) % SLIDES.length;
      if (current.has(next) && current.has(upcoming)) return current;

      const updated = new Set(current);
      updated.add(next);
      updated.add(upcoming);
      return updated;
    });
  }, [SLIDES.length]);

  /* Reduced motion changes *how* a slide arrives, not whether it does. The
     rotation is the point of the section, so it always runs; what a reduced-
     motion visitor gets is a straight cut instead of a crossfade, and a static
     bar instead of a sweeping one. WCAG 2.2.2 is satisfied by the rail below,
     which lets anyone stop the rotation and hold a frame. */
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  /* A re-armed timeout rather than a bare interval, because the wait has to
     survive a pause. Whatever is left of the current slide's dwell time is
     banked on the way out and spent on the way back in, so pausing resumes
     where it stopped instead of starting over — which is also what the
     progress bar in the rail below shows, and the two must not disagree.
     The budget is stamped with the slide it belongs to, so a slide change
     resets it while a pause does not. */
  useEffect(() => {
    if (paused) return undefined;

    if (budgetRef.current.slide !== active) {
      budgetRef.current = { slide: active, ms: SLIDE_MS };
    }

    const wait = budgetRef.current.ms;
    const startedAt = Date.now();
    const id = setTimeout(() => go((active + 1) % SLIDES.length), wait);

    return () => {
      clearTimeout(id);
      budgetRef.current = {
        slide: active,
        ms: Math.max(0, wait - (Date.now() - startedAt)),
      };
    };
  }, [paused, active, go, SLIDES.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      slideRefs.current.forEach((node, i) => {
        if (!node) return;
        gsap.to(node, {
          opacity: i === active ? 1 : 0,
          duration: reduceMotion ? 0 : 0.6,
          ease: "power2.inOut",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [active, mounted, reduceMotion]);

  const activeSlide = SLIDES[active];

  return (
    <section
      ref={rootRef}
      aria-label="Everest International Polyclinic"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-white lg:bg-primary-900",
        // Fills the fold on a laptop without ever growing taller than a
        // 3:2 photograph can stand being cropped to. Below lg the height is
        // whatever the photo band plus the copy comes to.
        "lg:h-[calc(100svh-136px)] lg:min-h-[620px] lg:max-h-[760px]",
      )}
    >
      {/*
        ── Media ──
        Two layouts from one element. Below lg it is an ordinary block at the
        top of the section, at the photographs' native 3:2 so nothing is
        cropped and the copy sits on white underneath it. From lg it lifts out
        of flow and fills the section edge to edge, with the copy on top of it.
      */}
      <div
        className={cn(
          "relative aspect-[3/2] w-full overflow-hidden bg-primary-900",
          "lg:absolute lg:inset-0 lg:-z-10 lg:aspect-auto",
        )}
      >
        {SLIDES.map((slide, i) =>
          mounted.has(i) ? (
            <Image
              key={`${slide.image}-${i}`}
              ref={(node) => {
                slideRefs.current[i] = node;
              }}
              src={encodePublicPath(slide.image)}
              alt={i === active ? slide.alt : ""}
              aria-hidden={i !== active}
              fill
              // Only the first frame is worth preloading — it is the LCP.
              preload={i === 0}
              sizes="100vw"
              className="object-cover object-center"
              style={{ opacity: i === 0 ? 1 : 0 }}
            />
          ) : null,
        )}

        {/* The navy panel only exists where the copy overlaps the photograph. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{ backgroundImage: SCRIM_DESKTOP }}
        />

        {/*
          Phone controls ride on the photograph itself, since there is no navy
          panel down here to hang them off. Floating chips rather than a
          full-width gradient — a scrim across the bottom would wash out the
          lower third of every frame. The caption reframes the headline painted
          on the wall as part of the room rather than a second headline.
        */}
        <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-900/55 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-inset ring-white/20 backdrop-blur-sm sm:bottom-4 sm:left-4 lg:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary-400" />
          {activeSlide.label}
        </span>

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-slate-900/45 px-2 py-1.5 ring-1 ring-inset ring-white/20 backdrop-blur-sm sm:bottom-4 sm:right-4 lg:hidden">
          {SLIDES.map((slide, i) => (
            <button
              key={`${slide.image}-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${slide.label}`}
              aria-current={i === active}
              className="group flex h-5 w-4 items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active
                    ? "w-4 bg-white"
                    : "w-1.5 bg-white/50 group-hover:bg-white/80",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/*
        ── Copy ──
        Held to the site's content width so its left edge lands on the same
        vertical line as the logo in the navbar above. Below lg it is dark type
        on white beneath the photo; from lg it is white type on the navy panel.
        Hence the doubled colours on everything in here.
      */}
      <Container className="flex flex-1 items-end py-10 sm:py-12 lg:items-center lg:py-16">
        <div className="max-w-[34rem]">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 lg:text-white/70">
            <span className="h-px w-6 bg-secondary-500 lg:bg-secondary-400" />
            Nepalgunj · Caring since 2070
          </p>

          <h1 className="mt-6 font-heading text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.015em] text-primary-900 sm:text-5xl lg:text-[3.375rem] lg:text-white">
            Care that feels
            <br />
            <span className="text-primary-600 lg:text-secondary-300">personal.</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 lg:text-lg lg:text-white/80">
            Specialist consultation, modern diagnostics and follow-up care —
            all under one roof, with a team that takes the time to explain.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              type="button"
              size="lg"
              onClick={() => setBookingOpen(true)}
              className="w-full sm:w-auto"
            >
              <CalendarDays size={18} strokeWidth={2} />
              Book an Appointment
            </Button>

            {/* No responsive `variant`, so the white-on-navy treatment is
                layered on at lg. Tailwind emits breakpoint utilities after the
                base ones, so these win. */}
            <Button
              href="/services"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto lg:border-white/70 lg:text-white lg:hover:border-white lg:hover:bg-white lg:hover:text-primary-700"
            >
              Explore Services
              <ArrowRight size={18} strokeWidth={2} />
            </Button>
          </div>

          {/*
            A fixed three-column row, not `flex-wrap`. Wrapping left the third
            stat orphaned on its own line on a phone, which read as a mistake
            rather than a layout. Hairlines between the columns hold the row
            together at every width.
          */}
          <dl className="mt-8 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-100 pt-6 sm:mt-10 lg:divide-white/15 lg:border-white/15">
            {PROOF.map(({ value, label }, index) => (
              <div
                key={label}
                className={cn(
                  "min-w-0",
                  index === 0 ? "pr-3 sm:pr-5" : "px-3 sm:px-5",
                  index === PROOF.length - 1 && "pr-0",
                )}
              >
                <dt className="font-heading text-xl font-semibold tracking-[-0.01em] text-primary-900 sm:text-2xl lg:text-white">
                  {value}
                </dt>
                <dd className="mt-1 text-[11px] leading-tight text-slate-500 sm:text-sm lg:text-white/70">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/*
        ── Control rail ──
        In normal flow at the foot of the hero rather than floated over the
        photograph, so nothing has to be padded around it. The five frames walk
        a patient through the building — arrive, be seen, be tested, be treated,
        be scanned — so naming them is worth more than five anonymous dots, and
        it gives keyboard users the control over auto-advancing content that
        WCAG 2.2.2 requires. Desktop only: below lg the section has no navy
        panel to hang a rail off, so the dots ride on the photograph instead.
      */}
      <div className="relative hidden border-t border-white/10 bg-primary-900/85 backdrop-blur-md lg:block">
        <Container>
          <div className="flex items-stretch gap-8">
            {SLIDES.map((slide, i) => {
              const isActive = i === active;

              return (
                <button
                  key={`${slide.image}-${i}`}
                  type="button"
                  onClick={() => go(i)}
                  aria-current={isActive}
                  className="group flex min-w-[7.5rem] flex-col gap-2.5 pb-4 pt-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
                >
                  <span
                    className={cn(
                      "text-[13px] font-semibold tracking-[0.02em] transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-white/70 group-hover:text-white",
                    )}
                  >
                    {slide.label}
                  </span>

                  {/* The fill is the auto-advance timer made visible. It shares
                      one clock with the interval above, and freezing on hover
                      is the honest reading of what actually happens. */}
                  <span className="block h-[2px] w-full overflow-hidden rounded-full bg-white/15">
                    {isActive ? (
                      <span
                        key={active}
                        className={cn(
                          "block h-full w-full origin-left rounded-full bg-secondary-400",
                          !reduceMotion && "animate-hero-progress",
                        )}
                        style={
                          reduceMotion
                            ? undefined
                            : {
                                animationDuration: `${SLIDE_MS}ms`,
                                animationPlayState: paused ? "paused" : "running",
                              }
                        }
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
