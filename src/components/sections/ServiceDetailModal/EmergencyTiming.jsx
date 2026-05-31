import React from "react";

function EmergencyTiming({
  timing,
  emergencyContact,
  faqs,
  guidelines,
  updates,
  servicesOverview,
  testimonials,
  mapLink,
}) {
  if (!timing || !timing.length) return null;

  return (
    <div className="space-y-8">
      {/* Timing Section */}
      <div className="flex flex-wrap gap-4">
        {timing.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 bg-slate-50 px-5 py-3 border border-slate-200 rounded-lg shadow-sm"
          >
            {item.icon === "pulse" && (
              <span className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></span>
            )}
            {item.icon === "clock" && (
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            {item.icon === "ambulance" && (
              <svg
                className="w-5 h-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            )}
            <span className="font-medium text-slate-700">{item.label}</span>
            <span className="font-bold text-slate-800">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Emergency Contact Section */}
      {emergencyContact && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Emergency Contact
          </h4>
          <p className="text-slate-700">{emergencyContact}</p>
        </div>
      )}

      {/* Real-Time Updates Section */}
      {updates && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Real-Time Updates
          </h4>
          <p className="text-slate-700">{updates}</p>
        </div>
      )}

      {/* Services Overview Section */}
      {servicesOverview && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Emergency Services Overview
          </h4>
          <p className="text-slate-700">{servicesOverview}</p>
        </div>
      )}

      {/* FAQs Section */}
      {faqs && faqs.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Frequently Asked Questions
          </h4>
          <ul className="list-disc pl-5 space-y-2">
            {faqs.map((faq, idx) => (
              <li key={idx} className="text-slate-700">
                {faq}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Testimonials Section */}
      {testimonials && testimonials.length > 0 && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            What Our Patients Say
          </h4>
          <div className="space-y-4">
            {testimonials.map((testimonial, idx) => (
              <blockquote
                key={idx}
                className="bg-slate-50 p-4 border-l-4 border-primary-500"
              >
                <p className="text-slate-700 italic">"{testimonial}"</p>
              </blockquote>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines Section */}
      {guidelines && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">
            Guidelines for Patients
          </h4>
          <p className="text-slate-700">{guidelines}</p>
        </div>
      )}

      {/* Interactive Map Section */}
      {mapLink && (
        <div>
          <h4 className="text-xl font-bold text-slate-800 mb-4">Find Us</h4>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 underline"
          >
            View on Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default EmergencyTiming;
