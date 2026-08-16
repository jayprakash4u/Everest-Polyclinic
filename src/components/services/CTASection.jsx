import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import ServiceSection from "./ServiceSection";
import { SITE } from "@/constants";

export default function CTASection({ page }) {
  const { cta, title } = page;
  const phoneHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <ServiceSection tone="soft" className="pb-12 sm:pb-20 md:pb-24">
      <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-[0_16px_40px_rgba(15,23,42,0.14)] ring-1 ring-slate-800 sm:rounded-3xl sm:shadow-[0_24px_64px_rgba(15,23,42,0.18)]">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/9] min-h-0 sm:aspect-auto sm:min-h-[200px] lg:min-h-full">
            <Image
              src={cta.image}
              alt={`Schedule ${title} at Everest Polyclinic`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-900/70 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/80" />
          </div>

          <div className="flex flex-col justify-center px-4 py-7 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-300 sm:text-xs">
              Book a visit
            </p>
            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-white sm:mt-3 sm:text-3xl md:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-2.5 line-clamp-3 max-w-lg text-sm leading-relaxed text-slate-300 sm:mt-4 sm:line-clamp-none sm:text-base md:text-lg">
              {cta.subtitle}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:px-7 sm:py-3.5 md:text-base"
              >
                <Calendar className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                {cta.buttonLabel}
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:px-7 sm:py-3.5 md:text-base"
              >
                <Phone className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}
