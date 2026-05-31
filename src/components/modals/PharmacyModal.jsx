"use client";

import Button from "../ui/Button";

export default function PharmacyModal({ service, onClose }) {
  const data = service;

  return (
    <div className="bg-white overflow-hidden rounded-xl">
      {/* Header/Close Action */}
      <div className="flex justify-end p-4 bg-slate-50 border-b border-slate-100">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition-all duration-300 group"
        >
          <span className="font-medium text-sm">Close</span>
          <div className="p-1.5 bg-white rounded-full shadow-sm group-hover:bg-red-50 transition-colors">
            <svg
              className="w-4 h-4"
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
          </div>
        </button>
      </div>

      {/* Hero Image Section */}
      {data.headerImage && (
        <div
          className="relative h-[240px] w-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url(${data.headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-6 left-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              {data.title}
            </h2>
          </div>
        </div>
      )}

      <div className="p-8">
        {/* Description */}
        <div className="mb-10 max-w-3xl">
          <p className="text-slate-600 text-base leading-relaxed italic border-l-4 border-green-500 pl-4">
            {data.description}
          </p>
        </div>

        {/* Pharmacy Services Grid */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-600 rounded-full"></span>
            Our Pharmacy Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Prescription Dispensing",
                desc: "Accurate, safe dispensing of prescribed medications",
                details: [
                  "Quick turnaround",
                  "Verified accuracy",
                  "Professional verification",
                ],
                icon: "M12 8v8m-4-4h8",
              },
              {
                title: "Medication Counseling",
                desc: "Expert guidance on medication usage and side effects",
                details: [
                  "One-on-one sessions",
                  "Dosage instructions",
                  "Drug interactions",
                ],
                icon: "M9 12l2 2 4-4",
              },
              {
                title: "Chronic Disease Management",
                desc: "Specialized support for long-term medication therapy",
                details: [
                  "Blood pressure monitoring",
                  "Diabetes support",
                  "Asthma management",
                ],
                icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
              },
              {
                title: "Immunizations",
                desc: "Vaccination services administered by certified pharmacists",
                details: [
                  "Flu shots",
                  "Travel vaccines",
                  "Routine immunizations",
                ],
                icon: "M12 9v3m0 0v3m0-3h3m-3 0H9",
              },
              {
                title: "Compounding Pharmacy",
                desc: "Custom medication preparation for special patient needs",
                details: [
                  "Pediatric formulations",
                  "Allergy-free preparations",
                  "Sterile compounds",
                ],
                icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3",
              },
              {
                title: "Home Delivery Service",
                desc: "Convenient medication delivery to your doorstep",
                details: [
                  "Same-day delivery",
                  "Secure packaging",
                  "Free delivery",
                ],
                icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4",
              },
            ].map((srv, index) => (
              <div
                key={index}
                className="group border border-slate-100 rounded-xl p-5 hover:border-green-200 hover:shadow-md hover:shadow-green-500/5 transition-all duration-300 bg-white"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
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
                        d={srv.icon}
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-green-700 transition-colors">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {srv.details.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-12 bg-slate-50 rounded-2xl p-8 border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-8 text-center">
            Meet Our Expert Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/team/lead-pharmacist.jpg",
                name: "Lead Pharmacist Name",
                role: "PharmD, BCPS",
              },
              {
                img: "/images/team/senior-pharmacist.jpg",
                name: "Senior Pharmacist Name",
                role: "PharmD, CDE",
              },
              {
                img: "/images/team/supporting-pharmacist.jpg",
                name: "Supporting Pharmacists",
                role: "PharmD, RPh",
              },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-green-500 rounded-full scale-0 group-hover:scale-105 transition-transform duration-300 -z-10 blur-sm"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover ring-4 ring-white shadow-lg"
                  />
                </div>
                <h4 className="text-base font-bold text-slate-800">
                  {member.name}
                </h4>
                <p className="text-xs font-medium text-green-600 uppercase tracking-wider mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white">
            <p className="text-sm text-slate-600 leading-relaxed text-center italic">
              "Our pharmacy team brings over 50 years of combined experience in
              pharmaceutical care. We are committed to providing personalized,
              compassionate care to every patient."
            </p>
          </div>
        </div>

        {/* Features & Poster */}
        <div className="mb-12 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-5/12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 group">
              <img
                src="/images/services/pharmacy_poster.jpg"
                alt="Pharmacy Poster"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
          <div className="lg:w-7/12">
            <h3 className="text-3xl font-bold text-slate-800 mb-8 border-l-8 border-green-600 pl-6">
              Why to Choose Us
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  n: "1",
                  t: "Certified Pharmacists",
                  d: "Expert, licensed professionals",
                },
                {
                  n: "2",
                  t: "Advanced Technology",
                  d: "State-of-the-art equipment",
                },
                {
                  n: "3",
                  t: "Quality Assurance",
                  d: "Multi-step verification process",
                },
                {
                  n: "4",
                  t: "24/7 Availability",
                  d: "Round-the-clock emergencies",
                },
                {
                  n: "5",
                  t: "Insurance Coverage",
                  d: "Accept major insurance plans",
                },
                { n: "6", t: "Patient Privacy", d: "HIPAA compliant records" },
              ].map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-green-200">
                    <span className="text-green-700 font-black text-sm">
                      {feat.n}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-0.5">
                      {feat.t}
                    </h4>
                    <p className="text-xs text-slate-500">{feat.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact & Ordering */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-green-500 rounded-lg">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </span>
            Contact & Ordering
          </h3>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Form */}
            <div className="lg:w-1/2 bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-semibold mb-6 text-green-400">
                Place Your Order
              </h4>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+977"
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paracetamol 500mg"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase tracking-widest font-bold text-slate-400">
                    Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                  />
                </div>
                <Button
                  variant="primary"
                  className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-transform active:scale-95 shadow-lg shadow-green-600/20"
                >
                  Submit Order Request
                </Button>
              </form>
            </div>

            {/* Info Cards */}
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  t: "In-Store Visit",
                  d: "Everest Polyclinic, Main Road",
                  icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
                },
                {
                  t: "Call to Order",
                  d: "+977 12345 67890",
                  icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493",
                },
                {
                  t: "WhatsApp",
                  d: "Click to chat with us",
                  icon: "M8 12h.01M12 12h.01M16 12h.01",
                },
                {
                  t: "Email Support",
                  d: "pharmacy@hospital.com",
                  icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-4 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group"
                >
                  <svg
                    className="w-6 h-6 text-green-500 mb-3 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  <h5 className="text-sm font-bold text-white mb-1">
                    {item.t}
                  </h5>
                  <p className="text-xs text-slate-400 leading-snug">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 pt-8 border-t border-slate-100">
          <Button
            variant="primary"
            className="px-10 py-3 bg-slate-900 text-white rounded-full hover:bg-green-600 transition-all font-bold shadow-xl shadow-slate-200"
            onClick={() => console.log("Book Now clicked")}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            className="px-10 py-3 border-2 border-slate-200 text-slate-700 rounded-full hover:border-green-600 hover:text-green-600 transition-all font-bold"
            onClick={() => console.log("Enquiry clicked")}
          >
            Send Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
