import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CmsPageHero } from "@/components/CmsPageHero";
import { EditorialImage } from "@/components/EditorialImage";
import { PageContentPanels } from "@/components/PageContentPanels";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { getProcessStepsContent, getWellnessPageExtras } from "@/lib/cms/site-content";
import { site } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("wellness");
  return buildPageMetadata(meta);
}

export default async function WellnessPage() {
  const [page, extras, processContent] = await Promise.all([
    getInnerPage("wellness"),
    getWellnessPageExtras(),
    getProcessStepsContent(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={pageBreadcrumbs("痛症理療", "/wellness")} />
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={page.hero} />

          <PageContentPanels panels={page.panels} />

          <div className="moana-wellness-list">
            {extras.services.map((service, i) => (
              <article
                key={service.id}
                className={`moana-home__chapter moana-home__chapter--split moana-wellness-list__item ${i % 2 === 1 ? "moana-wellness-list__item--reverse" : ""}`}
              >
                <EditorialImage
                  src={service.image}
                  alt={service.imageAlt}
                  caption={service.imageAlt}
                  aspect="promo"
                  posterSize="sm"
                />
                <div className="moana-home__chapter-body">
                  <p className="moana-section-label">
                    <span className="moana-section-label__rule" aria-hidden />
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="moana-home__chapter-title">{service.title}</h2>
                  <div className="moana-home__chapter-text">
                    {service.body.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="moana-wellness-traditional">
            <p className="moana-section-label">
              <span className="moana-section-label__rule" aria-hidden />
              {extras.traditional.sectionLabel}
            </p>
            <h2 className="moana-home__section-title">{extras.traditional.title}</h2>
            <ul className="moana-wellness-traditional__list">
              {extras.traditional.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="moana-home__section-desc mt-6">
              {extras.traditional.footerNote} — {site.hours}，{site.location}地舖。
            </p>
            <p className="mt-6">
              <Link href="/journal" className="moana-pill-btn moana-pill-btn--ghost">
                閱讀遠紅外線相關文章
                <span aria-hidden>→</span>
              </Link>
            </p>
          </section>

          <RelatedPageLinks path="/wellness" />
        </div>
      </section>

      <ProcessSteps content={processContent} />
      <BookingCTA
        title="預約痛症理療"
        subtitle="WhatsApp 或 IG DM，講聲「痛症理療 / 遠紅外線」就得。"
      />
    </>
  );
}
