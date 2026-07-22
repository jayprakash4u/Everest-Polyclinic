import ServicePageIcon from "./ServicePageIcon";

export default function ServiceOfferings({ page }) {
  const { offerings, sections } = page;
  const meta = sections.offerings;

  if (!offerings.length) return null;

  const gridClass =
    offerings.length >= 5
      ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="bg-[#f8fafc] py-20 md:py-24">
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

        <div className={`mt-14 grid grid-cols-1 gap-5 ${gridClass}`}>
          {offerings.map((offering) => (
            <article
              key={offering.title}
              className={`relative rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md md:p-7 ${
                offering.badge
                  ? "border-primary-300 ring-1 ring-primary-200"
                  : "border-slate-200/80"
              }`}
            >
              {offering.badge ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {offering.badge}
                </span>
              ) : null}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 md:h-[4.5rem] md:w-[4.5rem]">
                <ServicePageIcon
                  icon={offering.icon}
                  iconSet={offering.iconSet ?? "lucide"}
                  size={34}
                />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">
                {offering.title}
              </h3>
              {offering.price ? (
                <p className="mt-2 text-base font-bold text-primary-600">
                  {offering.price}
                </p>
              ) : null}
              {offering.features?.length ? (
                <ul className="mt-4 space-y-2 text-left text-sm leading-relaxed text-slate-600">
                  {offering.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : offering.description ? (
                <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
                  {offering.description}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
