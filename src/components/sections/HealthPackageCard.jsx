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
      <ul className="space-y-1.5 text-xs leading-relaxed text-slate-600">
        {labels.slice(0, visible).map((label, index) => (
          <li key={`${label}-${index}`} className="flex gap-2">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-400" />
            <span className="min-w-0 line-clamp-1">{label}</span>
          </li>
        ))}
        {hidden > 0 ? (
          <li className="pl-3.5 text-xs font-semibold text-primary-600">
            +{hidden} more tests
          </li>
        ) : null}
      </ul>
    );
  }

  return (
    <ul className="space-y-2.5 text-sm leading-relaxed text-slate-600">
      {tests.map((test, index) => {
        if (typeof test === "string") {
          return (
            <li key={index} className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
              <span className="min-w-0 break-words">{test}</span>
            </li>
          );
        }

        return (
          <li key={index}>
            <div className="flex gap-2.5 font-semibold text-slate-800">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500" />
              <span className="min-w-0 break-words">{test.label}</span>
            </div>
            <ul className="mt-1.5 space-y-1.5 pl-4">
              {test.items.map((item, subIndex) => (
                <li key={subIndex} className="flex gap-2 text-slate-500">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary-200" />
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
        "group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg",
        className,
      )}
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {pkg.badge ? (
          <span className="mb-3 inline-flex w-fit rounded-full bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700">
            {pkg.badge}
          </span>
        ) : null}

        <h3 className="font-heading text-base font-bold leading-snug text-slate-900 sm:text-lg">
          <span className="line-clamp-2">{pkg.name}</span>
        </h3>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-semibold text-slate-500">
              NRs.
            </span>
            <span className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {formatPrice(pkg.price)}
            </span>
          </div>
          {pkg.originalPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatPrice(pkg.originalPrice)}
            </span>
          ) : null}
        </div>

        {savings > 0 ? (
          <span className="mt-2 inline-flex w-fit rounded-full bg-secondary-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-secondary-700">
            Save {savings}%
          </span>
        ) : null}

        <div className="mt-5 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Includes
          </p>
          <div className="mt-3">
            <TestList tests={pkg.tests} compact />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onBookNow?.(pkg)}
          className="mt-5 w-full rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
        >
          Book Now
        </button>
      </div>
    </article>
  );
}
