import { unstable_cache } from "next/cache";
import { faqItems as staticFaqItems } from "@/data/faq";
import {
  getJournalBody as staticGetJournalBody,
  getJournalPost as staticGetJournalPost,
  journalCategories as staticJournalCategories,
  journalPosts as staticJournalPosts,
  resolveJournalPost as staticResolveJournalPost,
  type JournalPost,
} from "@/data/journal";
import { treatmentDetails as staticTreatmentDetails } from "@/data/treatment-details";
import {
  featuredTreatments as staticFeaturedTreatments,
  getTreatment as staticGetTreatment,
  treatments as staticTreatments,
  type Treatment,
} from "@/data/treatments";
import type { TreatmentDetailContent } from "@/data/treatment-details";
import type { FaqItem } from "@/data/faq";
import { shopVideos as staticShopVideos } from "@/data/shop-videos";
import type { ShopVideo } from "@/data/shop-videos";
import { isCmsConfigured } from "@/lib/supabase/env";
import {
  createSupabasePublicClient,
  createSupabaseServerClient,
} from "@/lib/supabase/server";
import type { SiteSettingsData } from "@/lib/cms/site";
import {
  bodyParagraphsFromText,
  mapFaqRow,
  mapJournalRow,
  mapShopVideoRow,
  mapTreatmentRow,
  treatmentDetailsFromRows,
} from "./mappers";
import type {
  CmsFaqRow,
  CmsJournalRow,
  CmsMediaRow,
  CmsShopVideoRow,
  CmsTreatmentRow,
} from "./types";

const CMS_TAG = "kz-cms";

async function fetchJournalRows(): Promise<CmsJournalRow[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("kz_cms_journal_posts")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error || !data?.length) return null;
  return data as CmsJournalRow[];
}

async function fetchTreatmentRows(): Promise<CmsTreatmentRow[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("kz_cms_treatments")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return null;
  return data as CmsTreatmentRow[];
}

async function fetchShopVideoRows(): Promise<CmsShopVideoRow[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("kz_cms_shop_videos")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return null;
  return data as CmsShopVideoRow[];
}

const getCachedShopVideoRows = unstable_cache(
  fetchShopVideoRows,
  ["kz-shop-videos"],
  { tags: [CMS_TAG], revalidate: 60 },
);

async function fetchFaqRows(): Promise<CmsFaqRow[] | null> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("kz_cms_faqs")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data?.length) return null;
  return data as CmsFaqRow[];
}

const getCachedJournalRows = unstable_cache(
  fetchJournalRows,
  ["kz-cms-journal"],
  { tags: [CMS_TAG], revalidate: 60 },
);

const getCachedTreatmentRows = unstable_cache(
  fetchTreatmentRows,
  ["kz-cms-treatments"],
  { tags: [CMS_TAG], revalidate: 60 },
);

const getCachedFaqRows = unstable_cache(
  fetchFaqRows,
  ["kz-cms-faqs"],
  { tags: [CMS_TAG], revalidate: 60 },
);

function buildSlugAliasMap(rows: CmsJournalRow[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const row of rows) {
    for (const alias of row.slug_aliases ?? []) {
      if (alias && alias !== row.slug) {
        map.set(alias, row.slug);
      }
    }
    if (row.social_id && row.social_id !== row.slug) {
      map.set(row.social_id, row.slug);
    }
  }
  return map;
}

function normalizeSlugParam(param: string): string {
  try {
    return decodeURIComponent(param).normalize("NFC").trim();
  } catch {
    return param.normalize("NFC").trim();
  }
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  if (!isCmsConfigured()) return staticJournalPosts;
  const rows = await getCachedJournalRows();
  if (!rows) return staticJournalPosts;
  return rows.map(mapJournalRow);
}

export async function getJournalCategories(): Promise<string[]> {
  const posts = await getJournalPosts();
  return ["全部", ...Array.from(new Set(posts.map((p) => p.category))).sort()];
}

export async function resolveJournalPost(
  param: string,
): Promise<{ post: JournalPost; canonicalSlug: string } | null> {
  if (!isCmsConfigured()) return staticResolveJournalPost(param);

  const rows = await getCachedJournalRows();
  if (!rows) return staticResolveJournalPost(param);

  const raw = normalizeSlugParam(param);
  const posts = rows.map(mapJournalRow);
  const aliasMap = buildSlugAliasMap(rows);

  const direct = posts.find((p) => p.slug === raw || p.socialId === raw);
  if (direct) return { post: direct, canonicalSlug: direct.slug };

  const aliased = aliasMap.get(raw);
  if (aliased) {
    const post = posts.find((p) => p.slug === aliased);
    if (post) return { post, canonicalSlug: post.slug };
  }

  return null;
}

