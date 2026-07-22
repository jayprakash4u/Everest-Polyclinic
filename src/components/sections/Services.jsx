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
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="bg-gray-100 py-12" id="services-list">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="font-heading text-xl font-bold text-slate-800">
            Our Services
          </h2>
          <div className="mt-2 h-0.5 w-full bg-secondary-600" />
        </div>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 ${!canScrollLeft ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!canScrollLeft}
          >
            <svg
              className="h-6 w-6"
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
            className="scrollbar-hide flex gap-6 overflow-x-auto px-14 py-4"
            style={{ scrollbarWidth: "none" }}
          >
            {SERVICES.map((service) => {
              const Icon = getServiceIcon(service.icon);

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="flex min-w-[280px] max-w-[280px] flex-shrink-0 flex-col rounded-br rounded-tl border border-slate-200 bg-white p-4 transition-all hover:border-primary-500 hover:shadow-xl"
                >
                  <div className="-mx-4 -mt-4 mb-3 bg-primary-600 px-4 py-2">
                    <h3 className="text-center font-heading text-base font-medium text-white">
                      {service.title}
                    </h3>
                  </div>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-600 text-white">
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <p className="text-center text-xs leading-relaxed text-slate-500">
                    View {service.title.toLowerCase()} services and book a
                    consultation.
                  </p>
                </Link>
              );
            })}
          </div>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-50 ${!canScrollRight ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={!canScrollRight}
          >
            <svg
              className="h-6 w-6"
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
