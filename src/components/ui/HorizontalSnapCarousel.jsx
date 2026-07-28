"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CarouselLayoutContext = createContext({ cardWidth: 280 });

function readGap(container) {
  const styles = getComputedStyle(container);
  return parseFloat(styles.columnGap) || parseFloat(styles.gap) || 16;
}

function computeLayout(containerWidth, itemCount, gap, minCardWidth, maxColumns, forceMobileTwoUp = false) {
  if (containerWidth <= 0 || itemCount === 0) {
    return { cardWidth: minCardWidth, visibleCount: 1 };
  }

  // Mobile: always show 2 cards in the row when possible
  if (forceMobileTwoUp && itemCount >= 2) {
    const visibleCount = Math.min(2, maxColumns, itemCount);
    const cardWidth =
      (containerWidth - (visibleCount - 1) * gap) / visibleCount;
    return { cardWidth, visibleCount };
  }

  let visibleCount = Math.floor(
    (containerWidth + gap) / (minCardWidth + gap),
  );
  visibleCount = Math.max(1, Math.min(visibleCount, maxColumns, itemCount));

  const cardWidth =
    (containerWidth - (visibleCount - 1) * gap) / visibleCount;

  return { cardWidth, visibleCount };
}

function getScrollMetrics(container) {
  const first = container.querySelector("[data-carousel-item]");
  if (!first) return null;

  const gap = readGap(container);
  const cardWidth = first.getBoundingClientRect().width;
  const step = cardWidth + gap;
  const visibleCount = Math.max(
    1,
    Math.floor((container.clientWidth + gap) / step),
  );

  const items = container.querySelectorAll("[data-carousel-item]");
  const maxIndex = Math.max(0, items.length - visibleCount);

  return {
    gap,
    cardWidth,
    step,
    visibleCount,
    maxIndex,
    maxScroll: maxIndex * step,
  };
}

export function CarouselItem({ children, className }) {
  const { cardWidth } = useContext(CarouselLayoutContext);

  return (
    <div
      data-carousel-item
      style={{ width: cardWidth }}
      className={cn("shrink-0 snap-start snap-always", className)}
    >
      {children}
    </div>
  );
}

export default function HorizontalSnapCarousel({
  children,
  className,
  trackClassName,
  showArrows = true,
  arrowsClassName,
  prevLabel = "Previous",
  nextLabel = "Next",
  minCardWidth = 260,
  maxColumns = 4,
  onScrollStateChange,
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [layout, setLayout] = useState({
    cardWidth: minCardWidth,
    visibleCount: 1,
  });

  const itemCount = Children.count(children);

  const recalculateLayout = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const gap = readGap(el);
    const forceMobileTwoUp =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches;

    const next = computeLayout(
      el.clientWidth,
      itemCount,
      gap,
      minCardWidth,
      maxColumns,
      forceMobileTwoUp,
    );
    setLayout(next);
  }, [itemCount, minCardWidth, maxColumns]);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const metrics = getScrollMetrics(el);
    const left = el.scrollLeft > 4;
    const right = metrics
      ? el.scrollLeft < metrics.maxScroll - 4
      : el.scrollLeft < el.scrollWidth - el.clientWidth - 4;

    setCanScrollLeft(left);
    setCanScrollRight(right);
    onScrollStateChange?.({ canScrollLeft: left, canScrollRight: right, el });
  }, [onScrollStateChange]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    recalculateLayout();

    const observer = new ResizeObserver(() => {
      recalculateLayout();
      updateScrollState();
    });
    observer.observe(el);
    window.addEventListener("resize", updateScrollState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, [recalculateLayout, updateScrollState, children]);

  useEffect(() => {
    updateScrollState();
  }, [layout, updateScrollState]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const metrics = getScrollMetrics(el);
    if (!metrics) return;

    const index = Math.min(
      Math.round(el.scrollLeft / metrics.step),
      metrics.maxIndex,
    );
    el.scrollLeft = index * metrics.step;
  }, [layout.cardWidth, layout.visibleCount]);

  const scroll = useCallback((direction) => {
    scrollCarouselPage(scrollRef.current, direction);
  }, []);

  return (
    <CarouselLayoutContext.Provider value={layout}>
      <div className={cn("relative", className)}>
        {showArrows ? (
          <>
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label={prevLabel}
              className={cn(
                "absolute -left-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2.5 shadow-md transition hover:border-primary-200 disabled:cursor-not-allowed disabled:opacity-40 sm:p-3",
                !canScrollLeft && "opacity-30",
                arrowsClassName,
              )}
            >
              <ChevronLeft className="h-5 w-5 text-slate-600" />
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label={nextLabel}
              className={cn(
                "absolute -right-2 top-1/2 z-20 flex -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2.5 shadow-md transition hover:border-primary-200 disabled:cursor-not-allowed disabled:opacity-40 sm:p-3",
                !canScrollRight && "opacity-30",
                arrowsClassName,
              )}
            >
              <ChevronRight className="h-5 w-5 text-slate-600" />
            </button>
          </>
        ) : null}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className={cn(
            "hide-scrollbar flex snap-x snap-mandatory scroll-smooth gap-2.5 overflow-x-auto pb-2 pt-1 sm:gap-4 md:gap-5",
            trackClassName,
          )}
        >
          {children}
        </div>
      </div>
    </CarouselLayoutContext.Provider>
  );
}

/** Scroll by one page of fully visible cards — always lands on full-card boundaries. */
export function scrollCarouselPage(container, direction) {
  if (!container) return;

  const metrics = getScrollMetrics(container);
  if (!metrics) return;

  const { step, visibleCount, maxIndex } = metrics;
  const currentIndex = Math.round(container.scrollLeft / step);

  let targetIndex;
  if (direction === "right") {
    targetIndex = Math.min(currentIndex + visibleCount, maxIndex);
  } else {
    targetIndex = Math.max(currentIndex - visibleCount, 0);
  }

  container.scrollTo({ left: targetIndex * step, behavior: "smooth" });
}

/** Scroll carousel to a specific item index (0-based). */
export function scrollCarouselToIndex(container, index) {
  if (!container) return;

  const metrics = getScrollMetrics(container);
  if (!metrics) return;

  const targetIndex = Math.min(index, metrics.maxIndex);
  container.scrollTo({
    left: targetIndex * metrics.step,
    behavior: "smooth",
  });
}

/** Returns active item index based on scroll position. */
export function getCarouselActiveIndex(container) {
  if (!container) return 0;

  const metrics = getScrollMetrics(container);
  if (!metrics) return 0;

  return Math.round(container.scrollLeft / metrics.step);
}
