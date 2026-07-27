import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import BrandIconImage from "@/components/ui/BrandIconImage";
import { CENTERS_OF_EXCELLENCE } from "@/constants/centerOfExcellence";
import { cn } from "@/lib/utils";

function ExcellenceItem({ item, layout = "horizontal" }) {
  const href = item.slug ? `/services/${item.slug}` : "/contact";
  const isCompact = layout === "compact";

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full rounded-xl border border-transparent transition-colors hover:border-slate-200 hover:bg-slate-50/80",
        isCompact
          ? "flex-col items-center p-3 text-center"
          : "items-start gap-4 p-4 sm:gap-5 sm:p-5",
      )}
    >
      <BrandIconImage
        src={item.image}
        alt={item.title}
        size={isCompact ? 52 : 72}
        rounded="full"
        variant="brand"
        className="shrink-0 shadow-md ring-4 ring-primary-100/80"
      />

      <div className={cn("min-w-0 flex-1", isCompact ? "mt-2" : "pt-1")}>
        <h3
          className={cn(
            "font-heading font-bold leading-snug text-slate-900",
            isCompact ? "text-sm" : "text-base sm:text-[17px]",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-slate-600",
            isCompact
              ? "mt-1 line-clamp-2 text-[11px]"
              : "mt-1.5 text-sm",
          )}
        >
          {item.description}
        </p>
        {!isCompact ? (
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary-600 opacity-0 transition group-hover:opacity-100 sm:text-[13px]">
            {item.slug ? "View service" : "Contact us"}
            <ArrowRight size={14} />
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export default function CenterOfExcellenceSection({
  items = CENTERS_OF_EXCELLENCE,
}) {
  const centers = items?.length ? items : CENTERS_OF_EXCELLENCE;

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 xl:gap-20">
          <div className="lg:sticky lg:top-24">
            <SectionHeader
              badge="Specialist departments"
              badgeVariant="secondary"
              title="Center of Excellence"
              subtitle="Focused specialty care with experienced clinicians, modern diagnostics, and coordinated treatment under one roof."
              centered={false}
              className="mb-0"
            />

            <div className="mt-8 hidden lg:block">
              <Button href="/services" variant="outline" size="md">
                Browse all services
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-2 sm:p-3">
            <div className="grid grid-cols-2 gap-2 sm:hidden">
              {centers.map((item) => (
                <ExcellenceItem
                  key={item.title}
                  item={item}
                  layout="compact"
                />
              ))}
            </div>

            <div className="hidden grid-cols-2 divide-x divide-slate-200/70 sm:grid">
              <div className="flex flex-col divide-y divide-slate-200/70">
                {centers.slice(0, 3).map((item) => (
                  <ExcellenceItem key={item.title} item={item} />
                ))}
              </div>
              <div className="flex flex-col divide-y divide-slate-200/70">
                {centers.slice(3).map((item) => (
                  <ExcellenceItem key={item.title} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Button href="/services" variant="outline" size="md">
            Browse all services
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
