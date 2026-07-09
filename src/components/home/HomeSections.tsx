import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { EditorialImage } from "@/components/EditorialImage";
import { FeaturedTreatmentTeaser } from "@/components/home/FeaturedTreatmentTeaser";
import { HomePageHub } from "@/components/HomePageHub";
import { IconArrowRight } from "@/components/icons/KzIconsServer";
import { JournalMagazineGrid } from "@/components/JournalMagazineGrid";
import { WomenCareTeaser } from "@/components/WomenCareTeaser";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { ShopVideoReels } from "@/components/ShopVideoReels";
import { SkinAnalysisTeaser } from "@/components/SkinAnalysisTeaser";
import { Testimonials } from "@/components/Testimonials";
import { TreatmentFeatureSlider } from "@/components/TreatmentFeatureSlider";
import { TrustBar } from "@/components/TrustBar";
import { WellnessTeaser } from "@/components/WellnessTeaser";
import type { NarrativeChapter } from "@/data/site-content";
import type { HomeSectionId } from "@/data/home-sections";
import type { JournalPost } from "@/data/journal";
import type { Treatment } from "@/data/treatments";
import type { ShopVideo } from "@/data/shop-videos";
import type { ResolvedHomeSection } from "@/lib/cms/home-sections";

type Props = {
  sections: ResolvedHomeSection[];
  journalPosts: JournalPost[];
  featuredTreatments: Treatment[];
  shopVideos: ShopVideo[];
  narrativeChapters: NarrativeChapter[];
};

function renderSection(
  id: HomeSectionId,
  section: ResolvedHomeSection,
  data: Omit<Props, "sections">,
) {
  const { content } = section;

  switch (id) {
    case "trust-bar":
      return <TrustBar />;
    case "editorial-chapters":
      return (
        <>
          {data.narrativeChapters.map((chapter, i) => (
            <section
              key={chapter.id}
              className={`moana-home__chapter moana-home__chapter--editorial${i % 2 === 1 ? " moana-home__chapter--reverse" : ""}`}
            >
              <EditorialImage
                src={chapter.image}
                alt={chapter.imageAlt}
                caption={chapter.imageAlt}
                aspect="promo"
                posterSize="sm"
                className="moana-home__chapter-image"
              />
              <div className="moana-home__chapter-body">
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  {chapter.label}
                </p>
                <h2 className="moana-home__chapter-title">{chapter.title}</h2>
                <div className="moana-home__chapter-text">
                  {chapter.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </>
      );
    case "treatment-slider":
      return (
        <section className="moana-home__wide" id="treatments">
          <div className="container-kz">
            <TreatmentFeatureSlider treatments={data.featuredTreatments} />
          </div>
        </section>
      );
    case "skin-analysis":
      return <SkinAnalysisTeaser content={content} />;
    case "featured-treatment":
      return <FeaturedTreatmentTeaser content={content} />;
    case "women-care":
      return <WomenCareTeaser content={content} />;
    case "wellness":
      return <WellnessTeaser content={content} />;
    case "journal":
      return (
        <section className="moana-home__wide moana-home__wide--bordered">
          <div className="container-kz">
            <div className="moana-home__section-head">
              <div>
                {content.eyebrow ? (
                  <p className="moana-section-label">
                    <span className="moana-section-label__rule" aria-hidden />
                    {content.eyebrow}
                  </p>
                ) : null}
                {content.title ? (
                  <h2 className="moana-home__section-title">{content.title}</h2>
                ) : null}
                {content.sectionDesc ? (
                  <p className="moana-home__section-desc">{content.sectionDesc}</p>
                ) : null}
              </div>
              {content.linkHref && content.listLinkLabel ? (
                <Link href={content.linkHref} className="moana-pill-btn moana-pill-btn--ghost">
                  {content.listLinkLabel}
                  <IconArrowRight size={14} />
                </Link>
              ) : null}
            </div>
            <JournalMagazineGrid posts={data.journalPosts} limit={3} />
          </div>
        </section>
      );
    case "testimonials":
      return <Testimonials embedded />;
    case "shop-reels":
      return <ShopVideoReels videos={data.shopVideos} />;
    case "page-hub":
      return <HomePageHub />;
    case "booking-cta":
      return <BookingCTA />;
    default:
      return null;
  }
}

export function HomeSections({
  sections,
  journalPosts,
  featuredTreatments,
  shopVideos,
  narrativeChapters,
}: Props) {
  const data = { journalPosts, featuredTreatments, shopVideos, narrativeChapters };

  return (
    <div className="moana-home">
      {sections
        .filter((section) => section.enabled)
        .map((section, index) => (
          <RevealOnScroll key={section.id} delay={60 + (index % 4) * 20}>
            {renderSection(section.id, section, data)}
          </RevealOnScroll>
        ))}
    </div>
  );
}
