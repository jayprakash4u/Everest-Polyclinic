"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  ChevronRight,
  Clock,
  LayoutGrid,
  Mail,
  Sparkles,
  Tag,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { BLOG_POSTS } from "@/constants/blogPosts";
import { SITE } from "@/constants";
import { cn } from "@/lib/utils";

function PageSectionHeader({ title, subtitle, description, className }) {
  return (
    <div className={cn("mb-6 max-w-2xl sm:mb-8", className)}>
      <h2 className="text-lg font-bold uppercase tracking-tight text-text-dark sm:text-xl">
        {title}
      </h2>
      <div className="mt-1 flex items-center gap-2">
        <div className="h-0.5 w-8 bg-secondary-500" />
        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-400">
          {subtitle}
        </p>
      </div>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function PostMeta({ date, readTime, className }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500",
        className,
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Calendar size={13} className="text-primary-400" />
        {date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock size={13} className="text-primary-400" />
        {readTime}
      </span>
    </div>
  );
}

function FeaturedArticleCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:border-primary-100 hover:shadow-card-hover">
      <div className="grid lg:grid-cols-5">
        <div className="relative h-56 overflow-hidden bg-slate-100 lg:col-span-3 lg:h-auto lg:min-h-[320px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-primary-900/10" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-secondary-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            <Sparkles size={12} />
            Featured
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-2">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700">
            <Tag size={11} />
            {post.category}
          </span>

          <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-text-dark transition-colors group-hover:text-primary-700 sm:text-2xl">
            {post.title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
            {post.excerpt}
          </p>

          <PostMeta date={post.date} readTime={post.readTime} className="mt-5" />

          <Link
            href="/contact"
            className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-bold text-primary-600 transition-all hover:gap-3 hover:text-primary-700"
          >
            Read full article
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BlogPostCard({ post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-card-hover">
      <div className="h-1 w-full bg-primary-600" />

      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 backdrop-blur-sm">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <PostMeta date={post.date} readTime={post.readTime} />

        <h3 className="mt-3 font-heading text-lg font-bold leading-snug text-text-dark transition-colors group-hover:text-primary-700">
          {post.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-1.5 border-t border-slate-100 pt-4 text-sm font-bold text-primary-600 transition-all group-hover:gap-2.5"
        >
          Continue reading
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
}

export default function BlogClientView({
  posts = BLOG_POSTS,
  blogStats = [
    { value: `${BLOG_POSTS.length}+`, label: "Health Articles" },
    { value: "8+", label: "Medical Topics" },
    { value: "Expert", label: "Doctor Written" },
    { value: "Weekly", label: "Fresh Updates" },
  ],
}) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = useMemo(() => {
    const unique = [...new Set(posts.map((post) => post.category))];
    return [
      { id: "all", label: "All Articles", icon: LayoutGrid },
      ...unique.map((category) => ({ id: category, label: category, icon: BookOpen })),
    ];
  }, [posts]);

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];

  const filteredPosts = useMemo(() => {
    const gridPosts = posts.filter((post) => !post.featured);
    if (activeCategory === "all") return gridPosts;
    return gridPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const showFeatured =
    activeCategory === "all" ||
    featuredPost.category === activeCategory;

  const activeLabel =
    categories.find((category) => category.id === activeCategory)?.label ??
    "Articles";

  return (
    <main className="min-h-screen bg-background-light">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#061d2e] via-[#0c3347] to-primary-700 px-4 py-16 sm:py-20 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto max-w-6xl px-4 sm:px-6">
          <nav className="mb-6 flex items-center gap-2 text-sm text-primary-200/80">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} className="text-primary-400" />
            <span className="font-medium text-white">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl md:text-3xl">
              Health Blog
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-0.5 w-8 bg-secondary-400" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-200">
                Expert insights & wellness tips
              </p>
            </div>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-100 sm:text-lg">
              Evidence-based articles from {SITE.shortName} specialists — covering
              prevention, treatment, and everyday health decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-6 px-4 sm:-mt-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-primary-100 bg-white p-4 shadow-card sm:grid-cols-4 sm:gap-0 sm:p-0 sm:divide-x sm:divide-slate-100">
            {blogStats.map((stat) => (
              <div key={stat.label} className="px-4 py-4 text-center sm:py-6">
                <p className="font-heading text-2xl font-bold text-primary-700 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      {showFeatured && (
        <section className="py-12 sm:py-14 md:py-16">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <PageSectionHeader
              title="Featured Article"
              subtitle="Editor's pick this week"
            />
            <FeaturedArticleCard post={featuredPost} />
          </div>
        </section>
      )}

      {/* Article grid */}
      <section className="pb-14 sm:pb-16 md:pb-20">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          <PageSectionHeader
            title="Latest Articles"
            subtitle="Browse by medical topic"
            description="Filter by category to find practical guidance written by our clinical team."
          />

          <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
                    isActive
                      ? "border-primary-600 bg-primary-600 text-white shadow-md"
                      : "border-slate-200 bg-white text-slate-600 hover:border-primary-200 hover:text-primary-700",
                  )}
                >
                  <Icon size={15} strokeWidth={2} />
                  {category.label}
                </button>
              );
            })}
          </div>

          <p className="mb-6 text-sm text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-600">
              {filteredPosts.length}
            </span>{" "}
            {activeLabel.toLowerCase()}
          </p>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
              <BookOpen
                size={40}
                className="mx-auto text-slate-300"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 font-heading text-lg font-bold text-text-dark">
                No articles in this category
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Try another topic or view all articles.
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                className="mt-4 text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-4 pb-16 sm:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-primary-700 to-primary-600 px-6 py-10 sm:rounded-[2rem] sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-lg font-bold uppercase tracking-tight text-white sm:text-xl">
                  Health Newsletter
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-secondary-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-100">
                    Stay informed
                  </p>
                </div>
                <p className="mt-3 max-w-md text-sm text-primary-100 sm:text-base">
                  Get practical wellness tips and clinic updates from our medical
                  team — no spam, just useful health guidance.
                </p>
              </div>

              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="relative flex-1">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    className="w-full rounded-xl border border-white/20 bg-white py-3.5 pl-11 pr-4 text-sm text-text-dark shadow-sm placeholder:text-slate-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  className="shrink-0 rounded-xl px-8"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
