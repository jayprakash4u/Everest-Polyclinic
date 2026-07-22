"use client";

import { useEffect, useRef, useState } from "react";
import {
  Phone,
  Clock,
  GraduationCap,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DoctorsSection({ specialists = [] }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const doctors = specialists.length > 0 ? specialists : [];

  const checkScroll = () => {
    if (!scrollRef.current) return;
    setCanScrollLeft(scrollRef.current.scrollLeft > 0);
    setCanScrollRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10,
    );
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [doctors.length]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = Math.min(scrollRef.current.clientWidth * 0.9, 440);
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden bg-white py-10 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg font-bold uppercase tracking-tight text-text-dark sm:text-xl">
            Our Specialists
          </h2>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-0.5 w-8 bg-secondary-500" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-400">
              Expert care for your health
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous specialists"
            className={cn(
              "absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2 shadow-lg transition-all sm:-left-3",
              !canScrollLeft
                ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                : "border-primary-100 bg-white text-primary-600 hover:bg-primary-50",
            )}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next specialists"
            className={cn(
              "absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full border p-2 shadow-lg transition-all sm:-right-3",
              !canScrollRight
                ? "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300"
                : "border-primary-100 bg-white text-primary-600 hover:bg-primary-50",
            )}
          >
            <ChevronRight size={22} />
          </button>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 py-2 sm:px-10"
          >
            {doctors.map((doc) => (
              <div
                key={doc.id ?? doc.name}
                className="w-[min(78vw,210px)] shrink-0 snap-center rounded-[24px] border border-primary-100 bg-primary-50 transition-all duration-300 hover:border-secondary-500/30 hover:bg-white hover:shadow-xl sm:w-[210px]"
              >
                <div className="relative mt-3 flex h-28 items-center justify-center">
                  <div
                    className="h-20 w-20 bg-primary-600 p-[2px] transition-transform duration-300 hover:scale-105"
                    style={{
                      clipPath:
                        "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                    }}
                  >
                    <div
                      className="h-full w-full bg-white"
                      style={{
                        clipPath:
                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      }}
                    >
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 text-center">
                  <h3 className="truncate text-xs font-bold uppercase tracking-tight text-text-dark">
                    {doc.name}
                  </h3>

                  <div className="mt-2 flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-primary-400">
                      <GraduationCap size={10} />
                      <span className="text-[9px] font-semibold uppercase">
                        {doc.degree}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary-600">
                      <Stethoscope size={10} />
                      <span className="text-[9px] font-bold uppercase tracking-wider">
                        {doc.specialist}
                      </span>
                    </div>
                  </div>

                  <div className="mx-auto my-3 h-[1.5px] w-10 bg-secondary-500/20" />

                  <div className="space-y-2 rounded-xl border border-primary-100/50 bg-white/60 p-2 text-left">
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-secondary-50 p-1">
                        <Clock size={10} className="text-secondary-600" />
                      </div>
                      <span className="text-[9px] font-medium text-primary-800">
                        {doc.timing}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-md bg-primary-50 p-1">
                        <Phone size={10} className="text-primary-600" />
                      </div>
                      <span className="text-[9px] font-medium text-primary-800">
                        {doc.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
