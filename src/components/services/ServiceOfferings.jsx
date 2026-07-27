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
    <article className="flex h-full flex-col rounded-xl border border-slate-200/80 bg-white p-3.5 sm:rounded-2xl sm:p-6 md:p-7">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div>
          <h3 className="font-heading text-sm font-bold leading-snug text-slate-900 sm:text-lg md:text-xl">
            {offering.title}
          </h3>
          {offering.price ? (
            <p className="mt-1.5 font-heading text-lg font-bold text-primary-600 sm:mt-2 sm:text-2xl">
              {offering.price}
            </p>
          ) : null}
        </div>
        {offering.badge ? (
          <span className="shrink-0 rounded-md bg-secondary-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-secondary-700 sm:px-2.5 sm:py-1 sm:text-[11px]">
            {offering.badge}
          </span>
        ) : null}
      </div>

      <div className="my-3 border-t border-slate-100 sm:my-5" />

      {offering.features?.length ? (
        <ul className="flex-1 space-y-1.5 sm:space-y-2.5">
          {offering.features.map((feature) => (
            <li
              key={feature}
              className="flex gap-1.5 text-[11px] leading-relaxed text-slate-600 sm:gap-2.5 sm:text-sm"
            >
              <Check
                size={14}
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
        className="mt-4 inline-flex items-center justify-center rounded-lg border border-primary-200 bg-white px-3 py-2 text-[11px] font-semibold text-primary-700 transition hover:border-primary-300 hover:bg-primary-50 sm:mt-6 sm:px-4 sm:py-2.5 sm:text-sm"
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
          "mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-5",
          isPackageSection ? "md:grid-cols-2 xl:grid-cols-3" : "lg:grid-cols-3",
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
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md sm:rounded-2xl"
            >
              {imageSrc ? (
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={imageSrc}
                    alt={offering.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : null}

              <div className="flex flex-1 flex-col p-3 sm:p-6 md:p-7">
                {!imageSrc ? (
                  <div className="mb-2.5 sm:mb-5">
                    <ServiceIconFrame
                      size="md"
                      className="h-9 w-9 rounded-xl sm:h-14 sm:w-14 sm:rounded-2xl"
                    >
                      <ServicePageIcon
                        icon={offering.icon}
                        iconSet={offering.iconSet ?? "lucide"}
                        size={18}
                      />
                    </ServiceIconFrame>
                  </div>
                ) : null}

                <h3 className="font-heading text-[13px] font-bold leading-snug text-slate-900 sm:text-lg">
                  {offering.title}
                </h3>

                <div className="mt-2 flex-1 sm:mt-4">
                  {offering.description ? (
                    <p className="text-[11px] leading-relaxed text-slate-600 sm:text-sm md:text-[15px]">
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
