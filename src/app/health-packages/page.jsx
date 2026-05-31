"use client";

import {
  Check,
  ArrowRight,
  ShieldCheck,
  Activity,
  Award,
  Heart,
  User,
  Star,
} from "lucide-react";

const allPackages = [
  {
    section: "General Wellness",
    icon: <Activity className="w-5 h-5" />,
    items: [
      {
        id: 1,
        name: "Basic Wellness Profile",
        price: "1,800",
        tests: [
          "CBC",
          "Fast Blood Sugar",
          "Urine Analysis",
          "Creatinine",
          "Uric Acid",
        ],
        popular: false,
      },
      {
        id: 2,
        name: "Comprehensive Executive",
        price: "4,500",
        tests: [
          "Lipid Profile",
          "Liver Function",
          "Vitamin D",
          "Thyroid Profile",
          "HbA1c",
        ],
        popular: true,
      },
      {
        id: 9,
        name: "Full Body Master",
        price: "12,500",
        tests: [
          "80+ Parameters",
          "Full LFT/KFT",
          "Cancer Markers",
          "Cardiac Markers",
          "USG Whole Abdomen",
        ],
        popular: false,
      },
    ],
  },
  {
    section: "Life Stage Care",
    icon: <User className="w-5 h-5" />,
    items: [
      {
        id: 5,
        name: "Women’s Essential",
        price: "3,800",
        tests: [
          "Thyroid Profile",
          "Calcium",
          "Iron Studies",
          "Vitamin B12",
          "Pelvic Ultrasound",
        ],
        popular: false,
      },
      {
        id: 6,
        name: "Senior Citizen (Male)",
        price: "6,200",
        tests: [
          "PSA (Prostate)",
          "Bone Profile",
          "Kidney Function",
          "Chest X-Ray",
          "USG",
        ],
        popular: false,
      },
      {
        id: 7,
        name: "Senior Citizen (Female)",
        price: "6,200",
        tests: [
          "CA-125 Screening",
          "Vitamin D3",
          "Mammography",
          "Electrolytes",
          "USG",
        ],
        popular: false,
      },
    ],
  },
  {
    section: "Specialized Screening",
    icon: <Heart className="w-5 h-5" />,
    items: [
      {
        id: 4,
        name: "Advanced Cardiac Care",
        price: "8,500",
        tests: [
          "Echocardiogram",
          "TMT/Stress Test",
          "ApoB/ApoA1 Ratio",
          "HS-CRP",
        ],
        popular: false,
      },
      {
        id: 8,
        name: "Diabetes Management",
        price: "2,900",
        tests: [
          "HbA1c",
          "Microalbuminuria",
          "Average Blood Glucose",
          "Lipid Profile",
        ],
        popular: false,
      },
      {
        id: 10,
        name: "Liver & Kidney Vital",
        price: "2,400",
        tests: ["Bilirubin Total", "SGOT/SGPT", "Albumin", "Creatinine", "BUN"],
        popular: false,
      },
      {
        id: 3,
        name: "Healthy Heart Basic",
        price: "3,200",
        tests: ["ECG", "Lipid Profile", "Blood Sugar", "BP Monitoring"],
        popular: false,
      },
    ],
  },
];

export default function SinglePagePackages() {
  return (
    <main className="min-h-screen bg-background-light pb-20 font-sans">
      {/* Professional Header */}
      <section className="bg-primary-900 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Diagnostic Packages
        </h1>
        <p className="text-primary-100 max-w-2xl mx-auto">
          Transparent pricing and comprehensive clinical evaluations. No hidden
          costs, just quality care.
        </p>
      </section>

      <div className="container mx-auto px-4 -mt-10">
        {allPackages.map((group, idx) => (
          <div key={idx} className="mb-16">
            {/* Section Heading */}
            <div className="flex items-center gap-3 mb-8 bg-white p-4 rounded-card shadow-card inline-flex border border-slate-100">
              <div className="p-2 bg-primary-500 text-white rounded-lg">
                {group.icon}
              </div>
              <h2 className="text-xl font-heading font-bold text-text-dark">
                {group.section}
              </h2>
            </div>

            {/* Vertical List / Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`bg-white rounded-card border transition-all hover:shadow-card-hover overflow-hidden flex flex-col ${
                    pkg.popular
                      ? "border-secondary-500 ring-1 ring-secondary-500"
                      : "border-slate-200"
                  }`}
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-bold text-text-dark leading-tight">
                        {pkg.name}
                      </h3>
                      {pkg.popular && (
                        <span className="bg-secondary-500 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-text-light text-xs font-bold">
                        NRs.
                      </span>
                      <span className="text-3xl font-black text-primary-500">
                        {pkg.price}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {pkg.tests.map((test, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-text text-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary-400" />
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="w-full bg-slate-50 border-t border-slate-100 text-primary-600 py-4 font-bold text-sm hover:bg-primary-500 hover:text-white transition-colors flex items-center justify-center gap-2">
                    Book Appointment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Package Banner */}
        <div className="bg-primary-50 border-2 border-dashed border-primary-200 rounded-card p-8 text-center">
          <Award className="w-10 h-10 text-primary-500 mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-text-dark mb-2">
            Need a Specific Test Combination?
          </h3>
          <p className="text-text mb-6">
            We can create a personalized package based on your doctor's
            prescription.
          </p>
          <button className="bg-primary-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-shadow shadow-md">
            Contact Our Lab
          </button>
        </div>
      </div>
    </main>
  );
}
