"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HealthPackageCard from "@/components/sections/HealthPackageCard";
import { HOMEPAGE_HEALTH_PACKAGES } from "@/constants/healthPackages";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import HorizontalSnapCarousel, {
  CarouselItem,
  scrollCarouselPage,
} from "@/components/ui/HorizontalSnapCarousel";
import { cn } from "@/lib/utils";

/* Loaded on demand. The booking modal is ~470 lines of form, date handling and
   scroll-locking that only matters once somebody presses Book, and it pulls in
   lenis with it — none of which needs to be in the first-load bundle of every
   page that happens to show the button. */
const BookAppointmentModal = dynamic(
  () => import("@/components/modals/BookAppointmentModal"),
  { ssr: false },
);

export default function LatestDiseases({
  packages = HOMEPAGE_HEALTH_PACKAGES,
}) {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleBookPackage = (pkg) => {
    setSelectedPackage({ name: pkg.name, price: pkg.price });
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedPackage(null);
  };

  const handleScrollState = ({ canScrollLeft: left, canScrollRight: right, el }) => {
    carouselRef.current = el;
    setCanScrollLeft(left);
    setCanScrollRight(right);
  };

  const scroll = (direction) => {
    scrollCarouselPage(carouselRef.current, direction);
  };

  /*
    One card carries the section. A pricing row of identical white tiles has no
    focal point, which is what made this read as weightless — the fix is
    contrast in one place, not a dark box around everything.

    Driven off the data rather than a hardcoded index: the first "Best Seller"
    wins, and if the copy ever drops that badge the row degrades to plain cards
    instead of promoting an arbitrary one.
  */
  const featuredId =
    packages.find((pkg) => pkg.badge === "Best Seller")?.id ?? null;

  return (
    <Section tone="white">
      <SectionHeader
        accent="secondary"
        eyebrow="Diagnostic solutions"
        title={
          <>
            Health <span className="text-secondary-600">packages</span>
          </>
        }
        subtitle="Comprehensive checkup packages with transparent pricing and detailed test lists."
        action={
          <div className="flex items-center gap-3">
            {/* Arrows hidden from assistive tech below md — the track is
                swipeable there and the buttons would be redundant controls. */}
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

            <Link
              href="/health-packages"
              className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
            >
              View all packages
              <ArrowRight size={16} />
            </Link>
          </div>
        }
      />

      <HorizontalSnapCarousel
        showArrows={false}
        onScrollStateChange={handleScrollState}
      >
        {packages.map((pkg) => (
          <CarouselItem key={pkg.id}>
            <HealthPackageCard
              pkg={pkg}
              featured={pkg.id === featuredId}
              onBookNow={handleBookPackage}
            />
          </CarouselItem>
        ))}
      </HorizontalSnapCarousel>

      {bookingOpen ? (
        <BookAppointmentModal
          isOpen
          onClose={handleCloseBooking}
          bookingPackage={selectedPackage}
        />
      ) : null}
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
      aria-label={`Scroll packages ${direction}`}
      className={cn(
        // h-11/w-11 keeps the hit area at the 44px touch minimum.
        "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
        disabled
          ? "cursor-not-allowed border-slate-200 text-slate-300"
          : "border-slate-300 text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700",
      )}
    >
      <Icon size={18} />
    </button>
  );
}
