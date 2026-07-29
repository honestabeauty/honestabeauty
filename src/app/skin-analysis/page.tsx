import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { SkinPeelGrid } from "@/components/conversion/SkinPeelGrid";
import { CmsPageHero } from "@/components/CmsPageHero";
import { EditorialImage } from "@/components/EditorialImage";
import { PageContentPanels } from "@/components/PageContentPanels";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { images } from "@/data/images";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { getProcessStepsContent } from "@/lib/cms/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("skin-analysis");
  return buildPageMetadata(meta);
}

export default async function SkinAnalysisPage() {
  const [page, processContent] = await Promise.all([
    getInnerPage("skin-analysis"),
    getProcessStepsContent(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={pageBreadcrumbs("量膚定制", "/skin-analysis")} />
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={page.hero} />

          <div className="moana-about">
            <PageContentPanels panels={page.panels} />

            <EditorialImage
              {...images.treatments.peel}
              caption={images.treatments.peel.alt}
              aspect="promo"
              posterSize="sm"
              className="moana-about__brand"
            />

            <div>
              <p className="moana-section-label">
                <span className="moana-section-label__rule" aria-hidden />
                TEGODER
              </p>
              <h2 className="moana-catalog__title">四款果酸方向</h2>
              <p className="conversion-peel-grid__hint">
                撳你嘅肌膚方向，直接用 WhatsApp 問
              </p>
              <SkinPeelGrid />
            </div>

            <p className="moana-home__link-row">
              果酸療程價錢要量膚後先報價。
              <Link
                href="/journal"
                className="moana-pill-btn moana-pill-btn--ghost"
                data-cta-id="cta_skin_journal"
              >
                閱讀果酸貼文
                <span aria-hidden>→</span>
              </Link>
            </p>

            <RelatedPageLinks path="/skin-analysis" />
          </div>
        </div>
      </section>

      <ProcessSteps showCta content={processContent} />
      <BookingCTA
        title="預約量膚分析"
        whatsappMessage={whatsappMessages.skinAnalysis}
        ctaIdPrefix="cta_skin_footer"
      />
    </>
  );
}
