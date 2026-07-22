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
    <div className={cn("mb-6 max-w-2xl sm:mb-8", className)}>
      <h2 className="text-lg font-bold uppercase tracking-tight text-text-dark sm:text-xl">
        {title}
      </h2>
      <div className="mt-1 flex items-center gap-2">
        <div className="h-0.5 w-8 bg-secondary-500" />
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-400">
          {subtitle}
        </p>
      </div>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-primary-700 px-4 py-16 sm:py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-primary-200/80">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} className="text-primary-400" />
            <span className="font-medium text-white">Doctors</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
              Our Specialists
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-0.5 w-8 bg-secondary-400" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-200">
                Expert care for your health
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-100 sm:text-lg">
              Board-certified professionals delivering evidence-based,
              compassionate care for you and your family.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-6 px-4 sm:-mt-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-card sm:grid-cols-4 sm:gap-0 sm:p-0 sm:divide-x sm:divide-slate-100">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-4 text-center sm:py-6"
              >
                <p className="font-heading text-2xl font-bold text-primary-700 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & grid */}
      <section className="py-14 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <PageSectionHeader
            title="Our Specialists"
            subtitle="Expert care for your health"
            description="Search or filter by department to find the right specialist for your needs."
          />

          {/* Search bar */}
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or specialty..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-text-dark shadow-sm transition-all placeholder:text-slate-400 focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
            <p className="text-sm text-slate-400">
              Showing{" "}
              <span className="font-semibold text-slate-600">
                {filteredDoctors.length}
              </span>{" "}
              {activeLabel.toLowerCase()}
            </p>
          </div>

          {/* Category pills */}
          <div className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {categoryOptions.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "border-primary-600 bg-primary-600 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
                  )}
                >
                  <Icon size={15} strokeWidth={2} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Doctor cards */}
          {filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDoctors.map((doctor) => (
                <article
                  key={doctor.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-card-hover"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100 sm:h-60">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm">
                      <Award
                        size={16}
                        className="text-secondary-600"
                        strokeWidth={1.75}
                      />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-secondary-600">
                      {doctor.category}
                    </p>
                    <h3 className="mt-1 font-heading text-lg font-bold text-text-dark transition-colors group-hover:text-primary-700">
                      {doctor.name}
                    </h3>

                    <div className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                      <GraduationCap
                        size={15}
                        className="mt-0.5 shrink-0 text-primary-400"
                      />
                      <span>{doctor.education}</span>
                    </div>

                    {doctor.experience && (
                      <p className="mt-2 text-xs font-semibold text-primary-600">
                        {doctor.experience} Experience
                      </p>
                    )}

                    <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                      <CheckCircle2
                        size={14}
                        className="shrink-0 text-secondary-500"
                      />
                      Accepting new patients
                    </div>

                    <Button
                      href="/contact"
                      variant="secondary"
                      size="sm"
                      fullWidth
                      className="mt-5 rounded-xl"
                    >
                      <Calendar size={16} />
                      Book Consultation
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
              <Stethoscope
                size={40}
                className="mx-auto text-slate-300"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-heading text-lg font-bold text-text-dark">
                No doctors found
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try adjusting your search or filter to find a specialist.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(ALL_CATEGORY);
                }}
                className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-10 sm:rounded-[2rem] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
              <div className="max-w-xl">
                <h2 className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                  Find a Specialist
                </h2>
                <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                  <div className="h-0.5 w-8 bg-secondary-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-100">
                    Need help choosing?
                  </p>
                </div>
                <p className="mt-3 text-sm text-primary-100 sm:text-base">
                  Our reception team will guide you to the best doctor for your
                  condition and schedule your visit.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <Button
                  href="/contact"
                  variant="secondary"
                  size="md"
                  className="rounded-xl px-8"
                >
                  Contact Us
                </Button>
                <Button
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  variant="outlineWhite"
                  size="md"
                  className="rounded-xl"
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
