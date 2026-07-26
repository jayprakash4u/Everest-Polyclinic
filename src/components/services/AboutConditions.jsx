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
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutBenefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 transition-colors hover:border-primary-200 hover:bg-white md:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <ServiceIconFrame size="sm">
                    <ServicePageIcon
                      icon={benefit.icon}
                      iconSet={benefit.iconSet ?? "health"}
                      size={22}
                    />
                  </ServiceIconFrame>
                  <span className="text-xs font-bold tabular-nums text-slate-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">
                  {benefit.title}
                </h3>
                {benefit.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
