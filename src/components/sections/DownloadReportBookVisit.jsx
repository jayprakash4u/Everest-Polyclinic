"use client";

import {
  ArrowRight,
  Download,
  Fingerprint,
  MessageSquare,
  PhoneCall,
  ShieldCheck,
  User,
} from "lucide-react";

export default function DownloadReportBookVisit() {
  return (
    <section className="relative overflow-hidden bg-background-light py-12 sm:py-16 md:py-20">
      <div className="pointer-events-none absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-50 opacity-50 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-12">
          {/* Download Report */}
          <div className="lg:col-span-3">
            <div className="h-full overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl sm:rounded-[2rem]">
              <div className="relative bg-primary-600 p-5 text-white sm:p-6">
                <Download
                  size={36}
                  className="absolute right-4 top-4 opacity-20 sm:size-10"
                />
                <h3 className="text-base font-bold uppercase tracking-wider sm:text-lg">
                  Reports
                </h3>
                <p className="text-[10px] font-medium text-primary-100 opacity-80">
                  Access your digital results
                </p>
              </div>

              <div className="space-y-4 p-5 sm:space-y-5 sm:p-7">
                <div>
                  <label className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-primary-600">
                    Lab Number
                  </label>
                  <div className="relative">
                    <Fingerprint
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="e.g. EPL-9921"
                      className="w-full rounded-xl border-none bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-primary-600/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-widest text-primary-600">
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
                      className="w-full rounded-xl border-none bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-primary-600/20"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
                  />
                  <span className="text-[11px] font-semibold text-slate-500">
                    Security Check
                  </span>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-primary-200 transition-all hover:bg-primary-800 active:scale-95 sm:py-4"
                >
                  View Report <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Visual — full width on tablet, centre on desktop */}
          <div className="md:col-span-2 lg:col-span-6">
            <div className="group relative min-h-[240px] overflow-hidden rounded-[1.5rem] shadow-2xl sm:min-h-[300px] sm:rounded-[2.5rem] md:min-h-[360px] lg:h-full lg:min-h-0">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-900/80 via-transparent to-transparent" />
              <img
                src="/images/image1234.jpg"
                alt="Everest Polyclinic laboratory"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute bottom-6 left-6 z-20 sm:bottom-10 sm:left-10">
                <span className="rounded-full bg-secondary-600 px-3 py-1 text-[9px] font-black uppercase tracking-[0.3em] text-white sm:px-4 sm:py-1.5">
                  NABL Accredited
                </span>
                <h2 className="mt-3 text-xl font-bold leading-tight text-white sm:mt-4 sm:text-3xl">
                  Precision in Every <br />
                  <span className="text-secondary-400">Diagnostic Detail.</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Callback */}
          <div className="lg:col-span-3">
            <div className="h-full overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl sm:rounded-[2rem]">
              <div className="relative bg-secondary-600 p-5 text-white sm:p-6">
                <PhoneCall
                  size={36}
                  className="absolute right-4 top-4 opacity-20 sm:size-10"
                />
                <h3 className="text-base font-bold uppercase tracking-wider sm:text-lg">
                  Expert Help
                </h3>
                <p className="text-[10px] font-medium text-secondary-100 opacity-80">
                  Free medical consultation
                </p>
              </div>

              <div className="space-y-4 p-5 sm:space-y-5 sm:p-7">
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    className="w-full rounded-xl border-none bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-secondary-600/20"
                  />
                </div>

                <div className="relative">
                  <PhoneCall
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    className="w-full rounded-xl border-none bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-secondary-600/20"
                  />
                </div>

                <div className="relative">
                  <MessageSquare
                    className="absolute left-3 top-3 text-slate-400"
                    size={16}
                  />
                  <textarea
                    placeholder="How can we help?"
                    rows={3}
                    className="w-full resize-none rounded-xl border-none bg-slate-50 py-3 pl-10 pr-4 text-sm transition-all focus:ring-2 focus:ring-secondary-600/20"
                  />
                </div>

                <button
                  type="button"
                  className="w-full rounded-xl bg-secondary-600 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-secondary-200 transition-all hover:bg-secondary-700 active:scale-95 sm:py-4"
                >
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
