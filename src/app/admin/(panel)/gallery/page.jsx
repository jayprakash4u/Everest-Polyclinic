"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import {
  AdminCrudFormPanel,
  AdminCrudListPanel,
  AdminCrudListRow,
} from "@/components/admin/AdminCrudLayout";
import AdminImageUpload from "@/components/admin/AdminImageUpload";

const emptyForm = {
  id: null,
  src: "",
  alt: "",
  caption: "",
  sortOrder: 0,
  isActive: true,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/gallery");
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = form.id ? "PUT" : "POST";
    await fetch("/api/admin/gallery", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    loadItems();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      src: item.src,
      alt: item.alt,
      caption: item.caption ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Gallery"
        subtitle="Manage photos shown on the /gallery page."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add gallery image"
          editTitle="Edit gallery image"
          onSubmit={handleSubmit}
          submitLabel="Add image"
          updateLabel="Update image"
          onCancel={() => setForm(emptyForm)}
        >
          <AdminImageUpload
            label="Image"
            value={form.src}
            onChange={(url) => setForm((prev) => ({ ...prev, src: url }))}
          />
          {[
            ["alt", "Alt text (accessibility)"],
            ["caption", "Caption (optional)"],
            ["sortOrder", "Sort order", "number"],
          ].map(([name, label, type = "text"]) => (
            <div key={name}>
              <label className={adminLabelClass}>{label}</label>
              <input
                name={name}
                type={type}
                value={form[name]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [name]: e.target.value }))
                }
                className={adminInputClass}
                required={name === "alt"}
              />
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            Active on website
          </label>
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="Saved gallery images"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No gallery images yet. Add one using the form above."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">
                {item.caption || item.alt}
                {!item.isActive ? (
                  <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                    Hidden
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Order: {item.sortOrder} · {item.src}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
