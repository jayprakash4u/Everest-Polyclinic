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
  slug: "",
  excerpt: "",
  body: "",
  image: "",
  category: "",
  readTimeMinutes: 5,
  featured: false,
  isPublished: true,
};

export default function BlogAdminPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/blog-posts");
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
    await fetch("/api/admin/blog-posts", {
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
      slug: item.slug,
      excerpt: item.excerpt,
      body: item.body ?? "",
      image: item.image,
      category: item.category?.name ?? "",
      readTimeMinutes: item.readTimeMinutes,
      featured: item.featured,
      isPublished: item.isPublished,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    if (form.id === id) setForm(emptyForm);
    await fetch(`/api/admin/blog-posts?id=${id}`, { method: "DELETE" });
    loadItems();
  };

  return (
    <>
      <AdminPageHeader
        title="Blog Posts"
        subtitle="Add, edit, or delete articles shown on the /blog page."
      />

      <div className="space-y-6">
        <AdminCrudFormPanel
          isEditing={Boolean(form.id)}
          addTitle="Add new post"
          editTitle="Edit post"
          onSubmit={handleSubmit}
          submitLabel="Add post"
          updateLabel="Update post"
          onCancel={() => setForm(emptyForm)}
        >
          {[
            ["title", "Title"],
            ["slug", "Slug (optional)"],
            ["category", "Category"],
            ["readTimeMinutes", "Read time (minutes)", "number"],
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
                required={!["slug"].includes(name)}
              />
            </div>
          ))}
          <AdminImageUpload
            label="Cover image"
            value={form.image}
            onChange={(url) => setForm((prev) => ({ ...prev, image: url }))}
          />
          <div>
            <label className={adminLabelClass}>Excerpt</label>
            <textarea
              rows={4}
              value={form.excerpt}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              className={adminInputClass}
              required
            />
          </div>
          <div>
            <label className={adminLabelClass}>Full article (optional)</label>
            <textarea
              rows={8}
              value={form.body}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, body: e.target.value }))
              }
              className={adminInputClass}
              placeholder="Full blog content..."
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, featured: e.target.checked }))
              }
            />
            Featured article
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, isPublished: e.target.checked }))
              }
            />
            Published
          </label>
        </AdminCrudFormPanel>

        <AdminCrudListPanel
          heading="Saved posts"
          count={items.length}
          loading={loading}
          isEmpty={items.length === 0}
          emptyMessage="No blog posts yet. Add one using the form above."
        >
          {items.map((item) => (
            <AdminCrudListRow
              key={item.id}
              isActive={form.id === item.id}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            >
              <p className="font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-primary-600">
                {item.category?.name} · {item.slug}
                {!item.isPublished ? " · Draft" : ""}
                {item.featured ? " · Featured" : ""}
              </p>
              <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                {item.excerpt}
              </p>
            </AdminCrudListRow>
          ))}
        </AdminCrudListPanel>
      </div>
    </>
  );
}
