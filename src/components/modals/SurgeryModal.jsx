"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function SurgeryModal({ service, onClose }) {
  const data = service;
  const surgScrollRef = useRef(null);

  useEffect(() => {
    if (!surgScrollRef.current) return;
    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = surgScrollRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        surgScrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        surgScrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white overflow-hidden shadow-2xl flex flex-col h-full w-full border border-slate-200">
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-8 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-100">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-black text-slate-900 text-lg tracking-tight uppercase leading-none">
              Surgical Department
            </h3>
            <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mt-1">
              Advanced Operative Care
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors group"
        >
          <svg
            className="w-6 h-6 text-slate-400 group-hover:text-slate-900"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {/* 2. HERO SECTION */}
        <div className="relative h-[250px] w-full bg-slate-900">
          {data.headerImage && (
            <Image
              src={data.headerImage}
              alt={data.title}
              fill
              className="object-cover opacity-60"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-8 left-10">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-600 text-white text-[9px] font-black uppercase tracking-widest rounded">
                Modular OT
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded">
                International Standards
              </span>
            </div>
            <h2 className="text-white text-4xl font-heading font-bold uppercase tracking-tighter">
              {data.title}
            </h2>
          </div>
        </div>

        {/* 3. CORE OVERVIEW BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-slate-100">
          <div className="lg:col-span-2 p-10 border-r border-slate-100">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary-600 rounded-full" />
              Expert Surgical Care
            </h4>
            <p className="text-slate-700 text-base leading-relaxed font-medium">
              {data.description}
            </p>
          </div>
          <div className="bg-slate-50/50 p-10">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
              OT Highlights
            </h5>
            <ul className="space-y-4">
              {[
                "HEPA-Filtered Airflow",
                "C-Arm Guided Surgery",
                "Modular Sterilization",
                "24/7 Anesthesia Cover",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-xs font-bold text-slate-900"
                >
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. PROCEDURES CAROUSEL */}
        {data.surgeries && (
          <div className="py-16 px-10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">
                  Available Procedures
                </h4>
                <p className="text-xs font-bold text-primary-600 uppercase tracking-tight">
                  Specialized Surgical Wings
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    surgScrollRef.current?.scrollBy({
                      left: -350,
                      behavior: "smooth",
                    })
                  }
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-white hover:shadow-md transition-all"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    surgScrollRef.current?.scrollBy({
                      left: 350,
                      behavior: "smooth",
                    })
                  }
                  className="w-10 h-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-white hover:shadow-md transition-all"
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div
              ref={surgScrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {data.surgeries.map((category, idx) => (
                <div
                  key={idx}
                  className="min-w-[320px] bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300"
                >
                  <h5 className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                    {category.category}
                  </h5>
                  <ul className="space-y-4">
                    {category.procedures.map((procedure, pidx) => (
                      <li
                        key={pidx}
                        className="text-xs font-bold text-slate-600 flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full" />
                        {procedure}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. RECOVERY & AFTERCARE BLOCK */}
        <section className="px-10 py-16 bg-slate-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                Patient Recovery Care
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    t: "Post-Op Monitoring",
                    d: "Continuous vital signs tracking in our specialized PACU.",
                  },
                  {
                    t: "Pain Management",
                    d: "Personalized protocols for a comfortable recovery.",
                  },
                  {
                    t: "Physiotherapy",
                    d: "Early mobilization support for faster healing.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100"
                  >
                    <div className="text-primary-600 font-black text-lg">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900 uppercase mb-1">
                        {item.t}
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
                        {item.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80"
                alt="Recovery Care"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* 6. SURGICAL TEAM */}
        {data.doctors && (
          <section className="p-10">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-10 text-center">
              Senior Surgeons
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {data.doctors.map((doctor, idx) => (
                <div key={idx} className="group text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-slate-50 p-1.5 rounded-[2rem] border border-slate-100 overflow-hidden group-hover:rounded-full transition-all duration-500 shadow-sm">
                    <Image
                      src={doctor.img}
                      alt={doctor.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-[1.8rem] group-hover:rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-1">
                    {doctor.name}
                  </h5>
                  <p className="text-[10px] font-black text-primary-600 uppercase tracking-tighter">
                    {doctor.spec}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. STICKY FOOTER */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-0.5 leading-none">
                Schedule Consultation
              </p>
              <p className="text-2xl font-heading font-black text-slate-900 leading-none">
                Book Surgery
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:w-40 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200"
            >
              Enquiry
            </Button>
            <Button className="flex-1 md:w-56 h-14 rounded-xl bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-100">
              Make Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
