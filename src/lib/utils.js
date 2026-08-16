import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Joins class names and resolves Tailwind conflicts, so a `className` prop
 * reliably beats a component's own defaults. Without twMerge, `px-2` passed to
 * a component whose variant sets `px-6` loses — CSS source order decides, not
 * the order in the string.
 */
export function cn(...classes) {
  return twMerge(clsx(classes));
}

export const colorVariants = {
  primary: {
    bg:         "bg-primary-600",
    bgLight:    "bg-primary-50",
    bgHover:    "hover:bg-primary-700",
    text:       "text-primary-600",
    textDark:   "text-primary-700",
    border:     "border-primary-600",
    ring:       "ring-primary-300",
    badge:      "bg-primary-100 text-primary-700",
    iconBg:     "bg-primary-100",
    iconColor:  "text-primary-600",
  },
  secondary: {
    bg:         "bg-secondary-600",
    bgLight:    "bg-secondary-50",
    bgHover:    "hover:bg-secondary-700",
    text:       "text-secondary-600",
    textDark:   "text-secondary-700",
    border:     "border-secondary-600",
    ring:       "ring-secondary-300",
    badge:      "bg-secondary-100 text-secondary-700",
    iconBg:     "bg-secondary-100",
    iconColor:  "text-secondary-600",
  },
  accent: {
    bg:         "bg-accent-600",
    bgLight:    "bg-accent-50",
    bgHover:    "hover:bg-accent-700",
    text:       "text-accent-600",
    textDark:   "text-accent-700",
    border:     "border-accent-600",
    ring:       "ring-accent-300",
    badge:      "bg-accent-100 text-accent-700",
    iconBg:     "bg-accent-100",
    iconColor:  "text-accent-600",
  },
};

export function truncate(str, length = 100) {
  if (!str) return "";
  return str.length > length ? str.slice(0, length) + "..." : str;
}

export function generateStars(rating = 5) {
  return Array.from({ length: 5 }, (_, i) => i < rating);
}
