import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { TelCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { BusinessHours } from "@/components/BusinessHours";
import { CmsPageHero } from "@/components/CmsPageHero";
import { EditorialImage } from "@/components/EditorialImage";
import { EditorialPetalStats } from "@/components/EditorialPetalStats";
import { LocationMap } from "@/components/LocationMap";
import { PageContentPanels } from "@/components/PageContentPanels";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { images } from "@/data/images";
import { site } from "@/data/site";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { getAboutContactContent, getTrustContent } from "@/lib/cms/site-content";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("about");
  return buildPageMetadata({
    title: meta.title,
    description: meta.description || site.description,
    path: meta.path,
  });
}

export default async function AboutPage() {
  const [page, trust, contact] = await Promise.all([
    getInnerPage("about"),
    getTrustContent(),
    getAboutContactContent(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={pageBreadcrumbs("關於", "/about")} />
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={page.hero} />

          <EditorialPetalStats
            items={trust.petalStats}
            eyebrow="Trust"
            intro={trust.petalIntro}
            highlights={trust.petalHighlights}
          />

          <div className="moana-about">
            <div className="moana-about__visuals">
              <EditorialImage
                {...images.studio.brandPoster}
                aspect="portrait"
                posterSize="sm"
                className="moana-about__brand"
              />
              <EditorialImage
                {...images.studio.interior}
                aspect="promo"
                className="moana-about__image"
              />
            </div>

            <div className="moana-about__intro">
              <p className="moana-section-label">
                <span className="moana-section-label__rule" aria-hidden />
                Studio
              </p>
              <p className="moana-about__services">{site.subtitle}</p>
              <p className="moana-about__lead">{site.description}</p>
            </div>

            <PageContentPanels panels={page.panels} className="" />

            <div className="moana-panel moana-panel--contact">
              <h2 className="moana-panel__title">{contact.title}</h2>
              <dl className="moana-contact">
                <div>
                  <dt>電話</dt>
                  <dd>
                    <TelCta
                      ctaId="cta_about_phone"
                      className="moana-pill-btn moana-pill-btn--ghost"
                    >
                      {site.phone}
                    </TelCta>
                  </dd>
                </div>
                <div>
                  <dt>地址</dt>
                  <dd>{site.address}</dd>
                </div>
                <div>
                  <dt>預約</dt>
                  <dd className="moana-contact__actions">
                    <WhatsAppCta
                      ctaId="cta_whatsapp_about"
                      className="moana-pill-btn moana-pill-btn--dark"
                    >
                      WhatsApp
                      <span aria-hidden>→</span>
                    </WhatsAppCta>
                    <Link
                      href="/book"
                      className="moana-pill-btn"
                      data-cta-id="cta_about_book_funnel"
                    >
                      引導式預約
                      <span aria-hidden>→</span>
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt>營業</dt>
                  <dd>{site.hours}</dd>
                </div>
              </dl>
            </div>

            <div className="moana-about__extras">
              <BusinessHours />
              <LocationMap />
            </div>

            <RelatedPageLinks path="/about" title="探索其他頁面" />
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
