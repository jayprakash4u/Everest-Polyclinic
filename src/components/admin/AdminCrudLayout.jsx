"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

/**
 * Form panel — always shown above the list.
 *
 * The header carries a mode badge because this one panel is both "add" and
 * "edit": without it, clicking Edit on row nine silently repurposes a form
 * that still looks like a blank create form, and the save overwrites a record
 * the admin thought they were adding alongside.
 */
export function AdminCrudFormPanel({
  isEditing = false,
  addTitle = "Add new",
  editTitle = "Edit item",
  onSubmit,
  submitLabel = "Add",
  updateLabel = "Update",
  onCancel,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors",
        isEditing ? "border-primary-300 ring-4 ring-primary-50" : "border-slate-200",
        className,
      )}
    >
      <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
            isEditing
              ? "bg-primary-100 text-primary-700"
              : "bg-secondary-100 text-secondary-700",
          )}
        >
          {isEditing ? <Pencil size={15} /> : <Plus size={16} />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-primary-900">
            {isEditing ? editTitle : addTitle}
          </p>
          <p className="text-xs text-slate-400">
            {isEditing
              ? "Editing an existing entry"
              : "Creating a new entry"}
          </p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="space-y-4 p-5">
        {children}

        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
          <Button type="submit" variant={isEditing ? "secondary" : "primary"} size="sm">
            {isEditing ? updateLabel : submitLabel}
          </Button>
          {isEditing && onCancel ? (
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

/** List panel — saved items with Edit / Delete below the form. */
export function AdminCrudListPanel({
  heading = "Saved items",
  count,
  loading = false,
  loadingMessage = "Loading…",
  emptyMessage = "No items yet. Use the form above to add one.",
  isEmpty = false,
  children,
  className,
}) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm",
        className,
      )}
    >
      <header className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-3.5">
        <p className="text-sm font-bold text-primary-900">{heading}</p>
        {count !== undefined ? (
          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold tabular-nums text-slate-500 ring-1 ring-slate-200">
            {count}
          </span>
        ) : null}
      </header>

      {loading ? (
        <p className="px-5 py-12 text-center text-sm text-slate-400">
          {loadingMessage}
        </p>
      ) : isEmpty ? (
        <p className="px-5 py-12 text-center text-sm text-slate-400">
          {emptyMessage}
        </p>
      ) : (
        <ul className="divide-y divide-slate-100">{children}</ul>
      )}
    </section>
  );
}

/** Single list row with Edit / Delete actions. */
export function AdminCrudListRow({
  isActive = false,
  onEdit,
  onDelete,
  editLabel = "Edit",
  deleteLabel = "Delete",
  children,
}) {
  return (
    <li
      className={cn(
        "group relative flex flex-col gap-3 px-5 py-4 transition-colors sm:flex-row sm:items-center sm:justify-between",
        isActive ? "bg-primary-50/60" : "hover:bg-slate-50/70",
      )}
    >
      {/* Marks which row the form above is currently editing. */}
      {isActive ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-primary-600"
        />
      ) : null}

      <div className="min-w-0 flex-1">{children}</div>

      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
        >
          <Pencil size={13} />
          {editLabel}
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:border-alert-300 hover:bg-alert-50 hover:text-alert-600"
          >
            <Trash2 size={13} />
            {deleteLabel}
          </button>
        ) : null}
      </div>
    </li>
  );
}
