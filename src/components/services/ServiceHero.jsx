import Image from "next/image";
import Link from "next/link";
import { Calendar, Check, ChevronRight, Headphones, Phone } from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";
import Button from "@/components/ui/Button";
import { SITE } from "@/constants";

export default function ServiceHero({ page }) {
  const { hero, title } = page;
  const displayTitle = hero.headline ?? hero.title;

  return (
    <section className="border-b border-slate-100 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:py-20">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-primary-600">
            Home
          </Link>
          <ChevronRight size={14} className="shrink-0 text-slate-300" />
          <span className="font-medium text-slate-700">{title}</span>
        </nav>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {hero.eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                {hero.eyebrow}
              </p>
            ) : null}
            <h1
              className={`font-heading text-4xl font-bold leading-[1.08] tracking-tight text-[#1a3a5c] md:text-5xl lg:text-[3.25rem] ${hero.eyebrow ? "mt-3" : "mt-4"} ${hero.headline ? "" : "uppercase"}`}
            >
              {displayTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
              {hero.description}
            </p>

             {hero.features.length ? (
               <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
                 {hero.features.map((feature) => (
                   <div key={feature.label} className="text-center sm:text-left">
                     <div className="relative mx-auto mb-4 flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl bg-white shadow-[0_2px_12px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 sm:mx-0 md:h-[5rem] md:w-[5rem]">
                       <ServicePageIcon
                         icon={feature.icon}
                         iconSet={feature.iconSet ?? "lucide"}
                         size={38}
                       />
                     </div>
                     <p className="text-[13px] font-semibold leading-snug text-slate-700 md:text-sm">
                       {feature.label}
                     </p>
                   </div>
                 ))}
               </div>
             ) : (
              <ul className="mt-8 space-y-3">
                {hero.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
                      <Check size={14} strokeWidth={2.5} />
                    </span>
                    <span className="text-sm font-medium md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact">
                <Button size="lg" className="w-full rounded-full sm:w-auto">
                  <Calendar size={18} />
                  {hero.primaryCtaLabel ?? "Book Appointment"}
                </Button>
              </Link>
              <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full sm:w-auto"
                >
                  {hero.secondaryCtaLabel === "Talk to Expert" ||
                  hero.secondaryCtaLabel === "Talk to Our Expert" ||
                  hero.secondaryCtaLabel === "Talk to Pharmacist" ? (
                    <Headphones size={18} />
                  ) : (
                    <Phone size={18} />
                  )}
                  {hero.secondaryCtaLabel}
                </Button>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-primary-200/80" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              <Image
                src={hero.image}
                alt={`${title} consultation`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
