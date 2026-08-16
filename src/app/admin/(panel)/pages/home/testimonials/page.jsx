"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Star,
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

const blankTestimonial = () => ({
  id: null,
  name: "",
  location: "",
  rating: 5,
  review: "",
  avatar: "",
  isActive: true,
});

/** Five clickable stars — the same shape the public card draws. */
function RatingPicker({ value, onChange, name }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`${star} star${star === 1 ? "" : "s"} for ${name || "this review"}`}
          aria-pressed={star === value}
          className="rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
        >
          <Star
            size={20}
            className={cn(
              star <= value ? "fill-amber-400 text-amber-400" : "text-slate-300",
            )}
          />
        </button>
      ))}
      <span className="ml-2 text-xs font-semibold text-slate-500">{value} / 5</span>
    </div>
  );
}

export default function AdminHomeTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/home-testimonials");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setTestimonials(data.testimonials ?? []);
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
    setTestimonials((current) =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= testimonials.length) return;
    setSaved(false);
    setTestimonials((current) => {
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
      const response = await fetch("/api/admin/home-testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testimonials }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setTestimonials(data.testimonials ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const published = testimonials.filter((item) => item.isActive !== false);

  return (
    <>
      <AdminPageHeader
        title="Patient voices"
        subtitle="Reviews shown in the testimonials carousel on the homepage."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/pages/home"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              <ArrowLeft size={15} />
              Home page
            </Link>
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
            >
              View page
              <ExternalLink size={15} />
            </Link>
          </div>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">
              Reviews
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {published.length} showing on the homepage · {testimonials.length}{" "}
              in total.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSaved(false);
                setTestimonials((current) => [...current, blankTestimonial()]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              <Plus size={16} />
              Add review
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
            Saved. Refresh the homepage to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading reviews…</p>
        ) : testimonials.length === 0 ? (
          <p className="mt-6 rounded-xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-500">
            No reviews yet. Add one — until then the homepage shows the bundled
            sample reviews.
          </p>
        ) : (
          <ul className="mt-6 space-y-4">
            {testimonials.map((item, index) => (
              <li
                key={item.id ?? `new-${index}`}
                className={cn(
                  "rounded-xl border p-4",
                  item.isActive === false
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-primary-100 bg-white",
                )}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    {item.name || "New review"}
                    {item.location ? ` · ${item.location}` : ""}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move ${item.name || "review"} earlier`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === testimonials.length - 1}
                      aria-label={`Move ${item.name || "review"} later`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => update(index, { isActive: item.isActive === false })}
                      aria-label={
                        item.isActive === false
                          ? `Publish ${item.name || "review"}`
                          : `Unpublish ${item.name || "review"}`
                      }
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {item.isActive === false ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved(false);
                        setTestimonials((current) => current.filter((_, i) => i !== index));
                      }}
                      aria-label={`Delete ${item.name || "review"}`}
                      className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
                  <div className="space-y-3">
                    <div>
                      <label className={adminLabelClass}>Patient name</label>
                      <input
                        value={item.name}
                        onChange={(event) => update(index, { name: event.target.value })}
                        placeholder="Sita Sharma"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Location</label>
                      <input
                        value={item.location}
                        onChange={(event) => update(index, { location: event.target.value })}
                        placeholder="Nepalgunj"
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Rating</label>
                      <RatingPicker
                        value={item.rating}
                        name={item.name}
                        onChange={(rating) => update(index, { rating })}
                      />
                    </div>

                    <AdminImageUpload
                      label="Photo"
                      optional
                      value={item.avatar}
                      onChange={(url) => update(index, { avatar: url })}
                    />
                    <p className="-mt-2 text-xs text-slate-400">
                      Optional. Without one the card shows the patient&rsquo;s
                      initial in a circle.
                    </p>
                  </div>

                  <div>
                    <label className={adminLabelClass}>Review</label>
                    <textarea
                      rows={9}
                      value={item.review}
                      onChange={(event) => update(index, { review: event.target.value })}
                      placeholder="What the patient said about their visit."
                      className={adminInputClass}
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Publish only what the patient agreed to have shown, with
                      their name and location.
                    </p>
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
