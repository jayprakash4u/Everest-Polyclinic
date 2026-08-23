"use client";

import Button from "@/components/ui/Button";
import { AdminCard } from "@/components/admin/AdminShell";

/**
 * One editable section of a public page: what it is, its fields, and its own
 * save button with the result of the last save sitting next to it.
 *
 * Each section saves independently rather than the screen having one global
 * Save, because the sections write to different places — a hero slide is a row
 * in PageSectionImage, a review is a row in Testimonial — and a failure in one
 * should not silently roll back an edit the admin made to another.
 */
export default function AdminSectionCard({
  title,
  description,
  footnote,
  onSave,
  saving,
  status,
  saveLabel = "Save changes",
  children,
}) {
  return (
    <AdminCard className="p-0">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <h3 className="font-heading text-base font-bold text-primary-900">{title}</h3>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-500">
            {description}
          </p>
        ) : null}
      </div>

      <div className="px-5 py-5 sm:px-6">{children}</div>

      {onSave || status?.message ? (
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3.5 sm:px-6">
          {onSave ? (
            <Button type="button" size="sm" onClick={onSave} disabled={saving}>
              {saving ? "Saving…" : saveLabel}
            </Button>
          ) : null}

          {status?.message ? (
            <span
              className={
                status.ok
                  ? "text-sm font-semibold text-secondary-700"
                  : "text-sm font-semibold text-alert-600"
              }
            >
              {status.message}
            </span>
          ) : null}

          {footnote ? (
            <span className="ml-auto text-xs text-slate-400">{footnote}</span>
          ) : null}
        </div>
      ) : null}
    </AdminCard>
  );
}
