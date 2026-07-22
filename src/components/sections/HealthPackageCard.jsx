"use client";

import { cn } from "@/lib/utils";

function formatPrice(amount) {
  return amount.toLocaleString("en-IN");
}

function TestList({ tests }) {
  return (
    <ul className="space-y-2 text-[13px] leading-relaxed text-text">
      {tests.map((test, index) => {
        if (typeof test === "string") {
          return (
            <li key={index} className="flex gap-2">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
              <span>{test}</span>
            </li>
          );
        }

        return (
          <li key={index}>
            <div className="flex gap-2 font-medium text-text-dark">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
              <span>{test.label}</span>
            </div>
            <ul className="mt-1.5 space-y-1 pl-4">
              {test.items.map((item, subIndex) => (
                <li key={subIndex} className="flex gap-2 text-text-light">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary-200" />
                  <span>{item}</span>
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
        "group relative flex h-full w-full flex-col overflow-hidden rounded-card bg-white",
        "border border-primary-100 shadow-card",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-card-hover",
        className,
      )}
    >
      {/* Header — primary blue brand gradient */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 px-4 pb-8 pt-6">
        {pkg.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-secondary-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-secondary-700">
            {pkg.badge}
          </span>
        )}

        <h3 className="font-heading pr-16 text-base font-bold leading-snug text-white">
          {pkg.name}
        </h3>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-primary-100">NRs.</span>
            <span className="text-2xl font-black tracking-tight text-white">
              {formatPrice(pkg.price)}
            </span>
          </div>
          {pkg.originalPrice && (
            <span className="pb-0.5 text-xs text-primary-200 line-through">
              {formatPrice(pkg.originalPrice)}
            </span>
          )}
        </div>

        {savings > 0 && (
          <span className="mt-1.5 inline-flex rounded-full bg-secondary-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Save {savings}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onBookNow?.(pkg)}
          className="absolute bottom-0 right-3 translate-y-1/2 rounded-lg bg-secondary-600 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white shadow-md transition-all duration-200 hover:bg-secondary-700 group-hover:shadow-lg"
        >
          Book Now
        </button>
      </div>

      {/* Test list */}
      <div className="package-test-list flex-1 overflow-y-auto px-4 pb-4 pt-6">
        <TestList tests={pkg.tests} />
      </div>
    </article>
  );
}
