import { unstable_cache } from "next/cache";
import { site as staticSite } from "@/data/site";
import { isCmsConfigured } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/server";

const CMS_CACHE_TAG = "kz-cms";

export type HeroSlideOverride = {
  image?: string;
  imageAlt?: string;
};

export type HeroOverrides = {
  /** 輪播主圖（最多 5 張；留空則用靜態預設） */
  slides?: HeroSlideOverride[];
  image?: string;
  imageAlt?: string;
  watermark?: string;
  kicker?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine3?: string;
  railTagline1?: string;
  railTagline2?: string;
  railTagline3?: string;
  sellLabel1?: string;
  sellLabel2?: string;
  sellLabel3?: string;
  whatsappLabel?: string;
  secondaryLinkLabel?: string;
  secondaryLinkHref?: string;
  instagramLabel?: string;
  taglineAria?: string;
  taglineLine1Whisper?: string;
  taglineLine1Em?: string;
  taglineLine1Script?: string;
  taglineLine2Primary?: string;
  taglineLine2Accent?: string;
  navNum1?: string;
  navLabel1?: string;
  navHref1?: string;
  navNum2?: string;
  navLabel2?: string;
  navHref2?: string;
  navNum3?: string;
  navLabel3?: string;
  navHref3?: string;
  navNum4?: string;
  navLabel4?: string;
  navHref4?: string;
  credLabel1?: string;
  credBadge1?: string;
  credLabel2?: string;
  credBadge2?: string;
  credLabel3?: string;
  credBadge3?: string;
};

export type HomeSectionOverride = {
  enabled?: boolean;
  eyebrow?: string;
  title?: string;
  body?: string;
  highlight?: string;
  image?: string;
  imageAlt?: string;
  linkLabel?: string;
  linkHref?: string;
  secondaryLinkLabel?: string;
  secondaryLinkHref?: string;
  sectionDesc?: string;
  listLinkLabel?: string;
};

export type HomeSectionsConfig = {
  order?: string[];
  sections?: Partial<Record<string, HomeSectionOverride>>;
};

export type PageHeroOverride = {
  watermark?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  leadHighlight?: string;
  metaTitle?: string;
  metaDescription?: string;
  ctaKind?: "link" | "whatsapp" | "logo" | "none";
  ctaLabel?: string;
  ctaHref?: string;
  ctaId?: string;
  whatsappMessageKey?: "skinAnalysis" | "wellness" | "default";
  imageSrc?: string;
  imageAlt?: string;
};

export type PagePanelOverride = {
  enabled?: boolean;
  title?: string;
  body?: string;
  list?: string[];
};

export type PagePanelsConfig = {
  order?: string[];
  items?: Record<string, PagePanelOverride>;
};

export type InnerPageOverride = {
  hero?: PageHeroOverride;
  panels?: PagePanelsConfig;
};

export type InnerPagesConfig = {
  pages?: Partial<Record<string, InnerPageOverride>>;
};

export type TrustPetalOverride = {
  caption?: string;
  value?: string;
  label?: string;
  detail?: string;
  href?: string;
  ctaId?: string;
};

export type SiteContentSettings = {
  trust?: {
    petalStats?: TrustPetalOverride[];
    petalIntro1?: string;
    petalIntro2?: string;
    petalHighlights?: string[];
  };
  testimonials?: {
    order?: string[];
    items?: Record<
      string,
      { enabled?: boolean; quote?: string; author?: string; meta?: string }
    >;
  };
  processSteps?: {
    sectionLabel?: string;
    title?: string;
    steps?: Array<{ num?: string; title?: string; desc?: string }>;
  };
  narrativeChapters?: {
    order?: string[];
    items?: Record<
      string,
      {
        enabled?: boolean;
        label?: string;
        title?: string;
        body?: string;
        image?: string;
        imageAlt?: string;
      }
    >;
  };
  wellnessPage?: {
    services?: Record<
      string,
      { title?: string; body?: string; image?: string; imageAlt?: string }
    >;
    traditionalSectionLabel?: string;
    traditionalTitle?: string;
    traditionalItems?: string[];
    traditionalFooter?: string;
  };
  aboutContact?: {
    title?: string;
  };
};

export type SiteOverrides = {
  phone?: string;
  phoneTel?: string;
  hours?: string;
  address?: string;
  description?: string;
  subtitle?: string;
  instagram?: string;
  threads?: string;
  facebook?: string;
  xiaohongshu?: string;
  hero?: HeroOverrides;
  homeSections?: HomeSectionsConfig;
  innerPages?: InnerPagesConfig;
  content?: SiteContentSettings;
};

export type SiteSettingsData = SiteOverrides;

async function fetchSiteSettingsData(): Promise<SiteSettingsData | null> {
  if (!isCmsConfigured()) return null;
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from("kz_cms_site_settings")
    .select("data")
    .eq("id", "default")
    .maybeSingle();

  if (!data?.data || typeof data.data !== "object") return null;
  return data.data as SiteSettingsData;
}

const getCachedSiteSettingsData = unstable_cache(
  fetchSiteSettingsData,
  ["kz-cms-site-settings"],
  { tags: [CMS_CACHE_TAG], revalidate: 60 },
);

export async function getSiteSettingsData(): Promise<SiteSettingsData | null> {
  return getCachedSiteSettingsData();
}

export async function getSiteOverrides(): Promise<SiteOverrides | null> {
  return getSiteSettingsData();
}

/** Merged site config for server components (CMS overrides static defaults). */
export async function getSite() {
  const settings = await getSiteSettingsData();
  if (!settings) return staticSite;

  const { hero: _hero, homeSections: _homeSections, innerPages: _innerPages, content: _content, ...overrides } = settings;

  return {
    ...staticSite,
    ...overrides,
    // 本店電話與 WhatsApp 同號；CMS 更新 phoneTel 時同步 WhatsApp 連結
    whatsapp: overrides.phoneTel ?? staticSite.whatsapp,
    whatsappMessage: staticSite.whatsappMessage,
  };
}
