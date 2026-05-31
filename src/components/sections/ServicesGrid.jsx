"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SERVICE_ICON_MAP } from "./DepartmentIcons";
import ServiceDetailModal from "./ServiceDetailModal";

const services = [
  { id: 1, title: "24/7 Emergency", icon: "emergency24" },
  { id: 2, title: "Ambulance Service", icon: "ambulance" },
  { id: 3, title: "ICU / Critical Care", icon: "icu" },
  { id: 4, title: "Surgery", icon: "surgery" },
  { id: 5, title: "Diagnostic Services", icon: "diagnostic" },
  { id: 6, title: "Pharmacy 24/7", icon: "pharmacy24" },
  { id: 7, title: "Blood Bank", icon: "bloodbank" },
  { id: 9, title: "Telemedicine", icon: "telemedicine" },
  { id: 10, title: "Health Checkup", icon: "healthcheckup" },
  { id: 11, title: "Home Care", icon: "homecare" },
  { id: 12, title: "Vaccination", icon: "vaccination" },
  { id: 13, title: "Physiotherapy", icon: "physiotherapy" },
  { id: 14, title: "Maternity Care", icon: "maternity" },
  { id: 15, title: "Dialysis", icon: "dialysis" },
  { id: 16, title: "Cardiac Care", icon: "cardiaccare" },
  { id: 17, title: "Mental Health", icon: "mentalhealth" },
];

export default function ServicesGrid() {
  const scrollRef = useRef(null);
  const detailRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleServiceClick = useCallback(
    (service) => {
      setSelectedService(service);
      router.push(`/services?service=${service.id}`, { scroll: false });
      // Small delay to ensure the DOM is updated if the detail section was hidden
      setTimeout(() => {
        detailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    },
    [router],
  );

  useEffect(() => {
    const serviceId = searchParams.get("service");
    if (serviceId) {
      const service = services.find((s) => s.id === parseInt(serviceId));
      if (service) setSelectedService(service);
    } else {
      const defaultService = services.find((s) => s.id === 7);
      if (defaultService) {
        setSelectedService(defaultService);
        router.replace("/services?service=7", { scroll: false });
      }
    }
  }, [searchParams, router]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 240, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 bg-slate-50/50" id="services-list">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-1 w-12 bg-secondary-500 rounded-full"></span>
            <span className="text-primary-600 font-bold tracking-wider uppercase text-sm">
              Specialized Care
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mb-6">
            Comprehensive Medical{" "}
            <span className="text-primary-500">Services</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Everest International Polyclinic offers a wide range of medical
            services under one roof, combining state-of-the-art technology with
            compassionate clinical excellence.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white text-primary-500 shadow-xl p-3 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <svg
              className="w-6 h-6"
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

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide py-6 px-2 mask-linear-edge"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {services.map((service) => {
              const IconComponent = SERVICE_ICON_MAP[service.icon];
              const isActive = selectedService?.id === service.id;

              return (
                <div
                  key={service.id}
                  onClick={() => handleServiceClick(service)}
                  className={`
                    min-w-[200px] p-6 rounded-2xl cursor-pointer transition-all duration-500 flex-shrink-0
                    flex flex-col items-center text-center border-2
                    ${
                      isActive
                        ? "border-primary-500 bg-white shadow-2xl scale-105 -translate-y-1"
                        : "border-transparent bg-white shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary-100"
                    }
                  `}
                >
                  <div
                    className={`
                    w-14 h-14 flex items-center justify-center rounded-2xl mb-4 transition-colors
                    ${isActive ? "bg-primary-500 text-white" : "bg-primary-50 text-primary-500"}
                  `}
                  >
                    {IconComponent && <IconComponent size={28} />}
                  </div>
                  <h3
                    className={`font-bold text-sm leading-tight ${isActive ? "text-primary-900" : "text-slate-700"}`}
                  >
                    {service.title}
                  </h3>
                  {isActive && (
                    <div className="mt-3 w-6 h-1 bg-secondary-500 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white text-primary-500 shadow-xl p-3 rounded-full hover:bg-primary-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:block"
          >
            <svg
              className="w-6 h-6"
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

      {/* Details Section */}
      {selectedService && (
        <div
          ref={detailRef}
          className="mt-16 transition-all duration-700 ease-in-out border-t border-slate-200 bg-white"
        >
          <div className="container mx-auto px-4 py-12">
            <ServiceDetailModal
              service={selectedService}
              onClose={() => {
                setSelectedService(null);
                router.push("/services", { scroll: false });
              }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
