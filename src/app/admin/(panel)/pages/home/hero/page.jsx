"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Eye,
  EyeOff,
  ExternalLink,
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

const blankSlide = () => ({ src: "", label: "", alt: "", isActive: true });

export default function AdminHomeHeroPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/home-hero");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load slides.");
      setSlides(data.slides ?? []);
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
    setSlides((current) =>
      current.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;
    setSaved(false);
    setSlides((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const remove = (index) => {
    setSaved(false);
    setSlides((current) => current.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);

    try {
      const response = await fetch("/api/admin/home-hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setSlides(data.slides ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const visibleCount = slides.filter((slide) => slide.isActive !== false).length;

  return (
    <>
      <AdminPageHeader
        title="Hero section"
        subtitle="The rotating images at the top of the homepage."
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

      <AdminCard className="mb-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">
              Hero carousel images
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              These rotate at the top of the homepage. {visibleCount} of{" "}
              {slides.length} showing.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSaved(false);
                setSlides((current) => [...current, blankSlide()]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              <Plus size={16} />
              Add slide
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
          <p className="mt-6 text-sm text-slate-500">Loading slides…</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {slides.map((slide, index) => (
              <li
                key={slide.id ?? `new-${index}`}
                className={cn(
                  "rounded-xl border p-4",
                  slide.isActive === false
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-primary-100 bg-white",
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    Slide {index + 1}
                    {index === 0 ? " · first frame" : ""}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move slide ${index + 1} earlier`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === slides.length - 1}
                      aria-label={`Move slide ${index + 1} later`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => update(index, { isActive: slide.isActive === false })}
                      aria-label={
                        slide.isActive === false
                          ? `Show slide ${index + 1}`
                          : `Hide slide ${index + 1}`
                      }
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {slide.isActive === false ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      aria-label={`Remove slide ${index + 1}`}
                      className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <AdminImageUpload
                    label="Slide image"
                    value={slide.src}
                    onChange={(url) => update(index, { src: url })}
                  />

                  <div className="space-y-3">
                    <div>
                      <label className={adminLabelClass}>Caption</label>
                      <input
                        value={slide.label}
                        onChange={(event) => update(index, { label: event.target.value })}
                        placeholder="Reception"
                        className={adminInputClass}
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Shown on the slide and in the rail beneath the hero.
                      </p>
                    </div>

                    <div>
                      <label className={adminLabelClass}>Alt text</label>
                      <input
                        value={slide.alt}
                        onChange={(event) => update(index, { alt: event.target.value })}
                        placeholder="Reception area at Everest International Polyclinic"
                        className={adminInputClass}
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Describes the photo for screen readers. Falls back to the
                        caption if left blank.
                      </p>
                    </div>
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
