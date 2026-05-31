"use client";

import { useState } from "react";
import { SITE } from "@/constants";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white border border-slate-200">
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Your name"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1">
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select a department</option>
            <option value="cardiology">Cardiology</option>
            <option value="gynecology">Gynecology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="dermatology">Dermatology</option>
            <option value="general">General Medicine</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary-600 text-white py-3 font-semibold hover:bg-secondary-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}