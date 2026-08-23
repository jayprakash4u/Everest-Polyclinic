"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { loadGsap } from "@/lib/gsap";

function shouldPreventSmoothScroll(node) {
  return (
    node.classList.contains("hide-scrollbar") ||
    node.classList.contains("package-test-list") ||
    node.classList.contains("overflow-y-auto") ||
    node.classList.contains("overflow-x-auto") ||
    node.hasAttribute("data-lenis-prevent") ||
    Boolean(node.closest("[data-lenis-prevent]"))
  );
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return undefined;

    /* Lenis and GSAP are fetched here rather than imported at the top of the
       file: smooth scrolling is decoration that cannot start until after mount
       anyway, so ~150 KB of it has no business blocking first paint. Native
       scrolling works perfectly in the interval before they arrive.

       `cleanup` is assigned once the libraries land. If the component unmounts
       first, `cancelled` prevents them from ever being wired up. */
    let cancelled = false;
    let cleanup;

    const start = async () => {
      /* The stylesheet is imported here rather than at the top of the file: a
         static import of it drags the package's JS into the initial chunk,
         which is the very thing this indirection exists to avoid. */
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([
        loadGsap(),
        import("lenis"),
        import("lenis/dist/lenis.css"),
      ]);

      if (cancelled) return;

      cleanup = setUpSmoothScroll({ gsap, ScrollTrigger, Lenis, lenisRef });
    };

    start();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return children;
}

/**
 * Wires Lenis to GSAP's ticker and ScrollTrigger, and returns the teardown.
 *
 * Split out of the effect above only because the effect now has to await its
 * dependencies first; the body is otherwise unchanged.
 */
function setUpSmoothScroll({ gsap, ScrollTrigger, Lenis, lenisRef }) {
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.1,
    prevent: shouldPreventSmoothScroll,
  });

  lenisRef.current = lenis;
  document.documentElement.classList.add("lenis");

  lenis.on("scroll", ScrollTrigger.update);

  const ticker = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);

  const handleAnchorClick = (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) return;

    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    lenis.scrollTo(target, { offset: -96, duration: 1.2 });
  };

  document.addEventListener("click", handleAnchorClick);

  // Images resize the page as they decode, which leaves ScrollTrigger start
  // positions stale — a reveal whose trigger has drifted past the viewport
  // would never fire and its content would stay at opacity 0. Recomputing
  // once everything has loaded closes that window.
  const refreshTriggers = () => ScrollTrigger.refresh();
  window.addEventListener("load", refreshTriggers);

  return () => {
    window.removeEventListener("load", refreshTriggers);
    document.removeEventListener("click", handleAnchorClick);
    gsap.ticker.remove(ticker);
    lenis.destroy();
    lenisRef.current = null;
    document.documentElement.classList.remove("lenis");
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
