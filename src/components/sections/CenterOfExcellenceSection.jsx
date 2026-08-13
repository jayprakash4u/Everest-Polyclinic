import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/ui/Section";
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
        "group flex h-full rounded-xl border border-transparent transition-colors hover:border-slate-200 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
        isCompact
          ? "flex-col items-center p-3 text-center"
          : "items-start gap-4 p-4 sm:gap-5 sm:p-5",
      )}
    >
      <BrandIconImage
        src={item.image}
        alt=""
        size={isCompact ? 48 : 64}
        rounded="full"
        variant="white"
        className="shrink-0 shadow-e1 ring-1 ring-slate-200 transition-colors group-hover:ring-primary-200"
      />

      <div className={cn("min-w-0 flex-1", isCompact ? "mt-3" : "pt-0.5")}>
        <h3
          className={cn(
            "font-semibold leading-snug tracking-[-0.01em] text-slate-900 transition-colors group-hover:text-primary-700",
            isCompact ? "text-sm" : "text-base sm:text-lg",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-slate-600",
            isCompact ? "mt-1 line-clamp-2 text-xs" : "mt-1.5 text-sm",
          )}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export default function CenterOfExcellenceSection({
  items = CENTERS_OF_EXCELLENCE,
}) {
  const centers = items?.length ? items : CENTERS_OF_EXCELLENCE;

  return (
    <Section tone="muted">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            eyebrow="Specialist departments"
            title="Centers of Excellence"
            subtitle="Focused specialty care with experienced clinicians, modern diagnostics and coordinated treatment under one roof."
            className="mb-0 md:flex-col md:items-start"
          />

          <div className="mt-8 hidden lg:block">
            <Button href="/services" variant="outline">
              Browse all services
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-2 sm:p-3">
          <div className="grid grid-cols-2 gap-2 sm:hidden">
            {centers.map((item) => (
              <ExcellenceItem key={item.title} item={item} layout="compact" />
            ))}
          </div>

          <div className="hidden grid-cols-2 divide-x divide-slate-100 sm:grid">
            <div className="flex flex-col divide-y divide-slate-100">
              {centers.slice(0, 3).map((item) => (
                <ExcellenceItem key={item.title} item={item} />
              ))}
            </div>
            <div className="flex flex-col divide-y divide-slate-100">
              {centers.slice(3).map((item) => (
                <ExcellenceItem key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 lg:hidden">
        <Button href="/services" variant="outline" fullWidth>
          Browse all services
          <ArrowRight size={16} />
        </Button>
      </div>
    </Section>
  );
}
