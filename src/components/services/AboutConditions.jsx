import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";
import ServiceIconFrame from "./ServiceIconFrame";
import ServiceSection from "./ServiceSection";
import ServiceSectionHeader from "./ServiceSectionHeader";

export default function AboutConditions({ page }) {
  const { about, aboutBenefits, conditions, sections } = page;
  const aboutMeta = sections.about;

  if (!about.length && !conditions.length && !aboutBenefits.length) return null;

  return (
    <ServiceSection tone="white">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
        <div>
          <ServiceSectionHeader
            badge={aboutMeta.eyebrow}
            title={aboutMeta.title}
            subtitle={aboutMeta.subtitle}
            align="left"
          />
          <div className="mt-5 space-y-3.5 sm:mt-8 sm:space-y-5">
            {about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-sm leading-relaxed text-slate-600 sm:text-base sm:leading-8 md:text-[1.05rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {aboutBenefits.length ? (
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {aboutBenefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group rounded-xl border border-slate-200/80 bg-slate-50/50 p-2.5 transition-colors hover:border-primary-200 hover:bg-white sm:rounded-2xl sm:p-5 md:p-6"
              >
                <div className="mb-2 flex items-center gap-1.5 sm:mb-4 sm:gap-3">
                  <ServiceIconFrame
                    size="sm"
                    className="h-7 w-7 rounded-lg sm:h-11 sm:w-11 sm:rounded-xl"
                  >
                    <ServicePageIcon
                      icon={benefit.icon}
                      iconSet={benefit.iconSet ?? "health"}
                      size={16}
                    />
                  </ServiceIconFrame>
                  <span className="text-[9px] font-bold tabular-nums text-slate-400 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-[12px] font-bold leading-snug text-slate-900 sm:text-base">
                  <span className="line-clamp-2">{benefit.title}</span>
                </h3>
                {benefit.description ? (
                  <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-slate-600 sm:mt-2 sm:line-clamp-none sm:text-sm sm:leading-relaxed">
                    {benefit.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>

      {conditions.length ? (
        <div className="mt-10 border-t border-slate-100 pt-8 sm:mt-16 sm:pt-14">
          <ServiceSectionHeader
            badge="Clinical focus"
            title="Conditions we treat"
            subtitle="Common concerns evaluated and managed by our clinical team."
            align="left"
            className="max-w-xl"
          />
          <ul className="mt-5 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {conditions.map((entry) => {
              /* Entries are plain strings on most services and objects with a
                 description and icon where the copy has been written. Both
                 render as the same card; a string simply has no second line. */
              const condition =
                typeof entry === "string" ? { title: entry } : entry;

              return (
                <li
                  key={condition.title}
                  className="group flex gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-secondary-200 hover:shadow-e2 sm:gap-4 sm:p-5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600 transition-colors duration-300 group-hover:bg-secondary-100 sm:h-14 sm:w-14">
                    <ServicePageIcon
                      icon={condition.icon ?? "stethoscope"}
                      iconSet={condition.iconSet ?? "lucide"}
                      size={24}
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-base font-semibold leading-snug tracking-[-0.01em] text-primary-900">
                      {condition.title}
                    </span>

                    {condition.description ? (
                      <span className="mt-1.5 block text-sm leading-relaxed text-slate-600">
                        {condition.description}
                      </span>
                    ) : null}

                    {/* Only rendered when the entry supplies a destination —
                        the design shows a "Learn more" on every card, but
                        without a page to open it would be a dead link. */}
                    {condition.href ? (
                      <Link
                        href={condition.href}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-secondary-700 transition-colors hover:text-secondary-800"
                      >
                        Learn more
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                          strokeWidth={2}
                        />
                      </Link>
                    ) : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </ServiceSection>
  );
}
