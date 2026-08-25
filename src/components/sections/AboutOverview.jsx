import { Check } from "lucide-react";
import Section from "@/components/ui/Section";
import { SERVICES } from "@/constants/services/catalog";
import { SITE, STATS, WHY_CHOOSE_US } from "@/constants";

/*
 * A two-card overview: who the clinic is, and what it treats — followed by
 * the same proof numbers used elsewhere on the site.
 *
 * Every figure here is a real one already established somewhere else in the
 * codebase, not written fresh for this section: the four highlight tiles are
 * the first four entries of `WHY_CHOOSE_US` (same copy as the homepage's
 * "Why Everest" grid), the service list is the actual catalog, and the stat
 * row is `STATS` (same numbers as the Hero and TrustBand). Nothing is
 * invented for this one card the way a competitor's site might list its own
 * department names or booking counts — those aren't ours to reuse.
 */
const HIGHLIGHTS = WHY_CHOOSE_US.slice(0, 4);

export default function AboutOverview() {
  return (
    // Stays "muted" even sitting right below OurValues (also muted): both
    // sections' actual content is a set of *white* cards, which need the
    // tinted backdrop for contrast — switching either to "white" tone would
    // put white cards on a white section and lose that contrast. The two
    // sections merging into one long tinted band is fine here since each
    // still carries its own heading ("Our Values" / "Who We Are") to mark
    // where it starts.
    <Section tone="muted">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* ── Who we are ── */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-e1 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.01em] text-primary-900">
            Who We Are
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            <span className="font-semibold text-primary-900">{SITE.name}</span>{" "}
            is committed to delivering reliable healthcare and diagnostic
            services in {SITE.address}. We believe every patient deserves
            quality care with respect, transparency, and safety.
          </p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <dt className="text-sm font-semibold text-primary-900">
                  {item.title}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-slate-600">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── Services (the catalog, not an invented department list) ── */}
        <div className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-e1 sm:p-8">
          <h2 className="font-heading text-2xl font-semibold tracking-[-0.01em] text-primary-900">
            Services
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            We offer multi-speciality consultation and diagnostic services
            under one roof.
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <span className="flex items-center gap-2 rounded-full border border-secondary-100 bg-secondary-50 px-4 py-2.5 text-sm font-medium text-primary-900">
                  <Check
                    className="h-4 w-4 shrink-0 text-secondary-600"
                    strokeWidth={2.5}
                  />
                  <span className="truncate">{service.title}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── The same proof numbers as the Hero and TrustBand ── */}
      <dl className="mt-6 grid grid-cols-2 gap-3 lg:mt-8 lg:grid-cols-4 lg:gap-4">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200/70 bg-white px-4 py-6 text-center shadow-e1"
          >
            <dt className="font-heading text-2xl font-bold text-primary-700 sm:text-3xl">
              {value}
            </dt>
            <dd className="mt-1 text-sm font-medium text-slate-700">{label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
