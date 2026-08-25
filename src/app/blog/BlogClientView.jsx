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

/* Same fix as the identical PageSectionHeader in DoctorsClientView.jsx — see
   the comment there. */
function PageSectionHeader({ title, subtitle, description, className }) {
  return (
    <div className={cn("mb-6 max-w-2xl sm:mb-8", className)}>
      <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-secondary-600">
        <span className="h-px w-6 bg-secondary-500" />
        {subtitle}
      </p>
      <h2 className="mt-2 font-heading text-xl font-semibold tracking-[-0.01em] text-primary-900 sm:text-2xl">
        {title}
      </h2>
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

          <h3 className="mt-4 font-heading text-xl font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-700 sm:text-2xl">
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
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-100 hover:shadow-card-hover sm:rounded-2xl">
      <div className="h-0.5 w-full bg-primary-600 sm:h-1" />

      <div className="relative h-28 overflow-hidden bg-slate-100 sm:h-48">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full border border-white/20 bg-white/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-700 backdrop-blur-sm sm:left-4 sm:top-4 sm:max-w-none sm:px-2.5 sm:py-1 sm:text-[10px]">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5 md:p-6">
        <PostMeta
          date={post.date}
          readTime={post.readTime}
          className="gap-1.5 text-[10px] sm:gap-3 sm:text-xs [&_svg]:h-3 [&_svg]:w-3"
        />

        <h3 className="mt-2 font-heading text-[13px] font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-700 sm:mt-3 sm:text-lg">
          {post.title}
        </h3>

        <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-slate-500 line-clamp-2 sm:mt-2 sm:text-sm sm:line-clamp-3">
          {post.excerpt}
        </p>

        <Link
          href="/contact"
          className="mt-3 inline-flex items-center gap-1 border-t border-slate-100 pt-2.5 text-[11px] font-bold text-primary-600 transition-all group-hover:gap-2.5 sm:mt-5 sm:gap-1.5 sm:pt-4 sm:text-sm"
        >
          Continue reading
          <ArrowRight size={14} />
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 px-4 py-8 sm:py-16 md:py-20 lg:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative container mx-auto max-w-6xl sm:px-6">
          <nav className="mb-3 flex items-center gap-2 text-xs text-primary-200/80 sm:mb-6 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight size={14} className="text-primary-400" />
            <span className="font-medium text-white">Blog</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-8 bg-secondary-400" />
              <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary-300 sm:text-[11px]">
                Expert insights & wellness tips
              </p>
            </div>
            <h1 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.01em] text-white sm:mt-3 sm:text-4xl md:text-5xl">
              Health Blog
            </h1>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-primary-100 sm:mt-4 sm:text-base md:text-lg">
              Evidence-based articles from {SITE.shortName} specialists — covering
              prevention, treatment, and everyday health decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-4 px-4 sm:-mt-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-primary-100 bg-white p-2.5 shadow-card sm:grid-cols-4 sm:gap-0 sm:rounded-2xl sm:p-0 sm:divide-x sm:divide-slate-100">
            {blogStats.map((stat) => (
              <div key={stat.label} className="px-2 py-2.5 text-center sm:px-4 sm:py-6">
                <p className="font-heading text-xl font-bold text-primary-700 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500 sm:mt-1 sm:text-xs">
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

          <div className="-mx-4 mb-6 flex gap-2 overflow-x-auto overscroll-x-contain px-4 hide-scrollbar sm:mx-0 sm:mb-8 sm:flex-wrap sm:overflow-visible sm:px-0">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all",
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
            <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
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
              <h3 className="mt-4 font-heading text-lg font-bold text-primary-900">
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
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-8 bg-secondary-400" />
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-300">
                    Stay informed
                  </p>
                </div>
                <h2 className="mt-2 font-heading text-xl font-semibold tracking-[-0.01em] text-white sm:text-2xl">
                  Health Newsletter
                </h2>
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
                  variant="primary"
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
