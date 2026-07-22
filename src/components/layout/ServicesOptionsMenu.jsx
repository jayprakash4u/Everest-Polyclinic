"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
import { getServiceCategories } from "@/constants/services/categories";
import { getServiceIcon } from "@/lib/service-icons";
import { cn } from "@/lib/utils";

export default function ServicesOptionsMenu({
  variant = "dropdown",
  onNavigate,
  className,
}) {
  const categories = getServiceCategories();
  const isDropdown = variant === "dropdown";

  return (
    <div
      data-lenis-prevent={isDropdown ? true : undefined}
      className={cn(
        isDropdown
          ? "max-h-[min(70vh,calc(100dvh-7rem))] w-[min(94vw,860px)] overflow-y-auto overscroll-contain rounded-xl border border-slate-200/90 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.12)] sm:px-5 sm:py-3.5"
          : "px-1 py-0.5",
        className,
      )}
    >
      <div
        className={cn(
          "grid gap-4",
          isDropdown ? "sm:grid-cols-3" : "grid-cols-1 gap-3",
        )}
      >
        {categories.map((category) => (
          <div key={category.id}>
            <p
              className={cn(
                "mb-2 border-b border-slate-200 pb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500",
                !isDropdown && "text-[9px]",
              )}
            >
              {category.title}
            </p>
            <ul>
              {category.services.map((service) => {
                const Icon = getServiceIcon(service.icon) || Stethoscope;

                return (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      onClick={onNavigate}
                      className={cn(
                        "group flex w-full cursor-pointer items-center gap-2 rounded-md transition-colors hover:bg-primary-50",
                        variant === "mobile" ? "py-1.5 pl-1 pr-1" : "px-2 py-1.5",
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-50 text-slate-500 transition-colors group-hover:bg-primary-100 group-hover:text-primary-600">
                        <Icon
                          size={variant === "mobile" ? 15 : 16}
                          strokeWidth={1.75}
                        />
                      </span>
                      <span
                        className={cn(
                          "min-w-0 flex-1 text-sm font-medium leading-tight text-slate-700 transition-colors group-hover:text-primary-700",
                        )}
                      >
                        {service.title}
                      </span>
                      <ArrowRight
                        size={14}
                        strokeWidth={2}
                        className="shrink-0 text-primary-500 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
