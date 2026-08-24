"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import HorizontalSnapCarousel, {
  CarouselItem,
  getCarouselActiveIndex,
  scrollCarouselPage,
  scrollCarouselToIndex,
} from "@/components/ui/HorizontalSnapCarousel";
import { TESTIMONIALS } from "@/constants";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

/**
 * The patient's photo, or their initial on a tinted circle.
 *
 * Initials are not a placeholder to apologise for — most reviews will never
 * carry a photo, and a circle with a letter in it is a finished card. The
 * photo is the exception, uploaded per review under Admin → Pages → Home Page.
 *
 * `failed` matters: the avatar is a stored string, and a row can outlive the
 * file it names — an upload deleted from disk, or the /avatars/*.jpg paths this
 * project seeded before it had an uploader. A broken-image glyph inside a
 * testimonial reads as a broken site, so a failed load drops to the initial.
 */
function TestimonialAvatar({ testimonial }) {
  const [failed, setFailed] = useState(false);

  if (testimonial.avatar && !failed) {
    return (
      <Image
        src={encodePublicPath(testimonial.avatar)}
        alt=""
        width={40}
        height={40}
        onError={() => setFailed(true)}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
      {testimonial.name.charAt(0)}
    </span>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-4 shadow-e1 transition duration-300 hover:border-primary-200 hover:shadow-e2 sm:p-6">
      <div
        className="flex gap-0.5"
        aria-label={`Rated ${testimonial.rating} out of 5`}
      >
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            aria-hidden="true"
            className={cn(
              "h-4 w-4",
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200",
            )}
          />
        ))}
      </div>

      <blockquote className="mt-3 flex-1 sm:mt-4">
        <p className="line-clamp-4 text-sm leading-relaxed text-slate-600 sm:line-clamp-none sm:text-base">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3 sm:mt-5 sm:pt-4">
        <TestimonialAvatar testimonial={testimonial} />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-slate-900">
            {testimonial.name}
          </span>
          <span className="block truncate text-xs text-slate-500">
            {testimonial.location}
          </span>
        </span>
      </figcaption>
    </figure>
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

  return (
    <Section
      tone="muted"
      // Trimmed on mobile: py-16 (64px top+bottom) plus the header/card/dots
      // stack made this the tallest section to scroll past on a phone.
      // Unchanged from sm up.
      className="py-10 sm:py-20 lg:py-24"
    >
      <SectionHeader
        eyebrow="Patient voices"
        title="Trusted by families across Nepalgunj"
        subtitle="What patients say after visiting Everest International Polyclinic."
        action={
          <div className="hidden gap-2 md:flex">
            <ArrowButton
              direction="left"
              disabled={!canScrollLeft}
              onClick={() => scroll("left")}
            />
            <ArrowButton
              direction="right"
              disabled={!canScrollRight}
              onClick={() => scroll("right")}
            />
          </div>
        }
      />

      <HorizontalSnapCarousel
        showArrows={false}
        minCardWidth={260}
        maxColumns={3}
        onScrollStateChange={handleScrollState}
      >
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </CarouselItem>
        ))}
      </HorizontalSnapCarousel>

      <div className="mt-5 flex items-center justify-center gap-2 sm:mt-8">
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            aria-label={`Go to review ${index + 1}`}
            aria-current={activeIndex === index}
            onClick={() => scrollCarouselToIndex(carouselEl, index)}
            className="group flex h-8 w-6 items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
          >
            <span
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "w-6 bg-primary-600"
                  : "w-1.5 bg-slate-300 group-hover:bg-slate-400",
              )}
            />
          </button>
        ))}
      </div>
    </Section>
  );
}

function ArrowButton({ direction, disabled, onClick }) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous testimonial" : "Next testimonial"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-xl border bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed border-slate-100 text-slate-300"
          : "border-slate-200 text-slate-600 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700",
      )}
    >
      <Icon size={18} />
    </button>
  );
}
