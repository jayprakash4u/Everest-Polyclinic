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
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
        <div>
          <ServiceSectionHeader
            badge={aboutMeta.eyebrow}
            title={aboutMeta.title}
            subtitle={aboutMeta.subtitle}
            align="left"
          />
          <div className="mt-8 space-y-5">
            {about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base leading-8 text-slate-600 md:text-[1.05rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {aboutBenefits.length ? (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
            {aboutBenefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group rounded-xl border border-slate-200/80 bg-slate-50/50 p-3 transition-colors hover:border-primary-200 hover:bg-white sm:rounded-2xl sm:p-5 md:p-6"
              >
                <div className="mb-2.5 flex items-center gap-2 sm:mb-4 sm:gap-3">
                  <ServiceIconFrame
                    size="sm"
                    className="h-8 w-8 rounded-lg sm:h-11 sm:w-11 sm:rounded-xl"
                  >
                    <ServicePageIcon
                      icon={benefit.icon}
                      iconSet={benefit.iconSet ?? "health"}
                      size={18}
                    />
                  </ServiceIconFrame>
                  <span className="text-[10px] font-bold tabular-nums text-slate-400 sm:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-[13px] font-bold leading-snug text-slate-900 sm:text-base">
                  {benefit.title}
                </h3>
                {benefit.description ? (
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
                    {benefit.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        ) : null}
      </div>

      {conditions.length ? (
        <div className="mt-16 border-t border-slate-100 pt-14">
          <ServiceSectionHeader
            badge="Clinical focus"
            title="Conditions we treat"
            subtitle="Common concerns evaluated and managed by our clinical team."
            align="left"
            className="max-w-xl"
          />
          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conditions.map((condition) => (
              <li
                key={condition}
                className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <Check size={14} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-medium text-slate-700 md:text-[15px]">
                  {condition}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ServiceSection>
  );
}
