"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Button from "@/components/ui/Button";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import AdminSectionCard from "@/components/admin/AdminSectionCard";
import {
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";

export default function CareTeamAdminPage() {
  const [form, setForm] = useState({ image: "", alt: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);

  const fetchSection = useCallback(async () => {
    const response = await fetch("/api/admin/page-sections?page=home");
    if (!response.ok) return { image: "", alt: "" };
    const data = await response.json();
    const [row] = data.sections?.["care-team"] ?? [];
    return { image: row?.image ?? "", alt: row?.alt ?? "" };
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchSection().then((data) => {
      if (cancelled) return;
      setForm(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchSection]);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);

    try {
      const response = await fetch("/api/admin/page-sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "home",
          section: "care-team",
          /* An empty image clears the section, and the public page then falls
             back to the photograph the site shipped with. */
          items: form.image ? [form] : [],
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Failed to save.");

      setStatus({
        ok: true,
        message: "Saved. Reload the home page to see it.",
      });
    } catch (error) {
      setStatus({ ok: false, message: error.message || "Failed to save." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Meet Our Care Team"
        subtitle="The doctors block partway down the home page."
        action={
          <Button href="/" target="_blank" variant="outline" size="sm">
            View home page
            <ExternalLink size={14} />
          </Button>
        }
      />

      <AdminSectionCard
        title="Section photograph"
        description="Holds the right-hand side of the section from laptop width up, and sits above the copy on a phone. Keep the subject toward the centre of the frame so neither crop cuts them off."
        onSave={handleSave}
        saving={saving}
        status={status}
      >
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-400">Loading…</p>
        ) : (
          <>
            <AdminImageUpload
              label="Photograph"
              value={form.image}
              onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
            />

            <div className="mt-5 max-w-xl">
              <label className={adminLabelClass}>Alt text</label>
              <input
                type="text"
                value={form.alt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, alt: e.target.value }))
                }
                placeholder="A clinician at Everest International Polyclinic"
                className={adminInputClass}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                Describes the photograph for screen readers and for anyone whose
                images fail to load.
              </p>
            </div>
          </>
        )}
      </AdminSectionCard>
    </>
  );
}
