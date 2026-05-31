"use client";

import Button from "../ui/Button";

export default function HealthCheckupModal({ service, onClose }) {
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

        {/* Health Checkup Packages */}
        {data.packages && data.packages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-heading font-semibold text-slate-800 mb-4">
              Health Checkup Packages
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {data.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="border border-slate-200 rounded-md hover:shadow-md transition-shadow w-fit"
                >
                  <div className="bg-secondary-600 px-4 py-3 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                      <h4 className="text-base font-semibold text-white">
                        {pkg.name}
                      </h4>
                      <span className="text-base font-bold text-white">
                        {pkg.price}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-1 mb-3">
                      {pkg.tests.map((test, index) => (
                        <li
                          key={index}
                          className="text-sm text-slate-600 flex items-start gap-2"
                        >
                          <svg
                            className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
                          {test}
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center">
                      <Button
                        variant="primary"
                        size="sm"
                        className="px-3 py-1"
                        onClick={() => {
                          console.log(`Book Now clicked for ${pkg.name}`);
                        }}
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Poster Image with Content */}
        <div className="mx-[-2rem] mb-8 bg-secondary-50 p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-6">
            <div className="md:w-1/2">
              <img
                src="/images/services/health_checkup_poster.jpg"
                alt="Health Checkup Poster"
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-heading font-bold text-slate-800 mb-2">
                Your Wellness Journey Starts Here
              </h3>
              <h4 className="text-xl font-semibold text-secondary-600 mb-3">
                Caring for What Matters Most
              </h4>
              <p className="text-slate-600 mb-4">
                Complete health assessment for your whole family
              </p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Our expert medical team provides comprehensive screening in one
                convenient visit. From initial consultation to personalized
                wellness plan, we're here to support your family's health.
              </p>
              <ul className="space-y-2 mb-6">
                {[
                  "Professional health examination",
                  "Lab tests & comprehensive screening",
                  "Personalized wellness plan",
                  "Expert medical consultation",
                  "Same-day results available",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="text-sm text-slate-600 flex items-start gap-2"
                  >
                    <svg
                      className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
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
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  console.log("Schedule Your Checkup clicked");
                }}
              >
                Schedule Your Checkup
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
