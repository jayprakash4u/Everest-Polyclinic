"use client";

import { createElement, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getServiceIcon } from "@/lib/service-icons";
import { getHomepageServiceImage } from "@/constants/services/homepageServiceImages";
import { encodePublicPath } from "@/lib/encode-public-path";
import { loadGsap } from "@/lib/gsap";

/**
 * `getServiceIcon` returns a component from a fixed lookup table, so the
 * identity is stable across renders — but binding it to a capitalised local and
 * rendering `<Icon />` reads as a component created during render. createElement
 * expresses the same thing without the ambiguity.
 */
function ServiceIcon({ iconKey, className }) {
  return createElement(getServiceIcon(iconKey), { className, strokeWidth: 1.5 });
}

/*
 * The connected tab, as one fused outline rather than two shapes pretending
 * to touch.
 *
 * A `polygon()` clip-path can only remove area from the card's own box, never
 * add area beyond it, so the tab is drawn *inside* the same box the main
 * card occupies — the box just reserves a little extra height at the bottom
 * for it (see the body's `pb-[...]`). Two of the card's four corners
 * (top-left, top-right) are still real box corners, so `border-radius`
 * rounds them for free; the other two aren't corners of this shape at all
 * any more, so every point around the tab, including the plain "outer"
 * rounding on its own two corners, has to be walked by hand.
 *
 * The one point that matters is the joint: where the tab's left edge meets
 * the card's bottom edge is a reflex (concave) corner — material on three
 * sides, empty on the fourth — and a fillet there is built the opposite way
 * from a normal rounded corner: centre the arc *on* the reflex point itself
 * rather than on the point diagonally outside it. Every other corner here
 * (the two on the tab, the card's own remaining bottom-left) is a normal
 * convex fillet, centred on the missing corner the usual way.
 *
 * Generated, not hand-typed — see the derivation in the PR description if
 * this ever needs different proportions. `tabR`/`tabW`/`neckR` describe the
 * tab itself, `neckR2` the concave joint, `prot` how far the tab hangs below
 * the card's own bottom edge, and `cornerR` the card's remaining bottom-left
 * corner (kept equal to its border-radius so all four corners still match).
 */
function buildTabClipPath({ tabR, tabW, neckR, neckR2, prot, cornerR, steps = 8 }) {
  const round = (n) => Math.round(n * 1000) / 1000;
  const fromRight = (dx) => (dx <= 0.0001 ? "100%" : `calc(100% - ${round(dx)}px)`);
  const fromBottom = (dy) => (dy <= 0.0001 ? "100%" : `calc(100% - ${round(dy)}px)`);
  const fromLeft = (lx) => (lx <= 0.0001 ? "0%" : `${round(lx)}px`);

  const pts = ["0 0", "100% 0"];
  const rb = (dx, dy) => pts.push(`${fromRight(dx)} ${fromBottom(dy)}`);
  const arc = (cx, cy, r, startDeg, sweepDeg) => {
    for (let i = 1; i < steps; i++) {
      const ang = ((startDeg + (sweepDeg * i) / steps) * Math.PI) / 180;
      rb(cx + r * Math.cos(ang), cy + r * Math.sin(ang));
    }
  };

  rb(0, tabR);
  arc(tabR, tabR, tabR, 180, 90); // tab's own bottom-right corner (convex)
  rb(tabR, 0);
  rb(tabW - neckR, 0);
  arc(tabW - neckR, neckR, neckR, 270, 90); // tab's own bottom-left corner (convex)
  rb(tabW, neckR);
  rb(tabW, prot - neckR2);
  arc(tabW, prot, neckR2, 270, 90); // the joint (concave: centred on the reflex point)
  rb(tabW + neckR2, prot);

  pts.push(`${fromLeft(cornerR)} ${fromBottom(prot)}`);
  for (let i = 1; i < steps; i++) {
    const ang = ((270 - (90 * i) / steps) * Math.PI) / 180;
    pts.push(
      `${fromLeft(cornerR + cornerR * Math.cos(ang))} ${fromBottom(prot + cornerR + cornerR * Math.sin(ang))}`,
    );
  } // card's own bottom-left corner (convex, no longer a real box corner)
  pts.push(`0% ${fromBottom(prot + cornerR)}`);

  return `polygon(${pts.join(",")})`;
}

