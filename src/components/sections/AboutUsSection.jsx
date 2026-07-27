"use client";

import Link from "next/link";

export default function AboutUsSection() {
  return (
    <section className="relative overflow-hidden bg-white pb-12 pt-24 sm:pb-20 sm:pt-32 md:pb-32 md:pt-40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT: Text Content */}
          <div className="space-y-5 sm:space-y-8 lg:col-span-5">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 sm:gap-3 sm:text-xs">
                <span className="h-[2px] w-8 bg-primary-600 sm:w-10" />
                Since 2010
              </div>
              <h1 className="font-heading text-[1.85rem] font-black leading-[1.12] tracking-tighter text-slate-900 sm:text-4xl md:text-6xl md:leading-[1.1]">
                Redefining the <br />
                <span className="text-primary-600">Patient Experience.</span>
              </h1>
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-slate-600 sm:space-y-6 sm:text-lg">
              <p>
                Everest International Polyclinic isn&apos;t just a medical
                facility; it&apos;s a sanctuary for health. We&apos;ve combined
                world-class diagnostic precision with a &quot;human-first&quot;
                approach.
              </p>
              <div className="rounded-2xl border-l-4 border-primary-600 bg-slate-50 p-4 shadow-sm sm:rounded-3xl sm:border-l-8 sm:p-6">
                <p className="text-sm font-medium italic text-slate-800 sm:text-base">
                  &quot;We believe that healthcare should be as personal as it is
                  professional. Our mission is to bring clinical excellence
                  directly to your doorstep.&quot;
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/doctors"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary-600 active:scale-95 sm:rounded-2xl sm:px-8 sm:py-4"
              >
                Our Specialists
              </Link>
              <div className="flex items-center -space-x-3 sm:ml-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-slate-200 sm:h-10 sm:w-10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt=""
                    />
                  </div>
                ))}
                <span className="pl-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:pl-6 sm:text-xs">
                  50+ Experts
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Asymmetric Grid */}
          <div className="grid h-[280px] grid-cols-12 gap-2.5 sm:h-[400px] sm:gap-4 md:h-[600px] lg:col-span-7">
            <div className="relative col-span-7 h-full overflow-hidden rounded-2xl shadow-xl group sm:rounded-[3rem] sm:shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/about-main.jpg"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Main Clinic"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-2.5 sm:gap-4">
              <div className="relative h-1/2 overflow-hidden rounded-2xl shadow-lg group sm:rounded-[2.5rem] sm:shadow-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about-overlay.jpg"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  alt="Laboratory"
                />
              </div>
              <div className="relative flex h-1/2 flex-col justify-end overflow-hidden rounded-2xl bg-primary-600 p-4 text-white sm:rounded-[2.5rem] sm:p-8">
                <div className="relative z-10">
                  <span className="block text-2xl font-black sm:text-4xl">
                    15+
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 sm:text-xs">
                    Years of Service
                  </span>
                </div>
                <div className="absolute right-[-20px] top-[-20px] h-24 w-24 rounded-full bg-white/10 blur-2xl sm:h-32 sm:w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
