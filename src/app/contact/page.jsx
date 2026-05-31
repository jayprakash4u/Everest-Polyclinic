"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ChevronDown,
  AlertCircle,
  PhoneCall,
  Clock4,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { SITE } from "@/constants";

const QUICK_CONTACTS = [
  {
    title: "Emergency Hotline",
    desc: "24/7 emergency services",
    value: SITE.emergencyHotline || "+977 986-1848382",
    icon: <AlertCircle className="w-5 h-5 text-red-600" />,
    theme: "bg-red-50 border-red-500",
    text: "text-red-800",
  },
  {
    title: "WhatsApp / Viber",
    desc: "Quick queries & appointments",
    value: "+977 986-1848382",
    icon: <MessageSquare className="w-5 h-5 text-green-600" />,
    theme: "bg-green-50 border-green-500",
    text: "text-green-800",
  },
  {
    title: "Operating Hours",
    desc: "Main Laboratory",
    value: SITE.workingHours || "7:00 AM - 10:00 PM",
    icon: <Clock4 className="w-5 h-5 text-blue-600" />,
    theme: "bg-blue-50 border-blue-500",
    text: "text-blue-800",
  },
];

const FAQS = [
  {
    question: "What are your laboratory operating hours?",
    answer:
      "Our main laboratory is open Monday through Friday from 7:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. Emergency services are available 24/7.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment through our online booking system, by calling our hotline, or by visiting our facility directly. We also offer home sample collection services.",
  },
  {
    question: "How long does it take to get test results?",
    answer:
      "Most routine test results are available within 24-48 hours. Specialized tests may take 3-7 days. We provide results via email, patient portal, or in-person pickup.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we work with major insurance providers. Please check with your insurance company for coverage details or contact our billing department.",
  },
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Hero Header */}
      <div className="bg-slate-900 py-12 md:py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/hero/contact-banner.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Have questions about our pathology services or need to book a home
            collection? Our team is here to assist you 24/7.
          </p>
        </div>
      </div>

      {/* Quick Contact Grid */}
      <section className="-mt-10 mb-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {QUICK_CONTACTS.map((item, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-5 rounded-lg border-l-4 shadow-sm bg-white transition-transform hover:-translate-y-1 ${item.theme}`}
              >
                <div className="p-2 rounded-full bg-white shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    {item.title}
                  </p>
                  <p className={`text-lg font-bold ${item.text}`}>
                    {item.value}
                  </p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left: Contact Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-secondary-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Send us a Message
                  </h2>
                </div>
                <div className="p-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Right: Detailed Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Our Location
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <MapPin className="w-6 h-6 text-primary-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">Main Branch</h4>
                      <p className="text-slate-600 leading-relaxed">
                        {SITE.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <PhoneCall className="w-6 h-6 text-primary-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Phone & Mobile
                      </h4>
                      <p className="text-slate-600">{SITE.phone}</p>
                      <p className="text-slate-600">{SITE.emergencyHotline}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Mail className="w-6 h-6 text-primary-500 shrink-0" />
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Email Address
                      </h4>
                      <p className="text-slate-600">{SITE.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">
                    Follow Our Updates
                  </h4>
                  <div className="flex gap-3">
                    {/* Social buttons simplified with better styling */}
                    <a
                      href="#"
                      className="p-2 bg-slate-100 rounded-md hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <span className="sr-only">Facebook</span>
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="p-2 bg-slate-100 rounded-md hover:bg-primary-500 hover:text-white transition-all"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-16 bg-slate-100/50 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-2">
              Find quick answers to common queries about our services.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex items-center justify-between transition-colors hover:bg-slate-50"
                >
                  <span className="font-semibold text-slate-800">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedFaq === index ? "rotate-180 text-primary-500" : ""}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${expandedFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="px-6 pb-4 text-slate-600 border-t border-slate-50 pt-3">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Map */}
      <section className="h-[450px] w-full relative">
        <div className="absolute top-0 left-0 z-10 bg-secondary-600/90 text-white px-6 py-3 rounded-br-xl hidden md:block">
          <h3 className="font-bold flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Find us in Mid-Baneshwor
          </h3>
        </div>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8907380419406!2d85.32390742346914!3d27.71922847096282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a3778e0001%3A0x1234567890!2sMid-Baneshwor!5e0!3m2!1sen!2snp!4v1234567890"
          allowFullScreen
          loading="lazy"
          className="grayscale contrast-125 focus:outline-none"
        ></iframe>
      </section>
    </main>
  );
}
