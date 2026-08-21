import { revalidateTag, unstable_cache } from "next/cache";

/**
 * Caching for the public site's database reads.
 *
 * The database is remote, so every uncached read is a round trip over the
 * network before the page can render — the home page alone asks for nine
 * different things. This layer keeps those results between requests.
 *
 * Two rules make it safe to cache aggressively:
 *
 * 1. Every entry carries a tag, and every admin write calls `revalidate` for
 *    the tags it touched. An edit in the admin panel therefore shows on the
 *    public site immediately, not whenever a timer happens to lapse.
 * 2. The admin panel's own screens read through Prisma directly rather than
 *    through these helpers, so what an admin sees is never a cached copy of
 *    the thing they are editing.
 *
 * The time limit below is a safety net for the case where a write happens
 * outside the app — someone editing a row in the database by hand — not the
 * primary invalidation mechanism.
 */

export const CACHE_TAGS = {
  siteSettings: "site-settings",
  services: "services",
  doctors: "doctors",
  testimonials: "testimonials",
  faqs: "faqs",
  centersOfExcellence: "centers-of-excellence",
  whyChooseUs: "why-choose-us",
  healthPackages: "health-packages",
  gallery: "gallery",
  blog: "blog",
  stats: "stats",
  pageSections: "page-sections",
};

/* One hour. Long, because tag invalidation is what actually keeps the site
   fresh; this only bounds how stale a hand-edited row can get. */
const DEFAULT_REVALIDATE = 3600;

/**
 * Wraps a data reader so its result is reused across requests.
 *
 * `keyParts` must be unique per function — Next builds the cache key from the
 * arguments plus these parts, and two readers sharing a key would serve each
 * other's rows.
 */
export function cachedRead(fn, keyParts, tag, revalidate = DEFAULT_REVALIDATE) {
  return unstable_cache(fn, keyParts, {
    tags: [tag],
    revalidate,
  });
}

/**
 * Drops the cached copies of everything carrying `tag`. Call this from an admin
 * write route after the database has been changed.
 *
 * `expire: 0` rather than the "max" profile on purpose. "max" is
 * stale-while-revalidate: the next visitor is served the old content while the
 * new content loads behind them. That is the right trade for a busy public
 * feed, but here the next visitor is usually the admin reloading the page to
 * check their own edit — and being shown the old value reads as a broken save.
 * Expiring outright costs one uncached read and makes the write visible at once.
 *
 * Accepts several tags because a few writes touch more than one.
 */
export function revalidatePublic(...tags) {
  for (const tag of tags) {
    if (tag) revalidateTag(tag, { expire: 0 });
  }
}
