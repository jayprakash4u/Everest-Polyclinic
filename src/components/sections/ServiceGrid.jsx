"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import ServiceCard from "./ServiceCard";

/**
 * Owns the "which card looks hovered" state for the whole grid, so that
 * look isn't purely `:hover`-driven any more.
 *
 * Three rules: the first card starts active, so a visitor sees the pattern
 * before they've touched anything. Moving the pointer onto another card
 * hands the active state to it. And there's no "unhover" — leaving a card
 * without entering another one leaves that card active rather than
 * resetting to none, so whichever card someone looked at last is the one
 * still lit when they scroll away. `activeIndex` only ever moves forward to
 * whatever was entered; nothing here ever sets it back to null.
 */
export default function ServiceGrid({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Reveal
      as="div"
      stagger
      className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
    >
      {items.map((service, index) => (
        <ServiceCard
          key={service.slug}
          service={service}
          isActive={index === activeIndex}
          onActivate={() => setActiveIndex(index)}
        />
      ))}
    </Reveal>
  );
}
