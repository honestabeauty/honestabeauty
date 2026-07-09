import type { Metadata } from "next";
import Link from "next/link";
import { BookingCTA } from "@/components/BookingCTA";
import { CmsPageHero } from "@/components/CmsPageHero";
import { JsonLd } from "@/components/JsonLd";
import { RelatedPageLinks } from "@/components/RelatedPageLinks";
import { getFaqItems } from "@/lib/cms/queries";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { site } from "@/data/site";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("faq");
  return buildPageMetadata(meta);
}

export default async function FAQPage() {
  const [faqItems, page] = await Promise.all([getFaqItems(), getInnerPage("faq")]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />
      <section className="moana-page">
        <div className="container-kz moana-page__narrow">
          <CmsPageHero hero={page.hero} />

          <div className="moana-faq">
            {faqItems.map((faq, i) => (
              <details key={faq.q} className="moana-faq__item">
                <summary className="moana-faq__question">
                  <span className="moana-faq__num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{faq.q}</span>
                  <span className="moana-faq__toggle" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="moana-faq__answer">
                  {faq.q === "點樣預約？" || faq.q === "如何預約？" ? (
                    <>
                      主要透過 WhatsApp 或 Instagram DM 預約，亦可使用
                      <Link
                        href="/book"
                        className="text-kz-rose no-underline hover:underline"
                        data-cta-id="cta_faq_book_link"
                      >
                        引導式預約
                      </Link>
                      頁面。
                    </>
                  ) : faq.q === "喺邊度？" || faq.q === "在哪裡？" ? (
                    site.address
                  ) : (
                    faq.a
                  )}
                </p>
              </details>
            ))}
          </div>

          <RelatedPageLinks path="/faq" />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
