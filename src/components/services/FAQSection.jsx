"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import ServiceSection from "./ServiceSection";
import ServiceSectionHeader from "./ServiceSectionHeader";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors ${
        isOpen
          ? "border-primary-200 shadow-sm"
          : "border-slate-200/80 shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
      >
        <span className="font-heading text-base font-semibold leading-snug text-slate-900 md:text-lg">
          {faq.question}
        </span>
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
            isOpen ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className={`grid transition-all duration-200 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 md:px-6 md:text-[15px]">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection({ page }) {
  const { faqs, sections } = page;
  const meta = sections.faq;
  const [openIndex, setOpenIndex] = useState(0);

  if (!faqs.length) return null;

  return (
    <ServiceSection tone="muted" id="faq">
      <div className="mx-auto max-w-3xl">
        <ServiceSectionHeader
          badge={meta.eyebrow ?? "FAQ"}
          title={meta.title}
          subtitle={meta.subtitle}
        />

        <div className="mt-10 space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </ServiceSection>
  );
}
