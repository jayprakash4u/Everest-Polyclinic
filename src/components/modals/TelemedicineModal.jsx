"use client";

import Button from "../ui/Button";

export default function TelemedicineModal({ service, onClose }) {
  const data = service;

  return (
    <div className="bg-white overflow-hidden rounded-card">
      {/* Header Close Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors group"
        >
          <span className="font-medium text-sm">Close</span>
          <svg
            className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
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

      {/* Hero Header */}
      {data.headerImage && (
        <div
          className="relative h-[240px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${data.headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent"></div>
          <div className="absolute bottom-6 left-8">
            <div className="bg-[#2FA84F] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
              Virtual Care
            </div>
            <h2 className="text-3xl font-heading font-bold text-white leading-tight">
              {data.title}
            </h2>
          </div>
        </div>
      )}

      <div className="p-8 border-x border-b border-slate-100">
        {/* Intro Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Consult with our specialists from the comfort of your home through
              our telemedicine services. Our virtual consultation platform
              allows you to receive expert medical advice without visiting the
              hospital.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed font-sans">
              Telemedicine makes healthcare accessible to everyone, especially
              those in remote areas or with mobility constraints. All
              consultations are conducted by licensed physicians.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-card border border-slate-100">
            <h4 className="text-xs font-bold text-[#1E5FA8] uppercase tracking-widest mb-4">
              Why choose virtual?
            </h4>
            <ul className="space-y-3">
              {[
                "Secure, HIPAA-compliant platform",
                "Electronic prescriptions sent instantly",
                "Easy upload for medical reports",
                "Saves travel and waiting time",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-xs font-medium text-slate-700"
                >
                  <svg
                    className="w-4 h-4 text-[#2FA84F]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Consultation Methods Card Grid */}
        <div className="mb-12">
          <h3 className="text-lg font-heading font-bold text-slate-800 mb-6">
            Choose Consultation Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Video Consultation",
                icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
              },
              {
                title: "Voice Call",
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              },
              {
                title: "Chat Consultation",
                icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
              },
            ].map((method, idx) => (
              <div
                key={idx}
                className="group p-8 border border-slate-100 rounded-card bg-white hover:border-[#1E5FA8] hover:shadow-xl transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E5FA8] transition-colors">
                  <svg
                    className="w-8 h-8 text-[#1E5FA8] group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={method.icon}
                    />
                  </svg>
                </div>
                <h5 className="text-sm font-bold text-slate-800 group-hover:text-[#1E5FA8]">
                  {method.title}
                </h5>
              </div>
            ))}
          </div>
        </div>

        {/* Services List Section */}
        <div className="mb-12">
          <h3 className="text-lg font-heading font-bold text-slate-800 mb-6">
            Services Available Online
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "General Care",
                items: ["Fever, cold, infections", "Headache, stomach issues"],
                icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
              },
              {
                title: "Specialists",
                items: ["Dermatology (skin)", "Psychiatry", "Pediatrics"],
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
              },
              {
                title: "Follow-ups",
                items: ["Lab report review", "Prescription renewal"],
                icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              },
            ].map((section, idx) => (
              <div
                key={idx}
                className="p-6 bg-slate-50/50 border border-slate-100 rounded-card"
              >
                <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#1E5FA8]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={section.icon}
                    />
                  </svg>
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="text-xs text-slate-600 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#2FA84F] rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Section */}
        <div className="mb-12 bg-[#1E5FA8] rounded-card p-8 text-white">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <img
                src="/images/services/telemedicine-poster.jpg"
                alt="Telemedicine Service"
                className="w-full h-auto rounded-lg shadow-2xl border-4 border-white/10"
              />
            </div>
            <div className="md:w-1/2">
              <h4 className="text-xl font-heading font-bold mb-4">
                Certified Health Services
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <div className="text-[#2FA84F] text-xl font-bold">24/7</div>
                  <div className="text-[10px] uppercase opacity-70">
                    Availability
                  </div>
                </div>
                <div>
                  <div className="text-[#2FA84F] text-xl font-bold">500+</div>
                  <div className="text-[10px] uppercase opacity-70">
                    Specialists
                  </div>
                </div>
                <div>
                  <div className="text-[#2FA84F] text-xl font-bold">98%</div>
                  <div className="text-[10px] uppercase opacity-70">
                    Happiness
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-xs leading-relaxed mb-6">
                Consult with our specialists from the comfort of your home. Get
                expert advice, shared diagnostics, and digital prescriptions.
              </p>
              <Button
                variant="primary"
                className="bg-[#2FA84F] hover:bg-green-600 border-none px-6 font-bold text-xs"
                onClick={() => console.log("Promo Clicked")}
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-lg font-heading font-bold text-slate-800 mb-6">
            What Our Patients Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh K.",
                city: "Kathmandu",
                text: "Saved me a hospital visit. The video consultation was incredibly smooth.",
              },
              {
                name: "Sita R.",
                city: "Pokhara",
                text: "Got my prescription without leaving home. Highly recommended for busy people.",
              },
              {
                name: "Amit S.",
                city: "Lalitpur",
                text: "Professional doctors and very easy to use platform. Time-saving service!",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 border border-slate-100 shadow-sm rounded-card relative"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs italic text-slate-600 mb-4">"{t.text}"</p>
                <div className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  {t.name}, {t.city}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-100">
          <Button
            variant="primary"
            className="flex-1 sm:max-w-[160px] bg-[#1E5FA8] hover:bg-[#154a85] font-bold text-xs uppercase tracking-widest py-4"
            onClick={() => console.log("Book Now clicked")}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:max-w-[160px] border-[#1E5FA8] text-[#1E5FA8] hover:bg-slate-50 font-bold text-xs uppercase tracking-widest py-4"
            onClick={() => console.log("Enquiry clicked")}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
