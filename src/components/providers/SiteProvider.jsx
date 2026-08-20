"use client";

import { createContext, useContext } from "react";
import { SITE } from "@/constants";

/**
 * The clinic's own details — phone, email, address, opening hours — as edited
 * under Admin → Site Settings.
 *
 * These are wanted in the navy utility bar, the footer, the booking modal and
 * half a dozen CTAs, most of which are client components several levels below
 * the layout. Threading a prop through all of them would mean touching every
 * component in between, so the resolved settings ride a context instead.
 *
 * The default is the SITE constant, which means a component that renders
 * outside the provider still gets sensible values rather than crashing on
 * `undefined.phone` — the same fallback the data layer applies when the
 * database is unreachable.
 */
const SiteContext = createContext(SITE);

export function SiteProvider({ site, children }) {
  return <SiteContext.Provider value={site ?? SITE}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
