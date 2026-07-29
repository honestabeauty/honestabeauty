import type { Metadata } from "next";
import { BookFunnel } from "@/components/conversion/BookFunnel";
import { BookingCTA } from "@/components/BookingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { MoanaPageHero } from "@/components/MoanaPageHero";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";

export const metadata: Metadata = buildPageMetadata({
  title: "預約",
  description: "預約康姿健 — 三步引導，WhatsApp、Instagram 或致電。",
  path: "/book",
});

export default function BookPage() {
  return (
    <>
      <BreadcrumbJsonLd items={pageBreadcrumbs("預約", "/book")} />
      <section className="moana-page">
        <div className="container-kz moana-page__narrow">
          <MoanaPageHero
            watermark="Book"
            eyebrow="Booking"
            title="預約方式"
            lead={
              <p>
                <strong className="text-kz-brand-pink">單次收費</strong>、
                <strong className="text-kz-sage-text">唔綁套票</strong>
                — 三步揀好意向，一鍵聯絡我哋。
              </p>
            }
          />

          <BookFunnel />
        </div>
      </section>

      <BookingCTA
        title="還未確定療程？"
        subtitle="可以先 WhatsApp 量膚分析，或者慢慢睇療程目錄同常見問題。"
        ctaIdPrefix="cta_book_footer"
      />
    </>
  );
}
