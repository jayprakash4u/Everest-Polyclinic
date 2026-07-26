import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import ServicePageIcon from "./ServicePageIcon";
import ServiceIconFrame from "./ServiceIconFrame";
import ServiceSection from "./ServiceSection";
import ServiceSectionHeader from "./ServiceSectionHeader";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

function PackageOfferingCard({ offering }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 md:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900 md:text-xl">
            {offering.title}
          </h3>
          {offering.price ? (
            <p className="mt-2 font-heading text-2xl font-bold text-primary-600">
              {offering.price}
            </p>
          ) : null}
        </div>
        {offering.badge ? (
          <span className="shrink-0 rounded-md bg-secondary-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-secondary-700">
            {offering.badge}
          </span>
        ) : null}
      </div>

      <div className="my-5 border-t border-slate-100" />

      {offering.features?.length ? (
        <ul className="flex-1 space-y-2.5">
          {offering.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
            >
              <Check
                size={16}
                className="mt-0.5 shrink-0 text-secondary-600"
                strokeWidth={2}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href={`/contact?package=${encodeURIComponent(offering.title)}`}
        className="mt-6 inline-flex items-center justify-center rounded-lg border border-primary-200 bg-white px-4 py-2.5 text-sm font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50"
      >
        Book appointment
      </Link>
    </article>
  );
}

export default function ServiceOfferings({ page }) {
  const { offerings, sections } = page;
  const meta = sections.offerings;

  if (!offerings.length) return null;

  const isPackageSection = offerings.every(
    (offering) => offering.price && offering.features?.length,
  );

  return (
    <ServiceSection tone="muted" id={isPackageSection ? "packages" : undefined}>
      <ServiceSectionHeader
        badge={meta.eyebrow}
        title={meta.title}
        subtitle={meta.subtitle}
      />

      <div
        className={cn(
          "mt-12 grid gap-5",
          isPackageSection
            ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {offerings.map((offering) => {
          if (isPackageSection) {
            return <PackageOfferingCard key={offering.title} offering={offering} />;
          }

          const imageSrc = offering.image
            ? encodePublicPath(offering.image)
            : null;

          return (
            <article
              key={offering.title}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              {imageSrc ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={offering.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col p-6 md:p-7">
                {!imageSrc ? (
                  <div className="mb-5">
                    <ServiceIconFrame size="md">
                      <ServicePageIcon
                        icon={offering.icon}
                        iconSet={offering.iconSet ?? "lucide"}
                        size={28}
                      />
                    </ServiceIconFrame>
                  </div>
                ) : null}

                <h3 className="font-heading text-lg font-bold leading-snug text-slate-900">
                  {offering.title}
                </h3>

                <div className="mt-4 flex-1">
                  {offering.description ? (
                    <p className="text-sm leading-relaxed text-slate-600 md:text-[15px]">
                      {offering.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </ServiceSection>
  );
}
