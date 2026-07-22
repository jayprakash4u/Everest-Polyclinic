"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { SERVICES } from "@/constants/services/catalog";
import { getServiceIcon } from "@/lib/service-icons";

export default function Services() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(
        scrollRef.current.scrollLeft <
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10,
      );
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -340 : 340,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20" id="services-list">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-50/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary-50/40 blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-primary-600">
            Comprehensive Care
          </p>
          <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Our Medical Services
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-slate-500">
            From preventive care to specialized treatments, our expert team
            delivers world-class medical services under one roof.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 ${!canScrollLeft ? "invisible" : ""}`}
          >
            <svg
              className="h-5 w-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="scrollbar-hide flex gap-5 overflow-x-auto pb-4 pt-2"
            style={{ scrollbarWidth: "none" }}
          >
            {SERVICES.map((service) => {
              const Icon = getServiceIcon(service.icon);

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group relative flex w-[300px] min-w-[300px] flex-col items-center rounded-3xl border border-slate-100 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <Icon size={28} strokeWidth={1.75} />
                  </div>

                  <h3 className="font-heading text-lg font-semibold text-slate-800">
                    {service.title}
                  </h3>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors group-hover:gap-2.5">
                    Learn more
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`absolute right-0 top-[38%] z-20 -translate-y-1/2 rounded-full border border-slate-200 bg-white/90 p-3 shadow-sm backdrop-blur-md transition-all hover:scale-110 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 ${!canScrollRight ? "invisible" : ""}`}
          >
            <svg
              className="h-5 w-5 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
