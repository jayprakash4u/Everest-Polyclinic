"use client";

import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import { TESTIMONIALS } from "@/constants";

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#fcfdfe] overflow-hidden relative">
      {/* Structural Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
        <div className="absolute top-24 -left-20 w-96 h-96 bg-[#0284c7]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-24 -right-20 w-96 h-96 bg-[#2FA84F]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-[#2FA84F] text-[11px] font-black uppercase tracking-[0.3em] mb-3 block">
              Patient Trust
            </span>
            <h2 className="text-4xl font-bold text-[#0f172a] tracking-tight">
              Voices of <span className="text-[#0284c7]">Care</span>
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
              <span className="text-[#0284c7] font-bold">4.9/5</span> Rating
              Based on 2,000+ Reviews
            </div>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="break-inside-avoid">
              <Card className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(2,132,199,0.15)] hover:border-[#0284c7]/20 cursor-default">
                {/* Floating Quote Accent */}
                <div className="absolute top-6 right-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  <Quote
                    size={80}
                    fill="currentColor"
                    className="text-[#0f172a]"
                  />
                </div>

                {/* Star Rating - Clean and Small */}
                <div className="flex gap-0.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${i < t.rating ? "text-amber-400 fill-current" : "text-slate-200"}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="relative">
                  <p className="text-slate-600 text-[15px] leading-[1.8] font-medium mb-8">
                    "{t.review}"
                  </p>
                </blockquote>

                <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center text-[#0284c7] font-black text-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                      {t.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2FA84F] border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0f172a] text-[13px] tracking-tight">
                      {t.name}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
