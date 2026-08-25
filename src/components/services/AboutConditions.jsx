import { Check } from "lucide-react";
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
                <h3 className="font-heading text-[12px] font-bold leading-snug text-primary-900 sm:text-base">
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
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3 lg:grid-cols-3">
            {conditions.map((condition) => (
              <li
                key={condition}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600 sm:h-7 sm:w-7">
                  <Check
                    className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5"
                    strokeWidth={2.5}
                  />
                </span>
                <span className="min-w-0 text-[11px] font-medium leading-snug text-slate-700 sm:text-sm md:text-[15px]">
                  <span className="line-clamp-2">{condition}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ServiceSection>
  );
}
