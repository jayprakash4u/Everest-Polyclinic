"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-[#1a3a5c] md:text-lg">
          {faq.question}
        </span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-primary-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-slate-100 px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600 md:text-base">
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

  const hasSideImage = Boolean(meta.image);

  return (
    <section id="faq" className="bg-[#f8fafc] py-20 md:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={
            hasSideImage
              ? "grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
              : "mx-auto max-w-3xl"
          }
        >
          {hasSideImage ? (
            <div>
              {meta.eyebrow ? (
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-600">
                  {meta.eyebrow}
                </p>
              ) : null}
              <h2
                className={`font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl ${meta.eyebrow ? "mt-3" : ""}`}
              >
                {meta.title}
              </h2>
              {meta.subtitle ? (
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {meta.subtitle}
                </p>
              ) : null}
              <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
                <Image
                  src={meta.image}
                  alt="Friendly doctor ready to answer your questions"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
              </div>
            </div>
          ) : (
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-bold tracking-tight text-[#1a3a5c] md:text-4xl">
                Frequently Asked Questions
              </h2>
              {meta.subtitle ? (
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {meta.subtitle}
                </p>
              ) : null}
            </div>
          )}

          <div className="space-y-3">
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
      </div>
    </section>
  );
}
