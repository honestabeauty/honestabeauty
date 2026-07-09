import { AdminContentEditor } from "@/app/admin/components/AdminContentEditor";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import {
  DEFAULT_NARRATIVE_CHAPTERS,
  DEFAULT_TESTIMONIALS,
  type TestimonialItem,
} from "@/data/site-content";
import type { SiteSettingsData } from "@/lib/cms/site";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";
import {
  getAboutContactContent,
  getNarrativeChapters,
  getProcessStepsContent,
  getTrustContent,
  getWellnessPageExtras,
} from "@/lib/cms/site-content";
import { getAdminSiteSettings } from "@/lib/cms/queries";

function buildAdminTestimonials(settings: SiteSettingsData | null): (TestimonialItem & {
  enabled: boolean;
})[] {
  const cfg = settings?.content?.testimonials;
  const defaultOrder = DEFAULT_TESTIMONIALS.map((t) => t.id);
  const order = cfg?.order?.length
    ? [...new Set([...cfg.order, ...defaultOrder])].filter((id) => defaultOrder.includes(id))
    : defaultOrder;
  const items = cfg?.items ?? {};
  const defaultById = Object.fromEntries(DEFAULT_TESTIMONIALS.map((t) => [t.id, t]));

  return order.map((id) => {
    const base = defaultById[id]!;
    const saved = items[id];
    return {
      id,
      quote: saved?.quote?.trim() || base.quote,
      author: saved?.author?.trim() || base.author,
      meta: saved?.meta?.trim() || base.meta,
      enabled: saved?.enabled !== false,
    };
  });
}

export default async function AdminContentPage() {
  const [settings, trust, processSteps, narrativeChapters, wellness, aboutContact, pathOptions] =
    await Promise.all([
      getAdminSiteSettings(),
      getTrustContent(),
      getProcessStepsContent(),
      getNarrativeChapters(),
      getWellnessPageExtras(),
      getAboutContactContent(),
      getCmsPathOptions(),
    ]);

  const content = settings?.content;
  const testimonials = buildAdminTestimonials(settings);

  return (
    <>
      <AdminPageHeader
        title="共用文案區塊"
        lead="首頁與內頁共用的固定文案：信任重點、評價、流程、品牌敘事、痛症服務等。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "共用文案區塊" },
        ]}
        relatedLinks={[
          { label: "痛症頁標題與 SEO", href: "/admin/pages?page=wellness" },
          { label: "首頁主視覺", href: "/admin/hero" },
        ]}
        previewHref="/"
        guideHref="/admin/guide#site-content"
      />
      <AdminContentEditor
        trust={trust}
        testimonials={testimonials}
        processSteps={processSteps}
        narrativeChapters={
          narrativeChapters.length > 0 ? narrativeChapters : DEFAULT_NARRATIVE_CHAPTERS
        }
        wellnessServices={wellness.services}
        wellnessTraditional={wellness.traditional}
        aboutContact={aboutContact}
        overrides={{
          trust: Boolean(content?.trust),
          testimonials: Boolean(content?.testimonials),
          process: Boolean(content?.processSteps),
          narrative: Boolean(content?.narrativeChapters),
          wellness: Boolean(content?.wellnessPage),
          aboutContact: Boolean(content?.aboutContact),
        }}
        pathOptions={pathOptions}
      />
    </>
  );
}
