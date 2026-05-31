"use client";

import { useState, useEffect } from "react";
import GenericTiming from "../sections/ServiceDetailModal/GenericTiming";
import Button from "../ui/Button";

export default function PhysiotherapyModal({ service, onClose }) {
  const data = service;
  const [currentPackageSlide, setCurrentPackageSlide] = useState(0);

  const packages = data.packages || [];

  const totalSlides = Math.ceil(packages.length / 3);

  const nextPackageSlide = () => {
    setCurrentPackageSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevPackageSlide = () => {
    setCurrentPackageSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getPackagesForSlide = (slide) => {
    const startIndex = slide * 3;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(packages[(startIndex + i) % packages.length]);
    }
    return result;
  };

  useEffect(() => {
    const interval = setInterval(nextPackageSlide, 3000);
    return () => clearInterval(interval);
  }, []);

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

        {/* Therapy Packages */}
        {packages.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">
              Therapy Packages
            </h3>
            <div className="relative">
              {/* Prev Button */}
              <button
                onClick={prevPackageSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              >
                ←
              </button>

              {/* Cards Container */}
              <div className="flex gap-4 mx-10">
                {getPackagesForSlide(currentPackageSlide).map((pkg, index) => (
                  <div key={index} className="flex-1">
                    <div className="bg-gradient-to-b from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden">
                      <div className="bg-primary-500 px-4 py-3">
                        <h4 className="text-base font-semibold text-white text-center">
                          {pkg.name}
                        </h4>
                      </div>
                      <div className="p-5">
                        <div className="space-y-2 mb-4">
                          <p className="text-xs text-primary-600 font-medium">
                            {pkg.duration}
                          </p>
                          <div className="space-y-1">
                            {pkg.services.map((service, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span className="text-primary-600 font-bold text-xs">
                                  →
                                </span>
                                <span className="text-slate-700 text-xs">
                                  {service}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-primary-600 mb-4">{pkg.price}</p>
                        <div className="flex justify-end">
                          <Button
                            variant="primary"
                            size="sm"
                            className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={nextPackageSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* Physiotherapy Promo Section with Image & Features */}
        <div className="mb-8 bg-slate-50 p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            {/* Image Column */}
            <div className="md:w-1/2">
              <img
                src="/images/services/physiotherapy-poster.jpg"
                alt="Physiotherapy Service"
                className="w-full h-auto border border-slate-200"
              />
            </div>

            {/* Content Column */}
            <div className="md:w-1/2">
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                Physiotherapy helps restore movement, reduce chronic pain, and
                rebuild strength after injury or surgery. Our certified
                physiotherapists create personalized treatment plans to get you
                back to your best.
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-slate-800">
                    500+ Patients Recovered
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
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
                  <span className="text-sm font-semibold text-slate-800">
                    10+ Years Experience
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-slate-800">
                    98% Success Rate
                  </span>
                </div>
              </div>

              {/* Feature Points */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
                  <span className="text-sm text-slate-700">
                    Pain Management — Targeted therapy to reduce chronic pain
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
                  <span className="text-sm text-slate-700">
                    Injury Rehabilitation — Recover faster after surgery or injury
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
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
                  <span className="text-sm text-slate-700">
                    Strength & Mobility — Rebuild movement and physical strength
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  console.log("Book a Session clicked for Physiotherapy");
                }}
              >
                Book a Session
              </Button>
            </div>
          </div>
        </div>

        {/* Video Patient Reviews */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">
            Patient Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Video Review Card 1 */}
            <div className="relative group cursor-pointer rounded-xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-video bg-slate-200">
                <img
                  src="/images/services/physiotherapy-poster.jpg"
                  alt="Patient Review 1"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary-600 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b from-secondary-50 to-white p-4">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 mb-4">
                  "After my knee surgery, physiotherapy helped me walk again in just 6 weeks."
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  — Raj B., recovered from ACL surgery
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    View Story
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Review Card 2 */}
            <div className="relative group cursor-pointer rounded-xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-video bg-slate-200">
                <img
                  src="/images/services/physiotherapy-poster.jpg"
                  alt="Patient Review 2"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary-600 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b from-secondary-50 to-white p-4">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 mb-4">
                  "The chronic back pain I had for years is finally under control. Highly recommend!"
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  — Sunita M., chronic back pain patient
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    View Story
                  </Button>
                </div>
              </div>
            </div>

            {/* Video Review Card 3 */}
            <div className="relative group cursor-pointer rounded-xl overflow-hidden border border-secondary-100 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="aspect-video bg-slate-200">
                <img
                  src="/images/services/physiotherapy-poster.jpg"
                  alt="Patient Review 3"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-secondary-600 ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-b from-secondary-50 to-white p-4">
                <p className="text-sm font-semibold text-slate-800 line-clamp-2 mb-4">
                  "After my stroke, the neuro-rehab program gave me my life back. Grateful!"
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  — Prakash S., stroke recovery patient
                </p>
                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    View Story
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Therapists Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">
            Meet Our Expert Physiotherapists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Therapist 1 */}
            <div className="bg-gradient-to-b from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-primary-500 px-4 py-3">
                <h4 className="text-base font-semibold text-white text-center">
                  Dr. Anil Shrestha
                </h4>
                <p className="text-xs text-primary-100 font-medium text-center">
                  Lead Physiotherapist
                </p>
              </div>
              <div className="p-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary-100">
                  <img
                    src="/images/services/physiotherapy/therapist1.jpg"
                    alt="Dr. Anil Shrestha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  MPT (Orthopedics), 12+ years experience in sports injuries and post-surgical rehabilitation.
                </p>
                <p className="text-xs text-slate-500">
                  Specializes in ACL reconstruction, joint replacements, and spinal therapy.
                </p>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>

            {/* Therapist 2 */}
            <div className="bg-gradient-to-b from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-primary-500 px-4 py-3">
                <h4 className="text-base font-semibold text-white text-center">
                  Dr. Sunita Rai
                </h4>
                <p className="text-xs text-primary-100 font-medium text-center">
                  Neurological Rehab Specialist
                </p>
              </div>
              <div className="p-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary-100">
                  <img
                    src="/images/services/physiotherapy/therapist2.jpg"
                    alt="Dr. Sunita Rai"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  MPT (Neurology), 10+ years in stroke rehabilitation and neuro-muscular disorders.
                </p>
                <p className="text-xs text-slate-500">
                  Expert in balance training, gait re-education, and functional independence.
                </p>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>

            {/* Therapist 3 */}
            <div className="bg-gradient-to-b from-primary-50 to-white rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="bg-primary-500 px-4 py-3">
                <h4 className="text-base font-semibold text-white text-center">
                  Ramesh Thapa
                </h4>
                <p className="text-xs text-primary-100 font-medium text-center">
                  Sports Physiotherapist
                </p>
              </div>
              <div className="p-4">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-primary-100">
                  <img
                    src="/images/services/physiotherapy/therapist3.jpg"
                    alt="Ramesh Thapa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  BPT, Cert. in Sports Taping, 8+ years with national-level athletes and sports teams.
                </p>
                <p className="text-xs text-slate-500">
                  Specializes in injury prevention, performance enhancement, and rapid recovery protocols.
                </p>
                <div className="flex justify-end mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-secondary-500 border-secondary-500 text-white hover:bg-secondary-600 hover:border-secondary-600"
                  >
                    Book
                  </Button>
                </div>
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
              console.log("Book Now clicked for Physiotherapy service");
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Enquiry clicked for Physiotherapy service");
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
