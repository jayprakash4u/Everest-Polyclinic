"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronDown, PhoneCall } from "lucide-react";
import Section from "@/components/ui/Section";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { STATIC_FAQS } from "@/constants/blogPosts";
import { SITE } from "@/constants";
import { encodePublicPath } from "@/lib/encode-public-path";
import { cn } from "@/lib/utils";

const SIDE_IMAGE = "/images/doctors/e1.jpg";

export default function FaqSection({ faqs = STATIC_FAQS }) {
  const list = faqs?.length ? faqs : STATIC_FAQS;
  const [openIndex, setOpenIndex] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const baseId = useId();

  const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <Section tone="white">
      <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h2 className="font-heading text-[1.875rem] font-semibold leading-[1.15] tracking-[-0.01em] text-primary-900 sm:text-[2.125rem] lg:text-[2.625rem]">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Find answers to common queries about our services. From appointment
            booking to treatment options, we&rsquo;re here to help you with all
            your healthcare needs.
          </p>

          <dl className="mt-8 space-y-3">
            {list.map((faq, index) => {
              const isOpen = index === openIndex;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <div key={faq.question}>
                  <dt>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      /* Clicking the open row closes it, so the group can rest
                         fully collapsed rather than forcing one always open. */
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className={cn(
                        "flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2",
                        isOpen
                          ? "bg-primary-50 text-primary-900"
                          : "bg-primary-50/60 text-primary-900 hover:bg-primary-50",
                      )}
                    >
                      <span className="text-sm font-semibold leading-snug sm:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-secondary-600 transition-transform duration-300",
                          isOpen ? "rotate-0" : "-rotate-90",
                        )}
                        strokeWidth={2}
                      />
                    </button>
                  </dt>

                  {/*
                    Grid-rows animation rather than max-height: it collapses to
                    the panel's real height, so a long answer never gets clipped
                    and a short one never leaves a gap.
                  */}
                  <dd
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-e2 sm:rounded-3xl">
            <Image
              src={encodePublicPath(SIDE_IMAGE)}
              alt="A clinician at their consulting desk"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />

            {/* Contact card floating over the foot of the photograph. */}
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-e2 sm:inset-x-4 sm:bottom-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-4">
              <a href={telHref} className="group flex min-w-0 items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
                  <PhoneCall className="h-5 w-5" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">Contact us?</span>
                  <span className="block truncate text-sm font-bold text-primary-900 transition-colors group-hover:text-primary-700 sm:text-base">
                    {SITE.phone}
                  </span>
                </span>
              </a>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-secondary-600 py-2 pl-5 pr-2 text-sm font-semibold text-white transition-colors hover:bg-secondary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600 focus-visible:ring-offset-2"
              >
                Appointment
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-secondary-700 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </Section>
  );
}
