import Link from "next/link";
import { PromoPoster } from "@/components/PromoPoster";
import { resolveSectionContent, type SectionContentProps } from "@/components/home/section-content";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { promo } from "@/data/promo-images";

const wellnessItems = [promo.drRainbow, promo.wellnessDetox, promo.drFace] as const;

export function WellnessTeaser({ content }: SectionContentProps) {
  const c = resolveSectionContent("wellness", content);
  return (
    <section className="moana-home__chapter moana-home__chapter--split moana-home__chapter--reverse moana-home__chapter--wellness">
      <div className="moana-wellness-teaser__posters">
        {wellnessItems.map((item) => (
          <PromoPoster
            key={item.src}
            src={item.src}
            alt={item.alt}
            size="sm"
            sizes="(max-width: 768px) 28vw, 120px"
          />
        ))}
      </div>
      <div className="moana-home__chapter-body">
        {c.eyebrow ? (
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            {c.eyebrow}
          </p>
        ) : null}
        {c.title ? <h2 className="moana-home__chapter-title">{c.title}</h2> : null}
        {c.body ? (
          <p className="moana-home__chapter-text moana-home__chapter-text--single">{c.body}</p>
        ) : null}
        {c.linkHref && c.linkLabel ? (
          <p className="moana-home__link-row">
            <Link
              href={c.linkHref}
              className="moana-pill-btn moana-pill-btn--dark"
              data-cta-id="cta_home_wellness_teaser"
            >
              {c.linkLabel}
              <IconArrowRight size={14} />
            </Link>
          </p>
        ) : null}
      </div>
    </section>
  );
}
