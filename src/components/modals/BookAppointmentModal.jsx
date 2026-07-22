"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  Mail,
  Phone,
  Stethoscope,
  User,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { SERVICES, SITE } from "@/constants";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  department: "",
  date: "",
  time: "",
  message: "",
};

function FieldLabel({ children, required }) {
  return (
    <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-primary-700">
      {children}
      {required && <span className="text-alert-500"> *</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-primary-100 bg-slate-50 px-4 py-3 text-sm text-text-dark transition-all placeholder:text-slate-400 focus:border-primary-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200";

export default function BookAppointmentModal({
  isOpen,
  onClose,
  bookingPackage = null,
}) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setSubmitError("");
      setForm(initialForm);
      return;
    }

    setSubmitted(false);
    setSubmitError("");

    if (bookingPackage) {
      setForm({
        ...initialForm,
        department: "Health Checkup Packages",
        message: `I would like to book the "${bookingPackage.name}" package (NRs. ${bookingPackage.price.toLocaleString("en-IN")}).`,
      });
      return;
    }

    setForm(initialForm);
  }, [isOpen, bookingPackage]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          department: form.department,
          preferredDate: form.date || null,
          timeSlot: form.time,
          packageName: bookingPackage?.name,
          packagePrice: bookingPackage
            ? String(bookingPackage.price)
            : undefined,
          message: form.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setSubmitError(data.error || "Unable to submit your request.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Unable to connect. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-appointment-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-primary-900/55 backdrop-blur-sm"
        aria-label="Close appointment modal"
        onClick={onClose}
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[1.5rem] border border-primary-100 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.22)] sm:max-h-[90vh] sm:rounded-card">
        {/* Header */}
        <div className="relative shrink-0 bg-gradient-to-r from-primary-700 to-primary-600 px-5 py-5 sm:px-6">
          <div className="absolute inset-0 opacity-10">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
          </div>
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-100">
                Everest Polyclinic
              </p>
              <h2
                id="book-appointment-title"
                className="font-heading text-xl font-bold text-white sm:text-2xl"
              >
                {bookingPackage ? "Book Health Package" : "Book Appointment"}
              </h2>
              <p className="mt-1 text-sm text-primary-100">
                {bookingPackage
                  ? "Confirm your package booking — we will reach out shortly."
                  : "Fill in your details and we'll confirm your visit."}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {submitted ? (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
                <Calendar className="text-secondary-600" size={28} />
              </div>
              <h3 className="font-heading text-xl font-bold text-text-dark">
                Request Received!
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Thank you, {form.name}.
                {bookingPackage ? (
                  <>
                    {" "}We&apos;ve received your request for the{" "}
                    <span className="font-semibold text-primary-600">
                      {bookingPackage.name}
                    </span>{" "}
                    package.
                  </>
                ) : null}{" "}
                Our team will contact you at{" "}
                <span className="font-semibold text-primary-600">
                  {form.phone}
                </span>{" "}
                to confirm your appointment.
              </p>
              <Button
                onClick={onClose}
                variant="secondary"
                className="mt-6 rounded-full px-8"
              >
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {bookingPackage && (
                <div className="rounded-xl border border-secondary-100 bg-secondary-50 px-4 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-700">
                    Selected Package
                  </p>
                  <p className="mt-1 font-heading text-base font-bold text-text-dark">
                    {bookingPackage.name}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-primary-600">
                    NRs. {bookingPackage.price.toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <div className="relative">
                  <User
                    size={16}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={cn(inputClass, "pl-10")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Phone</FieldLabel>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="98XXXXXXXX"
                      className={cn(inputClass, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={cn(inputClass, "pl-10")}
                    />
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel required>
                  {bookingPackage ? "Service" : "Department"}
                </FieldLabel>
                {bookingPackage ? (
                  <div className="relative">
                    <Stethoscope
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      readOnly
                      value="Health Checkup Packages"
                      className={cn(
                        inputClass,
                        "cursor-default bg-primary-50/60 pl-10 text-text-dark",
                      )}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <Stethoscope
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      name="department"
                      required
                      value={form.department}
                      onChange={handleChange}
                      className={cn(inputClass, "cursor-pointer appearance-none pl-10")}
                    >
                      <option value="">Select department</option>
                      {SERVICES.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <FieldLabel required>Preferred Date</FieldLabel>
                  <div className="relative">
                    <Calendar
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="date"
                      name="date"
                      required
                      value={form.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={handleChange}
                      className={cn(inputClass, "pl-10")}
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel required>Preferred Time</FieldLabel>
                  <div className="relative">
                    <Clock
                      size={16}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      name="time"
                      required
                      value={form.time}
                      onChange={handleChange}
                      className={cn(inputClass, "cursor-pointer appearance-none pl-10")}
                    >
                      <option value="">Select time slot</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <FieldLabel>Additional Notes</FieldLabel>
                <textarea
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Symptoms, doctor preference, or special requests..."
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              {submitError ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {submitError}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="secondary"
                fullWidth
                size="lg"
                className="rounded-xl uppercase tracking-wider"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting..."
                  : bookingPackage
                    ? "Confirm Package Booking"
                    : "Confirm Booking"}
              </Button>

              <p className="text-center text-xs text-slate-500">
                Need urgent care? Call{" "}
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="font-semibold text-primary-600 hover:underline"
                >
                  {SITE.phone}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
