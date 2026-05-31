"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function AmbulanceModal({ service, onClose }) {
  const data = service;

  return (
    <div className="bg-white overflow-hidden shadow-2xl flex flex-col h-full w-full border border-slate-200">
      {/* 1. STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md px-8 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-alert-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-alert-200">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="font-heading font-black text-text-dark text-lg tracking-tight uppercase">
            Emergency Response
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-slate-400"
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
        {/* 2. HERO SECTION - Clean and Unobstructed */}
        <div className="relative h-[260px] w-full bg-text-dark">
          {data.headerImage && (
            <Image
              src={data.headerImage}
              alt={data.title}
              fill
              className="object-cover opacity-80"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-text-dark via-transparent to-transparent" />
          <div className="absolute bottom-6 left-10">
            <span className="text-[10px] font-black text-alert-500 uppercase tracking-[0.3em] mb-2 block">
              Premium Service
            </span>
            <h2 className="text-white text-4xl font-heading font-bold uppercase tracking-tighter">
              {data.title}
            </h2>
          </div>
        </div>

        {/* 3. LIVE TRACKING SECTION - Dedicated Area */}
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="p-6 md:p-10">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-black text-text-dark uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Dispatch Map
              </h4>
              <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full uppercase">
                Unit: AMB-092
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
              {/* Map Preview Area */}
              <div className="md:col-span-2 h-48 bg-slate-200 relative">
                <div className="absolute inset-0 grayscale opacity-50">
                  <Image
                    src="/map-bg.jpg"
                    alt="Map View"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Animated Pulse Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-primary-600 rounded-full border-2 border-white shadow-lg relative">
                    <div className="absolute -inset-4 bg-primary-500/30 rounded-full animate-ping" />
                  </div>
                </div>
              </div>
              {/* Map Stats Area */}
              <div className="p-6 flex flex-col justify-center gap-6 bg-white">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Eta
                  </p>
                  <p className="text-xl font-heading font-black text-primary-600">
                    08 Mins
                  </p>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Distance
                  </p>
                  <p className="text-xl font-heading font-black text-text-dark">
                    2.4 KM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. CONTENT AREA */}
        <div className="p-10 space-y-12">
          {/* Service Details */}
          <section>
            <h4 className="text-sm font-black text-text-dark uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-alert-600 rounded-full" />
              Clinical Protocol
            </h4>
            <p className="text-text-dark/80 text-base leading-relaxed font-medium">
              {data.description}
            </p>
          </section>

          {/* Quick Specs - Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { l: "Response", v: "High Priority" },
              { l: "O2 Support", v: "Available" },
              { l: "Ventilator", v: "ICU Grade" },
              { l: "Staff", v: "MD/Paramedic" },
            ].map((spec, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50 border border-slate-100"
              >
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  {spec.l}
                </p>
                <p className="text-xs font-bold text-text-dark uppercase">
                  {spec.v}
                </p>
              </div>
            ))}
          </section>

          {/* Team Section */}
          {data.team && (
            <section>
              <h4 className="text-sm font-black text-text-dark uppercase tracking-widest mb-6">
                Assigned Medical Team
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.team.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 hover:border-primary-200 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-black text-text-dark uppercase">
                        {member.name}
                      </p>
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-tighter">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 5. STICKY ACTION FOOTER */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-alert-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-alert-100">
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-alert-600 uppercase tracking-widest mb-0.5">
                Emergency Helpline
              </p>
              <p className="text-2xl font-heading font-black text-text-dark">
                98XXXXXXXX
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:w-40 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest"
            >
              Enquiry
            </Button>
            <Button className="flex-1 md:w-56 h-14 rounded-xl bg-alert-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
              Call Ambulance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
