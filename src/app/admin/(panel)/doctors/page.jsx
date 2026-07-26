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
  categoryId: "",
  name: "",
  education: "",
  experience: "",
  image: "",
  phone: "",
  timing: "",
  sortOrder: 0,
  isActive: true,
};

export default function DoctorsAdminPage() {
  const [categories, setCategories] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const response = await fetch("/api/admin/doctors");
    const data = await response.json();
    setCategories(data.categories ?? []);
    setDoctors(data.doctors ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = form.id ? "PUT" : "POST";
    await fetch("/api/admin/doctors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyForm);
    loadData();
  };

  const handleEdit = (doctor) => {
    setForm({
      id: doctor.id,
      categoryId: String(doctor.categoryId),
      name: doctor.name,
      education: doctor.education,
      experience: doctor.experience,
      image: doctor.image,
      phone: doctor.phone ?? "",
      timing: doctor.timing ?? "",
      sortOrder: doctor.sortOrder,
      isActive: doctor.isActive,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/doctors?id=${id}`, { method: "DELETE" });
    loadData();
  };

  return (
    <>
      <AdminPageHeader
        title="Doctors"
        subtitle="Add, edit, or delete doctors shown on the /doctors page."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add new doctor"
          editTitle="Edit doctor"
          onSubmit={handleSubmit}
          submitLabel="Add doctor"
          updateLabel="Update doctor"
          onCancel={() => setForm(emptyForm)}
        >
          <div>
            <label className={adminLabelClass}>Category</label>
            <select
              value={form.categoryId}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, categoryId: e.target.value }))
              }
              className={adminInputClass}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {[
            ["name", "Name"],
            ["education", "Education"],
            ["experience", "Experience"],
            ["phone", "Phone (optional)"],
            ["timing", "Timing (optional)"],
            ["sortOrder", "Sort order", "number"],
          ].map(([name, label, type = "text"]) => (
            <div key={name}>
              <label className={adminLabelClass}>{label}</label>
              <input
                type={type}
                value={form[name]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [name]: e.target.value }))
                }
                className={adminInputClass}
                required={!["sortOrder", "phone", "timing"].includes(name)}
              />
            </div>
          ))}
          <AdminImageUpload
            label="Photo"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
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
          heading="Saved doctors"
          count={doctors.length}
          loading={loading}
          isEmpty={doctors.length === 0}
          emptyMessage="No doctors yet. Add one using the form above."
        >
          {doctors.map((doctor) => (
            <AdminCrudListRow
              key={doctor.id}
              isActive={form.id === doctor.id}
              onEdit={() => handleEdit(doctor)}
              onDelete={() => handleDelete(doctor.id)}
            >
              <p className="font-semibold text-slate-900">{doctor.name}</p>
              <p className="mt-1 text-xs font-semibold text-primary-600">
                {doctor.category?.name}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {doctor.education} · {doctor.experience}
                {!doctor.isActive ? " · Hidden" : ""}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
