import ServicePageIcon from "./ServicePageIcon";

export default function ServiceOfferings({ page }) {
  const { offerings, sections } = page;
  const meta = sections.offerings;

  if (!offerings.length) return null;

  const gridClass =
    offerings.length >= 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {meta.eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-600">
              {meta.eyebrow}
            </p>
          ) : null}
          <h2
            className={`font-heading text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.75rem] ${meta.eyebrow ? "mt-3.5" : "mt-2"}`}
          >
            {meta.title}
          </h2>
          {meta.subtitle ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              {meta.subtitle}
            </p>
          ) : null}
        </div>

        <div className={`mt-16 grid gap-5 ${gridClass}`}>
          {offerings.map((offering, index) => (
            <article
              key={offering.title}
              className="group relative rounded-2xl border border-slate-200/70 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] md:p-8"
            >
              <div className="absolute left-0 top-8 h-8 w-1 rounded-r-full bg-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 md:h-16 md:w-16">
                <ServicePageIcon
                  icon={offering.icon}
                  iconSet={offering.iconSet ?? "lucide"}
                  size={32}
                />
              </div>

              <h3 className="font-heading text-lg font-bold leading-snug text-slate-900 md:text-xl">
                {offering.title}
              </h3>

              {offering.price ? (
                <p className="mt-2 text-sm font-semibold text-primary-600">
                  {offering.price}
                </p>
              ) : null}

              <div className="mt-4">
                {offering.features?.length ? (
                  <ul className="space-y-2.5 text-sm leading-relaxed text-slate-600">
                    {offering.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : offering.description ? (
                  <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                    {offering.description}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