const TAB_CLIP_MOBILE = buildTabClipPath({
  tabR: 14,
  tabW: 44,
  neckR: 14,
  neckR2: 14,
  prot: 16,
  cornerR: 26,
});
const TAB_CLIP_DESKTOP = buildTabClipPath({
  tabR: 18,
  tabW: 56,
  neckR: 18,
  neckR2: 18,
  prot: 20,
  cornerR: 26,
});

/**
 * Pointer-driven 3D tilt + a light that follows the cursor, desktop only.
 *
 * Gated on `(hover: hover) and (pointer: fine)` — a touch tap has no cursor to
 * tilt toward, and wiring this to touchmove would fight the page's own scroll.
 * `gsap.quickTo` rather than a fresh `gsap.to` per event: it hands back one
 * tween per property that can be re-targeted on every pointermove without
 * spinning up a new tween each time, which is the difference between the card
 * tracking the cursor smoothly and stuttering under a flood of events.
 */
function useCardTilt() {
  const nodeRef = useRef(null);
  const quickRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return undefined;

    const canHover =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduceMotion) return undefined;

    let cancelled = false;

    loadGsap().then(({ gsap }) => {
      if (cancelled || !nodeRef.current) return;

      quickRef.current = {
        rotateX: gsap.quickTo(node, "rotateX", {
          duration: 0.5,
          ease: "power3.out",
        }),
        rotateY: gsap.quickTo(node, "rotateY", {
          duration: 0.5,
          ease: "power3.out",
        }),
      };
    });

    return () => {
      cancelled = true;
      quickRef.current = null;
    };
  }, []);

  const onPointerMove = useCallback((event) => {
    const node = nodeRef.current;
    const quick = quickRef.current;
    if (!node || !quick) return;

    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    // ±7deg — enough to read as depth without the card looking like it is
    // falling over.
    quick.rotateY((px - 0.5) * 14);
    quick.rotateX((0.5 - py) * 14);
    node.style.setProperty("--spot-x", `${px * 100}%`);
    node.style.setProperty("--spot-y", `${py * 100}%`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const quick = quickRef.current;
    if (!quick) return;
    quick.rotateX(0);
    quick.rotateY(0);
  }, []);

  return { nodeRef, onPointerMove, onPointerLeave };
}

