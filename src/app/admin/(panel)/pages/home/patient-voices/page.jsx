"use client";

import { useCallback, useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import Button from "@/components/ui/Button";
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
  name: "",
  location: "",
  rating: 5,
  review: "",
  avatar: "",
  sortOrder: 0,
  isActive: true,
};

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={12}
          className={
            n <= rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </span>
  );
}

export default function PatientVoicesAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    const response = await fetch("/api/admin/testimonials");
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetchItems().then((data) => {
      if (cancelled) return;
      setItems(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [fetchItems]);

  const refresh = useCallback(async () => {
    setItems(await fetchItems());
  }, [fetchItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/testimonials", {
      method: form.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        rating: Number(form.rating) || 5,
        sortOrder: Number(form.sortOrder) || 0,
      }),
    });

    if (!response.ok) {
      setError("Could not save this review.");
      return;
    }

    setForm(emptyForm);
    refresh();
  };

  const handleEdit = (item) => {
    setError("");
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <>
      <AdminPageHeader
        title="Patient Voices"
        subtitle="The review carousel on the home page. Add, edit, reorder or remove what patients say."
        action={
          <Button href="/" target="_blank" variant="outline" size="sm">
            View home page
            <ExternalLink size={14} />
          </Button>
        }
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add review"
          editTitle="Edit review"
          onSubmit={handleSubmit}
          submitLabel="Add review"
          updateLabel="Update review"
          onCancel={() => {
            setForm(emptyForm);
            setError("");
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={adminLabelClass}>Patient name</label>
              <input
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                className={adminInputClass}
                placeholder="Sita Sharma"
                required
              />
            </div>
            <div>
              <label className={adminLabelClass}>Location</label>
              <input
                value={form.location}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, location: e.target.value }))
                }
                className={adminInputClass}
                placeholder="Nepalgunj"
                required
              />
            </div>
          </div>

          <div>
            <label className={adminLabelClass}>Review</label>
            <textarea
              rows={4}
              value={form.review}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, review: e.target.value }))
              }
              className={adminInputClass}
              placeholder="What the patient said about their visit."
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className={adminLabelClass}>Rating</label>
              <select
                value={form.rating}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, rating: Number(e.target.value) }))
                }
                className={adminInputClass}
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} star{n === 1 ? "" : "s"}
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
          </div>

          <AdminImageUpload
            label="Patient photo"
            optional
            value={form.avatar}
            onChange={(url) => setForm((prev) => ({ ...prev, avatar: url }))}
          />
          {/* Initials are a finished card, not a degraded one — worth saying so
              here, or every review gets a stock face attached to it. */}
          <p className="-mt-1 text-xs text-slate-400">
            Leave empty and the card shows the patient&rsquo;s initial on a tinted
            circle, which looks deliberate. Better that than a stock photo.
          </p>

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
            <p className="text-sm font-semibold text-alert-600">{error}</p>
          ) : null}
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="All reviews"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No reviews yet. Add one using the form above."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <div className="flex items-start gap-3">
                {item.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-slate-200"
                  />
                ) : (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
                    {item.name.charAt(0)}
                  </span>
                )}

                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {item.name}
                    <span className="font-normal text-slate-500">
                      {" "}
                      · {item.location}
                    </span>
                    <span className="ml-2">
                      <Stars rating={item.rating ?? 5} />
                    </span>
                    {!item.isActive ? (
                      <span className="ml-2 text-xs font-bold uppercase text-amber-600">
                        Hidden
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {item.review}
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
