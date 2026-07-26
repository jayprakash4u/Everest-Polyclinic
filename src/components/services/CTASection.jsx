import Image from "next/image";
import Link from "next/link";
import { Calendar, Phone } from "lucide-react";
import ServiceSection from "./ServiceSection";
import { SITE } from "@/constants";

export default function CTASection({ page }) {
  const { cta, title } = page;
  const phoneHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <ServiceSection tone="soft" className="pb-20 md:pb-24">
      <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-[0_24px_64px_rgba(15,23,42,0.18)] ring-1 ring-slate-800">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[240px] lg:min-h-full">
            <Image
              src={cta.image}
              alt={`Schedule ${title} at Everest Polyclinic`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/20 to-slate-900/70 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/80" />
          </div>

          <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-12 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-300">
              Book a visit
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-white md:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300 md:text-lg">
              {cta.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 md:text-base"
              >
                <Calendar size={18} />
                {cta.buttonLabel}
              </Link>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 md:text-base"
              >
                <Phone size={18} />
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </ServiceSection>
  );
}
