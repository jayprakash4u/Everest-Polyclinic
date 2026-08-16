import {
  Award,
  Clock3,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import ServicePageIcon from "./ServicePageIcon";
import ServiceSection from "./ServiceSection";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { cn } from "@/lib/utils";

const FALLBACK_ICONS = [
  Stethoscope,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Clock3,
  Award,
];

const CARD_BACKGROUNDS = [
  "bg-gradient-to-br from-primary-50/90 via-white to-white",
  "bg-gradient-to-br from-secondary-50/70 via-white to-white",
  "bg-gradient-to-br from-slate-50 via-white to-white",
];

function getGridClass(count) {
  if (count === 3) return "lg:grid-cols-3";
  return "";
}

export default function WhyChooseUs({ page }) {
  const { whyChooseUs, sections, title } = page;
  const meta = sections.whyChooseUs;

  if (!whyChooseUs.length) return null;

  const items = whyChooseUs.slice(0, 6);

  return (
    <ServiceSection tone="muted">
      <div className="grid gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
        <div className="lg:sticky lg:top-24">
          <ServiceSectionHeader
            badge={meta.eyebrow ?? "Why choose us"}
            title={meta.title}
            subtitle={
              meta.subtitle ??
              `Evidence-based care, clear communication, and a team focused on your comfort throughout ${title.toLowerCase()}.`
            }
            align="left"
          />

          <div className="mt-5 hidden rounded-2xl border border-white/80 bg-white p-6 shadow-sm sm:mt-8 sm:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">
              How we work
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                Listen carefully to your symptoms and history
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                Explain findings and options in plain language
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
                Plan treatment and follow-up with your goals in mind
              </li>
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "grid grid-cols-2 gap-2 sm:gap-4",
            getGridClass(items.length),
          )}
        >
          {items.map((item, index) => {
            const FallbackIcon = FALLBACK_ICONS[index % FALLBACK_ICONS.length];

            return (
              <article
                key={item.title}
                className={cn(
                  "group relative overflow-hidden rounded-xl p-2.5 sm:rounded-3xl sm:p-6 md:p-7",
                  "ring-1 ring-slate-200/70 transition duration-300",
                  "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:ring-primary-200/80",
                  CARD_BACKGROUNDS[index % CARD_BACKGROUNDS.length],
                )}
              >
                <span
                  className="pointer-events-none absolute -right-1 -top-1 select-none font-heading text-3xl font-bold leading-none text-slate-900/[0.04] sm:-top-3 sm:text-6xl"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative">
                  <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white text-primary-600 shadow-[0_6px_16px_rgba(26,85,148,0.10)] ring-1 ring-slate-200/80 transition group-hover:scale-[1.02] sm:mb-5 sm:h-14 sm:w-14 sm:rounded-2xl sm:shadow-[0_8px_24px_rgba(26,85,148,0.10)]">
                    {item.icon ? (
                      <ServicePageIcon
                        icon={item.icon}
                        iconSet={item.iconSet ?? "lucide"}
                        size={16}
                      />
                    ) : (
                      <FallbackIcon
                        className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                        strokeWidth={1.75}
                      />
                    )}
                  </div>

                  <h3 className="font-heading text-[12px] font-bold leading-snug text-slate-900 sm:text-lg md:text-xl">
                    <span className="line-clamp-2">{item.title}</span>
                  </h3>

                  {item.description ? (
                    <p className="mt-1 line-clamp-3 text-[10px] leading-snug text-slate-600 sm:mt-3 sm:line-clamp-none sm:text-sm md:text-[15px] md:leading-7">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </ServiceSection>
  );
}
