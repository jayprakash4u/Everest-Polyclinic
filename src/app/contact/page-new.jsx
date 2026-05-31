import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/sections/ContactForm";
import { SITE } from "@/constants";

const QUICK_CONTACTS = [
  {
    title: "Emergency Hotline",
    desc: "24/7 emergency services",
    value: "+977 986-1848382",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3.5 4.5A1.5 1.5 0 015 3h10a.75.75 0 01.75.75v10.75A.75.75 0 0115 19H5a.75.75 0 01-.75-.75V5a.75.75 0 01.75-.75zM5 4.5a.5.5 0 00-.5.5v10.75a.5.5 0 00.5.5h10a.5.5 0 00.5-.5V5a.5.5 0 00-.5-.5H5z" />
        <path fillRule="evenodd" d="M8.5 9.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H9a.5.5 0 01-.5-.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    title: "WhatsApp",
    desc: "Quick queries & appointments",
    value: "+977 986-1848382",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.987 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    title: "Toll-Free",
    desc: "Free call from anywhere",
    value: "1800-LIFELINE",
    icon: (
      <svg className="w-10 h-10 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        <path fillRule="evenodd" d="M15 8a3 3 0 00-3-3 3 3 0 00-3 3v2a3 3 0 003 3h2a3 3 0 003-3V8z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const FAQS = [
  {
    question: "What are your laboratory operating hours?",
    answer: "Our main laboratory is open Monday through Friday from 7:00 AM to 10:00 PM, and Saturday through Sunday from 8:00 AM to 8:00 PM. Emergency services are available 24/7.",
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment through our online booking system, by calling our hotline, or by visiting our facility directly. We also offer home sample collection services.",
  },
  {
    question: "How long does it take to get test results?",
    answer: "Most routine test results are available within 24-48 hours. Specialized tests may take 3-7 days. We provide results via email, patient portal, or in-person pickup.",
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we work with major insurance providers. Please check with your insurance company for coverage details or contact our billing department for more information.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Banner */}
        <section className="relative h-[30vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero/contact-banner.jpg"
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Quick Contact Banner */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {QUICK_CONTACTS.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-5 bg-slate-50 rounded-xl border-l-4 border-primary-500 hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 mb-1">{item.title}</p>
                    <p className="text-lg font-bold text-slate-800">{item.value}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-800 mb-6">
                  Send us a Message
                </h2>
                <ContactForm />
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold text-slate-800 mb-6">
                  Get in Touch
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Address</h3>
                      <p className="text-slate-600 text-sm">{SITE.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Phone</h3>
                      <p className="text-slate-600 text-sm">{SITE.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                      <p className="text-slate-600 text-sm">{SITE.email}</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800 mb-1">Working Hours</h3>
                      <p className="text-slate-600 text-sm">{SITE.workingHours}</p>
                    </div>
                  </div>
                </div>

                {/* Emergency */}
                <div className="flex items-start gap-4 p-4 bg-red-50 rounded-xl border-l-4 border-red-500">
                  <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">Emergency</h3>
                    <p className="text-red-700 text-sm font-medium">{SITE.emergencyHotline}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {[
                      { name: "facebook", icon: <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-bold">f</span> },
                      { name: "instagram", icon: <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 text-white text-xs font-bold">in</span> },
                      { name: "linkedin", icon: <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-800 text-white text-xs font-bold">in</span> },
                      { name: "twitter", icon: <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-sky-500 text-white text-xs font-bold">X</span> },
                    ].map((social) => (
                      <a key={social.name} href="#" className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity">
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-slate-800 mb-2">Frequently Asked Questions</h2>
              <div className="w-16 h-1 bg-primary-500 mx-auto"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {FAQS.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <button className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-800">{faq.question}</span>
                    <svg className="w-5 h-5 text-slate-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full">
          <div className="bg-secondary-600 px-4 py-2">
            <div className="container mx-auto">
              <h2 className="text-xl font-heading font-bold text-white">Our Location</h2>
            </div>
          </div>
          <div className="h-96 bg-slate-300 flex items-center justify-center">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8907380419406!2d85.32390742346914!3d27.71922847096282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a3778e0001%3A0x1234567890!2sMid-Baneshwor!5e0!3m2!1sen!2snp!4v1234567890"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
