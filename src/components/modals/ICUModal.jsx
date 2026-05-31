"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function ICUModal({ service, onClose }) {
  const data = service;

  // Technology data with your custom SVG paths
  const techGrid = [
    {
      label: "Ventilators",
      sub: "High-End Evita",
      viewBox: "0 0 140 210",
      path: (
        <g>
          <polygon
            points="70,0 140,40 140,120 70,160 0,120 0,40"
            fill="#d4e4ee"
            stroke="#1E5FA8"
            strokeWidth="2"
          />
          <rect x="30" y="50" width="80" height="55" rx="6" fill="#1E5FA8" />
          <rect x="38" y="58" width="50" height="28" rx="3" fill="#f0f7fa" />
          <polyline
            points="40,72 46,72 50,62 55,82 60,62 65,72 72,72 76,65 82,72 86,72"
            fill="none"
            stroke="#2FA84F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="42" cy="95" r="5" fill="#2FA84F" />
          <circle cx="57" cy="95" r="5" fill="#4c95b8" />
          <circle cx="72" cy="95" r="5" fill="#2FA84F" />
          <rect x="82" y="90" width="18" height="10" rx="3" fill="#1a5594" />
          <path
            d="M30 78 C15 78 10 95 10 110 L10 120"
            fill="none"
            stroke="#7aafca"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M110 78 C125 78 130 95 130 110 L130 120"
            fill="none"
            stroke="#7aafca"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse
            cx="10"
            cy="126"
            rx="10"
            ry="7"
            fill="#a8c9dc"
            stroke="#1E5FA8"
            strokeWidth="1.5"
          />
          <ellipse
            cx="130"
            cy="126"
            rx="10"
            ry="7"
            fill="#a8c9dc"
            stroke="#1E5FA8"
            strokeWidth="1.5"
          />
        </g>
      ),
    },
    {
      label: "Monitors",
      sub: "Multi-Para Central",
      viewBox: "0 0 140 210",
      path: (
        <g>
          <polygon
            points="70,0 140,40 140,120 70,160 0,120 0,40"
            fill="#e0faf1"
            stroke="#2FA84F"
            strokeWidth="2"
          />
          <rect x="20" y="45" width="100" height="70" rx="5" fill="#103560" />
          <rect x="23" y="48" width="94" height="64" rx="3" fill="#0a2342" />
          <polyline
            points="26,80 34,80 38,65 44,95 50,65 56,80 68,80 72,72 80,88 84,80 114,80"
            fill="none"
            stroke="#2FA84F"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="26,92 40,88 55,84 70,88 85,84 100,88 114,92"
            fill="none"
            stroke="#4c95b8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect x="62" y="115" width="16" height="12" rx="2" fill="#1a5594" />
          <rect x="50" y="127" width="40" height="6" rx="3" fill="#14457a" />
        </g>
      ),
    },
    {
      label: "Dialysis",
      sub: "CRRT Available",
      viewBox: "0 0 140 210",
      path: (
        <g>
          <polygon
            points="70,0 140,40 140,120 70,160 0,120 0,40"
            fill="#d4e4ee"
            stroke="#1E5FA8"
            strokeWidth="2"
          />
          <rect x="28" y="42" width="84" height="78" rx="7" fill="#1E5FA8" />
          <rect x="35" y="50" width="70" height="36" rx="3" fill="#f0f7fa" />
          <rect x="32" y="114" width="76" height="18" rx="4" fill="#2FA84F" />
          <rect x="36" y="92" width="20" height="20" rx="4" fill="#14457a" />
          <rect x="60" y="92" width="20" height="20" rx="4" fill="#14457a" />
          <rect x="84" y="92" width="20" height="20" rx="4" fill="#14457a" />
        </g>
      ),
    },
    {
      label: "Imaging",
      sub: "Portable X-Ray/USG",
      viewBox: "0 0 140 210",
      path: (
        <g>
          <polygon
            points="70,0 140,40 140,120 70,160 0,120 0,40"
            fill="#e0faf1"
            stroke="#2FA84F"
            strokeWidth="2"
          />
          <rect x="55" y="42" width="30" height="8" rx="3" fill="#1E5FA8" />
          <rect x="64" y="50" width="12" height="30" rx="2" fill="#1a5594" />
          <rect x="52" y="78" width="36" height="18" rx="4" fill="#1E5FA8" />
          <rect x="30" y="116" width="80" height="8" rx="3" fill="#14457a" />
          <rect x="100" y="52" width="14" height="32" rx="6" fill="#2FA84F" />
        </g>
      ),
    },
  ];

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
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.673.337a4 4 0 01-2.58.345l-2.099-.42a2 2 0 00-1.18.122l-1.147.573M15 3.5c1.5 0 3 1.5 3 3s-1.5 3-3 3-3-1.5-3-3 1.5-3 3-3zM9 3.5c1.5 0 3 1.5 3 3s-1.5 3-3 3-3-1.5-3-3 1.5-3 3-3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-heading font-black text-slate-900 text-lg tracking-tight uppercase leading-none">
              Critical Care Unit
            </h3>
            <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest mt-1">
              Level 3 ICU Facility
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
        <div className="relative h-[280px] w-full bg-slate-900">
          {data.headerImage && (
            <Image
              src={data.headerImage}
              alt={data.title}
              fill
              className="object-cover opacity-70"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-8 left-10">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-primary-600 text-white text-[9px] font-black uppercase tracking-widest rounded">
                Multi-Speciality
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest rounded">
                NABH Accredited
              </span>
            </div>
            <h2 className="text-white text-4xl font-heading font-bold uppercase tracking-tighter">
              {data.title}
            </h2>
          </div>
        </div>

        {/* 3. LIVE STATUS BAR */}
        <div className="bg-slate-50 border-b border-slate-200 px-10 py-6">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-center">
            <div className="flex items-center gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Available Beds
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">04</span>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Ready for Admission
                  </span>
                </div>
              </div>
              <div className="w-px h-10 bg-slate-200 hidden md:block" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Staff Ratio
                </p>
                <p className="text-lg font-bold text-slate-900">
                  1:1 Nurse/Patient
                </p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Button className="w-full md:w-48 bg-primary-600 hover:bg-primary-700 text-white h-12 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-100">
                Check Availability
              </Button>
            </div>
          </div>
        </div>

        {/* 4. MAIN CONTENT AREA */}
        <div className="p-10 space-y-16">
          {/* Clinical Overview */}
           <section className="max-w-3xl">
             <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-3">
               <span className="w-1.5 h-6 bg-primary-600 rounded-full" />
               Clinical Overview
             </h4>
             <p className="text-slate-700 text-sm leading-6">
               {data.description}
             </p>
           </section>

          {/* ADVANCED TECHNOLOGY SECTION WITH CUSTOM SVG */}
          <section>
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-primary-600 rounded-full" />
              Advanced Technology
            </h4>

            <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {techGrid.map((item, i) => (
                  <div key={i} className="flex flex-col items-center group">
             <div className="w-[60px] h-[70px] mb-4 group-hover:scale-105 transition-transform duration-300 mx-auto">
                       <svg
                         width="100%"
                         height="100%"
                         viewBox={item.viewBox}
                         fill="none"
                         xmlns="http://www.w3.org/2000/svg"
                       >
                         {item.path}
                       </svg>
                     </div>
                    <div className="text-center">
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-tight opacity-80">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Doctors Section */}
          {data.doctors && (
            <section>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-8">
                On-Call Intensivists
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.doctors.map((doctor, idx) => (
                  <div
                    key={idx}
                    className="group p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:bg-white hover:border-slate-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-white p-1 rounded-full border border-slate-100 overflow-hidden shadow-sm">
                      <Image
                        src={doctor.img}
                        alt={doctor.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    <div className="text-center">
                      <h5 className="font-bold text-slate-900 text-sm uppercase tracking-tight mb-1">
                        {doctor.name}
                      </h5>
                      <p className="text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                        {doctor.spec}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          {data.patientReviews && (
            <section className="bg-slate-50/50 -mx-10 px-10 py-16">
              <h4 className="text-xs font-black text-slate-400 text-center uppercase tracking-[0.3em] mb-12">
                Patient Testimonials
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.patientReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
                  >
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${i < review.rating ? "text-yellow-400" : "text-slate-200"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm italic text-slate-700 mb-6 leading-relaxed">
                      "{review.review}"
                    </p>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                      — {review.name}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* 5. STICKY ACTION FOOTER */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary-100">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest mb-0.5 leading-none">
                Admission Helpline
              </p>
              <p className="text-2xl font-heading font-black text-slate-900">
                98XXXXXXXX
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:w-40 h-14 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200"
              onClick={() => console.log("ICU Enquiry clicked")}
            >
              Enquiry
            </Button>
            <Button
              className="flex-1 md:w-56 h-14 rounded-xl bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-100"
              onClick={() => console.log("ICU Bed Secure clicked")}
            >
              Secure a Bed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
