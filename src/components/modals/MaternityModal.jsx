"use client";

import GenericTiming from "../sections/ServiceDetailModal/GenericTiming";
import Button from "../ui/Button";

export default function MaternityModal({ service, onClose }) {
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

        <div className="mb-8">
          <p className="text-slate-700 text-sm leading-6">{data.description}</p>
        </div>

        {/* Our Maternity Services - Card Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">
            🤱 Our Maternity Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Antenatal Care Card */}
            <div className="border border-slate-200 p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Antenatal Care</h4>
              <ul className="space-y-2">
                {[
                  "Regular check-ups",
                  "Ultrasound guidance",
                  "Blood tests & monitoring",
                  "Nutrition counseling"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Delivery Support Card */}
            <div className="border border-slate-200 p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Delivery Support</h4>
              <ul className="space-y-2">
                {[
                  "Normal delivery guidance",
                  "C-section coordination",
                  "Birth planning"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Postnatal Care Card */}
            <div className="border border-slate-200 p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">Postnatal Care</h4>
              <ul className="space-y-2">
                {[
                  "Mother recovery care",
                  "Newborn checkups",
                  "Breastfeeding support"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* High-Risk Pregnancy Care Card */}
            <div className="border border-slate-200 p-6">
              <h4 className="text-lg font-semibold text-slate-800 mb-4">High-Risk Pregnancy Care</h4>
              <ul className="space-y-2">
                {[
                  "Diabetes / hypertension monitoring",
                  "Specialist supervision"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Maternity Promo Section with Image & Features */}
        <div className="mb-8 bg-slate-50 p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            {/* Image Column */}
            <div className="md:w-1/2">
              <img
                src="/images/services/maternity-poster.jpg"
                alt="Maternity Care Service"
                className="w-full h-auto border border-slate-200"
              />
            </div>

            {/* Content Column */}
            <div className="md:w-1/2">
              <p className="text-slate-700 text-sm leading-relaxed mb-4">
                Our maternity care program provides complete support for mothers throughout pregnancy, childbirth, and postnatal recovery. Our experienced team ensures the health and well-being of both mother and baby at every stage.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-800">1000+ Babies Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-800">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-800">99% Safe Delivery Rate</span>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-700">Prenatal Care — Regular checkups and monitoring throughout pregnancy</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-700">Safe Delivery — Expert support for a safe and comfortable birth</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-700">Postnatal Support — Recovery care and guidance after delivery</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  console.log("Book Appointment clicked for Maternity service");
                }}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Timing */}
        {data.timing && <GenericTiming timing={data.timing} />}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Book Now clicked for Maternity service");
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Enquiry clicked for Maternity service");
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
