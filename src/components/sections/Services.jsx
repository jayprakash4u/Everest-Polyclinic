"use client";

import { useState, useRef } from "react";
import { SERVICE_ICON_MAP } from "./DepartmentIcons";

const services = [
  { id: 1, title: "24/7 Emergency", description: "Round-the-clock emergency care with rapid response teams and critical care facilities.", icon: "emergency24" },
  { id: 2, title: "Ambulance Service", description: "24/7 ambulance service for emergency patient transport and hospital transfers.", icon: "ambulance" },
  { id: 3, title: "ICU / Critical Care", description: "Advanced intensive care unit with state-of-the-art monitoring and life support systems.", icon: "icu" },
  { id: 4, title: "Surgery", description: "Modern operation theaters with advanced surgical procedures across all specialties.", icon: "surgery" },
  { id: 5, title: "Diagnostic Services", description: "Comprehensive diagnostic imaging and laboratory services with expert interpretation.", icon: "diagnostic" },
  { id: 6, title: "Pharmacy 24/7", description: "24-hour pharmacy with authentic medicines and expert pharmaceutical care.", icon: "pharmacy24" },
  { id: 7, title: "Blood Bank", description: "NABL accredited blood bank with all blood groups available for emergency needs.", icon: "bloodbank" },
  { id: 9, title: "Telemedicine", description: "Virtual consultations with specialist doctors from the comfort of your home.", icon: "telemedicine" },
  { id: 10, title: "Health Checkup", description: "Comprehensive health packages with preventive screening and personalized reports.", icon: "healthcheckup" },
  { id: 11, title: "Home Care", description: "Professional home healthcare services including nursing, physiotherapy, and sample collection.", icon: "homecare" },
  { id: 12, title: "Vaccination", description: "Complete immunization services for children and adults with all essential vaccines.", icon: "vaccination" },
  { id: 13, title: "Physiotherapy", description: "Expert physiotherapy and rehabilitation services for post-surgery and injury recovery.", icon: "physiotherapy" },
  { id: 14, title: "Maternity Care", description: "Comprehensive maternity services from prenatal care to delivery and postpartum support.", icon: "maternity" },
  { id: 15, title: "Dialysis", description: "State-of-the-art dialysis center with certified technicians and nephrologists.", icon: "dialysis" },
  { id: 16, title: "Cardiac Care", description: "Advanced cardiac diagnostics and treatment including ECG, Echo, TMT, and interventions.", icon: "cardiaccare" },
  { id: 17, title: "Mental Health", description: "Professional counseling and treatment for mental health conditions and emotional well-being.", icon: "mentalhealth" },
];

export default function Services() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      setCanScrollLeft(scrollRef.current.scrollLeft > 0);
      setCanScrollRight(scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === "left" ? -320 : 320, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-gray-100" id="services-list">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-xl font-heading font-bold text-slate-800">Our Services</h2>
          <div className="w-full h-0.5 bg-secondary-600 mt-2"></div>
        </div>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!canScrollLeft}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div ref={scrollRef} onScroll={checkScroll} className="flex gap-6 overflow-x-auto scrollbar-hide px-14 py-4" style={{ scrollbarWidth: "none" }}>
             {services.map((service) => {
               const IconComponent = SERVICE_ICON_MAP[service.icon];
               return (
                 <div key={service.id} className="min-w-[280px] max-w-[280px] border border-slate-200 p-4 hover:shadow-xl hover:border-primary-500 transition-all bg-white flex-shrink-0 rounded-tl rounded-br">
                   <div className="bg-primary-600 -mx-4 -mt-4 px-4 py-2 mb-3">
                     <h3 className="font-heading font-medium text-white text-center text-base">{service.title}</h3>
                   </div>
                   <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 bg-secondary-600 rounded-full">
                     {IconComponent && <IconComponent />}
                   </div>
                   <p className="text-slate-500 text-xs text-center leading-relaxed">{service.description}</p>
                 </div>
               );
             })}
          </div>
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg p-3 rounded-full hover:bg-gray-50 ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!canScrollRight}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}