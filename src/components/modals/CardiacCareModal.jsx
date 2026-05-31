"use client";

import { useState } from "react";
import Button from "../ui/Button";

export default function CardiacCareModal({ service, onClose }) {
  const data = service;
  const tests = [
    {
      title: "ECG",
      desc: "Records electrical activity of your heart to detect irregular heartbeats, heart attacks, and other cardiac conditions.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <path d="M26 44 C26 38 31 33 37 33 C40 33 43 35 45 38 L50 44 L52 40 L57 52 L62 38 L65 44 C67 47 67 52 64 56 L50 68 L36 56 C31 52 26 49 26 44Z" fill="#4FC3A1" opacity="0.25"/>
          <path d="M26 44 C26 38 31 33 37 33 C40 33 43 35 45 38 L50 44 L52 40 L57 52 L62 38 L65 44 C67 47 67 52 64 56 L50 68 L36 56 C31 52 26 49 26 44Z" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round"/>
          <polyline points="28,50 36,50 39,43 43,58 47,43 51,50 60,50 63,50 72,50" fill="none" stroke="#4FC3A1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "ECHO",
      desc: "Ultrasound imaging of your heart to assess its structure, function, and pumping capacity with detailed real-time images.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <path d="M50 30 L50 70" stroke="#4FC3A1" strokeWidth="2" strokeLinecap="round"/>
          <path d="M38 22 C28 30 28 70 38 78" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M30 16 C14 28 14 72 30 84" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <path d="M62 22 C72 30 72 70 62 78" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M70 16 C86 28 86 72 70 84" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
          <circle cx="50" cy="43" r="3" fill="#4FC3A1"/>
        </svg>
      ),
    },
    {
      title: "TMT",
      desc: "Monitors heart function during exercise to identify blood flow problems and assess cardiovascular fitness levels.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <rect x="20" y="60" width="60" height="8" rx="4" fill="#4FC3A1"/>
          <rect x="24" y="56" width="52" height="10" rx="3" fill="none" stroke="#ffffff" strokeWidth="1.8"/>
          <path d="M50 28 L50 35" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 40 L36 36" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 40 L60 44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 50 L38 60" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <path d="M48 50 L58 56" stroke="#4FC3A1" strokeWidth="2" strokeLinecap="round"/>
          <polyline points="28,18 33,18 36,12 39,24 42,12 45,18" fill="none" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: "Lipid Profile",
      desc: "Measures cholesterol and triglyceride levels to evaluate your risk of heart disease and stroke.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <rect x="44" y="20" width="12" height="40" rx="6" fill="none" stroke="#ffffff" strokeWidth="2"/>
          <rect x="44" y="44" width="12" height="16" fill="#4FC3A1" opacity="0.8"/>
          <rect x="44" y="56" width="12" height="4" fill="#4FC3A1"/>
          <line x1="33" y1="52" x2="33" y2="30" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="33" cy="52" r="7" fill="none" stroke="#ffffff" strokeWidth="1.8"/>
          <line x1="67" y1="52" x2="67" y2="30" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round"/>
          <circle cx="67" cy="52" r="7" fill="none" stroke="#4FC3A1" strokeWidth="1.8"/>
        </svg>
      ),
    },
    {
      title: "Troponin",
      desc: "Critical marker for heart muscle damage, essential for diagnosing heart attacks and cardiac emergencies.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <rect x="30" y="43" width="42" height="14" rx="3" fill="none" stroke="#ffffff" strokeWidth="2"/>
          <rect x="64" y="40" width="6" height="20" rx="2" fill="#4FC3A1"/>
          <path d="M30 50 L18 50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
          <rect x="31" y="44" width="20" height="12" rx="2" fill="#4FC3A1" opacity="0.6"/>
          <line x1="44" y1="43" x2="44" y2="48" stroke="#ffffff" strokeWidth="1.5"/>
          <line x1="50" y1="43" x2="50" y2="48" stroke="#ffffff" strokeWidth="1.5"/>
          <line x1="56" y1="43" x2="56" y2="48" stroke="#ffffff" strokeWidth="1.5"/>
          <path d="M28 28 C28 24 31 22 34 24 C36 22 40 24 40 28 C40 32 34 37 34 37 C34 37 28 32 28 28Z" fill="none" stroke="#4FC3A1" strokeWidth="2"/>
          <path d="M34 24 L34 20" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M30 22 L28 19" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round"/>
          <path d="M38 22 L40 19" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: "Holter",
      desc: "24-48 hour continuous heart rhythm monitoring to detect irregular heartbeats that may not appear during standard ECG.",
      svg: (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#0B3F7E"/>
          <circle cx="50" cy="50" r="48" fill="none" stroke="#4FC3A1" strokeWidth="3"/>
          <rect x="30" y="30" width="40" height="32" rx="4" fill="none" stroke="#ffffff" strokeWidth="2"/>
          <rect x="32" y="32" width="36" height="20" rx="2" fill="#4FC3A1" opacity="0.2"/>
          <polyline points="34,42 38,42 40,37 43,47 46,37 49,42 66,42" fill="none" stroke="#4FC3A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M36 62 L32 72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M50 62 L50 74" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M64 62 L68 72" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="32" cy="74" r="4" fill="#4FC3A1"/>
          <circle cx="50" cy="76" r="4" fill="#4FC3A1"/>
          <circle cx="68" cy="74" r="4" fill="#4FC3A1"/>
          <rect x="60" y="22" width="24" height="14" rx="7" fill="#4FC3A1"/>
          <text x="72" y="32" fontFamily="Arial" fontSize="9" fontWeight="700" fill="#0B3F7E" textAnchor="middle">24H</text>
        </svg>
      ),
    },
  ];

  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 4;

  const next = () => {
    if (startIdx + cardsToShow < tests.length) setStartIdx(startIdx + 1);
  };

  const prev = () => {
    if (startIdx > 0) setStartIdx(startIdx - 1);
  };

  const visibleTests = tests.slice(startIdx, startIdx + cardsToShow);

  return (
    <div className="bg-white">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="font-medium">Close</span>
        </button>
      </div>

      {data.headerImage && (
        <div className="relative h-[200px] w-full bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${data.headerImage})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      )}

      <div className="p-8 border-t-0 border border-slate-200">
        <h2 className="text-2xl font-heading font-bold text-slate-800 mb-4">{data.title}</h2>

        <div className="mb-8">
          <p className="text-slate-700 text-sm leading-6">
            Everest Polyclinic's Cardiac Care Department is a comprehensive heart health center providing advanced diagnostic, interventional, and surgical cardiac services. Our state-of-the-art facility is equipped with cutting-edge technology including digital cath labs, advanced echocardiography, and 24/7 cardiac emergency response systems. We offer complete cardiac care from preventive screenings and early detection to complex interventions and cardiac rehabilitation. Our team of experienced cardiologists, cardiac surgeons, and electrophysiologists work collaboratively to develop personalized treatment plans for each patient. We specialize in managing coronary artery disease, heart failure, arrhythmias, valvular heart conditions, and congenital heart disorders with exceptional clinical outcomes.
          </p>
        </div>

        {/* Cardiac Tests Section */}
        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-slate-800 mb-6 text-center">Cardiac Tests we offer</h3>
          <div className="relative px-12">
            <button
              onClick={prev}
              disabled={startIdx === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Previous tests"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-3 overflow-hidden">
              {visibleTests.map((test, idx) => (
                <div key={startIdx + idx} className="flex-1 min-w-0 bg-secondary-50 shadow-sm transition-shadow">
                  <div className="p-3 pt-4 h-full flex flex-col">
                    <div className="w-14 h-14 mx-auto mb-2 flex-shrink-0">
                      <div className="w-full h-full scale-75">{test.svg}</div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 text-center leading-tight">{test.title}</h4>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={next}
              disabled={startIdx + cardsToShow >= tests.length}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Next tests"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: tests.length - cardsToShow + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === startIdx ? "bg-primary-500" : "bg-slate-300 hover:bg-slate-400"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Promo Section - Image Left, Content Right */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex">
              <div className="flex-1 flex items-center justify-center overflow-hidden hidden md:block">
                <img src="/images/services/cardiac-poster.jpg" alt={data.title} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="md:w-1/2 flex flex-col p-4">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-3">Advanced Cardiac Care</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Our state-of-the-art cardiac care unit provides comprehensive heart health services including emergency interventions, diagnostic procedures, and rehabilitation programs. With cutting-edge technology and experienced cardiologists, we ensure the highest standards of cardiac care.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Advanced Diagnostics</h4>
                    <p className="text-sm text-slate-600">ECG, echocardiography, stress tests, and Holter monitoring</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Cardiac Rehabilitation</h4>
                    <p className="text-sm text-slate-600">Personalized recovery programs for post-treatment care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Patient Reviews */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">Patient Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                quote: "After my open-heart surgery, the cardiac care team monitored me closely and my recovery was smooth. I'm back to my normal life thanks to Everest Polyclinic.",
                name: "Rajesh K., bypass surgery patient",
              },
              {
                quote: "The ECG and stress test facilities are top-notch. The doctors explained everything clearly and the treatment plan worked perfectly for my condition.",
                name: "Sunita R., arrhythmia patient",
              },
              {
                quote: "The cardiac rehabilitation program helped me regain my strength after a heart attack. The staff is very supportive and professional.",
                name: "Prakash S., cardiac rehab patient",
              },
            ].map((review, idx) => (
              <div key={idx} className="relative group cursor-pointer">
                <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                  <img src="/images/services/cardiac-poster.jpg" alt={`Patient Review ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
              <div className="bg-secondary-50 px-3 py-2.5">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2">"{review.quote}"</p>
                <p className="text-xs text-slate-500 mt-1">— {review.name}</p>
              </div>
            </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Book Now clicked for Cardiac Care service");
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Enquiry clicked for Cardiac Care service");
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
