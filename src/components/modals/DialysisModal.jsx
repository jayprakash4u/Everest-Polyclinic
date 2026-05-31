"use client";

import GenericTiming from "../sections/ServiceDetailModal/GenericTiming";
import Button from "../ui/Button";

export default function DialysisModal({ service, onClose }) {
  const data = service;

  return (
    <div className="bg-white">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <span className="font-medium">Close</span>
        </button>
      </div>

      {data.headerImage && (
        <div
          className="relative h-[200px] w-full bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(${data.headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
      )}

        <div className="p-8 border-t-0 border border-slate-200">
         <h2 className="text-2xl font-heading font-bold text-slate-800 mb-4">
           {data.title}
         </h2>

          {/* Description Section */}
          <div className="mb-8">
            <p className="text-slate-700 text-sm leading-6">
              {data.description} Our dialysis unit is equipped with state-of-the-art machines and follows strict international protocols to ensure the highest standards of patient care and safety. We provide personalized treatment plans tailored to each patient's unique medical condition and lifestyle needs.
            </p>
          </div>

          {/* Meet Our Specialists - Single Row Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Meet Our Specialists
            </h3>

            {/* Nephrology Specialists in horizontal scroll row */}
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 snap-x">
              {/* Lead Nephrologist */}
              <div className="flex-shrink-0 w-80 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src="/images/doctors/doctor-1.jpg"
                        alt="Dr. Ravi Mehta"
                        className="w-16 h-16 rounded-full object-cover shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 truncate">Dr. Ravi Mehta</h4>
                        <span className="flex-shrink-0 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Lead</span>
                      </div>
                      <p className="text-primary-600 text-xs font-medium truncate">MBBS, MD Nephrology • DM Renal Med</p>
                      <p className="text-slate-500 text-xs mt-0.5">18+ years experience</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-100">
                          ISO 9001
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                          NABH
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                          ISN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-blue-600">
                  <p className="text-white text-xs font-semibold text-center">Mon-Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>

              {/* Nephrologist */}
              <div className="flex-shrink-0 w-80 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src="/images/doctors/doctor-2.jpg"
                        alt="Dr. Sunita Khanna"
                        className="w-16 h-16 rounded-full object-cover shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">Dr. Sunita Khanna</h4>
                      <p className="text-primary-600 text-xs font-medium truncate">MBBS, MD Nephrology</p>
                      <p className="text-slate-500 text-xs mt-0.5">12+ years in dialysis care</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                          NMC Reg
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                          NABH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-blue-600">
                  <p className="text-white text-xs font-semibold text-center">Mon-Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>

              {/* Critical Care Specialist */}
              <div className="flex-shrink-0 w-80 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src="/images/doctors/doctor-3.jpg"
                        alt="Dr. Deepak Kumar"
                        className="w-16 h-16 rounded-full object-cover shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">Dr. Deepak Kumar</h4>
                      <p className="text-primary-600 text-xs font-medium truncate">MD Critical Care Medicine</p>
                      <p className="text-slate-500 text-xs mt-0.5">Acute dialysis specialist</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-[10px] font-medium border border-purple-100">
                          FCCM
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                          Certified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-blue-600">
                  <p className="text-white text-xs font-semibold text-center">Mon-Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>

              {/* Additional Nephrologist */}
              <div className="flex-shrink-0 w-80 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <img
                        src="/images/doctors/doctor-4.jpg"
                        alt="Dr. Sudhir Patel"
                        className="w-16 h-16 rounded-full object-cover shadow"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 truncate">Dr. Sudhir Patel</h4>
                      <p className="text-primary-600 text-xs font-medium truncate">MBBS, MD (Nephrology)</p>
                      <p className="text-slate-500 text-xs mt-0.5">10+ years experience</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">
                          ISN
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">
                          NABH
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-blue-600">
                  <p className="text-white text-xs font-semibold text-center">Mon-Sat: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-slate-200 pt-6 mt-4">
            <p className="text-sm font-semibold text-slate-700 mb-3">Our Certifications & Quality Standards</p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 rounded-lg border border-amber-100">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm text-amber-800 font-medium">ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50 rounded-lg border border-green-100">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-sm text-green-800 font-medium">NABH Accredited</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 rounded-lg border border-blue-100">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm text-blue-800 font-medium">Patient Safety First</span>
              </div>
            </div>
          </div>

          {/* Promo Section - Image Left, Content Right */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Side - Image */}
              <div className="md:w-1/2 flex">
                <div className="flex-1 flex items-center justify-center overflow-hidden hidden md:block">
                  <img
                    src="/images/dialysis_poster.jpg"
                    alt={data.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="md:w-1/2 flex flex-col p-4">
                {/* Stats Row */}
                {data.stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {data.stats.map((stat, idx) => (
                      <div key={idx} className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xl font-bold text-primary-600">{stat.value}</p>
                        <p className="text-slate-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Feature Points */}
                {data.features && (
                  <div className="space-y-3">
                    {data.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="flex-shrink-0">
                          <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{feature.title}</h3>
                          <p className="text-sm text-slate-600">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
           </div>

          {/* Dialysis Types Section */}
          <div className="mb-8">
            <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">
              Types of Dialysis Offered
            </h3>

            {/* Two types overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Hemodialysis
                </h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 flex-shrink-0">✔</span>
                    <span>Done at clinic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 flex-shrink-0">✔</span>
                    <span>Uses machine</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-100">
                <h4 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Peritoneal Dialysis
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✔</span>
                    <span>Done at home</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 flex-shrink-0">✔</span>
                    <span>Uses abdominal lining</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-800 text-white">
                    <th className="px-4 py-3 text-left font-semibold">Feature</th>
                    <th className="px-4 py-3 text-left font-semibold">Hemodialysis</th>
                    <th className="px-4 py-3 text-left font-semibold">Peritoneal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Setting</td>
                    <td className="px-4 py-3 text-slate-700">Dialysis center / Clinic</td>
                    <td className="px-4 py-3 text-slate-700">Home</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Frequency</td>
                    <td className="px-4 py-3 text-slate-700">3 times per week</td>
                    <td className="px-4 py-3 text-slate-700">Daily (continuous)</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Duration per Session</td>
                    <td className="px-4 py-3 text-slate-700">3-5 hours</td>
                    <td className="px-4 py-3 text-slate-700">Ongoing throughout day</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Equipment</td>
                    <td className="px-4 py-3 text-slate-700">Dialysis machine</td>
                    <td className="px-4 py-3 text-slate-700">Catheter & dialysate fluid</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">Invasiveness</td>
                    <td className="px-4 py-3 text-slate-900">Requires vascular access (fistula/graft)</td>
                    <td className="px-4 py-3 text-slate-900">Abdominal catheter (less invasive)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
    </div>
  );
}