export async function getJournalPost(slug: string): Promise<JournalPost | undefined> {
  const resolved = await resolveJournalPost(slug);
  return resolved?.post;
}

export async function getJournalBody(slug: string): Promise<string[]> {
  if (!isCmsConfigured()) return staticGetJournalBody(slug);

  const rows = await getCachedJournalRows();
  if (!rows) return staticGetJournalBody(slug);

  const raw = normalizeSlugParam(slug);
  const row =
    rows.find((r) => r.slug === raw) ??
    rows.find((r) => r.social_id === raw) ??
    rows.find((r) => (r.slug_aliases ?? []).includes(raw));

  if (row?.body) return bodyParagraphsFromText(row.body);

  const resolved = await resolveJournalPost(slug);
  if (!resolved) return [];
  if (resolved.post.excerpt) return [resolved.post.excerpt];
  return [];
}

export async function getTreatments(): Promise<Treatment[]> {
  if (!isCmsConfigured()) return staticTreatments;
  const rows = await getCachedTreatmentRows();
  if (!rows) return staticTreatments;
  return rows.map(mapTreatmentRow);
}

export async function getTreatment(slug: string): Promise<Treatment | undefined> {
  if (!isCmsConfigured()) return staticGetTreatment(slug);
  const treatments = await getTreatments();
  return treatments.find((t) => t.slug === slug);
}

export async function getFeaturedTreatments(): Promise<Treatment[]> {
  const treatments = await getTreatments();
  return treatments.filter((t) => t.featured);
}

export async function getTreatmentDetails(): Promise<
  Record<string, TreatmentDetailContent>
> {
  if (!isCmsConfigured()) return staticTreatmentDetails;
  const rows = await getCachedTreatmentRows();
  if (!rows) return staticTreatmentDetails;
  return treatmentDetailsFromRows(rows);
}

export async function getTreatmentDetail(
  slug: string,
): Promise<TreatmentDetailContent | undefined> {
  const details = await getTreatmentDetails();
  const fromCms = details[slug];
  if (fromCms) {
    const hasContent =
      Boolean(fromCms.suitableFor?.trim()) ||
      (fromCms.features?.length ?? 0) > 0 ||
      (fromCms.processSteps?.length ?? 0) > 0 ||
      (fromCms.aftercare?.length ?? 0) > 0;
    if (hasContent) return fromCms;
  }
  // CMS 詳情為空時回退靜態預設，避免前台流程／術後區塊消失
  return staticTreatmentDetails[slug];
}

export async function getFaqItems(): Promise<FaqItem[]> {
  if (!isCmsConfigured()) return staticFaqItems;
  const rows = await getCachedFaqRows();
  if (!rows) return staticFaqItems;
  return rows.map(mapFaqRow);
}

export async function getShopVideos(): Promise<ShopVideo[]> {
  if (!isCmsConfigured()) return staticShopVideos;
  const rows = await getCachedShopVideoRows();
  if (!rows) return staticShopVideos;
  return rows.map(mapShopVideoRow);
}

/** For admin: use session client so RLS admin policies apply (drafts visible). */
export async function getAdminJournalPosts() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_journal_posts")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });
  return (data ?? []) as CmsJournalRow[];
}

export async function getAdminTreatments() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_treatments")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as CmsTreatmentRow[];
}

export async function getAdminFaqs() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_faqs")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as CmsFaqRow[];
}

export async function getAdminMediaList(folder?: string) {
  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("kz_cms_media")
    .select("*")
    .order("created_at", { ascending: false });
  if (folder) query = query.eq("folder", folder);
  const { data } = await query;
  return (data ?? []) as CmsMediaRow[];
}

export async function getAdminShopVideos() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_shop_videos")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data ?? []) as CmsShopVideoRow[];
}

export async function getAdminShopVideo(id: number) {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_shop_videos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data ?? null) as CmsShopVideoRow | null;
}

export async function getAdminSiteSettings(): Promise<SiteSettingsData | null> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("kz_cms_site_settings")
    .select("data")
    .eq("id", "default")
    .maybeSingle();
  if (!data?.data || typeof data.data !== "object") return null;
  return data.data as SiteSettingsData;
}

export { CMS_TAG };

// Re-export static helpers for legacy sync usage in client-only paths
export {
  staticJournalPosts as journalPostsFallback,
  staticTreatments as treatmentsFallback,
  staticFaqItems as faqItemsFallback,
  staticGetJournalPost,
  staticResolveJournalPost,
};
