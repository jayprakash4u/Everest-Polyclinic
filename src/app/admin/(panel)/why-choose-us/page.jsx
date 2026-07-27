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

const ICON_OPTIONS = [
  "globe",
  "alarm",
  "shield",
  "home",
  "document",
  "users",
];

const emptyForm = {
  id: null,
  title: "",
  description: "",
  icon: "globe",
  sortOrder: 0,
  isActive: true,
};

export default function WhyChooseUsAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/why-choose-us");
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
    await fetch("/api/admin/why-choose-us", {
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
      icon: item.icon,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/why-choose-us?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Why Choose Us"
        subtitle="Homepage trust features under Why Choose Us."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add feature"
          editTitle="Edit feature"
          onSubmit={handleSubmit}
          submitLabel="Add feature"
          updateLabel="Update feature"
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
          <div>
            <label className={adminLabelClass}>Icon</label>
            <select
              value={form.icon}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, icon: e.target.value }))
              }
              className={adminInputClass}
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>
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
          heading="All features"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No features yet."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-sm text-slate-500">{item.icon}</p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
