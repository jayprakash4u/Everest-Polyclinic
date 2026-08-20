"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  AdminCrudFormPanel,
  AdminCrudListPanel,
  AdminCrudListRow,
} from "@/components/admin/AdminCrudLayout";

const emptyForm = {
  id: null,
  name: "",
  location: "",
  rating: 5,
  review: "",
  avatar: "",
  sortOrder: 0,
  isActive: true,
};

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/testimonials");
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
    await fetch("/api/admin/testimonials", {
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
      name: item.name,
      location: item.location,
      rating: item.rating,
      review: item.review,
      avatar: item.avatar ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        subtitle="Add, edit, or delete Patient Trust reviews on the homepage."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add new testimonial"
          editTitle="Edit testimonial"
          onSubmit={handleSubmit}
          submitLabel="Add testimonial"
          updateLabel="Update testimonial"
          onCancel={() => setForm(emptyForm)}
        >
          {[
            ["name", "Name"],
            ["location", "Location"],
            ["rating", "Rating (1-5)", "number"],
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
                required={name !== "sortOrder"}
              />
            </div>
          ))}
          <div>
            <label className={adminLabelClass}>Review</label>
            <textarea
              rows={4}
              value={form.review}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, review: e.target.value }))
              }
              className={adminInputClass}
              required
            />
          </div>
          <AdminImageUpload
            label="Patient photo"
            optional
            value={form.avatar}
            onChange={(url) => setForm((prev) => ({ ...prev, avatar: url }))}
          />
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
          heading="Saved testimonials"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No testimonials yet. Add one using the form above."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">
                {item.name}
                <span className="font-normal text-slate-500"> · {item.location}</span>
                <span className="ml-2 text-xs text-amber-600">
                  {"★".repeat(Math.min(5, Math.max(1, item.rating ?? 5)))}
                </span>
                {!item.isActive ? (
                  <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                    Hidden
                  </span>
                ) : null}
              </p>
              <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.review}</p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
