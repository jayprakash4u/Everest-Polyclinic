"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function DiagnosticModal({ service, onClose }) {
  const data = service;
  const [currentPackageSlide, setCurrentPackageSlide] = useState(0);

  const packages = [
    {
      name: "Full Body Checkup",
      price: "Rs. 2,500",
      tests: [
        "Complete Blood Count",
        "Liver Function Test",
        "Kidney Function Test",
        "Lipid Profile",
      ],
    },
    {
      name: "Diabetes Package",
      price: "Rs. 1,800",
      tests: [
        "Fasting & PP Sugar",
        "HbA1c (Glycosylated)",
        "Kidney Function Test",
        "Eye & Foot Checkup",
      ],
    },
    {
      name: "Heart Health Package",
      price: "Rs. 3,500",
      tests: ["ECG & 2D Echo", "Lipid Profile", "Troponin Test", "Stress Test"],
    },
    {
      name: "Women's Health Package",
      price: "Rs. 4,000",
      tests: [
        "Pap Smear Test",
        "Breast Examination",
        "Hormone Profile",
        "Bone Density Scan",
      ],
    },
    {
      name: "Senior Citizen Package",
      price: "Rs. 3,000",
      tests: [
        "Complete Health Check",
        "Vitamin D & B12",
        "Prostate/Thyroid Check",
        "Chest X-Ray & ECG",
      ],
    },
    {
      name: "Thyroid Profile",
      price: "Rs. 1,500",
      tests: [
        "T3, T4, TSH",
        "Anti-TPO Antibodies",
        "Thyroglobulin Test",
        "Ultrasound Thyroid",
      ],
    },
    {
      name: "Liver Function Package",
      price: "Rs. 2,000",
      tests: [
        "SGOT, SGPT, Bilirubin",
        "Albumin & Globulin",
        "Alkaline Phosphatase",
        "Hepatitis B & C",
      ],
    },
  ];

  const totalSlides = Math.ceil(packages.length / 3);

  const nextPackageSlide = () =>
    setCurrentPackageSlide((prev) => (prev + 1) % totalSlides);
  const prevPackageSlide = () =>
    setCurrentPackageSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const interval = setInterval(nextPackageSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow-2xl flex flex-col h-full w-full border border-slate-200 antialiased">
      {/* 1. ULTRA-MODERN HEADER */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl px-10 py-6 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl rotate-3 flex items-center justify-center text-white">
              <svg
                className="w-6 h-6 -rotate-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-1.909.48H9.832c-1.13 0-2.13-.535-2.747-1.365L6 12.293V4.5a1.5 1.5 0 013 0V11h.5a3.278 3.278 0 013.242 3.242 3 3 0 11-6 0c0-.12.01-.238.03-.353"
                />
              </svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <h3 className="font-heading font-black text-slate-900 text-xl tracking-tight uppercase leading-none">
              Diagnostic Intelligence
            </h3>
            <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] mt-1.5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-pulse" />
              Global Standards Certified
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-2xl transition-all group"
        >
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:rotate-90 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto flex-1 scroll-smooth">
        {/* 2. DYNAMIC HERO */}
        <div className="relative h-[280px] w-full bg-slate-50 overflow-hidden">
          {data.headerImage && (
            <Image
              src={data.headerImage}
              alt={data.title}
              fill
              className="object-cover transition-transform duration-1000 hover:scale-105"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/40 to-transparent" />
          <div className="absolute bottom-10 left-12 max-w-lg">
            <span className="inline-block px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest mb-4 rounded">
              Medical Services
            </span>
            <h2 className="text-slate-900 text-5xl font-heading font-black uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
              {data.title}
            </h2>
          </div>
        </div>

        {/* 3. BENTO-STYLE METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-y border-slate-100">
          {[
            {
              label: "Turnaround",
              val: "Instant Reports",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              label: "Accuracy",
              val: "99.9% Precise",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              label: "Logistics",
              val: "Smart Tracking",
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
            },
            {
              label: "Support",
              val: "24/7 Helpline",
              icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-8 ${i !== 3 ? "md:border-r" : ""} border-slate-100 hover:bg-slate-50 transition-colors group`}
            >
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-primary-100 group-hover:text-primary-600 transition-all mb-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                {item.label}
              </p>
              <p className="text-[13px] font-black text-slate-900 uppercase tracking-tight">
                {item.val}
              </p>
            </div>
          ))}
        </div>

        {/* 4. CLINICAL INFRASTRUCTURE */}
        <div className="p-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-primary-600" />
                Advanced Lab Systems
              </h4>
              <p className="text-slate-500 text-base leading-relaxed font-medium mb-10">
                Our facility integrates AI-driven diagnostic analyzers with
                high-throughput robotics to deliver results that lead the
                industry in both speed and clinical depth.
              </p>
              <div className="space-y-4">
                {[
                  {
                    t: "Automated Hematology",
                    d: "Zero contamination risk with closed-vial sampling.",
                  },
                  {
                    t: "Molecular Diagnostics",
                    d: "High-sensitivity DNA/RNA pathogen detection.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-primary-200 transition-all cursor-default"
                  >
                    <h5 className="text-[11px] font-black text-slate-900 uppercase mb-2">
                      {item.t}
                    </h5>
                    <p className="text-[12px] text-slate-500 leading-snug">
                      {item.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full order-1 lg:order-2">
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1579152276503-68feae83c63b?auto=format&fit=crop&q=80"
                  alt="Lab"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                  <p className="text-white text-sm font-bold uppercase tracking-tight">
                    ISO 15189 Certified
                  </p>
                  <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">
                    International Standard for Medical Labs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. PACKAGE CAROUSEL - DARK MODE CONTRAST */}
        <div className="bg-slate-900 pt-24 pb-32 px-12 relative">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="text-white text-4xl font-heading font-black uppercase tracking-tighter">
                  Elite Health Screens
                </h3>
                <div className="flex items-center gap-3 mt-4">
                  <span className="h-[1px] w-12 bg-primary-500" />
                  <p className="text-primary-400 text-[10px] font-black uppercase tracking-[0.3em]">
                    Subsidized Diagnostic Panels
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mt-8 md:mt-0">
                <button
                  onClick={prevPackageSlide}
                  className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  <svg
                    className="w-6 h-6"
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
                <button
                  onClick={nextPackageSlide}
                  className="w-14 h-14 flex items-center justify-center border border-white/10 rounded-2xl text-white hover:bg-white hover:text-slate-900 transition-all"
                >
                  <svg
                    className="w-6 h-6"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages
                .slice(currentPackageSlide * 3, currentPackageSlide * 3 + 3)
                .map((pkg, index) => (
                  <div
                    key={index}
                    className="group relative bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white transition-all duration-500 flex flex-col h-[480px]"
                  >
                    <div className="mb-8">
                      <div className="flex justify-between items-start mb-6">
                        <span className="text-primary-500 text-[10px] font-black uppercase tracking-widest">
                          Panel ID: 0{index + 1}
                        </span>
                        <div className="text-white group-hover:text-primary-600 font-black text-xl tracking-tighter">
                          {pkg.price}
                        </div>
                      </div>
                      <h4 className="text-white group-hover:text-slate-900 text-2xl font-black leading-none uppercase tracking-tighter transition-colors">
                        {pkg.name}
                      </h4>
                    </div>

                    <div className="space-y-4 mb-10 overflow-y-auto custom-scrollbar pr-2">
                      {pkg.tests.map((test, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 shrink-0" />
                          <span className="text-white/50 group-hover:text-slate-500 text-[11px] font-bold uppercase tracking-tight">
                            {test}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Button className="w-full rounded-2xl bg-primary-600 text-white group-hover:bg-slate-900 group-hover:text-white transition-all h-14 text-[10px] font-black uppercase tracking-[0.2em]">
                        Book This Panel
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 6. CONCIERGE SERVICE */}
        <section className="px-12 -mt-16 relative z-20">
          <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
            <div className="flex items-center gap-10">
              <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-primary-600 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-600 scale-0 group-hover:scale-100 transition-transform duration-500" />
                <svg
                  className="w-10 h-10 relative z-10 group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <div>
                <h5 className="text-slate-900 font-black uppercase text-xl tracking-tighter">
                  Premier Home Collection
                </h5>
                <p className="text-slate-400 text-xs font-medium max-w-sm mt-2 leading-relaxed">
                  Skip the commute. Our specialized medical technicians provide
                  sterile sample collection in the comfort of your residence.
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              className="rounded-2xl border-2 border-slate-900 text-slate-900 h-16 px-10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all w-full lg:w-auto"
            >
              Schedule Home Visit
            </Button>
          </div>
        </section>

        {/* 7. REFINED STICKY FOOTER */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                >
                  <Image
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    width={40}
                    height={40}
                    alt="doc"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-600 flex items-center justify-center text-[10px] text-white font-black">
                +42
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] mb-1 leading-none">
                Immediate Availability
              </p>
              <p className="text-2xl font-heading font-black text-slate-900 leading-none tracking-tighter uppercase">
                Reserve Test Slot
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:w-44 h-16 rounded-2xl text-[10px] font-black uppercase tracking-widest border-slate-200 hover:bg-slate-50 transition-all"
            >
              Download Info
            </Button>
            <Button className="flex-1 md:w-64 h-16 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
