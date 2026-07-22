import {
  BLOG_POSTS,
  formatBlogDate,
  formatReadTime,
} from "@/constants/blogPosts";
import { prisma } from "@/lib/db";

function mapBlogPost(row) {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    image: row.image,
    category: row.category?.name ?? row.category,
    date: formatBlogDate(row.publishedAt ?? row.date),
    readTime: formatReadTime(row.readTimeMinutes ?? row.readTime),
    featured: row.featured ?? false,
  };
}

export async function getBlogPosts() {
  try {
    const rows = await prisma.blogPost.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: { publishedAt: "desc" },
    });

    if (rows.length > 0) {
      return rows.map(mapBlogPost);
    }
  } catch (error) {
    console.warn("[db] Blog posts fallback:", error.message);
  }

  return BLOG_POSTS;
}

export async function getBlogStats(postCount) {
  const count = postCount ?? BLOG_POSTS.length;
  const categories = new Set(BLOG_POSTS.map((post) => post.category)).size;

  try {
    const [dbCount, dbCategories] = await Promise.all([
      prisma.blogPost.count({ where: { isPublished: true } }),
      prisma.blogCategory.count(),
    ]);

    if (dbCount > 0) {
      return [
        { value: `${dbCount}+`, label: "Health Articles" },
        { value: `${dbCategories}+`, label: "Medical Topics" },
        { value: "Expert", label: "Doctor Written" },
        { value: "Weekly", label: "Fresh Updates" },
      ];
    }
  } catch {
    // use static stats below
  }

  return [
    { value: `${count}+`, label: "Health Articles" },
    { value: `${categories}+`, label: "Medical Topics" },
    { value: "Expert", label: "Doctor Written" },
    { value: "Weekly", label: "Fresh Updates" },
  ];
}
