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

const blankImage = () => ({
  id: null,
  src: "",
  alt: "",
  caption: "",
  isActive: true,
});

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/page-gallery");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setImages(data.images ?? []);
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
    setImages((current) =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    setSaved(false);
    setImages((current) => {
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
      const response = await fetch("/api/admin/page-gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setImages(data.images ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const shown = images.filter((image) => image.isActive !== false && image.src);

  return (
    <>
      <AdminPageHeader
        title="Gallery page"
        subtitle="Photographs shown in the gallery grid."
        action={
          <Link
            href="/gallery"
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
              Images
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {shown.length} showing · {images.length} in total.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSaved(false);
                setImages((current) => [...current, blankImage()]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50"
            >
              <Plus size={16} />
              Add image
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
            Saved. Refresh the gallery page to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading images…</p>
        ) : (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {images.map((image, index) => (
              <li
                key={image.id ?? `new-${index}`}
                className={cn(
                  "rounded-xl border p-4",
                  image.isActive === false
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-primary-100 bg-white",
                )}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    Image {index + 1}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => move(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move image ${index + 1} earlier`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(index, 1)}
                      disabled={index === images.length - 1}
                      aria-label={`Move image ${index + 1} later`}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => update(index, { isActive: image.isActive === false })}
                      aria-label={
                        image.isActive === false
                          ? `Show image ${index + 1}`
                          : `Hide image ${index + 1}`
                      }
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {image.isActive === false ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved(false);
                        setImages((current) => current.filter((_, i) => i !== index));
                      }}
                      aria-label={`Delete image ${index + 1}`}
                      className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <AdminImageUpload
                  label="Photo"
                  value={image.src}
                  onChange={(url) => update(index, { src: url })}
                />

                <div className="mt-3 space-y-3">
                  <div>
                    <label className={adminLabelClass}>Caption</label>
                    <input
                      value={image.caption}
                      onChange={(event) => update(index, { caption: event.target.value })}
                      placeholder="Reception area"
                      className={adminInputClass}
                    />
                  </div>

                  <div>
                    <label className={adminLabelClass}>Alt text</label>
                    <input
                      value={image.alt}
                      onChange={(event) => update(index, { alt: event.target.value })}
                      placeholder="The reception desk at Everest International Polyclinic"
                      className={adminInputClass}
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Describes the photo for screen readers. Falls back to the
                      caption if left blank.
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
