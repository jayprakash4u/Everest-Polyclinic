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
  title: "",
  description: "",
  image: "",
  slug: "",
  sortOrder: 0,
  isActive: true,
};

export default function CentersAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/centers-of-excellence");
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
    await fetch("/api/admin/centers-of-excellence", {
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
      title: item.title,
      description: item.description,
      image: item.image,
      slug: item.slug ?? "",
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this center?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/centers-of-excellence?id=${id}`, {
      method: "DELETE",
    });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Centers of Excellence"
        subtitle="Homepage specialty department cards."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add center"
          editTitle="Edit center"
          onSubmit={handleSubmit}
          submitLabel="Add center"
          updateLabel="Update center"
          onCancel={() => setForm(emptyForm)}
        >
          <div>
            <label className={adminLabelClass}>Title</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className={adminInputClass}
              required
            />
          </div>
          <div>
            <label className={adminLabelClass}>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              className={adminInputClass}
              required
            />
          </div>
          <AdminImageUpload
            label="Image"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />
          <div>
            <label className={adminLabelClass}>Service slug (optional)</label>
            <input
              value={form.slug}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, slug: e.target.value }))
              }
              className={adminInputClass}
              placeholder="orthopedics"
            />
          </div>
          <div>
            <label className={adminLabelClass}>Sort order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, sortOrder: e.target.value }))
              }
              className={adminInputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            Active
          </label>
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="All centers"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No centers yet."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {item.slug || "No linked service"}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
