import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { CmsPageHero } from "@/components/CmsPageHero";
import { PageContentPanels } from "@/components/PageContentPanels";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { TreatmentMagazineGrid } from "@/components/TreatmentMagazineGrid";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { getMenTreatments } from "@/lib/cms/queries";
import { getProcessStepsContent } from "@/lib/cms/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { whatsappMessages } from "@/lib/whatsapp-messages";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("men");
  return buildPageMetadata(meta);
}

export default async function MenPage() {
  const [page, menTreatments, processContent] = await Promise.all([
    getInnerPage("men"),
    getMenTreatments(),
    getProcessStepsContent(),
  ]);

  return (
    <>
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={page.hero} />

          <PageContentPanels panels={page.panels} />

          <div className="moana-catalog">
            <div className="moana-catalog__head">
              <div>
                <p className="moana-section-label">
                  <span className="moana-section-label__rule" aria-hidden />
                  Treatments
                </p>
                <h2 className="moana-catalog__title">男賓療程（只限預約）</h2>
                <p className="moana-catalog__desc">
                  以下療程須先預約確認；價格需諮詢報價，請透過 WhatsApp 或 IG 查詢。
                </p>
              </div>
            </div>
            <TreatmentMagazineGrid treatments={menTreatments} />
          </div>

          <RelatedPageLinks path="/men" />
        </div>
      </section>

      <ProcessSteps content={processContent} />
      <BookingCTA
        title="預約男賓護理（只限預約）"
        subtitle="WhatsApp 或 IG DM 預約，講聲想約男賓護理就得。"
        whatsappMessage={whatsappMessages.menBooking}
        ctaIdPrefix="cta_men_booking"
      />
    </>
  );
}
