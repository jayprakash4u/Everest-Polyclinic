"use client";

import React from "react";
import { ArrowRight, Calendar, Phone } from "lucide-react";

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const HexImage = ({ src, size, style }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size * 1.15,
        overflow: "visible",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: hexClip,
          transform: "scale(1.05)",
          background: "transparent",
          boxShadow: "0 35px 65px rgba(0,0,0,0.35)",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: hexClip,
          background: "rgba(255,255,255,0.25)",
          transform: "scale(1.06)",
          filter: `
            drop-shadow(0 20px 35px rgba(0,0,0,0.25))
            drop-shadow(0 8px 15px rgba(0,0,0,0.18))
            drop-shadow(0 0 25px rgba(255,255,255,0.45))
          `,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: hexClip,
          overflow: "hidden",
          zIndex: 5,
        }}
      >
        <img
          src={src}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default function WelcomeSection() {
  return (
    <section className="bg-white overflow-hidden">
      <div className="flex items-center gap-20 px-20 py-24 mx-auto max-w-[1400px]">
        {/* TEXT CONTENT */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-[#0ea5e9]"></span>
            <p className="text-[11px] font-black text-[#0ea5e9] uppercase tracking-[4px]">
              Welcome to
            </p>
          </div>

          <h2
            className="text-[44px] font-bold text-[#0c2340] leading-[1.1] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Everest International <br />
            <span className="text-[#0ea5e9]">Polyclinic & Diagnostic</span>
          </h2>

          <p className="text-[14px] text-slate-400 font-medium italic mb-8">
            "Your Health is Our Mission"
          </p>

          <div className="space-y-5 text-slate-600 text-[15px] leading-[1.8] mb-10 max-w-xl">
            <p>
              Everest International Polyclinic & Diagnostic Centre Pvt. Ltd. is
              a multi-speciality hospital established in 2070 B.S. in Nepalgunj.
            </p>
            <p>
              We are committed to delivering high-quality, ethical, and
              patient-centered healthcare services with modern diagnostic
              facilities and experienced medical professionals.
            </p>
          </div>

          {/* MODERNIZED ACTION ZONE */}
          <div className="flex items-center gap-8">
            <button className="group relative flex items-center gap-3 bg-[#0c2340] text-white px-8 py-4 rounded-full font-bold text-[13px] tracking-wider transition-all hover:bg-[#0ea5e9] hover:shadow-xl hover:shadow-sky-200">
              <Calendar
                size={18}
                className="text-[#0ea5e9] group-hover:text-white transition-colors"
              />
              BOOK APPOINTMENT
              <ArrowRight
                size={16}
                className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
            </button>

            <a href="#" className="group flex flex-col">
              <span className="text-[12px] font-bold text-[#0c2340] tracking-tight group-hover:text-[#0ea5e9] transition-colors">
                Explore Our Services
              </span>
              <span className="h-[2px] w-4 bg-[#0ea5e9] transition-all group-hover:w-full"></span>
            </a>
          </div>
        </div>

        {/* HEX SECTION - Exact positions preserved */}
        <div className="relative w-[420px] h-[420px] shrink-0">
          <HexImage
            src="/images/main-medical.jpg"
            size={300}
            style={{ top: 0, left: 60 }}
          />
          <HexImage
            src="/images/patient-first.jpg"
            size={160}
            style={{ bottom: 20, right: 0 }}
          />
          <HexImage
            src="/images/trusted-care.jpg"
            size={170}
            style={{ top: 200, left: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
