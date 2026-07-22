"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  AdminCard,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import { SITE } from "@/constants";

const emptySettings = {
  name: SITE.name,
  shortName: SITE.shortName,
  tagline: SITE.tagline,
  description: SITE.description,
  phone: SITE.phone,
  email: SITE.email,
  address: SITE.address,
  workingHours: SITE.workingHours,
  emergencyHotline: SITE.emergencyHotline,
};

export default function SiteSettingsAdminPage() {
  const [form, setForm] = useState(emptySettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data?.name) setForm(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const response = await fetch("/api/admin/site-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    setMessage(response.ok ? "Settings saved successfully." : "Failed to save settings.");
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading settings...</p>;
  }

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        subtitle="Clinic contact details used across navbar, footer, and contact page."
      />

      <AdminCard>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            ["name", "Clinic Name"],
            ["shortName", "Short Name"],
            ["tagline", "Tagline"],
            ["phone", "Phone"],
            ["email", "Email"],
            ["address", "Address"],
            ["workingHours", "Working Hours"],
            ["emergencyHotline", "Emergency Hotline"],
          ].map(([name, label]) => (
            <div key={name} className={name === "description" ? "md:col-span-2" : ""}>
              <label className={adminLabelClass} htmlFor={name}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className={adminInputClass}
                required
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label className={adminLabelClass} htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className={adminInputClass}
              required
            />
          </div>

          {message ? (
            <p className="md:col-span-2 text-sm font-medium text-primary-700">{message}</p>
          ) : null}

          <div className="md:col-span-2">
            <Button type="submit" variant="secondary" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </form>
      </AdminCard>
    </>
  );
}
