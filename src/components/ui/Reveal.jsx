"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { loadGsap } from "@/lib/gsap";

/**
 * One quiet entrance, used site-wide: a 12px rise and fade as the block reaches
 * the viewport. Driven by GSAP ScrollTrigger rather than IntersectionObserver
 * because Lenis already drives scrolling and SmoothScroll.jsx pumps
 * `ScrollTrigger.update` from it — a second, unsynced observer would drift.
 *
 * `stagger` walks the element's direct children instead of the block as a
 * whole, so a list resolves item by item.
 *
 * Content renders visible and `gsap.from` takes it from there, so if JS never
 * runs nothing is stranded invisible. Under `prefers-reduced-motion: reduce`
 * the matchMedia branch never registers and the content simply stays put.
 */
export default function Reveal({
  children,
  className,
  as: Tag = "div",
  stagger = false,
  delay = 0,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    /* GSAP arrives asynchronously now, so the element can unmount before the
       library resolves. `cancelled` stops us building an animation against a
       detached node, and `ctx` is captured so the cleanup can still revert one
       that was created a moment too late. */
    let cancelled = false;
    let ctx;

    loadGsap().then(({ gsap }) => {
      if (cancelled) return;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const targets = stagger ? gsap.utils.toArray(node.children) : node;

          gsap.from(targets, {
            opacity: 0,
            y: 12,
            duration: 0.6,
            ease: "power2.out",
            delay,
            stagger: stagger ? 0.08 : 0,
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
            },
          });
        });

        return () => mm.revert();
      }, node);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [stagger, delay]);

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
