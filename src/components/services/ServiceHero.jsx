import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Check,
  ChevronRight,
  Clock3,
  Headphones,
  Phone,
  ShieldCheck,
} from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { SITE } from "@/constants";

export default function ServiceHero({ page }) {
  const { hero, title } = page;
  const displayTitle = hero.headline ?? hero.title;

  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-primary-50/20">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-primary-100/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-secondary-100/25 blur-3xl"
        aria-hidden
      />

      <div className="container relative mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 md:py-14 lg:py-16">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-primary-600">
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0 text-slate-300" />
          <span className="font-medium text-slate-700">{title}</span>
        </nav>

        <div className="mt-5 grid items-center gap-7 sm:mt-8 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            {hero.eyebrow ? (
              <Badge variant="primary" className="mb-2.5 sm:mb-4">
                {hero.eyebrow}
              </Badge>
            ) : null}

            <h1 className="font-heading text-[1.55rem] font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[3.15rem]">
              {displayTitle}
            </h1>

            <p className="mt-3 line-clamp-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:mt-5 sm:line-clamp-none sm:text-base md:text-lg">
              {hero.description}
            </p>

            {hero.features.length ? (
              <ul className="mt-5 grid grid-cols-2 gap-1.5 sm:mt-7 sm:flex sm:flex-wrap sm:gap-2.5">
                {hero.features.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex min-w-0 items-start gap-1.5 rounded-xl border border-slate-200/90 bg-white px-2.5 py-2 text-left text-[11px] font-medium leading-snug text-slate-700 shadow-sm sm:inline-flex sm:w-auto sm:items-center sm:gap-2 sm:rounded-full sm:px-3.5 sm:py-2 sm:text-sm sm:leading-normal"
                  >
                    <ServicePageIcon
                      icon={feature.icon}
                      iconSet={feature.iconSet ?? "lucide"}
                      size={14}
                      className="mt-0.5 shrink-0 text-primary-600 sm:mt-0"
                    />
                    <span className="min-w-0 line-clamp-2 sm:line-clamp-none">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-5 grid grid-cols-2 gap-2 sm:mt-7 sm:grid-cols-1 sm:gap-3">
                {hero.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-slate-700 sm:gap-3"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 sm:h-5 sm:w-5">
                      <Check
                        className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                        strokeWidth={2.5}
                      />
                    </span>
                    <span className="text-[11px] font-medium leading-snug sm:text-sm md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:items-center sm:gap-3">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full sm:w-auto">
                  <Calendar size={18} />
                  {hero.primaryCtaLabel ?? "Book Appointment"}
                </Button>
              </Link>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-slate-200 bg-white sm:w-auto"
                >
                  {hero.secondaryCtaLabel?.toLowerCase().includes("talk") ? (
                    <Headphones size={18} />
                  ) : (
                    <Phone size={18} />
                  )}
                  {hero.secondaryCtaLabel}
                </Button>
              </a>
            </div>

            <div className="mt-5 hidden flex-col gap-3 border-t border-slate-100 pt-6 text-sm text-slate-600 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={16} className="shrink-0 text-secondary-600" />
                Licensed specialists
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={16} className="shrink-0 text-secondary-600" />
                <span className="min-w-0">{SITE.workingHours}</span>
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_16px_40px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/80 sm:aspect-[5/4] sm:rounded-3xl sm:shadow-[0_24px_64px_rgba(15,23,42,0.10)]">
              <Image
                src={hero.image}
                alt={`${title} at Everest Polyclinic`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur sm:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
                Everest Polyclinic
              </p>
              <p className="mt-0.5 text-sm font-medium text-slate-700">
                Trusted care in Nepalgunj
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
