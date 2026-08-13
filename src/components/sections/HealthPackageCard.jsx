"use client";

import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function formatPrice(amount) {
  return amount.toLocaleString("en-IN");
}

/** Groups like `{ label, items[] }` count as their label plus each nested test. */
function flattenTestLabels(tests) {
  return tests.flatMap((test) => {
    if (typeof test === "string") return [test];
    return [test.label, ...(test.items ?? [])];
  });
}

const VISIBLE_TESTS = 3;

/*
  Two skins for one card.

  `default` is the clean white tile — a real slate-200 border rather than a
  faint one, because definition is what makes a card look built instead of
  floated. `featured` inverts to navy so exactly one card in the row carries
  weight. Keeping both skins in one table means a colour can never be updated
  on one variant and forgotten on the other, which is what happens when this
  kind of thing is written as conditionals inline in the markup.
*/
const TONES = {
  default: {
    card: "border-slate-200 bg-white hover:border-primary-300",
    badge: "bg-primary-50 text-primary-700 ring-primary-100",
    title: "text-slate-900",
    pricePanel: "bg-slate-50",
    currency: "text-slate-500",
    price: "text-slate-900",
    struck: "text-slate-400",
    save: "bg-secondary-50 text-secondary-700 ring-secondary-200",
    countLabel: "text-slate-500",
    rule: "bg-slate-200",
    test: "text-slate-600",
    checkDisc: "bg-secondary-50 text-secondary-600",
    more: "text-primary-600",
    button: "primary",
  },
  featured: {
    card: "border-primary-900 bg-primary-900 hover:border-primary-800",
    badge: "bg-secondary-400/15 text-secondary-300 ring-secondary-400/30",
    title: "text-white",
    // Scale steps only, not `bg-white/[0.07]` — `white` is declared as an
    // object in tailwind.config.js and arbitrary opacity silently emits no
    // rule against it, leaving this panel with no background at all.
    pricePanel: "bg-white/10",
    currency: "text-white/60",
    price: "text-white",
    struck: "text-white/45",
    save: "bg-secondary-400/15 text-secondary-300 ring-secondary-400/30",
    countLabel: "text-white/60",
    rule: "bg-white/15",
    test: "text-white/80",
    checkDisc: "bg-secondary-400/20 text-secondary-300",
    more: "text-secondary-300",
    button: "primary",
  },
};

export default function HealthPackageCard({
  pkg,
  onBookNow,
  featured = false,
  className,
}) {
  const savings = pkg.originalPrice
    ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
    : null;

  const labels = flattenTestLabels(pkg.tests ?? []);
  const hidden = Math.max(0, labels.length - VISIBLE_TESTS);
  const t = featured ? TONES.featured : TONES.default;

  return (
    <article
      className={cn(
        // p-3.5 at base so the card survives the 2-up grid on /health-packages
        // at 320px; roomier once there's space for it.
        "group flex h-full w-full flex-col rounded-2xl border p-3.5 transition duration-300 hover:-translate-y-1 sm:p-5 lg:p-6",
        // A real resting shadow. The old shadow-e1 was 0.04 alpha — invisible,
        // so the cards had no presence to lift from on hover.
        featured ? "shadow-e2" : "shadow-e1 hover:shadow-e2",
        t.card,
        className,
      )}
    >
      {/* The only marker on the card — savings and test count are plain text,
          so a badge here still means something. */}
      {pkg.badge ? (
        <span
          className={cn(
            "mb-2.5 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1 ring-inset",
            t.badge,
          )}
        >
          {pkg.badge}
        </span>
      ) : null}

      <h3
        className={cn(
          "text-sm font-semibold leading-snug tracking-[-0.01em] sm:text-base lg:text-lg",
          t.title,
        )}
      >
        <span className="line-clamp-2">{pkg.name}</span>
      </h3>

      {/*
        Price sits in its own panel. Flat on the card it was the same weight and
        colour as the name and the test list, so the number patients actually
        compare on had to be hunted for.
      */}
      <div
        className={cn(
          "mt-3 rounded-xl px-3 py-2.5 sm:mt-4 sm:px-3.5 sm:py-3",
          t.pricePanel,
        )}
      >
        <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.08em] sm:text-[11px]",
              t.currency,
            )}
          >
            NRs
          </span>
          <span
            className={cn(
              "font-heading text-xl font-semibold tracking-[-0.01em] sm:text-2xl lg:text-3xl",
              t.price,
            )}
          >
            {formatPrice(pkg.price)}
          </span>
          {pkg.originalPrice ? (
            <span className={cn("text-xs line-through", t.struck)}>
              {formatPrice(pkg.originalPrice)}
            </span>
          ) : null}
        </div>

        {/* A discount is a status, so it earns the pill the eyebrow style
            reserves — as plain green text it read as one more line of copy. */}
        {savings > 0 ? (
          <span
            className={cn(
              "mt-1.5 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.06em] ring-1 ring-inset sm:text-[11px]",
              t.save,
            )}
          >
            Save {savings}%
          </span>
        ) : null}
      </div>

      <div className="mt-3.5 flex-1 sm:mt-4">
        {/* Lead with the count — it's what patients compare packages on. The
            rule turns a bare line of text into a section marker. */}
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-[10px] font-bold uppercase tracking-[0.08em] sm:text-[11px]",
              t.countLabel,
            )}
          >
            {labels.length} {labels.length === 1 ? "test" : "tests"}
          </span>
          <span className={cn("h-px flex-1", t.rule)} />
        </div>

        <ul
          className={cn(
            "mt-2.5 space-y-1.5 text-xs leading-relaxed sm:mt-3 sm:space-y-2 sm:text-sm",
            t.test,
          )}
        >
          {labels.slice(0, VISIBLE_TESTS).map((label, index) => (
            <li key={`${label}-${index}`} className="flex items-start gap-1.5 sm:gap-2">
              <span
                className={cn(
                  "mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full sm:mt-0.5",
                  t.checkDisc,
                )}
              >
                <Check className="h-2.5 w-2.5" strokeWidth={3} />
              </span>
              <span className="min-w-0 line-clamp-1">{label}</span>
            </li>
          ))}
        </ul>

        {hidden > 0 ? (
          <p
            className={cn(
              "mt-2 pl-[22px] text-xs font-medium sm:pl-6",
              t.more,
            )}
          >
            +{hidden} more
          </p>
        ) : null}
      </div>

      <Button
        type="button"
        onClick={() => onBookNow?.(pkg)}
        variant={t.button}
        fullWidth
        size="sm"
        className="mt-4 sm:mt-5"
      >
        Book Now
      </Button>
    </article>
  );
}
