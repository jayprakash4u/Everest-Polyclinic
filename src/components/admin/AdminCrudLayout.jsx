"use client";

import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

/** Form panel — always shown above the list. */
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
    <div
      className={cn(
        "rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50/80 to-white p-4 sm:p-5",
        className,
      )}
    >
      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-700">
        {isEditing ? editTitle : addTitle}
      </p>
      <form onSubmit={onSubmit} className="space-y-3">
        {children}
        <div className="flex flex-wrap gap-2 pt-1">
          <Button type="submit" variant="primary" size="sm">
            {isEditing ? updateLabel : submitLabel}
          </Button>
          {isEditing && onCancel ? (
            <Button type="button" variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </div>
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
    <div className={className}>
      <p className="mb-3 text-sm font-semibold text-slate-800">
        {heading}{" "}
        {count !== undefined ? (
          <span className="font-normal text-slate-500">({count})</span>
        ) : null}
      </p>

      {loading ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-center text-sm text-slate-500">
          {loadingMessage}
        </p>
      ) : isEmpty ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-center text-sm text-slate-500">
          {emptyMessage}
        </p>
      ) : (
        <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
          {children}
        </ul>
      )}
    </div>
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
        "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
        isActive && "bg-primary-50/60",
      )}
    >
      <div className="min-w-0 flex-1">{children}</div>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
        >
          {editLabel}
        </button>
        {onDelete ? (
          <button
            type="button"
            onClick={onDelete}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            {deleteLabel}
          </button>
        ) : null}
      </div>
    </li>
  );
}
