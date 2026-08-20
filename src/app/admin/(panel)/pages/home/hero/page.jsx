"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminSectionCard from "@/components/admin/AdminSectionCard";
import {
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";

const HERO_LIMIT = 12;
const emptySlide = { image: "", label: "", alt: "" };

export default function HeroSliderAdminPage() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const fetchSlides = useCallback(async () => {
    const response = await fetch("/api/admin/page-sections?page=home");
    if (!response.ok) return [];
    const data = await response.json();
    return data.sections?.hero ?? [];
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchSlides().then((data) => {
      if (cancelled) return;
      setSlides(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchSlides]);

  const update = (index, patch) => {
    setSlides((prev) =>
      prev.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= slides.length) return;

    setSlides((prev) => {
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/page-sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page: "home", section: "hero", items: slides }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to save.");

      setStatus({ ok: true, message: "Saved. Reload the home page to see it." });
    } catch (error) {
      setStatus({ ok: false, message: error.message || "Failed to save." });
    } finally {
      setSaving(false);
    }
  };

  const ready = slides.filter((slide) => slide.image).length;

  return (
    <>
      <AdminPageHeader
        title="Hero Slider"
        subtitle="The full-width carousel at the very top of the home page."
        action={
          <Button href="/" target="_blank" variant="outline" size="sm">
            View home page
            <ExternalLink size={14} />
          </Button>
        }
      />

      <AdminSectionCard
        title="Slides"
        description="Frames rotate every few seconds. The caption names the frame in the control rail beneath the carousel, and the alt text is what a screen reader announces."
        onSave={handleSave}
        saving={saving}
        status={status}
        footnote={`${ready} of ${HERO_LIMIT} slides`}
      >
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-400">Loading slides…</p>
        ) : (
          <>
            {slides.length === 0 ? (
              <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center text-sm text-slate-400">
                No slides saved. Until you save one, the home page shows the five
                images the site shipped with.
              </p>
            ) : (
              <ul className="space-y-4">
                {slides.map((slide, index) => (
                  <li
                    key={slide.id ?? `new-${index}`}
                    className="rounded-xl border border-slate-200 bg-slate-50/40 p-4"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary-700">
                        Slide {index + 1}
                        {index === 0 ? (
                          <span className="ml-2 font-normal normal-case text-slate-400">
                            shown first, and preloaded
                          </span>
                        ) : null}
                      </p>
                      <div className="flex shrink-0 gap-1">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0}
                          aria-label={`Move slide ${index + 1} up`}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === slides.length - 1}
                          aria-label={`Move slide ${index + 1} down`}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSlides((prev) => prev.filter((_, i) => i !== index))
                          }
                          aria-label={`Remove slide ${index + 1}`}
                          className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:border-alert-300 hover:bg-alert-50 hover:text-alert-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <AdminImageUpload
                      label="Slide image"
                      value={slide.image}
                      onChange={(url) => update(index, { image: url })}
                    />

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Caption</label>
                        <input
                          type="text"
                          value={slide.label}
                          onChange={(e) => update(index, { label: e.target.value })}
                          placeholder="Reception"
                          className={adminInputClass}
                        />
                      </div>
                      <div>
                        <label className={adminLabelClass}>Alt text</label>
                        <input
                          type="text"
                          value={slide.alt}
                          onChange={(e) => update(index, { alt: e.target.value })}
                          placeholder="Reception area at Everest International Polyclinic"
                          className={adminInputClass}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {slides.length < HERO_LIMIT ? (
              <button
                type="button"
                onClick={() => setSlides((prev) => [...prev, { ...emptySlide }])}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-dashed border-primary-300 bg-primary-50/50 px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
              >
                <Plus size={16} />
                Add slide
              </button>
            ) : null}
          </>
        )}
      </AdminSectionCard>
    </>
  );
}
