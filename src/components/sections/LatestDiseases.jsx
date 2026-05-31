"use client";

import { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Timer,
  Droplets,
  ArrowRight,
} from "lucide-react";

export default function LatestDiseases() {
  const packages = [
    {
      id: 1,
      title: "Basic Health Checkup",
      price: "Rs. 2,500",
      tests: "CBC, Blood Sugar, Lipid Profile, Liver Function",
      duration: "30-45 min",
      category: "Essential",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M9 2h6M10 2v7.5c0 .5-.2 1-.5 1.4L5.4 17.5c-.7.9-.1 2.5 1.1 2.5h11c1.2 0 1.8-1.6 1.1-2.5l-4.1-6.6c-.3-.4-.5-.9-.5-1.4V2" />
          <path d="M7 15h10" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Full Body Checkup",
      price: "Rs. 5,000",
      tests: "CBC, LFT, KFT, Lipid Profile, Thyroid, Urine",
      duration: "45-60 min",
      category: "Popular",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <circle cx="12" cy="5" r="3" />
          <path d="M6 22V11c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v11M9 22v-6m6 6v-6" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Cardiac Package",
      price: "Rs. 12,000",
      tests: "ECG, Echo, TMT, Lipid Profile, Troponin",
      duration: "60 min",
      category: "Specialized",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M19 14c1.5-1.5 2-4.5 0-6.5s-5-2-7 0c-2-2-5-2-7 0s-1.5 5 0 6.5L12 21l7-7Z" />
          <path d="M8 12h2l1-2 2 4 1-2h2" strokeOpacity="0.5" />
        </svg>
      ),
    },
    {
      id: 7,
      title: "Senior Citizen Pack",
      price: "Rs. 7,500",
      tests: "Full Body + Bone Density, ECG, Eye Checkup",
      duration: "75-90 min",
      category: "Elder Care",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M15.5 2H18c1.1 0 2 .9 2 2s-.9 2-2 2h-2.5c-1.1 0-2 .9-2 2v14" />
          <circle cx="9" cy="5" r="3" />
        </svg>
      ),
    },
    {
      id: 8,
      title: "Child Health Package",
      price: "Rs. 2,000",
      tests: "CBC, Urine, Stool Analysis, Growth Assessment",
      duration: "30 min",
      category: "Pediatric",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M9 8h6v10a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3V8Z" />
          <path d="M10 8V5c0-.6.4-1 1-1h2c.6 0 1 .4 1 1v3" />
          <path d="M11 2h2" />
        </svg>
      ),
    },
    {
      id: 9,
      title: "Wellness Booster",
      price: "Rs. 4,000",
      tests: "Immunity panel, Vitamin D, B12, Iron",
      duration: "45 min",
      category: "Wellness",
      svg: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
          <path d="M12 8v8M8 12h8" strokeOpacity="0.5" />
        </svg>
      ),
    },
  ];

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
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        {/* Navigation Header */}
        <div className="flex justify-between items-end mb-10 px-2">
          <div>
            <span className="text-[#2FA84F] text-[10px] font-bold uppercase tracking-widest">
              Diagnostic Solutions
            </span>
            <h2 className="text-2xl font-bold text-[#0a2342] mt-1">
              Health <span className="text-[#1E5FA8]">Packages</span>
            </h2>
          </div>
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2 rounded-lg border transition-all ${!canScrollLeft ? "opacity-30" : "border-[#d4e4ee] hover:bg-white hover:shadow-md"}`}
            >
              <ChevronLeft size={20} className="text-[#1E5FA8]" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-2 rounded-lg border transition-all ${!canScrollRight ? "opacity-30" : "border-[#d4e4ee] hover:bg-white hover:shadow-md"}`}
            >
              <ChevronRight size={20} className="text-[#1E5FA8]" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-10"
          style={{ scrollbarWidth: "none" }}
        >
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="min-w-[300px] bg-white rounded-b-[32px] rounded-t-[12px] p-6 border-x border-b border-slate-100 border-t-4 border-t-[#0ea5e9] transition-all duration-300 hover:shadow-xl group"
            >
              {/* Custom SVG Icon Container */}
              <div className="w-14 h-14 bg-[#f0f7fa] rounded-2xl flex items-center justify-center text-[#1E5FA8] mb-6 group-hover:bg-[#1E5FA8] group-hover:text-white transition-colors duration-300">
                {pkg.svg}
              </div>

              <div className="mb-4">
                <span className="text-[9px] font-bold text-[#2FA84F] uppercase tracking-tighter bg-[#f0fdfa] px-2 py-1 rounded-md">
                  {pkg.category}
                </span>
                <h3 className="text-[15px] font-bold text-[#0a2342] mt-3 leading-snug h-10 line-clamp-2">
                  {pkg.title}
                </h3>
              </div>

              <p className="text-[11px] text-slate-400 font-medium italic line-clamp-2 mb-6 h-8">
                {pkg.tests}
              </p>

              <div className="flex gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  <Timer size={12} className="text-[#4c95b8]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {pkg.duration}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Droplets size={12} className="text-[#4c95b8]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Fasting
                  </span>
                </div>
              </div>

              {/* Price and Book Button */}
              <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    Package Price
                  </p>
                  <p className="text-xl font-black text-[#1E5FA8] tracking-tighter">
                    {pkg.price}
                  </p>
                </div>
                <button className="bg-[#0a2342] text-white p-3 rounded-2xl hover:bg-[#2FA84F] transition-all flex items-center justify-center group/btn active:scale-95 shadow-lg">
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
