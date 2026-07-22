import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

function CtaWatermark() {
  return (
    <svg
      viewBox="0 0 240 320"
      className="h-full w-full text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      aria-hidden
    >
      <path d="M170 40c28 18 42 52 38 86-4 34-26 64-58 78" />
      <path d="M120 30c-34 8-58 38-62 74-4 36 12 72 42 92" />
      <circle cx="118" cy="108" r="34" />
      <path d="M72 188c8 42 34 78 72 96" />
      <path d="M164 188c-8 42-34 78-72 96" />
    </svg>
  );
}

export default function CTASection({ page }) {
  const { cta, title } = page;

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-primary-600 p-5 shadow-[0_24px_64px_rgba(26,85,148,0.28)] md:rounded-[2rem] md:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-6 bottom-0 top-0 hidden w-[38%] opacity-[0.07] md:block lg:-right-2 lg:w-[34%]">
            <CtaWatermark />
          </div>

          <div className="relative grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:min-h-[260px] lg:min-h-[300px]">
              <Image
                src={cta.image}
                alt={`Book ${title} appointment`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>

            <div className="flex flex-col justify-center py-2 lg:py-6 lg:pr-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                <Calendar size={22} strokeWidth={2} />
              </div>

              <h2 className="max-w-xl font-heading text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
                {cta.title}
              </h2>

              <p className="mt-4 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
                {cta.subtitle}
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary-600 shadow-md transition hover:bg-primary-50 hover:shadow-lg md:px-8 md:py-4"
                >
                  <Calendar size={18} strokeWidth={2} className="text-primary-600" />
                  {cta.buttonLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
