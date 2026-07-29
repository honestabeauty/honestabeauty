import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingCTA } from "@/components/BookingCTA";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { CmsPageHero } from "@/components/CmsPageHero";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { getJournalCategories, getJournalPosts } from "@/lib/cms/queries";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";
import JournalPageClient from "./JournalPageClient";

function JournalLoading() {
  return (
    <div className="moana-about" aria-busy="true" aria-label="載入文章列表…">
      <p className="text-sm text-kz-plum-muted">載入文章列表…</p>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("journal");
  return buildPageMetadata(meta);
}

export default async function JournalPage() {
  const [posts, categories, page] = await Promise.all([
    getJournalPosts(),
    getJournalCategories(),
    getInnerPage("journal"),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={pageBreadcrumbs("醫美知識", "/journal")} />
      <section className="moana-page">
        <div className="container-kz">
          <CmsPageHero hero={page.hero} />

          <Suspense fallback={<JournalLoading />}>
            <JournalPageClient posts={posts} categories={categories} panels={page.panels} />
          </Suspense>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
