import Link from "next/link";
import { EditorialImage } from "@/components/EditorialImage";
import { SectionBodyText, resolveSectionContent, type SectionContentProps } from "@/components/home/section-content";
import { IconArrowRight } from "@/components/icons/KzIconsServer";

/** 首頁女賓護理 teaser（home-sections id: men-care，歷史 id 保留相容） */
export function WomenCareTeaser({ content }: SectionContentProps) {
  const c = resolveSectionContent("men-care", content);
  return (
    <section className="moana-home__chapter moana-home__chapter--split">
      {c.image ? (
        <EditorialImage
          src={c.image}
          alt={c.imageAlt ?? ""}
          caption={c.imageAlt}
          aspect="promo"
          posterSize="sm"
        />
      ) : null}
      <div className="moana-home__chapter-body">
        {c.eyebrow ? (
          <p className="moana-section-label">
            <span className="moana-section-label__rule" aria-hidden />
            {c.eyebrow}
          </p>
        ) : null}
        {c.title ? <h2 className="moana-home__chapter-title">{c.title}</h2> : null}
        <SectionBodyText body={c.body} highlight={c.highlight} />
        {c.linkHref && c.linkLabel ? (
          <p className="moana-home__link-row">
            <Link
              href={c.linkHref}
              className="moana-pill-btn moana-pill-btn--dark"
              data-cta-id="cta_home_women_teaser"
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

/** @deprecated 使用 WomenCareTeaser */
export const MenCareTeaser = WomenCareTeaser;
