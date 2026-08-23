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

const emptyForm = {
  id: null,
  value: "",
  label: "",
  sortOrder: 0,
  isActive: true,
};

export default function StatsAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/stats");
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
    await fetch("/api/admin/stats", {
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
      value: item.value,
      label: item.label,
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this statistic?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/stats?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Site Stats"
        subtitle="Homepage / marketing statistics (Patients Treated, Specialists, etc.)."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add statistic"
          editTitle="Edit statistic"
          onSubmit={handleSubmit}
          submitLabel="Add statistic"
          updateLabel="Update statistic"
          onCancel={() => setForm(emptyForm)}
        >
          <div>
            <label className={adminLabelClass}>Value</label>
            <input
              value={form.value}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, value: e.target.value }))
              }
              className={adminInputClass}
              placeholder="25,000+"
              required
            />
          </div>
          <div>
            <label className={adminLabelClass}>Label</label>
            <input
              value={form.label}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, label: e.target.value }))
              }
              className={adminInputClass}
              placeholder="Patients Treated"
              required
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
          heading="All site stats"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No stats yet. Run npm run db:seed."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">
                {item.value} — {item.label}
                {!item.isActive ? (
                  <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                    Hidden
                  </span>
                ) : null}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
