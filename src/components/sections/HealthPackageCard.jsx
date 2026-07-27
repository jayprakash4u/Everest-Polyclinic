"use client";

import { cn } from "@/lib/utils";

function formatPrice(amount) {
  return amount.toLocaleString("en-IN");
}

function TestList({ tests }) {
  return (
    <ul className="space-y-1.5 text-[11px] leading-relaxed text-text sm:space-y-2 sm:text-[13px]">
      {tests.map((test, index) => {
        if (typeof test === "string") {
          return (
            <li key={index} className="flex gap-1.5 sm:gap-2">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary-500 sm:mt-[7px] sm:h-1.5 sm:w-1.5" />
              <span className="min-w-0 break-words">{test}</span>
            </li>
          );
        }

        return (
          <li key={index}>
            <div className="flex gap-1.5 font-medium text-text-dark sm:gap-2">
              <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-secondary-500 sm:mt-[7px] sm:h-1.5 sm:w-1.5" />
              <span className="min-w-0 break-words">{test.label}</span>
            </div>
            <ul className="mt-1 space-y-1 pl-3 sm:mt-1.5 sm:pl-4">
              {test.items.map((item, subIndex) => (
                <li key={subIndex} className="flex gap-1.5 text-text-light sm:gap-2">
                  <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary-200 sm:mt-[7px]" />
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
      {/* Header — primary blue brand gradient */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-3 pb-7 pt-4 sm:px-4 sm:pb-8 sm:pt-6">
        {pkg.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-secondary-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-secondary-700 sm:left-3 sm:top-3 sm:px-2.5 sm:text-[10px]">
            {pkg.badge}
          </span>
        )}

        <h3 className="font-heading pr-2 text-[13px] font-bold leading-snug text-white sm:pr-16 sm:text-base">
          {pkg.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-end gap-1.5 sm:mt-3 sm:gap-2">
          <div className="flex items-baseline gap-0.5 sm:gap-1">
            <span className="text-[10px] font-semibold text-primary-100 sm:text-xs">
              NRs.
            </span>
            <span className="text-lg font-black tracking-tight text-white sm:text-2xl">
              {formatPrice(pkg.price)}
            </span>
          </div>
          {pkg.originalPrice && (
            <span className="pb-0.5 text-[10px] text-primary-200 line-through sm:text-xs">
              {formatPrice(pkg.originalPrice)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <span className="mt-1 inline-flex rounded-full bg-secondary-500 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-white sm:mt-1.5 sm:px-2 sm:text-[10px]">
            Save {savings}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onBookNow?.(pkg)}
          className="absolute bottom-0 right-2 translate-y-1/2 rounded-md bg-secondary-600 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-md transition-all duration-200 hover:bg-secondary-700 group-hover:shadow-lg sm:right-3 sm:rounded-lg sm:px-4 sm:py-2 sm:text-[11px]"
        >
          Book Now
        </button>
      </div>

      {/* Test list */}
      <div className="package-test-list flex-1 overflow-y-auto px-3 pb-3 pt-5 sm:px-4 sm:pb-4 sm:pt-6">
        <TestList tests={pkg.tests} />
      </div>
    </article>
  );
}
