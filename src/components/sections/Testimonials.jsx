"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Card from "@/components/ui/Card";
import { TESTIMONIALS } from "@/constants";
import { cn } from "@/lib/utils";

function TestimonialCard({ testimonial, className }) {
  return (
    <Card
      className={cn(
        "group relative h-full cursor-default rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-500 hover:border-primary-200 hover:shadow-[0_20px_50px_-20px_rgba(30,95,168,0.15)] sm:rounded-[2rem] sm:p-8",
        className,
      )}
    >
      <div className="absolute right-6 top-6 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08] sm:right-8">
        <Quote
          size={64}
          fill="currentColor"
          className="text-slate-900 sm:h-20 sm:w-20"
        />
      </div>

      <div className="mb-4 flex gap-0.5 sm:mb-6">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`h-3.5 w-3.5 ${i < testimonial.rating ? "fill-current text-amber-400" : "text-slate-200"}`}
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote>
        <p className="mb-6 text-sm font-medium leading-relaxed text-slate-600 sm:mb-8 sm:text-[15px] sm:leading-[1.8]">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </blockquote>

      <div className="flex items-center gap-3 border-t border-slate-50 pt-4 sm:gap-4 sm:pt-6">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100 text-sm font-black text-primary-600 transition-transform duration-500 group-hover:scale-110 sm:h-12 sm:w-12 sm:rounded-2xl">
            {testimonial.name.charAt(0)}
          </div>
          <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-secondary-500 sm:h-4 sm:w-4" />
        </div>
        <div>
          <p className="text-xs font-bold tracking-tight text-slate-900 sm:text-[13px]">
            {testimonial.name}
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {testimonial.location}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Testimonials({ testimonials = TESTIMONIALS }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(
      el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
    );

    const firstCard = el.querySelector("[data-testimonial-card]");
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, testimonials.length - 1));
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector("[data-testimonial-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? el.clientWidth * 0.85;
    el.scrollBy({
      left: direction === "left" ? -(cardWidth + 16) : cardWidth + 16,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (index) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstCard = el.querySelector("[data-testimonial-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? el.clientWidth * 0.85;
    el.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
  };

  return (
    <section className="relative overflow-hidden bg-[#fcfdfe] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-7xl -translate-x-1/2">
        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary-500/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 bottom-24 h-64 w-64 rounded-full bg-secondary-500/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg font-bold uppercase tracking-tight text-text-dark sm:text-xl">
            Patient Trust
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-0.5 w-8 bg-secondary-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-400">
              Voices of care
            </p>
          </div>
        </div>

        {/* Mobile & tablet carousel */}
        <div className="md:hidden">
          <div className="relative">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
              className={cn(
                "absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border p-2 shadow-md transition-all",
                !canScrollLeft
                  ? "cursor-not-allowed border-slate-100 bg-white/80 text-slate-300"
                  : "border-primary-100 bg-white text-primary-600 hover:bg-primary-50",
              )}
            >
              <ChevronLeft size={18} />
            </button>

            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 py-1"
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  data-testimonial-card
                  className="w-[min(82vw,320px)] shrink-0 snap-center"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
              className={cn(
                "absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border p-2 shadow-md transition-all",
                !canScrollRight
                  ? "cursor-not-allowed border-slate-100 bg-white/80 text-slate-300"
                  : "border-primary-100 bg-white text-primary-600 hover:bg-primary-50",
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Go to review ${index + 1}`}
                onClick={() => scrollToIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? "w-6 bg-primary-600"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400",
                )}
              />
            ))}
          </div>

          <p className="mt-3 text-center text-[11px] font-medium text-slate-400">
            Swipe to read more patient stories
          </p>
        </div>

        {/* Desktop masonry grid */}
        <div className="hidden columns-1 gap-6 space-y-6 md:block md:columns-2 md:gap-8 md:space-y-8 lg:columns-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="break-inside-avoid">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
