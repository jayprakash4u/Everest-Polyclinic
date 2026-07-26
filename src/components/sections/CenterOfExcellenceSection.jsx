import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import BrandIconImage from "@/components/ui/BrandIconImage";
import { CENTERS_OF_EXCELLENCE } from "@/constants/centerOfExcellence";

function ExcellenceItem({ item }) {
  const href = item.slug ? `/services/${item.slug}` : "/contact";

  return (
    <Link
      href={href}
      className="group flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-slate-200 hover:bg-slate-50/80 sm:gap-5 sm:p-5"
    >
      <BrandIconImage
        src={item.image}
        alt={item.title}
        size={72}
        rounded="full"
        variant="brand"
        className="shadow-md ring-4 ring-primary-100/80"
      />

      <div className="min-w-0 flex-1 pt-1">
        <h3 className="font-heading text-base font-bold text-slate-900 sm:text-[17px]">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
          {item.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary-600 opacity-0 transition group-hover:opacity-100 sm:text-[13px]">
          {item.slug ? "View service" : "Contact us"}
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function CenterOfExcellenceSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-16 xl:gap-20">
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
            <div className="grid grid-cols-1 divide-y divide-slate-200/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              <div className="flex flex-col divide-y divide-slate-200/70">
                {CENTERS_OF_EXCELLENCE.slice(0, 3).map((item) => (
                  <ExcellenceItem key={item.title} item={item} />
                ))}
              </div>
              <div className="flex flex-col divide-y divide-slate-200/70">
                {CENTERS_OF_EXCELLENCE.slice(3).map((item) => (
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
