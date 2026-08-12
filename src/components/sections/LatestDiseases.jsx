"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HealthPackageCard from "@/components/sections/HealthPackageCard";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { HOMEPAGE_HEALTH_PACKAGES } from "@/constants/healthPackages";
import HorizontalSnapCarousel, {
  CarouselItem,
  scrollCarouselPage,
} from "@/components/ui/HorizontalSnapCarousel";
import { cn } from "@/lib/utils";

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

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600">
              Diagnostic Solutions
            </p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Health <span className="text-primary-600">Packages</span>
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              Comprehensive checkup packages with transparent pricing and
              detailed test lists.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 self-start md:self-auto">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                aria-label="Scroll packages left"
                className={cn(
                  "rounded-full border p-2.5 transition-all duration-200",
                  !canScrollLeft
                    ? "cursor-not-allowed border-slate-100 opacity-30"
                    : "border-slate-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700",
                )}
              >
                <ChevronLeft size={18} className="text-slate-600" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll packages right"
                className={cn(
                  "rounded-full border p-2.5 transition-all duration-200",
                  !canScrollRight
                    ? "cursor-not-allowed border-slate-100 opacity-30"
                    : "border-slate-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700",
                )}
              >
                <ChevronRight size={18} className="text-slate-600" />
              </button>
            </div>

            <Link
              href="/health-packages"
              className="hidden items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md md:inline-flex"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <HorizontalSnapCarousel
          showArrows={false}
          onScrollStateChange={handleScrollState}
        >
          {packages.map((pkg) => (
            <CarouselItem key={pkg.id}>
              <HealthPackageCard pkg={pkg} onBookNow={handleBookPackage} />
            </CarouselItem>
          ))}
        </HorizontalSnapCarousel>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/health-packages"
            className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 hover:shadow-md"
          >
            View All Packages
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        bookingPackage={selectedPackage}
      />
    </section>
  );
}
