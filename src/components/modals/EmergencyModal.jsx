"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function EmergencyModal({ service, onClose }) {
  const data = service;

  const stats = [
    {
      label: "Avg. Wait Time",
      value: "10-15 Mins",
      color: "text-secondary-600",
    },
    { label: "Triage Status", value: "Immediate", color: "text-secondary-600" },
    { label: "Insurance", value: "Accepted", color: "text-primary-600" },
  ];

  const essentials = [
    "Valid Photo ID",
    "Insurance Cards",
    "Current Medications",
    "Allergy History",
  ];

  return (
    <div className="bg-white overflow-hidden shadow-card flex flex-col h-full w-full">
      {/* 1. Formal Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-8 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-alert-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-alert-600"></span>
          </span>
          <h3 className="font-heading font-bold text-text-dark text-xl tracking-tight uppercase">
            Emergency Services
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-50 transition-colors"
        >
          <svg
            className="w-6 h-6 text-text-light"
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

      <div className="overflow-y-auto custom-scrollbar flex-1">
        {/* 2. Hero Section - Humanized & Formal */}
        {data.headerImage && (
          <div className="relative h-[260px] w-full overflow-hidden">
            <Image
              src={data.headerImage}
              alt="Emergency Ward"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-text-dark/80 via-text-dark/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-10">
              <span className="w-fit px-3 py-1 bg-alert-600 text-white text-[10px] font-bold rounded mb-3 uppercase tracking-widest">
                24/7 Critical Care
              </span>
              <h2 className="text-white text-4xl font-heading font-bold tracking-tight max-w-md">
                Advanced Trauma & Emergency Unit
              </h2>
            </div>
          </div>
        )}

        {/* 3. Formal Trust Bar */}
        <div className="grid grid-cols-3 bg-white border-b border-slate-100">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`py-6 text-center ${i !== 2 ? "border-r border-slate-100" : ""}`}
            >
              <p className="text-[10px] uppercase font-bold text-text-light tracking-widest mb-1">
                {stat.label}
              </p>
              <p className={`font-heading font-bold text-base ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="p-10 space-y-14">
          {/* 4. Description & Essentials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8">
              <h4 className="text-xl font-heading font-bold text-text-dark mb-4">
                Department Protocol
              </h4>
              <p className="text-text leading-relaxed text-base">
                {data.description}
              </p>
            </div>
            <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h5 className="text-text-dark font-bold text-xs uppercase tracking-widest mb-4">
                Admission Checklist
              </h5>
              <ul className="space-y-3">
                {essentials.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-text flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5. MODERNIZED DOCTOR CARDS - Formal & Humanized */}
          {data.doctors && (
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h4 className="text-xl font-heading font-bold text-text-dark">
                  Specialists on Duty
                </h4>
                <div className="h-px flex-1 bg-slate-100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.doctors.map((doc, idx) => (
                  <div
                    key={idx}
                    className="group flex gap-5 bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary-400 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300"
                  >
                    {/* Doctor Image with formal styling */}
                    <div className="relative shrink-0 w-24 h-24 rounded-xl overflow-hidden grayscale-[0.5] group-hover:grayscale-0 transition-all duration-500 border border-slate-100">
                     <Image
                         src={doc.img || "/doctor-placeholder.jpg"}
                         alt={doc.name}
                         fill
                         className="object-cover transition-transform duration-500 group-hover:scale-110"
                       />
                    </div>

                    <div className="flex flex-col justify-center py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-green-600 uppercase">
                          Available Now
                        </span>
                      </div>
                      <h5 className="text-text-dark font-heading font-bold text-lg leading-tight">
                        {doc.name}
                      </h5>
                       <p className="text-primary-600 text-xs font-semibold mt-1">
                         {doc.spec || "Senior Medical Officer"}
                       </p>
                      <div className="mt-3 pt-3 border-t border-slate-50 flex gap-4">
                        <div className="text-[10px] text-text-light font-bold uppercase tracking-tighter">
                          Experience:{" "}
                          <span className="text-text-dark ml-1">
                            {doc.experience || "10+"} Yrs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. Treatment Cards */}
          {data.treatment && (
            <section>
              <h4 className="text-xl font-heading font-bold text-text-dark mb-6">
                Expert Interventions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.treatment.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white border border-slate-100 hover:bg-primary-50/30 transition-colors"
                  >
                    <h5 className="font-bold text-text-dark text-sm mb-2">
                      {item.title}
                    </h5>
                    <p className="text-xs text-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 7. Gallery Section */}
          {data.gallery && (
            <section>
              <h4 className="text-xl font-heading font-bold text-text-dark mb-6">
                Department Environment
              </h4>
              <div className="grid grid-cols-4 gap-4">
                {data.gallery.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-28 rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                  >
                    <Image
                      src={img.url}
                      alt="Clinic Area"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. Patient Reviews */}
          {data.patientReviews && (
            <section className="bg-slate-50 -mx-10 px-10 py-12">
              <h4 className="text-xl font-heading font-bold text-text-dark mb-8 text-center uppercase tracking-widest text-sm">
                Community Feedback
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.patientReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative"
                  >
                    <p className="text-sm italic leading-relaxed text-text mb-4">
                      "{review.review}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700">
                        {review.name.charAt(0)}
                      </div>
                      <p className="text-[10px] font-black uppercase text-text-dark tracking-widest">
                        {review.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 9. Action Footer */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-alert-600 flex items-center justify-center text-white shadow-xl shadow-alert-200">
                <svg
                  className="w-8 h-8"
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
                <p className="text-[10px] font-bold text-alert-600 uppercase tracking-[0.2em] mb-1 leading-none">
                  Emergency Helpline
                </p>
                <p className="text-2xl font-heading font-black text-text-dark tracking-tighter">
                  1-800-999-HELP
                </p>
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Button
                variant="outline"
                className="flex-1 md:w-36 h-14 rounded-xl border-slate-200 text-sm font-bold"
              >
                Inquiry
              </Button>
              <Button
                variant="primary"
                className="flex-1 md:w-44 h-14 rounded-xl bg-primary-600 shadow-lg text-sm font-bold"
              >
                Pre-Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
