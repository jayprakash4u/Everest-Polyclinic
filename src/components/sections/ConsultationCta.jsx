"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clock, Mail, Phone } from "lucide-react";
import Container from "@/components/ui/Container";
import BookAppointmentModal from "@/components/modals/BookAppointmentModal";
import { SITE } from "@/constants";
import { encodePublicPath } from "@/lib/encode-public-path";

/* Shot on white, so it reads as a cut-out against the tinted panel without
   needing a transparent PNG. */
const DOCTOR_IMAGE = "/images/callback-banner.jpg";

export default function ConsultationCta() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const telHref = `tel:${SITE.phone.replace(/\s/g, "")}`;

  const contacts = [
    { icon: Phone, label: "Call us", value: SITE.phone, href: telHref },
    {
      icon: Mail,
      label: "Send us a mail",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    { icon: Clock, label: "Opening time", value: SITE.workingHours },
  ];

  return (
    <section className="bg-white py-14 sm:py-20 lg:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary-50">
          <div className="grid items-end gap-6 sm:grid-cols-2">
            <div className="px-6 pb-8 pt-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
              <h2 className="max-w-md font-heading text-[1.875rem] font-semibold leading-[1.12] tracking-[-0.015em] text-primary-900 sm:text-[2.25rem] lg:text-[2.75rem]">
                Schedule Your Consultation Today!
              </h2>

              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-secondary-600 py-2 pl-6 pr-2 text-sm font-semibold text-white transition-colors hover:bg-secondary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600 focus-visible:ring-offset-2 sm:text-base"
              >
                Appointment
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-secondary-700 transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </button>
            </div>

            {/*
              Bottom-aligned and cropped from the top so the figure stands on
              the panel's lower edge, as in the reference. Below sm it drops
              away entirely — squeezed beside the heading it becomes a sliver,
              and stacked it pushes the button off the first screen.
            */}
            <div className="relative hidden h-full min-h-[260px] sm:block lg:min-h-[320px]">
              <Image
                src={encodePublicPath(DOCTOR_IMAGE)}
                alt="A clinician at Everest International Polyclinic"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover object-[center_top]"
              />
            </div>
          </div>
        </div>

        {/* Get in touch */}
        <div className="mt-10 sm:mt-12">
          <div className="grid gap-6 lg:grid-cols-4 lg:items-center lg:gap-8">
            <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-primary-900 sm:text-2xl">
              Get in Touch with us
            </h3>

            <dl className="grid gap-5 sm:grid-cols-3 lg:col-span-3">
              {contacts.map(({ icon: Icon, label, value, href }) => {
                const body = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-900 text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      <dt className="text-sm font-semibold text-primary-900">
                        {label}
                      </dt>
                      <dd className="mt-0.5 break-words text-sm text-slate-600">
                        {value}
                      </dd>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-3 rounded-xl transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
                  >
                    {body}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-3">
                    {body}
                  </div>
                );
              })}
            </dl>
          </div>

          <span
            aria-hidden="true"
            className="mt-8 block h-px w-full bg-slate-200 sm:mt-10"
          />
        </div>
      </Container>

      <BookAppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </section>
  );
}
