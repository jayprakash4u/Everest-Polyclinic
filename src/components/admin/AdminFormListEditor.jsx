"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Form on top, saved items listed below with Edit / Delete.
 * Clicking Edit loads the row into the top form (no nested <form> — safe inside parent forms).
 */
export default function AdminFormListEditor({
  items,
  onChange,
  emptyItem,
  renderFields,
  renderSummary,
  validate,
  addLabel = "Add",
  updateLabel = "Update",
  listHeading = "Saved items",
  emptyMessage = "No items yet. Use the form above to add one.",
  deleteConfirm = "Remove this item?",
}) {
  const list = Array.isArray(items) ? items : [];
  const [draft, setDraft] = useState(emptyItem);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (editIndex !== null && editIndex >= list.length) {
      setEditIndex(null);
      setDraft(emptyItem());
    }
  }, [list.length, editIndex, emptyItem]);

  const updateField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setDraft(emptyItem());
    setEditIndex(null);
  };

  const handleSave = () => {
    if (validate && !validate(draft)) return;
    const entry = { ...draft };
    if (editIndex !== null) {
      onChange(list.map((item, index) => (index === editIndex ? entry : item)));
    } else {
      onChange([...list, entry]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setDraft({ ...list[index] });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (deleteConfirm && !window.confirm(deleteConfirm)) return;
    onChange(list.filter((_, itemIndex) => itemIndex !== index));
    if (editIndex === index) {
      resetForm();
    } else if (editIndex !== null && index < editIndex) {
      setEditIndex(editIndex - 1);
    }
  };

  const isEditing = editIndex !== null;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50/80 to-white p-4 sm:p-5">
        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-700">
          {isEditing ? "Edit item" : "Add new"}
        </p>
        {renderFields({ draft, setDraft, updateField, isEditing })}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-700"
          >
            {isEditing ? updateLabel : addLabel}
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-800">
          {listHeading}{" "}
          <span className="font-normal text-slate-500">({list.length})</span>
        </p>

        {list.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-8 text-center text-sm text-slate-500">
            {emptyMessage}
          </p>
        ) : (
          <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {list.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
                  editIndex === index && "bg-primary-50/60",
                )}
              >
                <div className="min-w-0 flex-1">{renderSummary(item, index)}</div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(index)}
                    className="rounded-lg border border-primary-200 px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
