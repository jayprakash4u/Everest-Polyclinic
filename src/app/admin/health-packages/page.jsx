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
import { formatTestsForInput } from "@/lib/health-package-utils";

const SECTION_ICONS = [
  { value: "activity", label: "Activity" },
  { value: "user", label: "User" },
  { value: "heart", label: "Heart" },
];

const emptyPackageForm = {
  id: null,
  sectionId: "",
  name: "",
  price: "",
  originalPrice: "",
  badge: "",
  testsText: "",
  sortOrder: 0,
  isActive: true,
};

const emptySectionForm = {
  id: null,
  section: "",
  icon: "activity",
  sortOrder: 0,
};

export default function HealthPackagesAdminPage() {
  const [sections, setSections] = useState([]);
  const [packages, setPackages] = useState([]);
  const [packageForm, setPackageForm] = useState(emptyPackageForm);
  const [sectionForm, setSectionForm] = useState(emptySectionForm);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const response = await fetch("/api/admin/health-packages");
    const data = await response.json();
    setSections(data.sections ?? []);
    setPackages(data.packages ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handlePackageSubmit = async (event) => {
    event.preventDefault();
    const method = packageForm.id ? "PUT" : "POST";

    await fetch("/api/admin/health-packages", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(packageForm),
    });

    setPackageForm(emptyPackageForm);
    loadData();
  };

  const handleSectionSubmit = async (event) => {
    event.preventDefault();
    const method = sectionForm.id ? "PUT" : "POST";

    await fetch("/api/admin/health-package-sections", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sectionForm),
    });

    setSectionForm(emptySectionForm);
    loadData();
  };

  const handleEditPackage = (item) => {
    setPackageForm({
      id: item.id,
      sectionId: String(item.sectionId),
      name: item.name,
      price: String(item.price),
      originalPrice: item.originalPrice ? String(item.originalPrice) : "",
      badge: item.badge ?? "",
      testsText: formatTestsForInput(item.testsJson),
      sortOrder: item.sortOrder,
      isActive: item.isActive,
    });
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Delete this health package?")) return;
    if (packageForm.id === id) setPackageForm(emptyPackageForm);
    await fetch(`/api/admin/health-packages?id=${id}`, { method: "DELETE" });
    loadData();
  };

  const handleEditSection = (section) => {
    setSectionForm({
      id: section.id,
      section: section.section,
      icon: section.icon,
      sortOrder: section.sortOrder,
    });
  };

  const handleDeleteSection = async (id) => {
    if (
      !window.confirm("Delete this section and all packages inside it?")
    ) {
      return;
    }
    if (sectionForm.id === id) setSectionForm(emptySectionForm);

    await fetch(`/api/admin/health-package-sections?id=${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  const sectionName = (sectionId) =>
    sections.find((section) => section.id === sectionId)?.section ?? "Unknown";

  return (
    <>
      <AdminPageHeader
        title="Health Packages"
        subtitle="Manage packages shown on the /health-packages page."
      />

      <div className="space-y-10">
        <section className="space-y-6">
          <AdminCrudFormPanel
            isEditing={Boolean(packageForm.id)}
            addTitle="Add new package"
            editTitle="Edit package"
            onSubmit={handlePackageSubmit}
            submitLabel="Add package"
            updateLabel="Update package"
            onCancel={() => setPackageForm(emptyPackageForm)}
          >
            <div>
              <label className={adminLabelClass}>Section</label>
              <select
                value={packageForm.sectionId}
                onChange={(event) =>
                  setPackageForm((prev) => ({
                    ...prev,
                    sectionId: event.target.value,
                  }))
                }
                className={adminInputClass}
                required
              >
                <option value="">Select section</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.section}
                  </option>
                ))}
              </select>
            </div>

            {[
              ["name", "Package name"],
              ["price", "Price (Rs.)", "number"],
              ["originalPrice", "Original price (Rs.)", "number"],
              ["badge", "Badge (optional)"],
              ["sortOrder", "Sort order", "number"],
            ].map(([name, label, type = "text"]) => (
              <div key={name}>
                <label className={adminLabelClass}>{label}</label>
                <input
                  name={name}
                  type={type}
                  value={packageForm[name]}
                  onChange={(event) =>
                    setPackageForm((prev) => ({
                      ...prev,
                      [name]: event.target.value,
                    }))
                  }
                  className={adminInputClass}
                  required={name === "name" || name === "price"}
                />
              </div>
            ))}

            <div>
              <label className={adminLabelClass}>Tests (one per line)</label>
              <textarea
                rows={8}
                value={packageForm.testsText}
                onChange={(event) =>
                  setPackageForm((prev) => ({
                    ...prev,
                    testsText: event.target.value,
                  }))
                }
                className={adminInputClass}
                placeholder={"CBC\nFasting Blood Sugar\nLipid Profile"}
              />
              <p className="mt-1 text-xs text-slate-500">
                For grouped tests use JSON on one line, e.g.{" "}
                {`{"label":"Lipid Profile","items":["HDL","LDL"]}`}
              </p>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={packageForm.isActive}
                onChange={(event) =>
                  setPackageForm((prev) => ({
                    ...prev,
                    isActive: event.target.checked,
                  }))
                }
              />
              Active on website
            </label>
          </AdminCrudFormPanel>

          <AdminCrudListPanel
            heading="Saved packages"
            count={packages.length}
            loading={loading}
            isEmpty={packages.length === 0}
            emptyMessage="No packages yet. Add a section below, then create a package above."
          >
            {packages.map((item) => (
              <AdminCrudListRow
                key={item.id}
                isActive={packageForm.id === item.id}
                onEdit={() => handleEditPackage(item)}
                onDelete={() => handleDeletePackage(item.id)}
              >
                <p className="font-semibold text-slate-900">
                  {item.name}
                  {item.badge ? (
                    <span className="ml-2 rounded-full bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-700">
                      {item.badge}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-xs font-semibold text-secondary-600">
                  {sectionName(item.sectionId)}
                </p>
                <p className="mt-1 text-sm text-primary-700">
                  Rs. {item.price.toLocaleString("en-IN")}
                  {item.originalPrice
                    ? ` · was Rs. ${item.originalPrice.toLocaleString("en-IN")}`
                    : ""}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {item.tests?.length ?? 0} tests ·{" "}
                  {item.isActive ? "Active" : "Hidden"}
                </p>
              </AdminCrudListRow>
            ))}
          </AdminCrudListPanel>
        </section>

        <section className="space-y-6 border-t border-slate-200 pt-10">
          <AdminCrudFormPanel
            isEditing={Boolean(sectionForm.id)}
            addTitle="Add new section"
            editTitle="Edit section"
            onSubmit={handleSectionSubmit}
            submitLabel="Add section"
            updateLabel="Update section"
            onCancel={() => setSectionForm(emptySectionForm)}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={adminLabelClass}>Section name</label>
                <input
                  value={sectionForm.section}
                  onChange={(event) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      section: event.target.value,
                    }))
                  }
                  className={adminInputClass}
                  placeholder="General Wellness"
                  required
                />
              </div>
              <div>
                <label className={adminLabelClass}>Icon</label>
                <select
                  value={sectionForm.icon}
                  onChange={(event) =>
                    setSectionForm((prev) => ({
                      ...prev,
                      icon: event.target.value,
                    }))
                  }
                  className={adminInputClass}
                >
                  {SECTION_ICONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:w-40">
              <label className={adminLabelClass}>Sort order</label>
              <input
                type="number"
                value={sectionForm.sortOrder}
                onChange={(event) =>
                  setSectionForm((prev) => ({
                    ...prev,
                    sortOrder: Number(event.target.value),
                  }))
                }
                className={adminInputClass}
              />
            </div>
          </AdminCrudFormPanel>

          <AdminCrudListPanel
            heading="Saved sections"
            count={sections.length}
            loading={loading}
            isEmpty={sections.length === 0}
            emptyMessage="No sections yet. Add one using the form above."
          >
            {sections.map((section) => (
              <AdminCrudListRow
                key={section.id}
                isActive={sectionForm.id === section.id}
                onEdit={() => handleEditSection(section)}
                onDelete={() => handleDeleteSection(section.id)}
              >
                <p className="font-semibold text-slate-900">{section.section}</p>
                <p className="mt-1 text-xs text-slate-500">
                  Icon: {section.icon} · Order: {section.sortOrder} ·{" "}
                  {packages.filter((pkg) => pkg.sectionId === section.id).length}{" "}
                  packages
                </p>
              </AdminCrudListRow>
            ))}
          </AdminCrudListPanel>
        </section>
      </div>
    </>
  );
}
