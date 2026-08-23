"use client";

/**
 * Loads GSAP on demand, once per page load.
 *
 * GSAP and its ScrollTrigger plugin are ~110 KB, and every use of them in this
 * app happens inside a `useEffect` — the entrance reveals, the hero crossfade,
 * the Lenis ticker. None of that can run until after the component has mounted
 * on the client, so none of it needs to be in the bundle the browser parses
 * before first paint. Importing it here, inside the effect that needs it, moves
 * the whole library off the critical path.
 *
 * The promise is cached rather than the module, so that several components
 * mounting at once share a single network request instead of racing.
 */
let gsapPromise;

export function loadGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([gsapModule, scrollTriggerModule]) => {
      const gsap = gsapModule.default ?? gsapModule;
      const { ScrollTrigger } = scrollTriggerModule;

      /* registerPlugin is idempotent, and this runs once because the promise
         above is memoised. */
      gsap.registerPlugin(ScrollTrigger);

      return { gsap, ScrollTrigger };
    });
  }

  return gsapPromise;
}
