"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import {
  Activity,
  Award,
  Heart,
  LayoutGrid,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import HealthPackageCard from "@/components/sections/HealthPackageCard";
import HealthPackagesHero from "@/components/sections/HealthPackagesHero";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { SITE } from "@/constants";

/* Loaded on demand. The booking modal is ~470 lines of form, date handling and
   scroll-locking that only matters once somebody presses Book, and it pulls in
   lenis with it — none of which needs to be in the first-load bundle of every
   page that happens to show the button. */
const BookAppointmentModal = dynamic(
  () => import("@/components/modals/BookAppointmentModal"),
  { ssr: false },
);

const SECTION_ICONS = {
  activity: Activity,
  user: User,
  heart: Heart,
};

const ALL_CATEGORY = "all";

export default function HealthPackagesClientView({ packages = [] }) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const categoryOptions = useMemo(
    () => [
      { id: ALL_CATEGORY, label: "All Packages", icon: LayoutGrid },
      ...packages.map((group) => ({
        id: group.section,
        label: group.section,
        icon: SECTION_ICONS[group.icon] ?? Activity,
      })),
    ],
    [packages],
  );

  const handleBookPackage = (pkg) => {
    setSelectedPackage({ name: pkg.name, price: pkg.price });
    setBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingOpen(false);
    setSelectedPackage(null);
  };

  const filteredPackages = useMemo(() => {
    if (activeCategory === ALL_CATEGORY) {
      return packages.flatMap((group) => group.items);
    }
    const group = packages.find((g) => g.section === activeCategory);
    return group?.items ?? [];
  }, [activeCategory, packages]);

  const activeLabel =
    categoryOptions.find((c) => c.id === activeCategory)?.label ?? "Packages";

  const phoneHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-12 sm:pb-24">
      <HealthPackagesHero />

      {/* Packages — `id` is the target of the hero's "Explore Our Packages". */}
      <section
        id="packages"
        className="container mx-auto scroll-mt-24 px-4 pt-8 sm:pt-14 md:pt-16"
      >
        <div className="mb-4 sm:mb-8">
          <div className="mb-1.5 flex items-center gap-2 sm:mb-2">
            <span className="h-[2px] w-6 bg-secondary-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-600">
              Browse by Category
            </span>
          </div>
          <h2 className="font-heading text-lg font-bold text-primary-900 sm:text-3xl">
            Select a <span className="text-secondary-600">Package Type</span>
          </h2>
          <p className="mt-1.5 max-w-xl text-sm text-slate-500 sm:mt-2 sm:text-base">
            Filter packages by category to find the health screen that fits your
            needs.
          </p>
        </div>

        {/* Category chips — horizontal swipe on mobile */}
        <div className="-mx-4 mb-4 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:mb-6 sm:overflow-visible sm:px-0">
          <div className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap sm:gap-2">
            {categoryOptions.map(({ id, label, icon: Icon }) => {
              const isActive = activeCategory === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveCategory(id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
                    isActive
                      ? "border-primary-600 bg-primary-600 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 sm:h-[14px] sm:w-[14px]" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredPackages.length}
            </span>{" "}
            {filteredPackages.length === 1 ? "package" : "packages"} in{" "}
            <span className="font-bold text-primary-600">{activeLabel}</span>
          </p>
        </div>

        {filteredPackages.length > 0 ? (
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3">
            {filteredPackages.map((pkg) => (
              <HealthPackageCard
                key={pkg.id}
                pkg={pkg}
                onBookNow={handleBookPackage}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center sm:rounded-2xl sm:px-6 sm:py-16">
            <Stethoscope
              className="mx-auto h-8 w-8 text-slate-300 sm:h-10 sm:w-10"
              strokeWidth={1.5}
            />
            <h3 className="mt-3 font-heading text-base font-bold text-primary-900 sm:mt-4 sm:text-lg">
              No packages found
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              Try another category to browse available health screens.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory(ALL_CATEGORY)}
              className="mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Show all packages
            </button>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pt-10 sm:pt-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-secondary-700 px-4 py-7 text-center sm:rounded-[2rem] sm:px-8 sm:py-12 md:px-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <Award className="mx-auto mb-2.5 h-7 w-7 text-white/90 sm:mb-4 sm:h-10 sm:w-10" />
            <h3 className="font-heading text-lg font-bold text-white sm:text-2xl md:text-3xl">
              Need a Custom Test Combination?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-200 sm:mt-3 sm:text-base">
              We can build a personalized package based on your doctor&apos;s
              prescription or specific health concerns.
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Button
                href="/contact"
                variant="accent"
                size="lg"
                className="w-full sm:w-auto"
              >
                Contact Our Lab
              </Button>
              <Button
                href={phoneHref}
                variant="outlineWhite"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Phone size={16} />
                Call for Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {bookingOpen ? (
        <BookAppointmentModal
          isOpen
          onClose={handleCloseBooking}
          bookingPackage={selectedPackage}
        />
      ) : null}
    </main>
  );
}
