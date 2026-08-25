"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import ServiceSection from "./ServiceSection";
import ServiceSectionHeader from "./ServiceSectionHeader";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white transition-colors sm:rounded-2xl ${
        isOpen
          ? "border-primary-200 shadow-sm"
          : "border-slate-200/80 shadow-sm"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-3 px-3.5 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-5 md:px-6"
      >
        <span className="font-heading text-sm font-semibold leading-snug text-primary-900 sm:text-base md:text-lg">
          {faq.question}
        </span>
        <span
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors sm:h-8 sm:w-8 ${
            isOpen ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          ) : (
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          )}
        </span>
      </button>
      <div
        className={`grid transition-all duration-200 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-slate-100 px-3.5 pb-3.5 pt-3 text-[13px] leading-relaxed text-slate-600 sm:px-5 sm:pb-5 sm:pt-4 sm:text-sm md:px-6 md:text-[15px]">
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

        <div className="mt-6 space-y-2.5 sm:mt-10 sm:space-y-3">
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
