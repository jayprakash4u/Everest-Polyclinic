import {
  Award,
  Clock3,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";

const FALLBACK_ICONS = [
  Stethoscope,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Clock3,
  Award,
];

export default function WhyChooseUs({ page }) {
  const { whyChooseUs, sections } = page;
  const meta = sections.whyChooseUs;

  if (!whyChooseUs.length) return null;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          {meta.eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
              {meta.eyebrow}
            </p>
          ) : null}
          <h2
            className={`font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl ${meta.eyebrow ? "mt-3" : ""}`}
          >
            {meta.title}
          </h2>
          {meta.subtitle ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              {meta.subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {whyChooseUs.map((item, index) => {
            const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];

            return (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md"
              >
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 text-primary-600 md:h-[4.5rem] md:w-[4.5rem]">
                  {item.icon ? (
                    <ServicePageIcon
                      icon={item.icon}
                      iconSet={item.iconSet ?? "lucide"}
                      size={32}
                    />
                  ) : (
                    <FallbackIcon size={32} strokeWidth={1.75} />
                  )}
                </div>
                <h3 className="font-heading text-base font-bold text-[#1a3a5c]">
                  {item.title}
                </h3>
                {item.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
