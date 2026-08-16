import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { getServiceCategories } from "@/constants/services/categories";
import { getServiceIcon } from "@/lib/service-icons";

export const metadata = {
  title: "Our Services",
  description:
    "Explore the full range of medical, diagnostic, and patient care services at Everest International Polyclinic & Diagnostic Center.",
};

export default function ServicesIndexPage() {
  const categories = getServiceCategories();

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
            <span className="h-[3px] w-9 rounded-full bg-secondary-500" />
            What we offer
          </p>
          <h1 className="mt-5 font-heading text-[32px] font-extrabold leading-[1.14] tracking-tight text-primary-900 sm:text-5xl">
            Our Services
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Comprehensive healthcare under one roof — consultant-led specialties,
            advanced diagnostics, and support services that extend care beyond
            the consultation room.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:space-y-20 lg:px-8">
          {categories.map((category) => (
            <div key={category.id}>
              <div className="max-w-2xl">
                <h2 className="font-heading text-2xl font-bold tracking-tight text-primary-900 sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  {category.description}
                </p>
              </div>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.services.map((service) => {
                  const Icon = getServiceIcon(service.icon) || Stethoscope;

                  return (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]"
                      >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                          <Icon size={22} strokeWidth={1.9} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5 font-heading text-[15px] font-bold leading-snug text-primary-900">
                            {service.title}
                            <ArrowRight
                              size={15}
                              strokeWidth={2.25}
                              className="shrink-0 text-primary-600 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                              aria-hidden
                            />
                          </span>
                          {service.shortDescription ? (
                            <span className="mt-1.5 block text-[13px] leading-relaxed text-slate-500">
                              {service.shortDescription}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
