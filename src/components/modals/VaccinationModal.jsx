"use client";

import Button from "../ui/Button";

export default function VaccinationModal({ service, onClose }) {
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

        {/* About Vaccination */}
        <div className="mt-12 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="md:w-1/3 flex">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/images/services/vaccination-about.png"
                  alt="Vaccination Services"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Header + Description */}
            <div className="md:w-2/3 flex flex-col p-4 relative">
              <h3 className="text-xl font-heading font-semibold text-slate-800 mb-4 inline-block border-b-2 border-green-600 pb-2">
                Vaccination Center
              </h3>
              <div className="space-y-2 flex-1">
                <p className="text-sm text-slate-600 mb-3">
                  Our vaccination center provides comprehensive immunization
                  services for all age groups following national immunization
                  schedules. We ensure safe vaccination practices with proper
                  cold chain management.
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  All vaccines are stored and handled according to WHO
                  guidelines with qualified medical staff administering every
                  vaccination. We maintain digital records for easy tracking and
                  reminders.
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  Specialized services include travel vaccinations, corporate
                  vaccination drives, and school health programs. Our
                  child-friendly approach makes vaccination stress-free for
                  children.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
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
                    WHO-approved vaccines & protocols
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
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
                    Digital vaccination records
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
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
                    Painless injections for children
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"
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
                    24/7 emergency vaccine availability
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              // Handle book now action
              console.log("Book Now clicked for Vaccination service");
              // You can add navigation or modal logic here
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              // Handle enquiry action
              console.log("Enquiry clicked for Vaccination service");
              // You can add navigation or modal logic here
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
