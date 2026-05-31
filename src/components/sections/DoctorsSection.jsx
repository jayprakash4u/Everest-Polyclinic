"use client";

import React, { useState } from "react";
import {
  Phone,
  Clock,
  GraduationCap,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * DoctorCarouselSection Component
 * Featuring a 2-card group movement, specific lab color palettes,
 * and a minimalist, professional design for Cutis Path Lab.
 */
export default function DoctorCarouselSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Mock data - replace with your actual API or database fetch
  const doctors = Array(10).fill({
    name: "Dr. John Smith",
    degree: "MBBS, MD",
    specialist: "General Surgeon",
    timing: "10:00 AM - 04:00 PM",
    phone: "+91 00000 00000",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200",
  });

  const cardWidth = 210; // Width of one card in pixels
  const gap = 16; // Gap between cards in pixels (gap-4)
  const moveAmount = (cardWidth + gap) * 2; // Amount to translate for 2 cards

  const nextSlide = () => {
    // Prevents sliding past the end (showing 2 cards at once)
    if (currentIndex < doctors.length - 2) {
      setCurrentIndex((prev) => prev + 2);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 2);
    }
  };

  return (
    <section className="w-full bg-white py-12 px-4 overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        {/* --- SECTION HEADER --- */}
        <div className="mb-10 px-2">
          <h2 className="text-xl font-bold text-[#0a2342] uppercase tracking-tight">
            Our Specialists
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-[2px] bg-[#2FA84F]"></div>
            <p className="text-[11px] font-semibold text-[#4c95b8] uppercase tracking-wider">
              Expert care for your health
            </p>
          </div>
        </div>

        {/* --- CAROUSEL VIEWPORT --- */}
        <div className="relative flex items-center px-2">
          {/* Navigation: Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 z-20 p-2 rounded-full shadow-lg border transition-all transform -translate-x-1/2 ${
              currentIndex === 0
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-[#1E5FA8] border-[#d4e4ee] hover:bg-[#f0f7fa] hover:scale-110 active:scale-95"
            }`}
            aria-label="Previous Specialists"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Masking Container */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentIndex / 2) * moveAmount}px)`,
              }}
            >
              {doctors.map((doc, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-[210px] mr-4 bg-[#f0f7fa] rounded-[24px] border border-[#d4e4ee] transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-[#2FA84F]/30 group"
                >
                  {/* Hexagon Profile Image */}
                  <div className="relative h-28 flex items-center justify-center mt-3">
                    <div
                      className="w-20 h-20 bg-[#1E5FA8] p-[2px] transition-transform duration-300 group-hover:scale-105"
                      style={{
                        clipPath:
                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      }}
                    >
                      <div
                        className="w-full h-full bg-white"
                        style={{
                          clipPath:
                            "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      >
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div className="p-4 pt-0 text-center">
                    <h3 className="text-[12px] font-bold text-[#0a2342] uppercase tracking-tight truncate">
                      {doc.name}
                    </h3>

                    <div className="flex flex-col items-center gap-1 mt-2">
                      <div className="flex items-center gap-1 text-[#4c95b8]">
                        <GraduationCap size={10} />
                        <span className="text-[9px] font-semibold uppercase">
                          {doc.degree}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[#2FA84F]">
                        <Stethoscope size={10} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                          {doc.specialist}
                        </span>
                      </div>
                    </div>

                    {/* Minimalist Divider */}
                    <div className="w-10 h-[1.5px] bg-[#2FA84F]/20 mx-auto my-3"></div>

                    {/* Contact & Timing Info Box */}
                    <div className="space-y-2 text-left bg-white/60 p-2 rounded-xl border border-[#d4e4ee]/50">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#f0fdfa] p-1 rounded-md">
                          <Clock size={10} className="text-[#2FA84F]" />
                        </div>
                        <span className="text-[9px] text-[#14457a] font-medium">
                          {doc.timing}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#f0f7fa] p-1 rounded-md">
                          <Phone size={10} className="text-[#1E5FA8]" />
                        </div>
                        <span className="text-[9px] text-[#14457a] font-medium">
                          {doc.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation: Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= doctors.length - 2}
            className={`absolute right-0 z-20 p-2 rounded-full shadow-lg border transition-all transform translate-x-1/2 ${
              currentIndex >= doctors.length - 2
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                : "bg-white text-[#1E5FA8] border-[#d4e4ee] hover:bg-[#f0f7fa] hover:scale-110 active:scale-95"
            }`}
            aria-label="Next Specialists"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
