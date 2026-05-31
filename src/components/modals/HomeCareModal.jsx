"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";

export default function HomeCareModal({ service, onClose }) {
  const data = service;
  const [currentPackageSlide, setCurrentPackageSlide] = useState(0);
  const [currentWhoItsForSlide, setCurrentWhoItsForSlide] = useState(0);

  const packages = [
    {
      name: "Daily Nursing Care",
      duration: "12-Hour Caregiver",
      services: [
        "Medication management",
        "Vital monitoring",
        "Personal care assistance",
        "Mobility support",
      ],
      price: "Rs. 1,200/day",
    },
    {
      name: "24/7 Home Care",
      duration: "24-Hour Care",
      services: [
        "Round-clock nursing",
        "Emergency response",
        "Doctor on call",
        "Family updates",
      ],
      price: "Rs. 2,500/day",
    },
    {
      name: "Post-Surgery Care Package",
      duration: "7-14 Days",
      services: [
        "Wound dressing",
        "Pain management",
        "Physical therapy",
        "Recovery monitoring",
      ],
      price: "Rs. 8,500",
    },
  ];

  const whoItsForData = [
    {
      title: "Elderly patients",
      image: "/images/services/who-its-for/elderly-patients.jpg",
      description: "Seniors needing daily assistance and medical oversight",
    },
    {
      title: "Post-surgery patients",
      image: "/images/services/who-its-for/post-surgery-patients.jpg",
      description: "Recovering from surgical procedures requiring skilled care",
    },
    {
      title: "Chronic illness (diabetes, BP)",
      image: "/images/services/who-its-for/chronic-illness.jpg",
      description: "Long-term condition management and monitoring",
    },
    {
      title: "Bedridden patients",
      image: "/images/services/who-its-for/bedridden-patients.jpg",
      description: "Complete bed rest requiring comprehensive nursing care",
    },
    {
      title: "Busy families",
      image: "/images/services/who-its-for/busy-families.jpg",
      description: "Working families seeking trusted care for loved ones",
    },
  ];

  const totalSlides = Math.ceil(packages.length / 3);
  const totalWhoItsForSlides = Math.ceil(whoItsForData.length / 3);

  const getPackagesForSlide = (slide) => {
    const startIndex = slide * 3;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(packages[(startIndex + i) % packages.length]);
    }
    return result;
  };

  const nextPackageSlide = () => {
    setCurrentPackageSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevPackageSlide = () => {
    setCurrentPackageSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const nextWhoItsForSlide = () => {
    setCurrentWhoItsForSlide((prev) => (prev + 1) % totalWhoItsForSlides);
  };

  const prevWhoItsForSlide = () => {
    setCurrentWhoItsForSlide(
      (prev) => (prev - 1 + totalWhoItsForSlides) % totalWhoItsForSlides,
    );
  };

  const getWhoItsForForSlide = (slide) => {
    const startIndex = slide * 3;
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(whoItsForData[(startIndex + i) % whoItsForData.length]);
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

        {/* Who It's For */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">
            Who It's For
          </h3>
          <div className="relative">
            {/* Prev Button */}
            <button
              onClick={prevWhoItsForSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            >
              ←
            </button>

            {/* Cards Container */}
            <div className="flex gap-4 mx-10">
              {getWhoItsForForSlide(currentWhoItsForSlide).map(
                (item, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-md overflow-hidden hover:shadow-md transition-shadow flex-1"
                  >
                    <div className="h-40 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-slate-800 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={nextWhoItsForSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Care Packages */}
        <div className="mb-8">
          <h3 className="text-2xl font-heading font-bold text-slate-800 mb-8 text-center">
            Care Packages
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
                <div
                  key={index}
                  className="border border-slate-200 shadow-sm overflow-hidden flex-1"
                >
                  <div className="bg-secondary-600 px-4 py-3">
                    <h4 className="text-base font-semibold text-white text-center">
                      {pkg.name}
                    </h4>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 mb-3">
                      <p className="text-xs text-slate-600 font-medium">
                        {pkg.duration}
                      </p>
                      <div className="space-y-1">
                        {pkg.services.map((service, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="text-secondary-600 font-bold text-xs">
                              →
                            </span>
                            <span className="text-slate-700 text-xs">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-3">{pkg.price}</p>
                    <div className="flex justify-end">
                      <Button variant="primary" size="sm" className="px-6">
                        Book Now
                      </Button>
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

        {/* Why Choose Us / Poster Section */}
        <div className="mx-[-2rem] mb-8 bg-secondary-50 p-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center px-6">
            <div className="md:w-1/2">
              <img
                src="/images/services/homecare-poster.jpg"
                alt="Home Care Poster"
                className="w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-slate-600 mb-4 leading-relaxed">
                We are dedicated to providing compassionate, professional home
                care services tailored to your loved one's unique needs. Our
                team of certified caregivers ensures safety, comfort, and
                dignity — right in the comfort of your own home.
              </p>
              <h3 className="text-xl font-heading font-semibold text-slate-800 mb-3">
                Why choose us?
              </h3>
              <ul className="space-y-2">
                {[
                  "Licensed & Certified Caregivers - All staff are fully trained and background-checked.",
                  "Personalized Care Plans - Every patient receives a plan designed just for them.",
                  "24/7 Availability - Round-the-clock support whenever you need us.",
                  "Family-Centered Approach - We keep families informed and involved at every step.",
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
              console.log("Book Now clicked for Home Care service");
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              console.log("Enquiry clicked for Home Care service");
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
