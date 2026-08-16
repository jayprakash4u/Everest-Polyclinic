import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-auth";
import {
  getBlogCategories,
  getBlogPostsForAdmin,
  saveBlogPosts,
} from "@/lib/data/adminContent";

export async function GET() {
  const { response } = await requireAdminSession();
  if (response) return response;

  try {
    const [posts, categories] = await Promise.all([
      getBlogPostsForAdmin(),
      getBlogCategories(),
    ]);
    return NextResponse.json({ posts, categories });
  } catch (error) {
    console.error("[api/admin/page-blog]", error);
    return NextResponse.json(
      { error: "Unable to load blog posts right now." },
      { status: 500 },
    );
  }
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function PUT(request) {
  const { response } = await requireAdminSession();
  if (response) return response;

  const body = await request.json();
  const incoming = Array.isArray(body.posts) ? body.posts : null;

  if (!incoming) {
    return NextResponse.json({ error: "Expected a posts array." }, { status: 400 });
  }

  const posts = [];
  const usedSlugs = new Set();

  for (const [index, post] of incoming.entries()) {
    const title = String(post.title ?? "").trim();
    const image = String(post.image ?? "").trim();
    const categoryId = Number(post.categoryId);

    if (!title) {
      return NextResponse.json(
        { error: `Post ${index + 1} needs a title.` },
        { status: 400 },
      );
    }

    if (!Number.isFinite(categoryId) || categoryId <= 0) {
      return NextResponse.json(
        { error: `"${title}" needs a category.` },
        { status: 400 },
      );
    }

    if (!image) {
      return NextResponse.json(
        { error: `"${title}" needs a cover image.` },
        { status: 400 },
      );
    }

    /* `slug` is the post's URL and carries a unique index. It is derived from
       the title when left blank, and a duplicate would fail the insert with a
       constraint error the admin could not act on — so it is caught here. */
    let slug = slugify(post.slug || title);
    if (!slug) slug = `post-${index + 1}`;

    if (usedSlugs.has(slug)) {
      return NextResponse.json(
        { error: `Two posts share the web address "${slug}". Give one a different title or address.` },
        { status: 400 },
      );
    }
    usedSlugs.add(slug);

    const readTime = Number(post.readTimeMinutes);

    posts.push({
      id: Number(post.id) || null,
      title,
      slug,
      excerpt: String(post.excerpt ?? "").trim() || title,
      body: String(post.body ?? "").trim(),
      image,
      categoryId,
      readTimeMinutes:
        Number.isFinite(readTime) && readTime > 0 ? Math.round(readTime) : 5,
      featured: Boolean(post.featured),
      isPublished: post.isPublished !== false,
      publishedAt: String(post.publishedAt ?? "").trim(),
    });
  }

  try {
    const saved = await saveBlogPosts(posts);
    return NextResponse.json({ posts: saved });
  } catch (error) {
    console.error("[api/admin/page-blog]", error);
    return NextResponse.json(
      { error: "Unable to save blog posts right now." },
      { status: 500 },
    );
  }
}
