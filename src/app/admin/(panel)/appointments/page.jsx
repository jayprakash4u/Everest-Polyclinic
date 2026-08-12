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
  name: "",
  phone: "",
  email: "",
  department: "",
  preferredDate: "",
  timeSlot: "",
  packageName: "",
  packagePrice: "",
  message: "",
  status: "pending",
};

export default function AppointmentsAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const loadItems = useCallback(async () => {
    const url = filter
      ? `/api/admin/appointments?status=${filter}`
      : "/api/admin/appointments";
    const response = await fetch(url);
    const data = await response.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const payload = {
      ...form,
      preferredDate: form.preferredDate || null,
    };

    await fetch("/api/admin/appointments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setForm(emptyForm);
    loadItems();
  };

  const handleStatusUpdate = async (id, newStatus) => {
    await fetch("/api/admin/appointments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });
    loadItems();
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      name: item.name,
      phone: item.phone,
      email: item.email ?? "",
      department: item.department ?? "",
      preferredDate: item.preferredDate
        ? new Date(item.preferredDate).toISOString().slice(0, 10)
        : "",
      timeSlot: item.timeSlot ?? "",
      packageName: item.packageName ?? "",
      packagePrice: item.packagePrice ?? "",
      message: item.message ?? "",
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this appointment request?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/appointments?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800",
      confirmed: "bg-emerald-100 text-emerald-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles[status] ?? "bg-slate-100 text-slate-600"}`}
      >
        {status}
      </span>
    );
  };

  return (
    <>
      <AdminPageHeader
        title="Appointments"
        subtitle="Manage appointment requests from the website."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add appointment"
          editTitle="Edit appointment"
          onSubmit={handleSubmit}
          submitLabel="Add appointment"
          updateLabel="Update appointment"
          onCancel={() => setForm(emptyForm)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["name", "Patient name"],
              ["phone", "Phone"],
              ["email", "Email"],
              ["department", "Department"],
              ["preferredDate", "Preferred date", "date"],
              ["timeSlot", "Time slot"],
              ["packageName", "Package name"],
              ["packagePrice", "Package price"],
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
                />
              </div>
            ))}
          </div>

          <div>
            <label className={adminLabelClass}>Message / notes</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className={adminInputClass}
            />
          </div>

          <div className="sm:w-40">
            <label className={adminLabelClass}>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, status: e.target.value }))
              }
              className={adminInputClass}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </AdminCrudFormPanel>

        <div className="flex flex-wrap items-center gap-2">
          {["", "pending", "confirmed", "cancelled", "completed"].map((s) => (
            <button
              key={s || "all"}
              type="button"
              onClick={() => setFilter(s)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === s
                  ? "border-primary-600 bg-primary-600 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700"
              }`}
            >
              {s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
            </button>
          ))}
        </div>

        <AdminCrudListPanel
          heading="Appointment requests"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No appointment requests yet."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold text-slate-900">{item.name}</p>
                {statusBadge(item.status)}
              </div>
              <p className="mt-1 text-xs text-slate-500">
                {item.phone} · {item.email ?? "no email"}
              </p>
              {item.department ? (
                <p className="mt-1 text-sm text-slate-600">
                  Department: {item.department}
                </p>
              ) : null}
              {item.packageName ? (
                <p className="text-sm text-slate-600">
                  Package: {item.packageName} ({item.packagePrice})
                </p>
              ) : null}
              {item.preferredDate ? (
                <p className="mt-1 text-xs text-slate-500">
                  Preferred: {new Date(item.preferredDate).toLocaleDateString()} ·{" "}
                  {item.timeSlot ?? "no time slot"}
                </p>
              ) : null}
              {item.message ? (
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                  {item.message}
                </p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.id, "confirmed")}
                  className="rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.id, "completed")}
                  className="rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Mark completed
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusUpdate(item.id, "cancelled")}
                  className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                >
                  Cancel
                </button>
              </div>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
