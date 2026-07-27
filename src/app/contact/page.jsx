"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { SITE } from "@/constants";
import { cn } from "@/lib/utils";

const QUICK_CONTACTS = [
  {
    title: "Emergency Hotline",
    desc: "24/7 emergency care",
    value: SITE.emergencyHotline,
    href: `tel:${SITE.emergencyHotline.replace(/\s/g, "")}`,
    icon: PhoneCall,
    iconBg: "bg-alert-50",
    iconColor: "text-alert-600",
    accent: "border-alert-200 hover:border-alert-300",
  },
  {
    title: "General Enquiries",
    desc: "Appointments & support",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    icon: Phone,
    iconBg: "bg-primary-50",
    iconColor: "text-primary-600",
    accent: "border-primary-100 hover:border-primary-200",
  },
  {
    title: "Working Hours",
    desc: "Outpatient & lab services",
    value: SITE.workingHours,
    icon: Clock,
    iconBg: "bg-secondary-50",
    iconColor: "text-secondary-600",
    accent: "border-secondary-100 hover:border-secondary-200",
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
      "You can book through our online form, call our hotline, or visit the facility directly. Home sample collection is also available across the city.",
  },
  {
    question: "How long does it take to get test results?",
    answer:
      "Most routine results are ready within 24–48 hours. Specialized tests may take 3–7 days. Results are shared via email, WhatsApp, or in-person pickup.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Yes, we work with major insurance providers. Contact our billing desk for coverage details and claim assistance.",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <main className="min-h-screen bg-background-light">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-primary-700 px-4 py-8 text-center sm:py-16 md:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-2 flex items-center justify-center gap-2 sm:mb-4">
            <span className="h-[2px] w-5 bg-secondary-400 sm:w-6" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-secondary-300">
              Get In Touch
            </span>
            <span className="h-[2px] w-5 bg-secondary-400 sm:w-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white sm:text-4xl md:text-5xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-2.5 max-w-2xl text-sm leading-relaxed text-primary-100 sm:mt-4 sm:text-base md:text-lg">
            Questions about our services or need to book a visit? Our team is
            ready to help you 24/7.
          </p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section className="relative z-10 -mt-4 px-4 sm:-mt-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {QUICK_CONTACTS.map((item) => {
              const Icon = item.icon;
              const Wrapper = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "flex items-start gap-2.5 rounded-xl border bg-white p-3 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover sm:gap-4 sm:rounded-2xl sm:p-5",
                    item.accent,
                    !item.href && "col-span-2 sm:col-span-1 lg:col-span-1",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 sm:rounded-xl",
                      item.iconBg,
                    )}
                  >
                    <Icon size={18} className={item.iconColor} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 font-heading text-[13px] font-bold leading-snug text-text-dark sm:mt-1 sm:text-base md:text-lg">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-slate-500 sm:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-[1.5rem] border border-primary-100 bg-white shadow-card sm:rounded-[2rem]">
                <div className="relative bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-5 sm:px-8">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="relative flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                      <MessageCircle className="text-white" size={20} />
                    </div>
                    <div>
                      <h2 className="font-heading text-xl font-bold text-white sm:text-2xl">
                        Send us a Message
                      </h2>
                      <p className="text-sm text-primary-100">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:col-span-5">
              <div className="rounded-[1.5rem] border border-primary-100 bg-white p-6 shadow-card sm:rounded-[2rem] sm:p-8">
                <h2 className="font-heading text-xl font-bold text-text-dark sm:text-2xl">
                  Visit Our Clinic
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Find us at our main branch in Kathmandu.
                </p>

                <div className="mt-6 space-y-5">
                  {[
                    {
                      icon: MapPin,
                      title: "Address",
                      lines: [SITE.address],
                    },
                    {
                      icon: Phone,
                      title: "Phone",
                      lines: [SITE.phone, SITE.emergencyHotline],
                    },
                    {
                      icon: Mail,
                      title: "Email",
                      lines: [SITE.email],
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-text-dark">
                            {item.title}
                          </h4>
                          {item.lines.map((line) => (
                            <p key={line} className="text-sm text-slate-500">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Follow Us
                  </p>
                  <div className="mt-3 flex gap-2">
                    {SOCIAL_LINKS.map(({ icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-slate-200/80 bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-8 text-center sm:mb-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-600">
              Support
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-text-dark sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Quick answers to common questions about our services.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-background-light transition-colors hover:border-primary-100"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  >
                    <span className="font-semibold text-text-dark">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        "shrink-0 text-slate-400 transition-transform duration-300",
                        isOpen && "rotate-180 text-primary-600",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-relaxed text-slate-500 sm:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section className="relative h-[320px] w-full border-t-[6px] border-secondary-500 sm:h-[400px] md:h-[450px] md:border-t-8">
        <iframe
          title="Everest Polyclinic map"
          width="100%"
          height="100%"
          frameBorder="0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8907380419406!2d85.32390742346914!3d27.71922847096282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a3778e0001%3A0x1234567890!2sMid-Baneshwor!5e0!3m2!1sen!2snp!4v1234567890"
          className="h-full w-full grayscale-[30%]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent" />
      </section>
    </main>
  );
}
