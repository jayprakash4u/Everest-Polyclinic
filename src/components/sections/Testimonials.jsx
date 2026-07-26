"use client";

import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Card from "@/components/ui/Card";
import HorizontalSnapCarousel, {
  CarouselItem,
  getCarouselActiveIndex,
  scrollCarouselPage,
  scrollCarouselToIndex,
} from "@/components/ui/HorizontalSnapCarousel";
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
  const [carouselEl, setCarouselEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const handleScrollState = useCallback(
    ({ canScrollLeft: left, canScrollRight: right, el }) => {
      setCarouselEl(el);
      setCanScrollLeft(left);
      setCanScrollRight(right);
      setActiveIndex(getCarouselActiveIndex(el));
    },
    [],
  );

  const scroll = (direction) => {
    if (!carouselEl) return;
    scrollCarouselPage(carouselEl, direction);
  };

  const scrollToIndex = (index) => {
    scrollCarouselToIndex(carouselEl, index);
  };

  return (
    <section className="relative bg-[#fcfdfe] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-primary-500/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 bottom-24 h-64 w-64 rounded-full bg-secondary-500/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
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

          <div className="flex shrink-0 gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
              className={cn(
                "rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-primary-200 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40",
              )}
            >
              <ChevronLeft className="h-5 w-5 text-primary-600" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
              className={cn(
                "rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm transition hover:border-primary-200 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40",
              )}
            >
              <ChevronRight className="h-5 w-5 text-primary-600" />
            </button>
          </div>
        </div>

        <HorizontalSnapCarousel
          showArrows={false}
          minCardWidth={280}
          maxColumns={3}
          onScrollStateChange={handleScrollState}
        >
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
            </CarouselItem>
          ))}
        </HorizontalSnapCarousel>

        <div className="mt-6 flex items-center justify-center gap-2">
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
      </div>
    </section>
  );
}
