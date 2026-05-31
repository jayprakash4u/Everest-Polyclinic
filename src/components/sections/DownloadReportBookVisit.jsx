"use client";

import React from "react";
import {
  Download,
  PhoneCall,
  ShieldCheck,
  User,
  MessageSquare,
  Fingerprint,
} from "lucide-react";

export default function DownloadReportBookVisit() {
  return (
    <section className="py-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Subtle Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#f0f7fa] rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT - Download Report (Modern Glass Card) */}
          <div className="lg:col-span-3 group">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 h-full overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="bg-[#1E5FA8] p-6 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <Download size={40} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider">
                  Reports
                </h3>
                <p className="text-[10px] text-sky-100 font-medium opacity-80">
                  Access your digital results
                </p>
              </div>

              <div className="p-7 space-y-5">
                <div className="relative">
                  <label className="text-[10px] font-bold text-[#1E5FA8] uppercase tracking-widest ml-1 mb-1.5 block">
                    Lab Number
                  </label>
                  <div className="relative">
                    <Fingerprint
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="e.g. CPL-9921"
                      className="w-full bg-slate-50 border-none pl-10 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#1E5FA8]/20 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="text-[10px] font-bold text-[#1E5FA8] uppercase tracking-widest ml-1 mb-1.5 block">
                    Access Key
                  </label>
                  <div className="relative">
                    <ShieldCheck
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border-none pl-10 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#1E5FA8]/20 transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                {/* Minimalist Captcha */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#1E5FA8] focus:ring-[#1E5FA8]"
                  />
                  <span className="text-[11px] font-semibold text-slate-500">
                    Security Check
                  </span>
                </div>

                <button className="w-full bg-[#1E5FA8] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-sky-200 hover:bg-[#0a2342] transition-all active:scale-95 flex items-center justify-center gap-2">
                  View Report <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* MIDDLE - Visual Branding */}
          <div className="lg:col-span-6 h-full flex flex-col gap-6">
            <div className="relative h-full rounded-[2.5rem] overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2342]/80 via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1579152276503-34e891040316?q=80&w=1200&auto=format&fit=crop"
                alt="Laboratory Facility"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-10 left-10 z-20">
                <span className="bg-[#2FA84F] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.3em]">
                  NABL Accredited
                </span>
                <h2 className="text-white text-3xl font-bold mt-4 leading-tight">
                  Precision in Every <br />
                  <span className="text-[#2FA84F]">Diagnostic Detail.</span>
                </h2>
              </div>
            </div>
          </div>

          {/* RIGHT - Request Callback */}
          <div className="lg:col-span-3 group">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 h-full overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="bg-[#2FA84F] p-6 text-white relative">
                <div className="absolute top-4 right-4 opacity-20">
                  <PhoneCall size={40} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider">
                  Expert Help
                </h3>
                <p className="text-[10px] text-emerald-100 font-medium opacity-80">
                  Free medical consultation
                </p>
              </div>

              <div className="p-7 space-y-5">
                <div className="relative">
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      className="w-full bg-slate-50 border-none pl-10 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#2FA84F]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="relative">
                    <PhoneCall
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="tel"
                      placeholder="Mobile Number"
                      className="w-full bg-slate-50 border-none pl-10 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#2FA84F]/20 transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="relative">
                    <MessageSquare
                      className="absolute left-3 top-3 text-slate-400"
                      size={16}
                    />
                    <textarea
                      placeholder="How can we help?"
                      rows={3}
                      className="w-full bg-slate-50 border-none pl-10 pr-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-[#2FA84F]/20 transition-all resize-none"
                    />
                  </div>
                </div>

                <button className="w-full bg-[#2FA84F] text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-200 hover:bg-[#1a6e32] transition-all active:scale-95">
                  Confirm Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for arrow icon
function ArrowRight({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
