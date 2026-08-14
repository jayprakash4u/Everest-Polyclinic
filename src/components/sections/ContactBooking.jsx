"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  Stethoscope,
  User,
} from "lucide-react";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import { SERVICES, SITE } from "@/constants";
import { cn } from "@/lib/utils";

const CONTACT_ITEMS = [
  { icon: MapPin, label: "Visit us", value: SITE.address },
  {
    icon: Phone,
    label: "Call us",
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
  },
  { icon: Clock, label: "Opening hours", value: SITE.workingHours },
  {
    icon: Mail,
    label: "Email us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
];

const initialForm = {
  name: "",
  phone: "",
  department: "",
  date: "",
  message: "",
};

/* Fields carry an icon and a placeholder rather than a visible label, matching
   the reference. The label still exists for screen readers — a placeholder is
   not an accessible name, and it disappears the moment someone starts typing. */
const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-600/25";

const iconClass =
  "pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-700";

function ContactItem({ icon: Icon, label, value, href, isLast }) {
  return (
    <li className="relative flex gap-4 pb-5 last:pb-0">
      {/* Connector runs from under this icon to the next one, which is what
          turns four separate rows into one legible route down the column. */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-[23px] top-12 h-[calc(100%-3rem)] w-px bg-white/15"
        />
      ) : null}

      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white ring-1 ring-white/25">
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </span>

      <div className={cn("min-w-0 flex-1", !isLast && "border-b border-white/10 pb-5")}>
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-secondary-300">
          {label}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-white sm:text-base">
          {href ? (
            <a href={href} className="underline-offset-4 transition-colors hover:text-secondary-300 hover:underline">
              {value}
            </a>
          ) : (
            value
          )}
        </p>
      </div>
    </li>
  );
}

function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          department: form.department,
          preferredDate: form.date || null,
          message: form.message,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to send your request right now.");
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    /*
      `lg:mr-11` reserves the strip the badge sticks out into. Without it the
      badge would push past the container into the section's `overflow-hidden`
      and get clipped at narrower desktop widths.
    */
    <div className="relative lg:mr-11">
      {/*
        Vertical tab on the outer edge of the card. Green rather than navy —
        the band behind it is primary-900, so a navy badge would vanish into it.
        Hidden below lg, where the card is full width and the tab would have
        nowhere to sit.
      */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-10 hidden translate-x-full items-center justify-center rounded-r-2xl bg-secondary-600 py-7 pl-1.5 pr-2.5 shadow-e2 lg:flex"
      >
        <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em] text-white [writing-mode:vertical-rl]">
          Appointment now
        </span>
      </span>

      <div className="relative rounded-2xl bg-white p-5 shadow-e2 sm:rounded-3xl sm:p-7 lg:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-600">
          <CalendarCheck className="h-7 w-7" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.01em] text-primary-900 sm:text-2xl">
            Book an appointment
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Choose your preferred service and let our team help you get started.
          </p>
        </div>
      </div>

      {submitted ? (
        <div
          role="status"
          className="mt-6 rounded-xl bg-secondary-50 p-5 text-center ring-1 ring-inset ring-secondary-200"
        >
          <ShieldCheck className="mx-auto h-8 w-8 text-secondary-600" strokeWidth={1.75} />
          <p className="mt-3 font-heading text-lg font-semibold text-primary-900">
            Request received
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            Our team will call you on the number you gave us to confirm the time.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-4 text-sm font-semibold text-secondary-700 underline-offset-4 hover:underline"
          >
            Book another appointment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-3.5" noValidate>
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div className="relative">
              <label htmlFor="cb-name" className="sr-only">
                Your name
              </label>
              <User className={iconClass} strokeWidth={1.75} />
              <input
                id="cb-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your name"
                className={fieldClass}
              />
            </div>

            <div className="relative">
              <label htmlFor="cb-phone" className="sr-only">
                Phone number
              </label>
              <Phone className={iconClass} strokeWidth={1.75} />
              <input
                id="cb-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
                autoComplete="tel"
                placeholder="Phone number"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="relative">
            <label htmlFor="cb-service" className="sr-only">
              Select service
            </label>
            <Stethoscope className={iconClass} strokeWidth={1.75} />
            <select
              id="cb-service"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={cn(
                fieldClass,
                "appearance-none",
                !form.department && "text-slate-400",
              )}
            >
              <option value="">Select service</option>
              {SERVICES.map((service) => (
                <option key={service.slug} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label htmlFor="cb-date" className="sr-only">
              Preferred date
            </label>
            <CalendarCheck className={iconClass} strokeWidth={1.75} />
            <input
              id="cb-date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              // Stops anyone requesting a slot in the past.
              min={new Date().toISOString().split("T")[0]}
              className={cn(fieldClass, !form.date && "text-slate-400")}
            />
          </div>

          <div className="relative">
            <label htmlFor="cb-message" className="sr-only">
              Your message
            </label>
            <MessageSquare className="pointer-events-none absolute left-4 top-3.5 h-4 w-4 text-primary-700" strokeWidth={1.75} />
            <textarea
              id="cb-message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              placeholder="Your message (optional)"
              className={cn(fieldClass, "resize-y")}
            />
          </div>

          {error ? (
            <p role="alert" className="rounded-xl bg-alert-50 px-4 py-3 text-sm text-alert-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="group flex w-full items-center justify-center gap-3 rounded-xl bg-secondary-600 px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {submitting ? "Sending…" : "Book Appointment"}
            {!submitting ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full ring-1 ring-white/60 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            ) : null}
          </button>

          <p className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-secondary-600" strokeWidth={1.75} />
            Your information is secure and confidential.
          </p>
        </form>
      )}
      </div>
    </div>
  );
}

export default function ContactBooking() {
  return (
    <Section tone="dark" className="relative overflow-hidden">
      {/* Dot field in the far corners. Flat navy across a band this tall reads
          as a void — this gives it surface without putting anything behind the
          type or the form. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(circle at 92% 6%, #000 0%, transparent 38%), radial-gradient(circle at 8% 96%, #000 0%, transparent 34%)",
          WebkitMaskImage:
            "radial-gradient(circle at 92% 6%, #000 0%, transparent 38%), radial-gradient(circle at 8% 96%, #000 0%, transparent 34%)",
        }}
      />

      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <SectionHeader
            light
            eyebrow="Contact us"
            className="mb-8 sm:mb-10"
            title={
              /* Explicit break. Left to wrap, the half-width column drops just
                 "us." onto the second line as an orphan at laptop widths. */
              <>
                We&rsquo;re here when
                <br />
                <span className="text-secondary-300">you need us.</span>
              </>
            }
            subtitle="Have a question, need an appointment, or want to speak with our team? Get in touch with us."
          />

          <ul className="max-w-md">
            {CONTACT_ITEMS.map((item, index) => (
              <ContactItem
                key={item.label}
                {...item}
                isLast={index === CONTACT_ITEMS.length - 1}
              />
            ))}
          </ul>
        </div>

        <BookingForm />
      </div>
    </Section>
  );
}
