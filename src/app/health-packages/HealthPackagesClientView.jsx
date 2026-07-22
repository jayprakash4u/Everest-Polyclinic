"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Award,
  Clock,
  Heart,
  Home,
  LayoutGrid,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import HealthPackageCard from "@/components/sections/HealthPackageCard";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HEALTH_PACKAGE_FEATURES } from "@/constants/healthPackages";

const SECTION_ICONS = {
  activity: Activity,
  user: User,
  heart: Heart,
};

const FEATURE_ICONS = {
  shield: ShieldCheck,
  clock: Clock,
  home: Home,
  stethoscope: Stethoscope,
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

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-[#1E5FA8] px-4 py-10 text-center sm:py-14 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <span className="mb-2 inline-block text-[10px] font-black uppercase tracking-[0.25em] text-secondary-300 sm:mb-4 sm:text-[11px] sm:tracking-[0.3em]">
            Preventive Care
          </span>
          <h1 className="font-heading text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            Health Checkup Packages
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-300 sm:mt-4 sm:text-base md:text-lg">
            Comprehensive diagnostic packages with transparent pricing. Choose
            the right screen for your health goals — no hidden costs.
          </p>
        </div>
      </section>

      <section className="container relative z-10 mx-auto -mt-5 px-4 sm:-mt-8">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:gap-4 sm:p-5 md:grid-cols-4 md:p-6">
          {HEALTH_PACKAGE_FEATURES.map((feature) => {
            const Icon = FEATURE_ICONS[feature.icon];
            return (
              <div
                key={feature.label}
                className="flex items-center gap-2 rounded-xl px-1 py-1 sm:gap-3 sm:px-2"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                </div>
                <p className="text-xs font-semibold text-slate-700 sm:text-sm">
                  {feature.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container mx-auto px-4 pt-10 sm:pt-14 md:pt-16">
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="h-[2px] w-6 bg-primary-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary-600">
              Browse by Category
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-text-dark sm:text-3xl">
            Select a <span className="text-primary-600">Package Type</span>
          </h2>
          <p className="mt-2 max-w-xl text-slate-500">
            Filter packages by category to find the health screen that fits your
            needs.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categoryOptions.map(({ id, label, icon: Icon }) => {
            const isActive = activeCategory === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveCategory(id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  isActive
                    ? "border-primary-600 bg-primary-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:bg-primary-50 hover:text-primary-700",
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            );
          })}
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-800">
              {filteredPackages.length}
            </span>{" "}
            {filteredPackages.length === 1 ? "package" : "packages"} in{" "}
            <span className="font-bold text-primary-600">{activeLabel}</span>
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPackages.map((pkg) => (
            <HealthPackageCard
              key={pkg.id}
              pkg={pkg}
              onBookNow={handleBookPackage}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pt-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-primary-700 to-secondary-700 px-8 py-12 text-center md:px-16">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative">
            <Award className="mx-auto mb-4 h-10 w-10 text-white/90" />
            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
              Need a Custom Test Combination?
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-200">
              We can build a personalized package based on your doctor&apos;s
              prescription or specific health concerns.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" variant="accent" size="lg">
                Contact Our Lab
              </Button>
              <Button href="tel:+9779861848382" variant="outlineWhite" size="lg">
                Call for Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        bookingPackage={selectedPackage}
      />
    </main>
  );
}
