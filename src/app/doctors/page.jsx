"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Calendar, Search, Award, CheckCircle2 } from "lucide-react";

const specialists = [
  {
    category: "General Physician",
    doctors: [
      {
        name: "Dr. Rajesh Kumar",
        education: "MBBS, MD (Medicine)",
        image: "/images/doctors/doctor-1.jpg",
      },
      {
        name: "Dr. Anil Sharma",
        education: "MBBS, MD (General Medicine)",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Pediatrician",
    doctors: [
      {
        name: "Dr. Priya Singh",
        education: "MBBS, MD (Pediatrics)",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Gynecologist",
    doctors: [
      {
        name: "Dr. Sunita Sharma",
        education: "MBBS, MD (Gynecology)",
        image: "/images/doctors/doctor-4.jpg",
      },
      {
        name: "Dr. Meera Acharya",
        education: "MBBS, MS (Obstetrics)",
        image: "/images/doctors/doctor-1.jpg",
      },
    ],
  },
  {
    category: "Cardiologist",
    doctors: [
      {
        name: "Dr. Amit Patel",
        education: "MBBS, MD (Cardiology)",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Dermatologist",
    doctors: [
      {
        name: "Dr. Sanjay Joshi",
        education: "MBBS, MD (Dermatology)",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Orthopedic",
    doctors: [
      {
        name: "Dr. Binod Shah",
        education: "MBBS, MS (Orthopedics)",
        image: "/images/doctors/doctor-4.jpg",
      },
    ],
  },
  {
    category: "ENT Specialist",
    doctors: [
      {
        name: "Dr. Ramesh Thapa",
        education: "MBBS, MS (ENT)",
        image: "/images/doctors/doctor-1.jpg",
      },
    ],
  },
  {
    category: "Dentist",
    doctors: [
      {
        name: "Dr. Kamala Rai",
        education: "BDS, MDS (Dental Surgery)",
        image: "/images/doctors/doctor-2.jpg",
      },
    ],
  },
  {
    category: "Physiotherapist",
    doctors: [
      {
        name: "Dr. Deepak Bhatta",
        education: "BPT, MPT (Physiotherapy)",
        image: "/images/doctors/doctor-3.jpg",
      },
    ],
  },
  {
    category: "Psychologist",
    doctors: [
      {
        name: "Dr. Asha Karki",
        education: "MA, PhD (Psychology)",
        image: "/images/doctors/doctor-4.jpg",
      },
    ],
  },
];

export default function DoctorsPage() {
  const [filter, setFilter] = useState("All");

  const flattenedDoctors = specialists.flatMap((s) =>
    s.doctors.map((d) => ({ ...d, category: s.category })),
  );
  const filteredDoctors =
    filter === "All"
      ? flattenedDoctors
      : flattenedDoctors.filter((d) => d.category === filter);

  return (
    <main className="min-h-screen bg-background-light">
      {/* Modern Hero Section */}
      <section className="relative h-[40vh] flex items-center bg-primary-900">
        <Image
          src="/images/hero/banner.jpg"
          alt="Everest Medical Team"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
              Expert Care
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
              Meet Our <span className="text-secondary-400">Specialists</span>
            </h1>
            <p className="text-lg text-primary-50 font-sans max-w-xl">
              Our team of board-certified professionals is dedicated to
              providing evidence-based, compassionate care for you and your
              family.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Intro Section */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-card shadow-card p-6 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-text-dark font-heading font-bold">
                  Find a Specialist
                </h2>
                <p className="text-text-light text-sm">
                  Filter by medical department
                </p>
              </div>
            </div>

            <select
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-64 p-3 bg-slate-50 border border-slate-200 rounded-xl text-text-dark font-medium focus:ring-2 focus:ring-primary-500 outline-none"
            >
              <option value="All">All Departments</option>
              {specialists.map((s) => (
                <option key={s.category} value={s.category}>
                  {s.category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-card overflow-hidden shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300"
              >
                {/* Doctor Image Container */}
                <div className="relative h-64 bg-slate-100 overflow-hidden">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm">
                      <Award className="w-5 h-5 text-secondary-500" />
                    </div>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-[10px] font-black text-secondary-600 uppercase tracking-widest mb-1">
                      {doctor.category}
                    </p>
                    <h3 className="text-xl font-heading font-bold text-text-dark group-hover:text-primary-600 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-primary-500 font-medium text-sm mt-1">
                      {doctor.education}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-50 pt-4">
                    <div className="flex items-center gap-2 text-xs text-text">
                      <CheckCircle2 className="w-4 h-4 text-secondary-500" />
                      <span>Accepting New Patients</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-slate-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors">
                    <Calendar className="w-4 h-4" /> Book Consultation
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="bg-primary-50 rounded-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-primary-100">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-heading font-bold text-text-dark mb-2">
              Can't find a specific specialist?
            </h3>
            <p className="text-text">
              Our reception team can assist you in finding the right doctor for
              your needs.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:+97701234567"
              className="flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-bold shadow-sm border border-primary-200"
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
