"use client";

import { useState, useEffect } from "react";
import GenericTiming from "../sections/ServiceDetailModal/GenericTiming";
import Button from "../ui/Button";

export default function MentalHealthModal({ service, onClose }) {
  const data = service;
  const conditions = [
    {
      name: "Depression",
      desc: "Persistent sadness, loss of interest, and emotional distress treated with therapy and medication.",
      image: "/images/sign-of-depression.jpg",
    },
    {
      name: "Anxiety Disorders",
      desc: "Excessive worry, restlessness, and panic attacks managed through CBT and counseling.",
      image: "/images/anxiety-disorders.jpg",
    },
    {
      name: "Panic Attacks",
      desc: "Sudden intense episodes of fear and anxiety with rapid heartbeat and breathing difficulties.",
      image: "/images/panic-attacks.jpg",
    },
    {
      name: "OCD",
      desc: "Obsessive thoughts and compulsive behaviors addressed with ERP therapy and medication.",
      image: "/images/ocd.jpg",
    },
    {
      name: "PTSD",
      desc: "Trauma-related stress disorders treated with trauma-focused therapy and support.",
      image: "/images/ptsd.jpg",
    },
    {
      name: "Sleep Disorders",
      desc: "Insomnia, sleep apnea, and circadian rhythm issues managed through therapy and sleep hygiene.",
      image: "/images/sleep-disorders.jpg",
    },
    {
      name: "Substance Abuse",
      desc: "Addiction recovery programs with counseling, detox support, and rehabilitation services.",
      image: "/images/substance-abuse.jpg",
    },
  ];

  const [startIdx, setStartIdx] = useState(0);
  const cardsToShow = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIdx((prev) => (prev + 1 < conditions.length - cardsToShow + 1 ? prev + 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setStartIdx((prev) => (prev + 1 < conditions.length - cardsToShow + 1 ? prev + 1 : prev));
  };

  const prev = () => {
    setStartIdx((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const visibleConditions = conditions.slice(startIdx, startIdx + cardsToShow);

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

        {/* Promo Section - Image Left, Content Right */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Side - Image */}
            <div className="md:w-1/2 flex">
              <div className="flex-1 flex items-center justify-center overflow-hidden hidden md:block">
                <img
                  src="/images/mental_health_poster.jpg"
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="md:w-1/2 flex flex-col p-4">
              <h3 className="text-lg font-heading font-bold text-slate-800 mb-3">Comprehensive Mental Health Care</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Our mental health department provides compassionate, confidential, and evidence-based care for a wide range of psychological and emotional conditions. Our team of experienced psychiatrists, clinical psychologists, and counselors work together to create personalized treatment plans combining therapy, medication, and lifestyle interventions.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Psychiatric Evaluations</h4>
                    <p className="text-sm text-slate-600">Comprehensive assessment and diagnosis of mental health conditions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Individual & Group Therapy</h4>
                    <p className="text-sm text-slate-600">CBT, DBT, and other evidence-based therapeutic approaches</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="flex-shrink-0">
                    <svg className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Medication Management</h4>
                    <p className="text-sm text-slate-600">Ongoing psychiatric care and medication adjustments for optimal outcomes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conditions We Support */}
        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">Conditions We Support</h3>
          <div className="relative px-12">
            {/* Prev Button */}
            <button
              onClick={prev}
              disabled={startIdx === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Previous conditions"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Row */}
            <div className="flex gap-3 overflow-hidden">
              {visibleConditions.map((cond, idx) => (
                <div key={startIdx + idx} className="flex-1 min-w-0 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-slate-200 overflow-hidden">
                    <img
                      src={cond.image}
                      alt={cond.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{cond.name}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed mb-2 line-clamp-2">{cond.desc}</p>
                    <button className="text-primary-600 text-xs font-semibold hover:underline">Learn More →</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={next}
              disabled={startIdx + cardsToShow >= conditions.length}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              aria-label="Next conditions"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: conditions.length - cardsToShow + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setStartIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === startIdx ? "bg-primary-500" : "bg-slate-300 hover:bg-slate-400"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us - Trust Section */}
        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">Why Choose Us</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Confidential & Secure",
                desc: "Complete privacy protection with encrypted records and HIPAA-compliant practices.",
                icon: (
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
              {
                title: "Certified Professionals",
                desc: "Board-certified psychiatrists and licensed psychologists with extensive experience.",
                icon: (
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
              },
              {
                title: "Integrated Lab + Mental Health",
                desc: "On-site diagnostic labs and seamless coordination with medical specialists.",
                icon: (
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
              },
              {
                title: "Evidence-Based Treatment",
                desc: "Proven therapeutic methods backed by scientific research and clinical guidelines.",
                icon: (
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Fast Reports",
                desc: "Quick assessment summaries and digital reports within 24-48 hours.",
                icon: (
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Experts */}
        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">Meet Our Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Doctor 1 */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src="/images/doctors/doctor-1.jpg"
                    alt="Dr. Arjun Mehta"
                    className="w-16 h-16 rounded-full object-cover shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 mb-1 truncate">Dr. Arjun Mehta</h4>
                  <p className="text-primary-600 text-xs font-medium mb-1">MBBS, MD Psychiatry</p>
                  <p className="text-slate-500 text-xs mb-2">12+ years experience</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium border border-blue-100">CBT Certified</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">NABH</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src="/images/doctors/doctor-2.jpg"
                    alt="Dr. Priya Sharma"
                    className="w-16 h-16 rounded-full object-cover shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 mb-1 truncate">Dr. Priya Sharma</h4>
                  <p className="text-primary-600 text-xs font-medium mb-1">MD Clinical Psychology</p>
                  <p className="text-slate-500 text-xs mb-2">10+ years experience</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium border border-purple-100">DBT Expert</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">MCI Reg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="bg-white border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src="/images/doctors/doctor-3.jpg"
                    alt="Dr. Rajesh Malhotra"
                    className="w-16 h-16 rounded-full object-cover shadow"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 mb-1 truncate">Dr. Rajesh Malhotra</h4>
                  <p className="text-primary-600 text-xs font-medium mb-1">Psychiatrist • DNB</p>
                  <p className="text-slate-500 text-xs mb-2">15+ years experience</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-medium border border-red-100">Addiction Specialist</span>
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-medium border border-green-100">Fellow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog / Resources Section */}
        <div className="mb-8">
          <h3 className="text-xl font-heading font-bold text-slate-800 mb-6">Mental Health Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Signs of Depression",
                desc: "Learn to recognize the common symptoms of depression and when to seek professional help for yourself or a loved one.",
                readTime: "5 min read",
                image: "/images/sign-of-depression.jpg",
              },
              {
                title: "How Stress Affects Your Body",
                desc: "Understanding the physical and psychological impacts of chronic stress and effective management strategies.",
                readTime: "7 min read",
                image: "/images/stress-affects-body.jpg",
              },
              {
                title: "When to Seek Help",
                desc: "Key indicators that it's time to consult a mental health professional for diagnosis and treatment.",
                readTime: "4 min read",
                image: "/images/when-to-seek-help.jpg",
              },
            ].map((article, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="aspect-video bg-slate-200 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-xs text-slate-500">{article.readTime}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed mb-3 line-clamp-2">
                    {article.desc}
                  </p>
                  <span className="text-primary-600 text-xs font-semibold hover:underline">Read Article →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-slate-200">
          <Button
            variant="primary"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              // Handle book now action
              console.log("Book Now clicked for Mental Health service");
              // You can add navigation or modal logic here
            }}
          >
            Book Now
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 max-w-[140px] mx-auto sm:mx-0"
            onClick={() => {
              // Handle enquiry action
              console.log("Enquiry clicked for Mental Health service");
              // You can add navigation or modal logic here
            }}
          >
            Enquiry
          </Button>
        </div>
      </div>
    </div>
  );
}
