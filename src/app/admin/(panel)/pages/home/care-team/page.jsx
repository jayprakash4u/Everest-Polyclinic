"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, RotateCcw } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import { AdminCard, AdminPageHeader } from "@/components/admin/AdminShell";

export default function AdminCareTeamPage() {
  const [image, setImage] = useState("");
  const [defaultImage, setDefaultImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/home-settings");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setImage(data.settings?.careTeamImage ?? "");
      setDefaultImage(data.defaults?.careTeamImage ?? "");
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async (value) => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/home-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: { careTeamImage: value } }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setImage(data.settings?.careTeamImage ?? "");
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const isDefault = image === defaultImage;

  return (
    <>
      <AdminPageHeader
        title="Meet your care team"
        subtitle="The photograph beside the care-team block on the homepage."
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
        {error ? (
          <p role="alert" className="mb-4 rounded-lg bg-alert-50 px-4 py-3 text-sm text-alert-700">
            {error}
          </p>
        ) : null}
        {saved ? (
          <p role="status" className="mb-4 rounded-lg bg-secondary-50 px-4 py-3 text-sm text-secondary-700">
            Saved. Refresh the homepage to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="text-sm text-slate-500">Loading…</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <AdminImageUpload
                label="Section photograph"
                value={image}
                onChange={(url) => {
                  setSaved(false);
                  setImage(url);
                }}
              />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSave(image)}
                  disabled={saving}
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save image"}
                </button>

                {/* Clearing the stored value falls back to the shipped photo
                    rather than leaving the section with no image at all. */}
                <button
                  type="button"
                  onClick={() => handleSave("")}
                  disabled={saving || isDefault}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40"
                >
                  <RotateCcw size={15} />
                  Reset to default
                </button>
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-slate-200">
              <p className="font-bold text-[#1a3a5c]">How this image is used</p>
              <ul className="mt-3 space-y-2">
                <li>
                  It fills the right-hand side of the section on desktop and sits
                  above the text on phones, cropped to fill either way.
                </li>
                <li>
                  A <strong>landscape</strong> photo works best — roughly 3:2.
                  The current artwork carries its own soft background and dot
                  pattern on the left, which lets it blend into the page.
                </li>
                <li>
                  Nothing important should sit in the far left of the frame; on
                  desktop that edge is where the photo meets the copy.
                </li>
                <li>
                  Aim for at least 1400px wide so it stays sharp on large
                  screens.
                </li>
              </ul>
            </div>
          </div>
        )}
      </AdminCard>
    </>
  );
}
