"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconArrowRight } from "@/components/icons/KzIcons";
import { PromoPoster } from "@/components/PromoPoster";
import type { Treatment } from "@/data/treatments";

type Props = {
  treatments: Treatment[];
};

/** Default auto marquee speed (px/s), content drifts left */
const MARQUEE_SPEED = 28;
/** Faster speed while hovering left/right edge zones */
const EDGE_SPEED = 72;
/** Edge zone as fraction of viewport width */
const EDGE_ZONE = 0.22;

type EdgeSide = "left" | "right" | null;

function formatPrice(t: Treatment) {
  if (t.priceType === "fixed" && t.price) return t.price;
  return "諮詢報價";
}

function TreatmentCard({
  treatment,
  index,
}: {
  treatment: Treatment;
  index: number;
}) {
  return (
    <article className="moana-slider__card">
      <Link
        href={`/treatments/${treatment.slug}`}
        className="moana-slider__link group"
      >
        {treatment.image ? (
          <PromoPoster
            src={treatment.image}
            alt={treatment.imageAlt ?? treatment.name}
            priority={index < 2}
            size="sm"
            className="moana-slider__poster"
            sizes="(max-width: 768px) 72vw, 240px"
          />
        ) : (
          <div className="promo-poster promo-poster--sm moana-slider__poster">
            <div className="promo-poster__frame promo-poster__frame--empty" aria-hidden />
          </div>
        )}
        <div className="moana-slider__caption">
          <p className="moana-slider__meta font-ui">
            <span className="moana-slider__category">{treatment.category}</span>
            <span className="moana-slider__price">{formatPrice(treatment)}</span>
          </p>
          <h3 className="moana-slider__name">{treatment.name}</h3>
          <p className="moana-slider__tagline">{treatment.tagline}</p>
          <span className="moana-slider__more font-ui">
            了解療程
            <IconArrowRight size={14} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function loopScrollLeft(el: HTMLElement) {
  const half = el.scrollWidth / 2;
  if (half <= 0) return;
  if (el.scrollLeft >= half) {
    el.scrollLeft -= half;
  } else if (el.scrollLeft < 0) {
    el.scrollLeft += half;
  }
}

export function TreatmentFeatureSlider({ treatments }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const edgeRef = useRef<EdgeSide>(null);
  const draggingRef = useRef(false);
  const [edge, setEdge] = useState<EdgeSide>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const setEdgeSide = useCallback((side: EdgeSide) => {
    edgeRef.current = side;
    setEdge(side);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (draggingRef.current) return;
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const zone = rect.width * EDGE_ZONE;
      if (x <= zone) setEdgeSide("left");
      else if (x >= rect.width - zone) setEdgeSide("right");
      else setEdgeSide(null);
    },
    [setEdgeSide],
  );

  const onPointerLeave = useCallback(() => {
    if (!draggingRef.current) setEdgeSide(null);
  }, [setEdgeSide]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || treatments.length === 0 || reduceMotion) return;

    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const delta = Math.min(ts - lastTsRef.current, 48);
      lastTsRef.current = ts;

      if (!draggingRef.current) {
        const side = edgeRef.current;
        // left edge → scroll left (prev); right edge → scroll right (next);
        // center → default auto drift to the right (content moves left)
        const speed =
          side === "left" ? -EDGE_SPEED : side === "right" ? EDGE_SPEED : MARQUEE_SPEED;
        el.scrollLeft += (speed * delta) / 1000;
        loopScrollLeft(el);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [treatments, reduceMotion]);

  if (treatments.length === 0) return null;

  const edgeClass =
    edge === "left"
      ? " is-edge-left"
      : edge === "right"
        ? " is-edge-right"
        : "";

  return (
    <section className="moana-slider moana-marquee" aria-label="精選療程">
      <div className="moana-slider__head">
        <div>
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            Featured
          </p>
          <h2 className="moana-slider__title">精選療程</h2>
        </div>
        <Link
          href="/treatments"
          className="moana-pill-btn moana-pill-btn--dark moana-slider__all"
          data-cta-id="cta_home_treatments_all"
        >
          查看全部療程
          <IconArrowRight size={14} />
        </Link>
      </div>

      <div
        ref={viewportRef}
        className={`moana-marquee__viewport moana-marquee__viewport--interactive moana-marquee__viewport--edge${edgeClass}`}
        aria-label="精選療程跑馬燈；滑鼠移到左／右邊緣可手動換向，亦可滑動"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={() => {
          draggingRef.current = true;
          setEdgeSide(null);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        <div className="moana-marquee__edge moana-marquee__edge--left" aria-hidden />
        <div className="moana-marquee__edge moana-marquee__edge--right" aria-hidden />
        <div className="moana-marquee__track moana-marquee__track--manual">
          {treatments.map((t, i) => (
            <TreatmentCard key={t.slug} treatment={t} index={i} />
          ))}
          <div className="moana-marquee__duplicate" aria-hidden="true">
            {treatments.map((t, i) => (
              <TreatmentCard
                key={`${t.slug}-dup`}
                treatment={t}
                index={i + treatments.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
