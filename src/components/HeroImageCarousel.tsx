"use client";

import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "@/data/hero";
import { EditorialImage } from "@/components/EditorialImage";
import { IconCaretLeft, IconCaretRight } from "@/components/icons/KzIcons";

const AUTO_MS = 5500;

type Props = {
  slides: HeroSlide[];
};

export function HeroImageCarousel({ slides }: Props) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (count <= 1) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  if (count <= 1) {
    const slide = slides[0];
    return (
      <EditorialImage
        src={slide.src}
        alt={slide.alt}
        priority
        aspect="auto"
        fit="cover"
        bleed
        className="editorial-hero__cover editorial-hero__cover--welcome"
        sizes="(max-width: 1023px) 100vw, 70vw"
      />
    );
  }

  return (
    <div
      className="editorial-hero__carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="editorial-hero__carousel-track editorial-hero__cover editorial-hero__cover--welcome"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Hero 輪播，共 ${count} 張`}
      >
        {slides.map((slide, i) => (
          <div
            key={`${slide.src}-${i}`}
            className={`editorial-hero__carousel-slide${i === index ? " is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <EditorialImage
              src={slide.src}
              alt={slide.alt}
              priority={i === 0}
              aspect="auto"
              fit="cover"
              bleed
              className="editorial-hero__cover editorial-hero__cover--welcome"
              sizes="(max-width: 1023px) 100vw, 70vw"
            />
          </div>
        ))}
      </div>

      <div className="editorial-hero__carousel-controls">
        <button
          type="button"
          className="editorial-hero__carousel-btn editorial-hero__carousel-btn--prev"
          aria-label="上一張主圖"
          onClick={() => goTo(index - 1)}
        >
          <IconCaretLeft size={20} />
        </button>

        <div className="editorial-hero__carousel-dots" role="tablist" aria-label="選擇 Hero 主圖">
          {slides.map((slide, i) => (
            <button
              key={`dot-${slide.src}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`第 ${i + 1} 張：${slide.alt}`}
              className={`editorial-hero__carousel-dot${i === index ? " is-active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          className="editorial-hero__carousel-btn editorial-hero__carousel-btn--next"
          aria-label="下一張主圖"
          onClick={() => goTo(index + 1)}
        >
          <IconCaretRight size={20} />
        </button>
      </div>
    </div>
  );
}
