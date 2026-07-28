"use client";

import { cn } from "@/lib/utils";

function formatPrice(amount) {
  return amount.toLocaleString("en-IN");
}

function flattenTestLabels(tests) {
  return tests.flatMap((test) => {
    if (typeof test === "string") return [test];
    return [test.label, ...(test.items ?? [])];
  });
}

function TestList({ tests, compact = false }) {
  if (compact) {
    const labels = flattenTestLabels(tests);
    const visible = 4;
    const hidden = Math.max(0, labels.length - visible);

    return (
      <ul className="space-y-1 text-[10px] leading-snug text-text">
        {labels.slice(0, visible).map((label, index) => (
          <li key={`${label}-${index}`} className="flex gap-1.5">
            <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full bg-primary-500" />
            <span className="min-w-0 line-clamp-1">{label}</span>
          </li>
        ))}
        {hidden > 0 ? (
          <li className="pl-2.5 text-[10px] font-semibold text-primary-600">
            +{hidden} more tests
          </li>
        ) : null}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 text-[13px] leading-relaxed text-text">
      {tests.map((test, index) => {
        if (typeof test === "string") {
          return (
            <li key={index} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <span className="min-w-0 break-words">{test}</span>
            </li>
          );
        }

        return (
          <li key={index}>
            <div className="flex gap-2 font-medium text-text-dark">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
              <span className="min-w-0 break-words">{test.label}</span>
            </div>
            <ul className="mt-1.5 space-y-1 pl-4">
              {test.items.map((item, subIndex) => (
                <li key={subIndex} className="flex gap-2 text-text-light">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary-200" />
                  <span className="min-w-0 break-words">{item}</span>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

export default function HealthPackageCard({ pkg, onBookNow, className }) {
  const savings = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null;

  return (
    <article
      className={cn(
        "group relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-white sm:rounded-card",
        "border border-primary-100 shadow-card",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover",
        className,
      )}
    >
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-2.5 pb-5 pt-2.5 sm:px-4 sm:pb-8 sm:pt-6">
        {pkg.badge ? (
          <span className="absolute left-1.5 top-1.5 rounded bg-secondary-100 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-secondary-700 sm:left-3 sm:top-3 sm:rounded-full sm:px-2.5 sm:text-[10px]">
            {pkg.badge}
          </span>
        ) : null}

        <h3
          className={cn(
            "font-heading text-[12px] font-bold leading-snug text-white sm:pr-16 sm:text-base",
            pkg.badge ? "mt-3.5 sm:mt-0" : "",
          )}
        >
          <span className="line-clamp-2">{pkg.name}</span>
        </h3>

        <div className="mt-1.5 flex flex-wrap items-end gap-1 sm:mt-3 sm:gap-2">
          <div className="flex items-baseline gap-0.5 sm:gap-1">
            <span className="text-[9px] font-semibold text-primary-100 sm:text-xs">
              NRs.
            </span>
            <span className="text-base font-black tracking-tight text-white sm:text-2xl">
              {formatPrice(pkg.price)}
            </span>
          </div>
          {pkg.originalPrice ? (
            <span className="pb-0.5 text-[9px] text-primary-200 line-through sm:text-xs">
              {formatPrice(pkg.originalPrice)}
            </span>
          ) : null}
        </div>

        {savings > 0 ? (
          <span className="mt-1 inline-flex rounded bg-secondary-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wide text-white sm:mt-1.5 sm:rounded-full sm:px-2 sm:text-[10px]">
            Save {savings}%
          </span>
        ) : null}

        <button
          type="button"
          onClick={() => onBookNow?.(pkg)}
          className="absolute bottom-0 right-1.5 translate-y-1/2 rounded-md bg-secondary-600 px-2 py-1 text-[8px] font-bold uppercase tracking-wide text-white shadow-md transition-all duration-200 hover:bg-secondary-700 group-hover:shadow-lg sm:right-3 sm:rounded-lg sm:px-4 sm:py-2 sm:text-[11px]"
        >
          Book
          <span className="hidden sm:inline"> Now</span>
        </button>
      </div>

      {/* Mobile: capped preview; desktop: scrollable full list */}
      <div className="flex-1 px-2.5 pb-2.5 pt-4 sm:hidden">
        <TestList tests={pkg.tests} compact />
      </div>
      <div className="package-test-list hidden flex-1 overflow-y-auto px-4 pb-4 pt-6 sm:block">
        <TestList tests={pkg.tests} />
      </div>
    </article>
  );
}
