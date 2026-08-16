"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ExternalLink,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import {
  AdminCard,
  AdminPageHeader,
  adminInputClass,
  adminLabelClass,
} from "@/components/admin/AdminShell";
import { cn } from "@/lib/utils";

/*
 * `tests` is a mix of plain strings and `{ label, items[] }` groups. The
 * textarea uses a format that survives a round trip in both directions:
 *
 *   CBC                        -> "CBC"
 *   Lipid Profile:             -> { label: "Lipid Profile",
 *     Total Cholesterol             items: ["Total Cholesterol", "HDL"] }
 *     HDL
 *
 * A line ending in ":" opens a group; indented lines below belong to it. Any
 * other line is a test on its own. Without this, editing would flatten every
 * grouped panel the cards currently show.
 */
function testsToText(tests) {
  return (tests ?? [])
    .map((test) => {
      if (typeof test === "string") return test;
      const items = (test.items ?? []).map((item) => `  ${item}`).join("\n");
      return items ? `${test.label}:\n${items}` : `${test.label}:`;
    })
    .join("\n");
}

function textToTests(text) {
  const tests = [];
  let group = null;

  for (const rawLine of String(text ?? "").split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const isIndented = /^\s{2,}|\t/.test(rawLine);

    if (isIndented && group) {
      group.items.push(line);
      continue;
    }

    if (line.endsWith(":")) {
      group = { label: line.slice(0, -1).trim(), items: [] };
      tests.push(group);
      continue;
    }

    group = null;
    tests.push(line);
  }

  // A group left with no items is just a plain test.
  return tests.map((test) =>
    typeof test === "string" ? test : test.items.length ? test : test.label,
  );
}

const blankPackage = (sectionId) => ({
  id: null,
  sectionId,
  name: "",
  price: 0,
  originalPrice: null,
  badge: "",
  tests: [],
  showOnHomepage: true,
  isActive: true,
});

