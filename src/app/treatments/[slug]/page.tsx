import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookingCTA } from "@/components/BookingCTA";
import { InstagramCta, WhatsAppCta } from "@/components/conversion/CtaLinks";
import { EditorialImage } from "@/components/EditorialImage";
import { JsonLd } from "@/components/JsonLd";
import {
  getTreatment,
  getTreatmentDetail,
  getTreatments,
} from "@/lib/cms/queries";
import { getSite } from "@/lib/cms/site";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { whatsappMessages } from "@/lib/whatsapp-messages";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const treatments = await getTreatments();
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return { title: "療程" };
  const meta = buildPageMetadata({
    title: treatment.name,
    description: treatment.tagline,
    path: `/treatments/${slug}`,
    image: treatment.image,
  });
  return meta;
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) notFound();

  const [details, site] = await Promise.all([
    getTreatmentDetail(slug),
    getSite(),
  ]);
  const bookMessage = whatsappMessages.treatment(treatment.name);
  const siteUrl = getSiteUrl();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: treatment.name,
          description: treatment.tagline,
          url: `${siteUrl}/treatments/${slug}`,
          image: treatment.image
            ? treatment.image.startsWith("http")
              ? treatment.image
              : `${siteUrl}${treatment.image}`
            : undefined,
          provider: {
            "@type": "BeautySalon",
            "@id": `${siteUrl}/#business`,
            name: site.name,
          },
          areaServed: {
            "@type": "City",
            name: "屯門",
          },
          offers: treatment.priceType === "fixed" && treatment.price
            ? {
                "@type": "Offer",
                priceCurrency: "HKD",
                price: treatment.price.replace(/[^\d.]/g, ""),
                availability: "https://schema.org/InStock",
              }
            : {
                "@type": "Offer",
                priceCurrency: "HKD",
                description: treatment.priceNote ?? "諮詢報價",
              },
        }}
      />
      <section className="moana-page">
        <div className="container-kz max-w-2xl">
          <Link
            href="/treatments"
            className="font-ui text-sm text-kz-rose-strong no-underline hover:underline"
            data-cta-id="cta_treatment_back"
          >
            ← 返回療程
          </Link>
          <div className="mt-6 flex flex-wrap gap-2">
            {treatment.problems.map((p) => (
              <span key={p} className="tag-kz">
                {p}
              </span>
            ))}
            <span className="tag-kz !bg-kz-blush/40">{treatment.category}</span>
          </div>
          <h1 className="mt-6 font-serif text-3xl font-semibold text-kz-plum md:text-4xl">
            {treatment.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-kz-plum-muted">
            {treatment.tagline}
          </p>

          <div className="conversion-treatment-hero-cta mt-6">
            <WhatsAppCta
              ctaId="cta_whatsapp_treatment_detail_hero"
              message={bookMessage}
              className="moana-pill-btn moana-pill-btn--dark"
            >
              WhatsApp 預約此療程
              <span aria-hidden>→</span>
            </WhatsAppCta>
            <InstagramCta
              ctaId="cta_instagram_treatment_detail"
              className="moana-pill-btn"
            >
              Instagram DM
            </InstagramCta>
          </div>

          <div className="mt-6 rounded-2xl border border-kz-lilac bg-white/80 p-6">
            {treatment.priceType === "fixed" ? (
              <p className="price-fixed text-2xl">
                {treatment.price}{" "}
                <span className="text-base font-normal text-kz-plum-muted">/ 單次</span>
              </p>
            ) : (
              <p className="price-consult text-lg">諮詢報價 · 量膚分析後建議</p>
            )}
            {treatment.priceNote && (
              <p className="mt-2 text-sm text-kz-plum-muted">{treatment.priceNote}</p>
            )}
          </div>
        </div>
      </section>

      <section className="section-kz">
        <div className="container-kz max-w-2xl space-y-10">
          {treatment.image && (
            <EditorialImage
              src={treatment.image}
              alt={treatment.imageAlt ?? treatment.name}
              aspect="promo"
              posterSize="lg"
              sizes="(max-width: 768px) 92vw, 416px"
            />
          )}
          <div>
            <h2 className="font-serif text-xl font-semibold text-kz-plum">適合對象</h2>
            <p className="mt-3 text-sm leading-relaxed text-kz-plum-muted">
              {details?.suitableFor ??
                `針對 ${treatment.problems.join("、")} 等肌膚問題。建議先進行量膚分析，由專業人員評估是否適合。`}
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-kz-plum">療程特色</h2>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-kz-plum-muted">
              {(details?.features ?? [
                "單次收費，不綁套票",
                "量膚定制，對症建議",
                "醫美級儀器，專業操作",
              ]).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          {details?.processSteps && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-kz-plum">療程流程</h2>
              <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-kz-plum-muted">
                {details.processSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          )}
          {details?.aftercare && (
            <div>
              <h2 className="font-serif text-xl font-semibold text-kz-plum">療程後護理</h2>
              <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-kz-plum-muted">
                {details.aftercare.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {details?.notes && (
            <div className="rounded-2xl border border-kz-lilac/80 bg-kz-lilac/20 p-5">
              <h2 className="font-serif text-lg font-semibold text-kz-plum">注意事項</h2>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-kz-plum-muted">
                {details.notes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="conversion-treatment-hero-cta">
            <WhatsAppCta
              ctaId="cta_whatsapp_treatment_detail_footer"
              message={bookMessage}
              className="moana-pill-btn moana-pill-btn--dark"
            >
              WhatsApp 預約此療程
              <span aria-hidden>→</span>
            </WhatsAppCta>
            <Link
              href="/skin-analysis"
              className="moana-pill-btn moana-pill-btn--ghost"
              data-cta-id="cta_treatment_skin_analysis"
            >
              先了解量膚分析
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <BookingCTA
        title="還有其他肌膚問題？"
        subtitle="預約量膚分析，我們會按你的膚況建議最適合的療程組合。"
        whatsappMessage={whatsappMessages.skinAnalysis}
        ctaIdPrefix="cta_treatment_detail_booking"
      />
    </>
  );
}
