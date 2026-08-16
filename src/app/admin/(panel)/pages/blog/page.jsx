"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Eye, EyeOff, Plus, Star, Trash2 } from "lucide-react";
import AdminImageUpload from "@/components/admin/AdminImageUpload";
import {
  AdminCard,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";

const blankPost = (categoryId) => ({
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  image: "",
  categoryId,
  readTimeMinutes: 5,
  featured: false,
  isPublished: true,
  publishedAt: new Date().toISOString().slice(0, 10),
});

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/page-blog");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setPosts(data.posts ?? []);
      setCategories(data.categories ?? []);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = (index, patch) => {
    setSaved(false);
    setPosts((current) =>
      current.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/page-blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setPosts(data.posts ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const live = posts.filter((post) => post.isPublished !== false);

  return (
    <>
      <AdminPageHeader
        title="Blog page"
        subtitle="Articles listed on /blog."
        action={
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View page
            <ExternalLink size={15} />
          </Link>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">Posts</h3>
            <p className="mt-1 text-sm text-slate-500">
              {live.length} published · {posts.length} in total. Newest first.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={categories.length === 0}
              onClick={() => {
                setSaved(false);
                setPosts((current) => [blankPost(categories[0]?.id), ...current]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-50"
            >
              <Plus size={16} />
              Add post
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || loading}
              className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-alert-50 px-4 py-3 text-sm text-alert-700">
            {error}
          </p>
        ) : null}
        {saved ? (
          <p role="status" className="mt-4 rounded-lg bg-secondary-50 px-4 py-3 text-sm text-secondary-700">
            Saved. Refresh the blog page to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading posts…</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map((post, index) => (
              <li
                key={post.id ?? `new-${index}`}
                className={cn(
                  "rounded-xl border p-4",
                  post.isPublished === false
                    ? "border-slate-200 bg-slate-50 opacity-70"
                    : "border-primary-100 bg-white",
                )}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary-600">
                    {post.title || "New post"}
                    {post.featured ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-700">
                        Featured
                      </span>
                    ) : null}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => update(index, { featured: !post.featured })}
                      aria-label={`${post.featured ? "Unfeature" : "Feature"} ${post.title || "post"}`}
                      aria-pressed={Boolean(post.featured)}
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      <Star
                        size={15}
                        className={cn(post.featured && "fill-amber-400 text-amber-400")}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => update(index, { isPublished: post.isPublished === false })}
                      aria-label={
                        post.isPublished === false
                          ? `Publish ${post.title || "post"}`
                          : `Unpublish ${post.title || "post"}`
                      }
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                    >
                      {post.isPublished === false ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSaved(false);
                        setPosts((current) => current.filter((_, i) => i !== index));
                      }}
                      aria-label={`Delete ${post.title || "post"}`}
                      className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
                  <AdminImageUpload
                    label="Cover image"
                    value={post.image}
                    onChange={(url) => update(index, { image: url })}
                  />

                  <div className="space-y-3">
                    <div>
                      <label className={adminLabelClass}>Title</label>
                      <input
                        value={post.title}
                        onChange={(event) => update(index, { title: event.target.value })}
                        placeholder="Five signs you should book a heart check"
                        className={adminInputClass}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className={adminLabelClass}>Category</label>
                        <select
                          value={post.categoryId ?? ""}
                          onChange={(event) =>
                            update(index, { categoryId: Number(event.target.value) })
                          }
                          className={adminInputClass}
                        >
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className={adminLabelClass}>Published on</label>
                        <input
                          type="date"
                          value={post.publishedAt ?? ""}
                          onChange={(event) =>
                            update(index, { publishedAt: event.target.value })
                          }
                          className={adminInputClass}
                        />
                      </div>

                      <div>
                        <label className={adminLabelClass}>Read time (min)</label>
                        <input
                          type="number"
                          min={1}
                          value={post.readTimeMinutes}
                          onChange={(event) =>
                            update(index, { readTimeMinutes: Number(event.target.value) })
                          }
                          className={adminInputClass}
                        />
                      </div>

                      <div>
                        <label className={adminLabelClass}>Web address</label>
                        <input
                          value={post.slug}
                          onChange={(event) => update(index, { slug: event.target.value })}
                          placeholder="auto from title"
                          className={adminInputClass}
                        />
                        <p className="mt-1 text-xs text-slate-400">
                          /blog/{post.slug || "…"} — leave blank to build it from
                          the title.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className={adminLabelClass}>Summary</label>
                      <textarea
                        rows={2}
                        value={post.excerpt}
                        onChange={(event) => update(index, { excerpt: event.target.value })}
                        placeholder="One or two lines shown on the blog card."
                        className={adminInputClass}
                      />
                    </div>

                    <div>
                      <label className={adminLabelClass}>Article</label>
                      <textarea
                        rows={8}
                        value={post.body}
                        onChange={(event) => update(index, { body: event.target.value })}
                        placeholder="The full article text."
                        className={adminInputClass}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </>
  );
}