export default function AdminHomeHealthPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/home-health-packages");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load.");
      setPackages(data.packages ?? []);
      setSections(data.sections ?? []);
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
    setPackages((current) =>
      current.map((pkg, i) => (i === index ? { ...pkg, ...patch } : pkg)),
    );
  };

  const move = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= packages.length) return;
    setSaved(false);
    setPackages((current) => {
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const response = await fetch("/api/admin/home-health-packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packages }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save.");
      setPackages(data.packages ?? []);
      setSaved(true);
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const onHomepage = packages.filter((pkg) => pkg.showOnHomepage && pkg.isActive);

  return (
    <>
      <AdminPageHeader
        title="Health packages"
        subtitle="The priced checkup packages, and which of them show on the homepage."
        action={
          <div className="flex items-center gap-2">
            <Link
              href="/admin/pages/home"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              <ArrowLeft size={15} />
              Home page
            </Link>
            <Link
              href="/health-packages"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
            >
              View page
              <ExternalLink size={15} />
            </Link>
          </div>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#1a3a5c]">
              All packages
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {onHomepage.length} showing on the homepage · {packages.length} in
              total. The homepage carousel shows up to 12.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={sections.length === 0}
              onClick={() => {
                setSaved(false);
                setPackages((current) => [
                  ...current,
                  blankPackage(sections[0]?.id),
                ]);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-primary-200 px-3 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-50"
            >
              <Plus size={16} />
              Add package
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
            Saved. Refresh the homepage to see the change.
          </p>
        ) : null}

        {loading ? (
          <p className="mt-6 text-sm text-slate-500">Loading packages…</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {packages.map((pkg, index) => {
              const savings =
                pkg.originalPrice && pkg.originalPrice > pkg.price
                  ? Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)
                  : null;

              return (
                <li
                  key={pkg.id ?? `new-${index}`}
                  className={cn(
                    "rounded-xl border p-4",
                    pkg.isActive === false
                      ? "border-slate-200 bg-slate-50 opacity-70"
                      : pkg.showOnHomepage
                        ? "border-secondary-200 bg-secondary-50/30"
                        : "border-primary-100 bg-white",
                  )}
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-600">
                        {pkg.name || "New package"}
                      </span>
                      {savings ? (
                        <span className="rounded-full bg-secondary-100 px-2 py-0.5 text-[11px] font-bold text-secondary-700">
                          Save {savings}%
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => move(index, -1)}
                        disabled={index === 0}
                        aria-label={`Move ${pkg.name || "package"} earlier`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ArrowUp size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => move(index, 1)}
                        disabled={index === packages.length - 1}
                        aria-label={`Move ${pkg.name || "package"} later`}
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-30"
                      >
                        <ArrowDown size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => update(index, { isActive: pkg.isActive === false })}
                        aria-label={
                          pkg.isActive === false
                            ? `Publish ${pkg.name || "package"}`
                            : `Unpublish ${pkg.name || "package"}`
                        }
                        className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100"
                      >
                        {pkg.isActive === false ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSaved(false);
                          setPackages((current) => current.filter((_, i) => i !== index));
                        }}
                        aria-label={`Delete ${pkg.name || "package"}`}
                        className="rounded-lg p-2 text-alert-500 transition-colors hover:bg-alert-50"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3">
                      <div>
                        <label className={adminLabelClass}>Package name</label>
                        <input
                          value={pkg.name}
                          onChange={(event) => update(index, { name: event.target.value })}
                          placeholder="Comprehensive Executive"
                          className={adminInputClass}
                        />
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={adminLabelClass}>Price (NRs)</label>
                          <input
                            type="number"
                            min={0}
                            value={pkg.price}
                            onChange={(event) =>
                              update(index, { price: Number(event.target.value) })
                            }
                            className={adminInputClass}
                          />
                        </div>
                        <div>
                          <label className={adminLabelClass}>Was (optional)</label>
                          <input
                            type="number"
                            min={0}
                            value={pkg.originalPrice ?? ""}
                            onChange={(event) =>
                              update(index, {
                                originalPrice:
                                  event.target.value === "" ? null : Number(event.target.value),
                              })
                            }
                            placeholder="9800"
                            className={adminInputClass}
                          />
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className={adminLabelClass}>Badge (optional)</label>
                          <input
                            value={pkg.badge ?? ""}
                            onChange={(event) => update(index, { badge: event.target.value })}
                            placeholder="Best Seller"
                            className={adminInputClass}
                          />
                          <p className="mt-1 text-xs text-slate-400">
                            The first &ldquo;Best Seller&rdquo; is the navy
                            featured card on the homepage.
                          </p>
                        </div>
                        <div>
                          <label className={adminLabelClass}>Category</label>
                          <select
                            value={pkg.sectionId ?? ""}
                            onChange={(event) =>
                              update(index, { sectionId: Number(event.target.value) })
                            }
                            className={adminInputClass}
                          >
                            {sections.map((section) => (
                              <option key={section.id} value={section.id}>
                                {section.section}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <label className="flex items-center gap-2.5 rounded-lg bg-white px-3 py-2.5 ring-1 ring-slate-200">
                        <input
                          type="checkbox"
                          checked={Boolean(pkg.showOnHomepage)}
                          onChange={(event) =>
                            update(index, { showOnHomepage: event.target.checked })
                          }
                          className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm font-semibold text-[#1a3a5c]">
                          Show on homepage
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className={adminLabelClass}>Tests included</label>
                      <textarea
                        rows={11}
                        value={testsToText(pkg.tests)}
                        onChange={(event) =>
                          update(index, { tests: textToTests(event.target.value) })
                        }
                        placeholder={"CBC\nFasting Blood Sugar\nLipid Profile:\n  Total Cholesterol\n  HDL Cholesterol"}
                        className={cn(adminInputClass, "font-mono text-xs leading-relaxed")}
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        One test per line. End a line with a colon and indent the
                        lines under it to group them — the card counts every
                        entry and shows the first three.
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </AdminCard>
    </>
  );
}