export default function ServiceCard({ service, isActive = false, onActivate }) {
  const image = service.homepageImage || getHomepageServiceImage(service.slug);
  const summary =
    service.shortDescription ||
    service.hero?.description ||
    "Expert consultation and coordinated care at Everest Polyclinic.";

  const { nodeRef, onPointerMove, onPointerLeave } = useCardTilt();

  return (
    <div className="h-full [perspective:1400px]">
      {/*
        A thin, unstyled positioning shell around the actual card body, so
        the tilt transform (applied here, via the ref) and the fused-shape
        clip-path (applied to the body) don't fight over the same element.
      */}
      <Link
        ref={nodeRef}
        href={`/services/${service.slug}`}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerEnter={onActivate}
        data-active={isActive}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative block h-full rounded-[26px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
      >
        <style jsx>{`
          .tab-clip {
            clip-path: ${TAB_CLIP_MOBILE};
          }
          @media (min-width: 640px) {
            .tab-clip {
              clip-path: ${TAB_CLIP_DESKTOP};
            }
          }
        `}</style>

        <div className="tab-clip relative flex h-full flex-col rounded-[26px] border border-slate-200/70 bg-white p-4 pb-[72px] shadow-e1 transition-[background-color,border-color,box-shadow,transform] duration-500 group-active-or-hover:-translate-y-1 group-active-or-hover:border-primary-900 group-active-or-hover:bg-primary-900 group-active-or-hover:shadow-e2 sm:p-6 sm:pb-[92px]">
          {/* The light. A radial highlight parked at the cursor position,
              only switched on once the hover fill is dark enough for a
              white glow to read against it. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-active-or-hover:opacity-100"
            style={{
              background:
                "radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,255,255,0.14), transparent 65%)",
            }}
          />

          {/* Oversized, near-transparent copy of the icon bleeding off the
              right edge — the texture that stops a sparse card reading as
              empty. The chamfer on the parent clips it along with everything
              else, so it never spills into the cut corner. */}
          {image ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
            >
              <span className="absolute -right-5 top-2 block h-32 w-32 opacity-[0.07] transition-opacity duration-300 group-active-or-hover:opacity-[0.13] sm:h-40 sm:w-40">
                {/* The artwork is navy line-art, so it would vanish against
                    the navy hover fill. `brightness-0 invert` forces it to
                    flat white. */}
                <Image
                  src={encodePublicPath(image)}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-contain transition duration-300 group-active-or-hover:brightness-0 group-active-or-hover:invert"
                />
              </span>
            </span>
          ) : null}

          {/* Icon badge: a soft squircle rather than a bare glyph, so the
              mark has a surface of its own to lift and glow from on hover. */}
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-50 to-primary-50 shadow-e1 transition-all duration-500 group-active-or-hover:-translate-y-0.5 group-active-or-hover:rotate-3 group-active-or-hover:from-white/15 group-active-or-hover:to-white/5 group-active-or-hover:shadow-[0_0_0_6px_rgba(255,255,255,0.08)] sm:h-14 sm:w-14">
            {image ? (
              <span className="relative block h-6 w-6 sm:h-8 sm:w-8">
                <Image
                  src={encodePublicPath(image)}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-contain transition duration-300 group-active-or-hover:brightness-0 group-active-or-hover:invert"
                />
              </span>
            ) : (
              <ServiceIcon
                iconKey={service.icon}
                className="h-6 w-6 text-primary-800 transition-colors duration-300 group-active-or-hover:text-white sm:h-7 sm:w-7"
              />
            )}
          </span>

          <h3 className="relative mt-4 font-heading text-sm font-semibold leading-snug tracking-[-0.01em] text-primary-900 transition-colors duration-300 group-active-or-hover:text-white sm:mt-5 sm:text-lg">
            <span className="line-clamp-2">{service.title}</span>
          </h3>

          <p className="relative mt-2 line-clamp-2 text-xs leading-relaxed text-slate-500 transition-colors duration-300 group-active-or-hover:text-white/75 sm:mt-2.5 sm:text-sm">
            {summary}
          </p>

          {/* Dashed rule closing the card. The design puts a clinician count
              in the row beneath it; there is no such figure in the service
              data, so the slot carries the action label rather than an
              invented number. */}
          <span
            aria-hidden="true"
            className="relative mt-auto block border-t border-dashed border-slate-300 pt-3.5 transition-colors duration-300 group-active-or-hover:border-white/30"
          />
          <span className="relative flex items-center gap-2 pr-8 text-[11px] font-semibold text-secondary-700 transition-colors duration-300 group-active-or-hover:text-secondary-300 sm:pr-10 sm:text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-secondary-500 transition-colors duration-300 group-active-or-hover:bg-secondary-400"
            />
            Explore service
          </span>
        </div>

        {/*
          The arrow, dropped into the tab the clip-path just carved. It's a
          sibling of the clipped body, not a child of it, purely so it isn't
          clipped away with the corner it's replacing.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1.5 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-secondary-600 text-white shadow-e1 transition-all duration-300 group-active-or-hover:scale-110 group-active-or-hover:bg-secondary-700 sm:bottom-2 sm:right-2.5 sm:h-10 sm:w-10 sm:rounded-2xl"
        >
          <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
        </span>
      </Link>
    </div>
  );
}
