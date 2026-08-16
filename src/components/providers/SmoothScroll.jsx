"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

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
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return children;
}
