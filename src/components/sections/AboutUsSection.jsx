'use client';
import React from 'react';

export default function AboutUsSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Text Content (Occupies 5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-primary-600 font-black uppercase tracking-[0.2em] text-xs">
                <span className="w-10 h-[2px] bg-primary-600"></span>
                Since 2010
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 leading-[1.1] tracking-tighter">
                Redefining the <br />
                <span className="text-primary-600">Patient Experience.</span>
              </h1>
            </div>

            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
              <p>
                Everest International Polyclinic isn't just a medical facility; it's a sanctuary for health. 
                We've combined world-class diagnostic precision with a "human-first" approach.
              </p>
              <div className="bg-slate-50 p-6 rounded-3xl border-l-8 border-primary-600 shadow-sm">
                <p className="italic font-medium text-slate-800">
                  "We believe that healthcare should be as personal as it is professional. 
                  Our mission is to bring clinical excellence directly to your doorstep."
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary-600 transition-all shadow-xl active:scale-95">
                Our Specialists
              </button>
              <div className="flex -space-x-3 items-center ml-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="doctor" />
                  </div>
                ))}
                <span className="pl-6 text-xs font-bold text-slate-400 uppercase tracking-widest">50+ Experts</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Asymmetric Grid (Occupies 7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 h-[500px] md:h-[600px]">
            <div className="col-span-7 h-full relative rounded-[3rem] overflow-hidden shadow-2xl group">
              <img
                src="/images/about-main.jpg"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                alt="Main Clinic"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <div className="h-1/2 relative rounded-[2.5rem] overflow-hidden shadow-xl group">
                <img
                  src="/images/about-overlay.jpg"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  alt="Laboratory"
                />
              </div>
              <div className="h-1/2 bg-primary-600 rounded-[2.5rem] p-8 flex flex-col justify-end text-white relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-4xl font-black block">15+</span>
                  <span className="text-xs uppercase font-bold tracking-widest opacity-80">Years of Service</span>
                </div>
                <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}