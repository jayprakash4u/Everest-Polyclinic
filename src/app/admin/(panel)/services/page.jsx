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
  icon: "",
  shortDescription: "",
  homepageImage: "",
  sortOrder: 0,
  isActive: true,
};

export default function ServicesAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/services");
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.id) return;

    await fetch("/api/admin/services", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    loadItems();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      title: item.title ?? "",
      icon: item.icon ?? "",
      shortDescription: item.shortDescription ?? "",
      homepageImage: item.homepageImage ?? "",
      sortOrder: item.sortOrder ?? 0,
      isActive: item.isActive ?? true,
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Services"
        subtitle="Edit specialty services shown on the homepage and service pages."
      />

      <div className="space-y-6">
        {form.id ? (
          <AdminCrudFormPanel
            isEditing
            addTitle="Select a service to edit"
            editTitle="Edit service"
            onSubmit={handleSubmit}
            submitLabel="Save service"
            updateLabel="Update service"
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
              <label className={adminLabelClass}>Icon key</label>
              <input
                value={form.icon}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, icon: e.target.value }))
                }
                className={adminInputClass}
                required
              />
            </div>
            <div>
              <label className={adminLabelClass}>Short description</label>
              <textarea
                rows={3}
                value={form.shortDescription}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    shortDescription: e.target.value,
                  }))
                }
                className={adminInputClass}
              />
            </div>
            <AdminImageUpload
              label="Homepage image"
              value={form.homepageImage}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, homepageImage: url }))
              }
              optional
            />
            <div>
              <label className={adminLabelClass}>Sort order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    sortOrder: e.target.value,
                  }))
                }
                className={adminInputClass}
              />
            </div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    isActive: e.target.checked,
                  }))
                }
              />
              Active
            </label>
          </AdminCrudFormPanel>
        ) : (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 px-4 py-6 text-center text-sm text-slate-500">
            Choose a service from the list below to edit title, icon, short
            description, homepage image, and sort order.
          </p>
        )}

        <AdminCrudListPanel
          heading="All services"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No services found. Run npm run db:seed."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
            >
              <p className="font-semibold text-slate-900">
                {item.title}
                {!item.isActive ? (
                  <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                    Hidden
                  </span>
                ) : null}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.slug}</p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
