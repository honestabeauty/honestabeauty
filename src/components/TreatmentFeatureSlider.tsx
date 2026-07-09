"use client";

import Link from "next/link";
import { IconArrowRight } from "@/components/icons/KzIcons";
import { PromoPoster } from "@/components/PromoPoster";
import type { Treatment } from "@/data/treatments";

type Props = {
  treatments: Treatment[];
};

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

export function TreatmentFeatureSlider({ treatments }: Props) {
  if (treatments.length === 0) return null;

  const durationSec = Math.max(treatments.length * 18, 72);

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

      <div className="moana-marquee__viewport">
        <div
          className="moana-marquee__track"
          style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
        >
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
