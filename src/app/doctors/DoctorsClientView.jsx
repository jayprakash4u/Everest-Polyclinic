"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  LayoutGrid,
  Phone,
  Search,
  Stethoscope,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  DOCTOR_PAGE_STATS,
  DOCTOR_SPECIALISTS,
} from "@/constants/doctorsPage";
import { SITE } from "@/constants";
import { cn } from "@/lib/utils";

const ALL_CATEGORY = "all";

function buildCategoryOptions(specialists) {
  return [
    { id: ALL_CATEGORY, label: "All Specialists", icon: LayoutGrid },
    ...specialists.map((group) => ({
      id: group.slug,
      label: group.category,
      icon: Stethoscope,
    })),
  ];
}

function PageSectionHeader({ title, subtitle, description, className }) {
  return (
    <div className={cn("mb-5 max-w-2xl sm:mb-8", className)}>
      <h2 className="text-base font-bold uppercase tracking-tight text-text-dark sm:text-xl">
        {title}
      </h2>
      <div className="mt-1 flex items-center gap-2">
        <div className="h-0.5 w-8 bg-secondary-500" />
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-400 sm:text-[11px]">
          {subtitle}
        </p>
      </div>
      {description ? (
        <p className="mt-2.5 text-sm leading-relaxed text-slate-500 sm:mt-3 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function DoctorCard({ doctor }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-card-hover sm:rounded-2xl">
      <div className="relative h-28 overflow-hidden bg-slate-100 sm:h-56 md:h-60">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 639px) 45vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/55 via-transparent to-transparent sm:from-primary-900/50 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100" />
        <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/95 shadow-sm sm:right-3 sm:top-3 sm:h-9 sm:w-9">
          <Award
            className="h-3 w-3 text-secondary-600 sm:h-4 sm:w-4"
            strokeWidth={1.75}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-2 pb-1.5 sm:hidden">
          <p className="truncate text-[8px] font-bold uppercase tracking-wider text-secondary-300">
            {doctor.category}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <p className="hidden text-[10px] font-bold uppercase tracking-widest text-secondary-600 sm:block">
          {doctor.category}
        </p>
        <h3 className="font-heading text-[12px] font-bold leading-snug text-text-dark transition-colors group-hover:text-primary-700 sm:mt-1 sm:text-lg">
          <span className="line-clamp-2">{doctor.name}</span>
        </h3>

        <div className="mt-1 flex items-start gap-1 text-[10px] leading-snug text-slate-500 sm:mt-2 sm:gap-2 sm:text-sm">
          <GraduationCap className="mt-0.5 h-3 w-3 shrink-0 text-primary-400 sm:h-[15px] sm:w-[15px]" />
          <span className="line-clamp-2">{doctor.education}</span>
        </div>

        {doctor.experience ? (
          <p className="mt-1.5 text-[10px] font-semibold text-primary-600 sm:mt-2 sm:text-xs">
            {doctor.experience}
            <span className="hidden sm:inline"> Experience</span>
            <span className="sm:hidden"> exp.</span>
          </p>
        ) : null}

        <div className="mt-auto hidden items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500 sm:mt-4 sm:flex">
          <CheckCircle2
            size={14}
            className="shrink-0 text-secondary-500"
          />
          Accepting new patients
        </div>

        <Button
          href="/contact"
          variant="primary"
          size="sm"
          fullWidth
          className="mt-2.5 rounded-lg px-2 py-1.5 text-[10px] sm:mt-5 sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm"
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          Book
          <span className="hidden sm:inline"> Consultation</span>
        </Button>
      </div>
    </article>
  );
}

export default function DoctorsClientView({
  specialists = DOCTOR_SPECIALISTS,
  stats = DOCTOR_PAGE_STATS,
}) {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryOptions = useMemo(
    () => buildCategoryOptions(specialists),
    [specialists],
  );

  const allDoctors = useMemo(
    () =>
      specialists.flatMap((group) =>
        group.doctors.map((doctor) => ({
          ...doctor,
          category: group.category,
          slug: group.slug,
        })),
      ),
    [specialists],
  );

  const filteredDoctors = useMemo(() => {
    return allDoctors.filter((doctor) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || doctor.slug === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        doctor.name.toLowerCase().includes(query) ||
        doctor.category.toLowerCase().includes(query) ||
        doctor.education.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [allDoctors, activeCategory, searchQuery]);

  const activeLabel =
    categoryOptions.find((c) => c.id === activeCategory)?.label ??
    "Specialists";

  return (
    <main className="min-h-screen bg-background-light">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-primary-700 px-4 py-10 sm:py-16 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto max-w-6xl px-0 sm:px-6">
          <nav className="mb-4 flex items-center gap-1.5 text-xs text-primary-200/80 sm:mb-6 sm:gap-2 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} className="text-primary-400" />
            <span className="font-medium text-white">Doctors</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-lg font-bold uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
              Our Specialists
            </h1>
            <div className="mt-1.5 flex items-center gap-2 sm:mt-2">
              <div className="h-0.5 w-8 bg-secondary-400" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-200 sm:text-[11px]">
                Expert care for your health
              </p>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-100 sm:mt-4 sm:text-base md:text-lg">
              Board-certified professionals delivering evidence-based,
              compassionate care for you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-5 px-4 sm:-mt-8">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-primary-100 bg-white p-2.5 shadow-card sm:grid-cols-4 sm:gap-0 sm:rounded-2xl sm:p-0 sm:divide-x sm:divide-slate-100">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg bg-slate-50/80 px-2 py-2.5 text-center sm:rounded-none sm:bg-transparent sm:px-4 sm:py-6"
              >
                <p className="font-heading text-xl font-bold text-primary-700 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[9px] font-medium uppercase tracking-wider text-slate-500 sm:mt-1 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & grid */}
      <section className="py-10 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <PageSectionHeader
            title="Our Specialists"
            subtitle="Expert care for your health"
            description="Search or filter by department to find the right specialist for your needs."
          />

          {/* Search bar */}
          <div className="mb-4 flex flex-col gap-2.5 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:left-4 sm:h-[18px] sm:w-[18px]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-text-dark shadow-sm transition-all placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100 sm:py-3 sm:pl-11 sm:pr-4"
              />
            </div>
            <p className="text-xs text-slate-400 sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredDoctors.length}
              </span>{" "}
              {activeLabel.toLowerCase()}
            </p>
          </div>

          {/* Category chips — horizontal swipe on mobile */}
          <div className="-mx-4 mb-6 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:mb-10 sm:overflow-visible sm:px-0">
            <div className="flex w-max gap-1.5 sm:w-auto sm:flex-wrap sm:gap-2">
              {categoryOptions.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
                      isActive
                        ? "border-primary-600 bg-primary-600 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-[15px] sm:w-[15px]" strokeWidth={2} />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Doctor cards — 2 per row on mobile */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-12 text-center sm:rounded-2xl sm:px-6 sm:py-16">
              <Stethoscope
                className="mx-auto h-8 w-8 text-slate-300 sm:h-10 sm:w-10"
                strokeWidth={1.5}
              />
              <h3 className="mt-3 font-heading text-base font-bold text-text-dark sm:mt-4 sm:text-lg">
                No doctors found
              </h3>
              <p className="mt-1.5 text-sm text-slate-500 sm:mt-2">
                Try adjusting your search or filter to find a specialist.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(ALL_CATEGORY);
                }}
                className="mt-3 text-sm font-semibold text-primary-600 hover:text-primary-700 sm:mt-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-12 sm:pb-20">
        <div className="container mx-auto max-w-6xl px-0">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-700 to-primary-600 px-4 py-7 sm:rounded-[2rem] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative flex flex-col items-center gap-4 text-center sm:gap-6 md:flex-row md:justify-between md:text-left">
              <div className="max-w-xl">
                <h2 className="text-base font-bold uppercase tracking-tight text-white sm:text-xl">
                  Find a Specialist
                </h2>
                <div className="mt-1.5 flex items-center justify-center gap-2 sm:mt-2 md:justify-start">
                  <div className="h-0.5 w-8 bg-secondary-400" />
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-primary-100 sm:text-[11px]">
                    Need help choosing?
                  </p>
                </div>
                <p className="mt-2.5 text-sm text-primary-100 sm:mt-3 sm:text-base">
                  Our reception team will guide you to the best doctor for your
                  condition and schedule your visit.
                </p>
              </div>
              <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full rounded-xl px-6 sm:w-auto sm:px-8"
                >
                  Contact Us
                </Button>
                <Button
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  variant="outlineWhite"
                  size="md"
                  className="w-full rounded-xl sm:w-auto"
                >
                  <Phone size={16} />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
