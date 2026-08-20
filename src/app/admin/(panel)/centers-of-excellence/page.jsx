"use client";

import { useCallback, useEffect, useState } from "react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
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
  title: "",
  description: "",
  image: "",
  slug: "",
  sortOrder: 0,
  isActive: true,
};

export default function CentersOfExcellenceAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/centers-of-excellence");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }, []);

  /* The fetch is kept inside the effect and its result guarded by `cancelled`,
     rather than calling a state-setting helper straight from the effect body.
     React flags the latter as a cascading render, and it would also let a
     response that arrives after navigation set state on a dead component. */
  useEffect(() => {
    let cancelled = false;

    loadItems().then((data) => {
      if (cancelled) return;
      setItems(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [loadItems]);

  const refresh = useCallback(async () => {
    setItems(await loadItems());
  }, [loadItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/centers-of-excellence", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sortOrder: Number(form.sortOrder) || 0 }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error || "Could not save this centre.");
      return;
    }

    setForm(emptyForm);
    refresh();
  };

  const handleEdit = (item) => {
    setError("");
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
    if (!window.confirm("Delete this centre of excellence?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/centers-of-excellence?id=${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Centres of Excellence"
        subtitle="The icon grid near the top of the home page."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add centre"
          editTitle="Edit centre"
          onSubmit={handleSubmit}
          submitLabel="Add centre"
          updateLabel="Update centre"
          onCancel={() => {
            setForm(emptyForm);
            setError("");
          }}
        >
          <AdminImageUpload
            label="Icon"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />

          <div>
            <label className={adminLabelClass}>Title</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className={adminInputClass}
              placeholder="Orthopaedics"
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
              placeholder="Expert diagnosis and treatment for bone, joint, and mobility conditions."
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={adminLabelClass}>
                Service slug
                <span className="ml-1 font-normal normal-case text-slate-400">
                  optional
                </span>
              </label>
              <input
                value={form.slug}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, slug: e.target.value }))
                }
                className={adminInputClass}
                placeholder="orthopedics"
              />
              {/* The card is always a link; the slug only decides where to. */}
              <p className="mt-1.5 text-xs text-slate-400">
                Links the card to /services/&lt;slug&gt;. Leave blank to link to
                the contact page instead.
              </p>
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
          </div>

          <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isActive: e.target.checked }))
              }
            />
            Show on the home page
          </label>

          {error ? (
            <p className="text-sm font-semibold text-red-600">{error}</p>
          ) : null}
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="All centres"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No centres yet. Add one using the form above."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <div className="flex items-center gap-3">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt=""
                    className="h-11 w-11 shrink-0 rounded-full border border-slate-200 bg-white object-contain p-1"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {item.title}
                    {!item.isActive ? (
                      <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                        Hidden
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
