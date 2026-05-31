"use client";

import Image from "next/image";
import { SERVICES } from "@/constants";
import { SERVICE_ICON_MAP } from "@/components/sections/DepartmentIcons";

export default function DepartmentsClientView() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Refined for depth */}
      <section className="relative h-[45vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/banner.jpg"
            alt="Our Departments"
            fill
            className="object-cover scale-105 animate-subtle-zoom"
            priority
          />
          {/* Multi-layered overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800/80 to-transparent" />
          <div className="absolute inset-0 bg-slate-900/20" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center gap-2 mb-6 text-primary-100/80 text-sm font-medium">
              <span>Home</span>
              <span className="w-1 h-1 rounded-full bg-secondary-500"></span>
              <span className="text-white">Departments</span>
            </nav>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight">
              Our <span className="text-secondary-400">Departments</span>
            </h1>
            <p className="text-xl text-blue-50/90 mb-8 leading-relaxed max-w-2xl">
              Equipped with state-of-the-art medical technology and led by
              world-class specialists dedicated to your recovery.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#departments-list"
                className="bg-secondary-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-secondary-600 shadow-lg shadow-secondary-900/20 transition-all active:scale-95"
              >
                View Specialties
              </a>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all">
                Contact Intake
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Grid Section */}
      <section className="relative py-24 bg-slate-50/50" id="departments-list">
        {/* Decorative Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%">
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1.5 w-12 bg-secondary-500 rounded-full"></div>
              <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">
                Clinical Excellence
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-6">
              Specialized Care for Every Patient
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              We house specialized medical departments staffed by expert
              consultants and equipped with advanced technology. Our
              multidisciplinary approach allows for seamless coordination
              between teams to provide holistic treatment under one roof.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => {
              const IconComponent = SERVICE_ICON_MAP[service.icon];
              return (
                <div
                  key={service.id}
                  className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Subtle hover gradient flare */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-16 h-16 flex items-center justify-center mb-6 bg-primary-50 text-primary-500 rounded-2xl group-hover:bg-primary-500 group-hover:text-white group-hover:rotate-[10deg] transition-all duration-500 shadow-inner">
                      {IconComponent && (
                        <IconComponent size={32} strokeWidth={1.5} />
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-slate-800 mb-4 text-xl group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="flex items-center text-primary-500 font-bold text-sm opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes subtle-zoom {
          0% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-subtle-zoom {
          animation: subtle-zoom 20s infinite alternate linear;
        }
      `}</style>
    </main>
  );
}
