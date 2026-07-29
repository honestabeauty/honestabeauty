import { Suspense } from "react";
import type { Metadata } from "next";
import { getFeaturedTreatments, getTreatments } from "@/lib/cms/queries";
import { getInnerPage, getInnerPageMetadata } from "@/lib/cms/inner-pages";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import { pageBreadcrumbs } from "@/lib/breadcrumbs";
import TreatmentsPageClient from "./TreatmentsPageClient";

function TreatmentsLoading() {
  return (
    <div className="moana-page" aria-busy="true" aria-label="載入療程列表…">
      <div className="container-kz py-16 text-center text-sm text-kz-plum-muted">
        載入療程列表…
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getInnerPageMetadata("treatments");
  return buildPageMetadata(meta);
}

export default async function TreatmentsPage() {
  const [treatments, featuredTreatments, page] = await Promise.all([
    getTreatments(),
    getFeaturedTreatments(),
    getInnerPage("treatments"),
  ]);

  return (
    <Suspense fallback={<TreatmentsLoading />}>
      <BreadcrumbJsonLd items={pageBreadcrumbs("療程", "/treatments")} />
      <TreatmentsPageClient
        treatments={treatments}
        featuredTreatments={featuredTreatments}
        hero={page.hero}
        categoryPanels={page.panels}
      />
    </Suspense>
  );
}
