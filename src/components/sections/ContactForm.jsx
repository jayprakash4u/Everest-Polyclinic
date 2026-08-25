"use client";

import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/constants";
import { cn } from "@/lib/utils";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
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

export default function ContactForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.department,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Unable to send your message.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to connect. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100">
          <MessageSquare className="text-secondary-600" size={28} />
        </div>
        <h3 className="font-heading text-xl font-bold text-primary-900">
          Message Sent!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
          Thank you, {formData.name}. Our team will get back to you shortly at{" "}
          <span className="font-semibold text-primary-600">{formData.email}</span>.
        </p>
        <Button
          type="button"
          variant="primary"
          className="mt-6 rounded-full px-8"
          onClick={() => {
            setSubmitted(false);
            setFormData(initialForm);
          }}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <FieldLabel required>Full Name</FieldLabel>
        <div className="relative">
          <User
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className={cn(inputClass, "pl-10")}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel required>Email</FieldLabel>
          <div className="relative">
            <Mail
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@email.com"
              className={cn(inputClass, "pl-10")}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Phone</FieldLabel>
          <div className="relative">
            <Phone
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="98XXXXXXXX"
              className={cn(inputClass, "pl-10")}
            />
          </div>
        </div>
      </div>

      <div>
        <FieldLabel>Department</FieldLabel>
        <div className="relative">
          <Stethoscope
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={cn(inputClass, "cursor-pointer appearance-none pl-10")}
          >
            <option value="">Select a department</option>
            {SERVICES.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <FieldLabel required>Message</FieldLabel>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="How can we help you?"
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      ) : null}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        size="lg"
        className="rounded-xl uppercase tracking-wider"
        disabled={submitting}
      >
        {submitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
