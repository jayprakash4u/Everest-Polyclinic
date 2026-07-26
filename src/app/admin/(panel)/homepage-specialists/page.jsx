"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AdminCard,
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
  experience: "Available",
  image: "",
  phone: "",
  timing: "",
  sortOrder: 0,
  isActive: true,
};

export default function HomepageSpecialistsAdminPage() {
  const [categories, setCategories] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const response = await fetch("/api/admin/homepage-specialists");
    const data = await response.json();
    setCategories(data.categories ?? []);
    setSpecialists(data.specialists ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const method = form.id ? "PUT" : "POST";

    await fetch("/api/admin/homepage-specialists", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(emptyForm);
    loadData();
  };

  const handleEdit = (specialist) => {
    setForm({
      id: specialist.id,
      categoryId: String(specialist.categoryId),
      name: specialist.name,
      education: specialist.education,
      experience: specialist.experience,
      image: specialist.image,
      phone: specialist.phone ?? "",
      timing: specialist.timing ?? "",
      sortOrder: specialist.sortOrder,
      isActive: specialist.isActive,
    });
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this specialist from the homepage carousel?")) {
      return;
    }
    if (form.id === id) setForm(emptyForm);

    await fetch(`/api/admin/homepage-specialists?id=${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  return (
    <>
      <AdminPageHeader
        title="Homepage Specialists"
        subtitle="Manage the Our Specialists carousel shown on the homepage."
      />

      <AdminCard className="mb-6">
        <p className="text-sm text-slate-600">
          Each card shows the doctor photo, degree, specialty, OPD timing, and
          phone number. Use sort order to control carousel sequence.
        </p>
      </AdminCard>

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add new specialist"
          editTitle="Edit specialist"
          onSubmit={handleSubmit}
          submitLabel="Add to carousel"
          updateLabel="Update specialist"
          onCancel={() => setForm(emptyForm)}
        >
          <div>
            <label className={adminLabelClass}>Specialty</label>
            <select
              value={form.categoryId}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  categoryId: event.target.value,
                }))
              }
              className={adminInputClass}
              required
            >
              <option value="">Select specialty</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {[
            ["name", "Doctor name"],
            ["education", "Degree / education"],
            ["timing", "OPD timing"],
            ["phone", "Phone number"],
            ["sortOrder", "Sort order", "number"],
          ].map(([name, label, type = "text"]) => (
            <div key={name}>
              <label className={adminLabelClass}>{label}</label>
              <input
                type={type}
                value={form[name]}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, [name]: event.target.value }))
                }
                className={adminInputClass}
                placeholder={
                  name === "timing"
                    ? "10:00 AM - 04:00 PM"
                    : name === "phone"
                      ? "+977 9800000000"
                      : undefined
                }
                required={!["sortOrder", "phone", "timing"].includes(name)}
              />
            </div>
          ))}

          <AdminImageUpload
            label="Photo"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  isActive: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-slate-300"
            />
            Show on homepage
          </label>
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="Carousel specialists"
          count={specialists.length}
          loading={loading}
          isEmpty={specialists.length === 0}
          emptyMessage="No homepage specialists yet. Add one using the form above."
        >
          {specialists.map((specialist) => (
            <AdminCrudListRow
              key={specialist.id}
              isActive={form.id === specialist.id}
              onEdit={() => handleEdit(specialist)}
              onDelete={() => handleRemove(specialist.id)}
              deleteLabel="Remove"
            >
              <p className="font-semibold text-[#1a3a5c]">{specialist.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-secondary-600">
                {specialist.category?.name}
              </p>
              <p className="mt-1 text-sm text-slate-500">{specialist.education}</p>
              <p className="mt-1 text-xs text-slate-500">
                {specialist.timing ?? "No timing set"} ·{" "}
                {specialist.phone ?? "No phone set"}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
