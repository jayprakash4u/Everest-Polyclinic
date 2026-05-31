"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES } from "@/constants";
import { SERVICE_ICON_MAP } from "./DepartmentIcons";

export default function Departments() {
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
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-4 pb-0 bg-white">
      <div className="container mx-auto px-6">
        {/* Header Implementation following sky-600 pattern */}
        <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-[2px] bg-[#0284c7]"></div>
              <span className="text-[#0284c7] text-[10px] font-bold uppercase tracking-widest">
                Our Departments
              </span>
            </div>
            <h2 className="text-3xl font-light text-slate-800">
              Specialized{" "}
              <span className="font-bold text-[#0284c7]">Diagnostic Units</span>
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className={`p-2 rounded-md border ${!canScrollLeft ? "border-slate-100 text-slate-200" : "border-slate-200 text-[#0284c7] hover:bg-slate-50"}`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-2 rounded-md border ${!canScrollRight ? "border-slate-100 text-slate-200" : "border-slate-200 text-[#0284c7] hover:bg-slate-50"}`}
              disabled={!canScrollRight}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Simplified Card List */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {SERVICES.map((service) => {
            const IconComponent = SERVICE_ICON_MAP[service.icon];
            return (
              <div
                key={service.id}
                className="min-w-[380px] flex items-stretch border border-slate-100 rounded-lg overflow-hidden hover:border-[#0284c7]/30 transition-colors bg-white"
              >
                {/* One side: Path Lab Related Images/Icons */}
                <div className="w-1/3 bg-slate-50 flex items-center justify-center border-r border-slate-100">
                  <div className="text-[#0284c7]">
                    {IconComponent && (
                      <IconComponent size={32} strokeWidth={1.2} />
                    )}
                  </div>
                </div>

                {/* Another side: Small Font Content */}
                <div className="w-2/3 p-6 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-slate-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Precision-driven diagnostic analysis and reporting for all{" "}
                    {service.title.toLowerCase()} requirements.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
