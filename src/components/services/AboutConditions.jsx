import { Square } from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";

export default function AboutConditions({ page }) {
  const { title, about, aboutBenefits, conditions, sections } = page;
  const aboutMeta = sections.about;

  if (!about.length && !conditions.length && !aboutBenefits.length) return null;

  const hasBenefitGrid = aboutBenefits.length > 0;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {hasBenefitGrid ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              {aboutMeta.eyebrow ? (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  {aboutMeta.eyebrow}
                </p>
              ) : null}
              <h2
                className={`font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl ${aboutMeta.eyebrow ? "mt-3" : ""}`}
              >
                {aboutMeta.title}
              </h2>
              <div className="mt-8 space-y-5">
                {about.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-8 text-slate-600 md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutBenefits.map((benefit) => (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200/80 bg-[#f8fafc] p-5 transition hover:border-primary-200 hover:shadow-md"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-200 bg-white text-primary-600 md:h-[4.5rem] md:w-[4.5rem]">
                    <ServicePageIcon
                      icon={benefit.icon}
                      iconSet={benefit.iconSet ?? "health"}
                      size={32}
                    />
                  </div>
                  <h3 className="font-heading text-base font-bold text-[#1a3a5c]">
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
          </div>
        ) : (
          <>
            {about.length ? (
              <div className="max-w-3xl">
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl">
                  {aboutMeta.title}
                </h2>
                <div className="mt-8 space-y-5">
                  {about.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-8 text-slate-600 md:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}

            {conditions.length ? (
              <div className={about.length ? "mt-16 border-t border-slate-100 pt-16" : ""}>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl">
                  Conditions We Treat
                </h2>
                <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {conditions.map((condition) => (
                    <li
                      key={condition}
                      className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-4 shadow-sm transition hover:border-primary-200 hover:shadow-md"
                    >
                      <Square
                        size={16}
                        className="shrink-0 text-primary-500"
                        strokeWidth={2}
                      />
                      <span className="text-sm font-medium text-slate-700 md:text-base">
                        {condition}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
