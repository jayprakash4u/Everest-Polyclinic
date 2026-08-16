"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  AdminCard,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";

const blankDoctor = (categoryId) => ({
  id: null,
  categoryId,
  name: "",
  education: "",
  experience: "",
  image: "",
  phone: "",
  timing: "",
  showOnHomepage: false,
  isActive: true,
});

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/page-doctors");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setDoctors(data.doctors ?? []);
      setCategories(data.categories ?? []);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (index, patch) => {
    setSaved(false);
    setDoctors((current) =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= doctors.length) return;
    setSaved(false);
    setDoctors((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/page-doctors", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctors }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setDoctors(data.doctors ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const published = doctors.filter((d) => d.isActive !== false);

  return (
    <>
      <AdminPageHeader
        title="Doctors page"
        subtitle="The clinicians listed on /doctors, and which appear on the homepage."
        action={
          <Link
            href="/doctors"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View page
            <ExternalLink size={15} />
          </Link>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">
              Doctors
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {published.length} listed · {doctors.length} in total.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={categories.length === 0}
              onClick={() => {
                setSaved(false);
                setDoctors((current) => [...current, blankDoctor(categories[0]?.id)]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-50"
            >
              <Plus size={16} />
              Add doctor
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-alert-50 px-4 py-3 text-sm text-alert-700">
            {error}
          </p>
        ) : null}
        {saved ? (
          <p role="status" className="mt-4 rounded-lg bg-secondary-50 px-4 py-3 text-sm text-secondary-700">
            Saved. Refresh the doctors page to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading doctors…</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {doctors.map((doctor, index) => (
              <li
                key={doctor.id ?? `new-${index}`}
                className={cn(
                  "rounded-xl border p-4",
                  doctor.isActive === false
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-primary-100 bg-white",
                )}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    {doctor.name || "New doctor"}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${doctor.name || "doctor"} earlier`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === doctors.length - 1}
                      aria-label={`Move ${doctor.name || "doctor"} later`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => update(index, { isActive: doctor.isActive === false })}
                      aria-label={
                        doctor.isActive === false
                          ? `List ${doctor.name || "doctor"}`
                          : `Unlist ${doctor.name || "doctor"}`
                      }
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {doctor.isActive === false ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved(false);
                        setDoctors((current) => current.filter((_, i) => i !== index));
                      }}
                      aria-label={`Delete ${doctor.name || "doctor"}`}
                      className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
                  <AdminImageUpload
                    label="Photo"
                    value={doctor.image}
                    onChange={(url) => update(index, { image: url })}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className={adminLabelClass}>Name</label>
                      <input
                        value={doctor.name}
                        onChange={(event) => update(index, { name: event.target.value })}
                        placeholder="Dr. Rajesh Kumar"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Specialty</label>
                      <select
                        value={doctor.categoryId ?? ""}
                        onChange={(event) =>
                          update(index, { categoryId: Number(event.target.value) })
                        }
                        className={adminInputClass}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={adminLabelClass}>Qualifications</label>
                      <input
                        value={doctor.education}
                        onChange={(event) => update(index, { education: event.target.value })}
                        placeholder="MBBS, MD (Medicine)"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Experience</label>
                      <input
                        value={doctor.experience}
                        onChange={(event) => update(index, { experience: event.target.value })}
                        placeholder="15+ Years"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Consulting hours</label>
                      <input
                        value={doctor.timing}
                        onChange={(event) => update(index, { timing: event.target.value })}
                        placeholder="10:00 AM - 04:00 PM"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Phone</label>
                      <input
                        value={doctor.phone}
                        onChange={(event) => update(index, { phone: event.target.value })}
                        placeholder="+977 9800000000"
                        className={adminInputClass}
                      />
                    </div>

                    <label className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200 sm:col-span-2">
                      <input
                        type="checkbox"
                        checked={Boolean(doctor.showOnHomepage)}
                        onChange={(event) =>
                          update(index, { showOnHomepage: event.target.checked })
                        }
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-semibold text-[#1a3a5c]">
                        Also feature on the homepage
                      </span>
                    </label>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </>
  );
}
