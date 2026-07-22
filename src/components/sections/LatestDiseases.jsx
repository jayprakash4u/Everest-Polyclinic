"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HealthPackageCard from "@/components/sections/HealthPackageCard";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { HOMEPAGE_HEALTH_PACKAGES } from "@/constants/healthPackages";
import { cn } from "@/lib/utils";

export default function LatestDiseases() {
  const scrollRef = useRef(null);
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

  const checkScroll = () => {
    if (!scrollRef.current) return;
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
    setCanScrollRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10,
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = Math.min(scrollRef.current.clientWidth * 0.85, 320);
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background-light py-10 sm:py-12 md:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-[2px] w-6 bg-primary-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-600">
                Diagnostic Solutions
              </span>
            </div>
            <h2 className="font-heading text-xl font-bold text-text-dark sm:text-2xl md:text-3xl">
              Health <span className="text-primary-600">Packages</span>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-slate-500">
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
                  "rounded-lg border p-2 transition-all",
                  !canScrollLeft
                    ? "cursor-not-allowed border-slate-100 opacity-30"
                    : "border-primary-100 hover:bg-white hover:shadow-md",
                )}
              >
                <ChevronLeft size={20} className="text-primary-600" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                aria-label="Scroll packages right"
                className={cn(
                  "rounded-lg border p-2 transition-all",
                  !canScrollRight
                    ? "cursor-not-allowed border-slate-100 opacity-30"
                    : "border-primary-100 hover:bg-white hover:shadow-md",
                )}
              >
                <ChevronRight size={20} className="text-primary-600" />
              </button>
            </div>

            <Link
              href="/health-packages"
              className="hidden items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 md:inline-flex"
            >
              View All
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="hide-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 pt-2"
        >
          {HOMEPAGE_HEALTH_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="w-[min(88vw,280px)] shrink-0 snap-center sm:w-[300px]"
            >
              <HealthPackageCard pkg={pkg} onBookNow={handleBookPackage} />
            </div>
          ))}
        </div>

        <div className="mt-6 text-center md:hidden">
          <Link
            href="/health-packages"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
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
