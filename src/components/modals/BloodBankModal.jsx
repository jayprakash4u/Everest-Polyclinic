"use client";

import { useState, useEffect } from "react";
import Button from "../ui/Button";

export default function BloodBankModal({ service, onClose }) {
  const data = service;
  const [currentCert, setCurrentCert] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Donation form submitted:", formData);
    alert("Thank you! Your donation appointment has been booked.");
    setFormData({ name: "", phone: "", bloodGroup: "", date: "" });
  };

  const certificates = [
    {
      id: 1,
      src: "/images/services/donation-certificate.jpg",
      alt: "Donation Certificate 1",
      name: "John Doe",
      date: "15-May-2025",
    },
    {
      id: 2,
      src: "/images/services/certificate-2.jpg",
      alt: "Donation Certificate 2",
      name: "Alice Brown",
      date: "10-Apr-2025",
    },
    {
      id: 3,
      src: "/images/services/certificate-3.jpg",
      alt: "Donation Certificate 3",
      name: "Bob Johnson",
      date: "05-Mar-2025",
    },
  ];

  const nextCert = () =>
    setCurrentCert((prev) => (prev + 1) % certificates.length);
  const prevCert = () =>
    setCurrentCert(
      (prev) => (prev - 1 + certificates.length) % certificates.length,
    );

  const [currentDonor, setCurrentDonor] = useState(0);

  const donors = [
    {
      id: 1,
      src: "/images/services/donor-photo-3.jpg",
      alt: "Recent Donor 1",
      name: "Rajesh Kumar",
      quantity: "1 Unit",
      date: "15-Apr-2026",
    },
    {
      id: 2,
      src: "/images/services/donor-photo-4.jpg",
      alt: "Recent Donor 2",
      name: "Priya Sharma",
      quantity: "1 Unit",
      date: "10-Apr-2026",
    },
    {
      id: 3,
      src: "/images/services/donor-photo-5.jpg",
      alt: "Recent Donor 3",
      name: "Amit Patel",
      quantity: "1 Unit",
      date: "05-Apr-2026",
    },
  ];

  const nextDonor = () => setCurrentDonor((prev) => (prev + 1) % donors.length);
  const prevDonor = () =>
    setCurrentDonor((prev) => (prev - 1 + donors.length) % donors.length);

  useEffect(() => {
    const interval = setInterval(nextCert, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-text hover:text-primary-600 transition-colors"
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
          <span className="font-medium font-sans">Close</span>
        </button>
      </div>

      {data.headerImage && (
        <div
          className="relative h-[200px] w-full bg-cover bg-center overflow-hidden rounded-t-card"
          style={{ backgroundImage: `url(${data.headerImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent"></div>
        </div>
      )}

      <div className="p-8 border-t-0 border border-slate-200">
        <h2 className="text-2xl font-heading font-bold text-text-dark mb-4">
          {data.title}
        </h2>

        <div className="mb-8">
          <p className="text-text text-sm leading-6 font-sans">
            {data.description}
          </p>
        </div>

        {/* Services Offered */}
        <div className="mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Blood Collection */}
            <div className="border border-slate-100 p-4 hover:border-secondary-200 transition-colors">
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="w-6 h-6 text-secondary-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2a6 6 0 016 6c0 3-2 5-6 8-4-3-6-5-6-8a6 6 0 016-6z"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-heading font-semibold text-text-dark mb-1">
                    Blood Collection
                  </h4>
                  <p className="text-xs text-text-light">
                    Component separation
                  </p>
                </div>
              </div>
            </div>

            {/* Cross-Matching */}
            <div className="border border-slate-100 p-4 hover:border-secondary-200 transition-colors">
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="w-6 h-6 text-secondary-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-heading font-semibold text-text-dark mb-1">
                    Cross-Matching
                  </h4>
                  <p className="text-xs text-text-light">
                    Compatibility testing
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Transfusion Services */}
            <div className="border border-slate-100 p-4 hover:border-secondary-200 transition-colors">
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="w-6 h-6 text-secondary-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-7a2 2 0 012-2h14a2 2 0 012 2v16l-8-4-8 4V7z"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-heading font-semibold text-text-dark mb-1">
                    Emergency Transfusion
                  </h4>
                  <p className="text-xs text-text-light">24/7 availability</p>
                </div>
              </div>
            </div>

            {/* Screening & Testing */}
            <div className="border border-slate-100 p-4 hover:border-secondary-200 transition-colors">
              <div className="flex flex-col items-center text-center gap-2">
                <svg
                  className="w-6 h-6 text-secondary-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 012-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                <div>
                  <h4 className="text-sm font-heading font-semibold text-text-dark mb-1">
                    Screening & Testing
                  </h4>
                  <p className="text-xs text-text-light">
                    Comprehensive screening
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Donor Statistics Section */}
        <div className="mt-12 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Moving Certificate Carousel */}
            <div className="border border-slate-200 rounded-card p-4 h-64 overflow-hidden bg-background-light">
              <div className="relative flex items-center h-full">
                <button
                  onClick={prevCert}
                  className="absolute left-0 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-card transition-colors text-primary-500"
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={certificates[currentCert].src}
                    alt={certificates[currentCert].alt}
                    className="max-w-full max-h-[140px] object-contain shadow-sm"
                  />
                </div>

                <button
                  onClick={nextCert}
                  className="absolute right-0 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-card transition-colors text-primary-500"
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs font-bold text-text-dark">
                  {certificates[currentCert].name}
                </p>
                <p className="text-[10px] text-text-light uppercase tracking-wider">
                  {certificates[currentCert].date}
                </p>
              </div>
            </div>

            {/* Blood Donation Form */}
            <div className="border border-slate-200 rounded-card p-0 h-64 flex flex-col overflow-hidden shadow-card">
              <div className="bg-primary-500 px-4 py-3">
                <h4 className="text-sm font-heading font-semibold text-white">
                  Appointment Request
                </h4>
              </div>
              <div className="p-4 flex-1 overflow-y-auto bg-white">
                <form className="space-y-3" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-primary-500 outline-none"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-primary-500 outline-none"
                    />
                    <input
                      type="text"
                      name="bloodGroup"
                      placeholder="Group (e.g. O+)"
                      value={formData.bloodGroup}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md text-xs focus:ring-1 focus:ring-primary-500 outline-none text-text"
                  />
                  <button
                    type="submit"
                    className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 rounded-md text-xs transition-all uppercase tracking-widest"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            {/* Donor Photo Carousel */}
            <div className="border border-slate-200 rounded-card h-64 overflow-hidden relative shadow-card group">
              <button
                onClick={prevDonor}
                className="absolute left-2 top-[50%] -translate-y-1/2 z-10 bg-white/80 opacity-0 group-hover:opacity-100 p-2 rounded-full shadow-md transition-all text-text-dark"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <img
                src={donors[currentDonor].src}
                alt={donors[currentDonor].alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-xs font-bold">
                  {donors[currentDonor].name}
                </p>
                <p className="text-white/80 text-[10px]">
                  {donors[currentDonor].quantity} Donated
                </p>
              </div>
              <button
                onClick={nextDonor}
                className="absolute right-2 top-[50%] -translate-y-1/2 z-10 bg-white/80 opacity-0 group-hover:opacity-100 p-2 rounded-full shadow-md transition-all text-text-dark"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* About Blood Donation */}
        <div className="mt-16 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <div className="relative p-2 border border-slate-100 rounded-card bg-background-light">
                <img
                  src="/images/services/blood-donation-about.png"
                  alt="Blood Donation"
                  className="w-full h-auto rounded-md"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-xl font-heading font-bold text-text-dark mb-4 inline-block border-b-4 border-secondary-500 pb-1">
                Campaign Information
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-text leading-relaxed">
                  Blood donation is a noble act that can save up to three lives
                  with just one donation. Our professional staff ensures a safe,
                  hygienic, and comfortable experience at{" "}
                  <span className="font-bold text-primary-600">
                    Everest International Polyclinic
                  </span>
                  .
                </p>
                <ul className="space-y-3">
                  {[
                    "One donation saves up to 3 lives (RBC, Plasma, Platelets)",
                    "Donate every 56 days - process takes 45-60 minutes",
                    "Eligibility: 18-65 years, minimum 50kg, good health",
                    "Includes free health check-up and refreshments",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-text"
                    >
                      <svg
                        className="w-5 h-5 text-secondary-500 mt-0.5"
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
              <button className="mt-6 inline-flex items-center gap-2 text-primary-500 hover:text-primary-700 font-bold text-sm uppercase tracking-wider transition-colors">
                Book Appointment
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10 pt-6 border-t border-slate-100">
          <Button
            variant="primary"
            className="flex-1 sm:max-w-[180px] bg-primary-500 hover:bg-primary-600 text-white font-heading font-bold uppercase tracking-widest text-xs py-4 shadow-card"
            onClick={() => console.log("Book Now clicked")}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 sm:max-w-[180px] border-primary-500 text-primary-500 hover:bg-primary-50 font-heading font-bold uppercase tracking-widest text-xs py-4"
            onClick={() => console.log("Enquiry clicked")}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
