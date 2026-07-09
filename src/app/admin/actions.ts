"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { HOME_SECTION_IDS, HOME_SECTION_REGISTRY } from "@/data/home-sections";
import { DEFAULT_NARRATIVE_CHAPTERS, DEFAULT_TESTIMONIALS, DEFAULT_WELLNESS_SERVICES } from "@/data/site-content";
import { INNER_PAGE_IDS } from "@/data/inner-pages";
import { CMS_TAG } from "@/lib/cms/queries";
import type { HeroOverrides, HomeSectionsConfig, InnerPagesConfig, PagePanelOverride, SiteContentSettings, SiteSettingsData } from "@/lib/cms/site";
import { uniqueSlug } from "@/lib/cms/slug";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCmsConfigured } from "@/lib/supabase/env";
import { isCmsAdminUser } from "@/lib/cms/admin";
import { suggestMediaAlt } from "@/lib/media-alt";

type RequireAdminOptions = {
  /** 表單送出失敗時導向登入；內嵌上傳／媒體庫應設 false 以免整頁跳轉 */
  redirectOnFail?: boolean;
};

async function requireAdmin(options: RequireAdminOptions = {}) {
  const { redirectOnFail = true } = options;

  if (!isCmsConfigured()) {
    throw new Error("CMS 未設定 Supabase 環境變數");
  }
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    if (redirectOnFail) redirect("/admin/login");
    throw new Error("請先登入後台");
  }

  const isAdmin = await isCmsAdminUser(supabase, user.id);

  if (!isAdmin) {
    if (redirectOnFail) redirect("/admin/login?error=unauthorized");
    throw new Error("此帳戶未獲 CMS 管理權限");
  }

  return { supabase, user };
}

function revalidateCms() {
  revalidateTag(CMS_TAG, "max");
  revalidatePath("/", "layout");
}

const CONTENT_MODULE_IDS = [
  "trust",
  "testimonials",
  "process",
  "narrative",
  "wellness",
  "aboutContact",
] as const;

type ContentModuleId = (typeof CONTENT_MODULE_IDS)[number];

function redirectAdminSaved(adminPath: string, previewPath: string) {
  redirect(`${adminPath}?saved=1&preview=${encodeURIComponent(previewPath)}`);
}

function parseLines(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseJsonOrderField(raw: FormDataEntryValue | null, fallback: string[]): string[] {
  const text = String(raw ?? "").trim();
  if (!text) return fallback;
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) return fallback;
    const ids = parsed.filter((id): id is string => typeof id === "string");
    return ids.length > 0 ? ids : fallback;
  } catch {
    return fallback;
  }
}

function optionalField(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

async function readSiteSettingsData(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
): Promise<SiteSettingsData> {
  const { data } = await supabase
    .from("kz_cms_site_settings")
    .select("data")
    .eq("id", "default")
    .maybeSingle();

  if (!data?.data || typeof data.data !== "object") return {};
  return data.data as SiteSettingsData;
}

async function writeSiteSettingsData(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  settings: SiteSettingsData,
) {
  const { error } = await supabase.from("kz_cms_site_settings").upsert({
    id: "default",
    data: settings,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^\w.\-()\u4e00-\u9fff]/g, "_").slice(0, 120);
}

type MediaUploadResult = {
  id: string;
  publicUrl: string;
  alt: string;
  filename: string;
};

async function persistMediaUpload(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  file: File,
  folder: string,
  alt: string,
): Promise<MediaUploadResult> {
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("檔案超過 10MB 上限");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("只支援圖片格式");
  }

  const rawBytes = Buffer.from(await file.arrayBuffer());
  const { optimizeImageUpload } = await import("@/lib/media-optimize");
  const optimized = await optimizeImageUpload(file, rawBytes);
  const uploadPath = `${folder}/${Date.now()}-${sanitizeFilename(optimized.filename)}`;

  const { error: uploadError } = await supabase.storage
    .from("kz-cms")
    .upload(uploadPath, optimized.buffer, {
      contentType: optimized.mimeType,
      upsert: false,
    });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage
    .from("kz-cms")
    .getPublicUrl(uploadPath);

  const resolvedAlt = alt || suggestMediaAlt(optimized.filename, folder);

  const { data: row, error: dbError } = await supabase
    .from("kz_cms_media")
    .insert({
      storage_path: uploadPath,
      public_url: urlData.publicUrl,
      filename: optimized.filename,
      alt: resolvedAlt,
      folder,
      mime_type: optimized.mimeType,
      size_bytes: optimized.sizeBytes,
    })
    .select("id")
    .single();

  if (dbError) {
    await supabase.storage.from("kz-cms").remove([uploadPath]);
    throw new Error(dbError.message);
  }

  return {
    id: row.id,
    publicUrl: urlData.publicUrl,
    alt: resolvedAlt,
    filename: optimized.filename,
  };
}

export async function fetchAdminMediaAction() {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const { data, error } = await supabase
    .from("kz_cms_media")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(120);

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function uploadMediaInlineAction(
  formData: FormData,
): Promise<MediaUploadResult> {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("請選擇檔案");
  }

  const folder = String(formData.get("folder") ?? "general").trim() || "general";
  const altInput = String(formData.get("alt") ?? "").trim();
  const alt = altInput || suggestMediaAlt(file.name, folder);

  const result = await persistMediaUpload(supabase, file, folder, alt);
  revalidateCms();
  return result;
}


export async function saveJournalPost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const category = String(formData.get("category") ?? "醫美知識").trim();
  const publishedAt = String(formData.get("published_at") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const imageAlt = String(formData.get("image_alt") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";

  const { error } = await supabase.from("kz_cms_journal_posts").upsert({
    slug,
    title,
    excerpt,
    body,
    category,
    published_at: publishedAt || new Date().toISOString().slice(0, 10),
    image,
    image_alt: imageAlt,
    status,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/journal");
}

export async function createJournalPost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("請填寫標題");

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || uniqueSlug(title);
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const category = String(formData.get("category") ?? "醫美知識").trim();
  const publishedAt = String(formData.get("published_at") ?? "").trim();
  const image = String(formData.get("image") ?? "").trim() || null;
  const imageAlt = String(formData.get("image_alt") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";

  const { error } = await supabase.from("kz_cms_journal_posts").insert({
    slug,
    title,
    excerpt,
    body,
    category,
    published_at: publishedAt || new Date().toISOString().slice(0, 10),
    image,
    image_alt: imageAlt,
    slug_aliases: [],
    status,
    sort_order: 0,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect(`/admin/journal/${slug}`);
}

export async function deleteJournalPostAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("Missing slug");
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("kz_cms_journal_posts")
    .delete()
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/journal");
}

export async function saveTreatment(formData: FormData) {
  const { supabase } = await requireAdmin();
  const slug = String(formData.get("slug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const priceType = String(formData.get("price_type") ?? "consult") as
    | "fixed"
    | "consult";
  const price = String(formData.get("price") ?? "").trim() || null;
  const priceNote = String(formData.get("price_note") ?? "").trim() || null;
  const image = String(formData.get("image") ?? "").trim() || null;
  const imageAlt = String(formData.get("image_alt") ?? "").trim() || null;
  const featured = formData.get("featured") === "on";
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const problems = String(formData.get("problems") ?? "")
    .split(/[,，、]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const suitableFor = String(formData.get("suitable_for") ?? "").trim();
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const processSteps = String(formData.get("process_steps") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const aftercare = String(formData.get("aftercare") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";

  const details = {
    suitableFor,
    features,
    processSteps,
    aftercare,
  };

  const { error } = await supabase.from("kz_cms_treatments").upsert({
    slug,
    name,
    tagline,
    category,
    price_type: priceType,
    price,
    price_note: priceNote,
    image,
    image_alt: imageAlt,
    featured,
    for_men: false,
    sort_order: sortOrder,
    problems,
    details,
    status,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/treatments");
}

export async function createTreatment(formData: FormData) {
  const { supabase } = await requireAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) throw new Error("請填寫名稱");

  const slugInput = String(formData.get("slug") ?? "").trim();
  const slug = slugInput || uniqueSlug(name);
  const tagline = String(formData.get("tagline") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const priceType = String(formData.get("price_type") ?? "consult") as
    | "fixed"
    | "consult";
  const price = String(formData.get("price") ?? "").trim() || null;
  const priceNote = String(formData.get("price_note") ?? "").trim() || null;
  const image = String(formData.get("image") ?? "").trim() || null;
  const imageAlt = String(formData.get("image_alt") ?? "").trim() || null;
  const featured = formData.get("featured") === "on";
  const problems = String(formData.get("problems") ?? "")
    .split(/[,，、]/)
    .map((p) => p.trim())
    .filter(Boolean);
  const suitableFor = String(formData.get("suitable_for") ?? "").trim();
  const features = String(formData.get("features") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const processSteps = String(formData.get("process_steps") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const aftercare = String(formData.get("aftercare") ?? "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const status = String(formData.get("status") ?? "draft") as
    | "draft"
    | "published";

  const { data: maxRow } = await supabase
    .from("kz_cms_treatments")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error } = await supabase.from("kz_cms_treatments").insert({
    slug,
    name,
    tagline,
    category,
    price_type: priceType,
    price,
    price_note: priceNote,
    image,
    image_alt: imageAlt,
    featured,
    for_men: false,
    sort_order: (maxRow?.sort_order ?? 0) + 1,
    problems,
    details: { suitableFor, features, processSteps, aftercare },
    status,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect(`/admin/treatments/${slug}`);
}

export async function deleteTreatmentAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "").trim();
  if (!slug) throw new Error("Missing slug");
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("kz_cms_treatments")
    .delete()
    .eq("slug", slug);
  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/treatments");
}

export async function saveFaq(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "").trim() || undefined;
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";

  const payload = {
    question,
    answer,
    sort_order: sortOrder,
    status,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from("kz_cms_faqs").update(payload).eq("id", id)
    : await supabase.from("kz_cms_faqs").insert(payload);

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/faq");
}

export async function deleteFaqAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing FAQ id");
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("kz_cms_faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/faq");
}

export type MediaUploadFormState = {
  ok: boolean;
  error: string;
};

export async function uploadMediaFormAction(
  _prev: MediaUploadFormState,
  formData: FormData,
): Promise<MediaUploadFormState> {
  try {
    await uploadMediaInlineAction(formData);
    revalidatePath("/admin/media");
    return { ok: true, error: "" };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "上傳失敗",
    };
  }
}

export async function uploadMediaAction(formData: FormData) {
  const result = await uploadMediaFormAction({ ok: false, error: "" }, formData);
  if (!result.ok) {
    throw new Error(result.error || "上傳失敗");
  }
  redirect("/admin/media");
}

export async function deleteMediaAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) throw new Error("Missing media id");
  const { supabase } = await requireAdmin();

  const { data: row } = await supabase
    .from("kz_cms_media")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  if (row?.storage_path) {
    await supabase.storage.from("kz-cms").remove([row.storage_path]);
  }

  const { error } = await supabase.from("kz_cms_media").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/media");
}

export async function saveShopVideo(formData: FormData) {
  const { supabase } = await requireAdmin();
  const idRaw = String(formData.get("id") ?? "").trim();
  let id = idRaw ? Number(idRaw) : 0;

  if (!id) {
    const { data: maxRow } = await supabase
      .from("kz_cms_shop_videos")
      .select("id")
      .order("id", { ascending: false })
      .limit(1)
      .maybeSingle();
    id = (maxRow?.id ?? 0) + 1;
  }

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category") ?? "日常").trim();
  const durationSec = Number(formData.get("duration_sec") ?? 0);
  const poster = String(formData.get("poster") ?? "").trim();
  const src = String(formData.get("src") ?? "").trim();
  const relatedHref =
    String(formData.get("related_href") ?? "").trim() || null;
  const sortOrder = Number(formData.get("sort_order") ?? id);
  const status = String(formData.get("status") ?? "published") as
    | "draft"
    | "published";

  if (!title || !poster || !src) {
    throw new Error("標題、封面與影片路徑為必填");
  }

  const { error } = await supabase.from("kz_cms_shop_videos").upsert({
    id,
    title,
    excerpt,
    category,
    duration_sec: durationSec,
    poster,
    src,
    related_href: relatedHref,
    sort_order: sortOrder,
    status,
    updated_at: new Date().toISOString(),
  });

  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/videos");
}

export async function deleteShopVideoAction(formData: FormData) {
  const id = Number(formData.get("id") ?? 0);
  if (!id) throw new Error("Missing video id");
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("kz_cms_shop_videos")
    .delete()
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidateCms();
  redirect("/admin/videos");
}

export async function saveSiteSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);

  const data: SiteSettingsData = {
    ...existing,
    phone: String(formData.get("phone") ?? "").trim(),
    phoneTel: String(formData.get("phone_tel") ?? "").trim(),
    hours: String(formData.get("hours") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    subtitle: String(formData.get("subtitle") ?? "").trim(),
    instagram: String(formData.get("instagram") ?? "").trim(),
    threads: String(formData.get("threads") ?? "").trim(),
    facebook: String(formData.get("facebook") ?? "").trim(),
    xiaohongshu: String(formData.get("xiaohongshu") ?? "").trim(),
  };

  await writeSiteSettingsData(supabase, data);
  revalidateCms();
  redirectAdminSaved("/admin/site", "/");
}

export async function saveHeroSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);

  const slides: NonNullable<HeroOverrides["slides"]> = [];
  for (let i = 1; i <= 5; i++) {
    const image = String(formData.get(`slide_${i}_image`) ?? "").trim();
    if (!image) continue;
    slides.push({
      image,
      imageAlt: String(formData.get(`slide_${i}_alt`) ?? "").trim(),
    });
  }

  const hero: HeroOverrides = {
    slides: slides.length > 0 ? slides : undefined,
    image: slides[0]?.image ?? String(formData.get("slide_1_image") ?? "").trim(),
    imageAlt: slides[0]?.imageAlt ?? String(formData.get("slide_1_alt") ?? "").trim(),
    watermark: String(formData.get("watermark") ?? "").trim(),
    kicker: String(formData.get("kicker") ?? "").trim(),
    titleLine1: String(formData.get("title_line_1") ?? "").trim(),
    titleLine2: String(formData.get("title_line_2") ?? "").trim(),
    titleLine3: String(formData.get("title_line_3") ?? "").trim(),
    railTagline1: String(formData.get("rail_tagline_1") ?? "").trim(),
    railTagline2: String(formData.get("rail_tagline_2") ?? "").trim(),
    railTagline3: String(formData.get("rail_tagline_3") ?? "").trim(),
    sellLabel1: String(formData.get("sell_label_1") ?? "").trim(),
    sellLabel2: String(formData.get("sell_label_2") ?? "").trim(),
    sellLabel3: String(formData.get("sell_label_3") ?? "").trim(),
    whatsappLabel: String(formData.get("whatsapp_label") ?? "").trim(),
    secondaryLinkLabel: String(formData.get("secondary_link_label") ?? "").trim(),
    secondaryLinkHref: String(formData.get("secondary_link_href") ?? "").trim(),
    instagramLabel: String(formData.get("instagram_label") ?? "").trim(),
    taglineAria: String(formData.get("tagline_aria") ?? "").trim(),
    taglineLine1Whisper: String(formData.get("tagline_line1_whisper") ?? "").trim(),
    taglineLine1Em: String(formData.get("tagline_line1_em") ?? "").trim(),
    taglineLine1Script: String(formData.get("tagline_line1_script") ?? "").trim(),
    taglineLine2Primary: String(formData.get("tagline_line2_primary") ?? "").trim(),
    taglineLine2Accent: String(formData.get("tagline_line2_accent") ?? "").trim(),
    navNum1: String(formData.get("nav_num_1") ?? "").trim(),
    navLabel1: String(formData.get("nav_label_1") ?? "").trim(),
    navHref1: String(formData.get("nav_href_1") ?? "").trim(),
    navNum2: String(formData.get("nav_num_2") ?? "").trim(),
    navLabel2: String(formData.get("nav_label_2") ?? "").trim(),
    navHref2: String(formData.get("nav_href_2") ?? "").trim(),
    navNum3: String(formData.get("nav_num_3") ?? "").trim(),
    navLabel3: String(formData.get("nav_label_3") ?? "").trim(),
    navHref3: String(formData.get("nav_href_3") ?? "").trim(),
    navNum4: String(formData.get("nav_num_4") ?? "").trim(),
    navLabel4: String(formData.get("nav_label_4") ?? "").trim(),
    navHref4: String(formData.get("nav_href_4") ?? "").trim(),
    credLabel1: String(formData.get("cred_label_1") ?? "").trim(),
    credBadge1: String(formData.get("cred_badge_1") ?? "").trim(),
    credLabel2: String(formData.get("cred_label_2") ?? "").trim(),
    credBadge2: String(formData.get("cred_badge_2") ?? "").trim(),
    credLabel3: String(formData.get("cred_label_3") ?? "").trim(),
    credBadge3: String(formData.get("cred_badge_3") ?? "").trim(),
  };

  await writeSiteSettingsData(supabase, { ...existing, hero });
  revalidateCms();
  redirectAdminSaved("/admin/hero", "/");
}

async function applySortOrderUpdates(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  table:
    | "kz_cms_faqs"
    | "kz_cms_shop_videos"
    | "kz_cms_treatments"
    | "kz_cms_journal_posts",
  idField: "id" | "slug",
  ids: string[],
  parseId: (raw: string) => string | number,
) {
  await Promise.all(
    ids.map(async (rawId, index) => {
      const { error } = await supabase
        .from(table)
        .update({ sort_order: index })
        .eq(idField, parseId(rawId));
      if (error) throw new Error(error.message);
    }),
  );
}

function parseReorderIds(formData: FormData): string[] {
  const raw = String(formData.get("ids") ?? "").trim();
  if (!raw) throw new Error("缺少排序資料");
  try {
    const ids = JSON.parse(raw) as string[];
    if (!Array.isArray(ids) || ids.length === 0) throw new Error("排序資料為空");
    return ids;
  } catch {
    throw new Error("排序資料格式錯誤");
  }
}

export async function reorderFaqAction(formData: FormData) {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const ids = parseReorderIds(formData);
  await applySortOrderUpdates(supabase, "kz_cms_faqs", "id", ids, Number);
  revalidateCms();
  revalidatePath("/admin/faq");
}

export async function reorderShopVideosAction(formData: FormData) {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const ids = parseReorderIds(formData);
  await applySortOrderUpdates(supabase, "kz_cms_shop_videos", "id", ids, Number);
  revalidateCms();
  revalidatePath("/admin/videos");
}

export async function reorderTreatmentsAction(formData: FormData) {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const ids = parseReorderIds(formData);
  await applySortOrderUpdates(supabase, "kz_cms_treatments", "slug", ids, (s) => s);
  revalidateCms();
  revalidatePath("/admin/treatments");
}

export async function reorderJournalAction(formData: FormData) {
  const { supabase } = await requireAdmin({ redirectOnFail: false });
  const ids = parseReorderIds(formData);
  await applySortOrderUpdates(supabase, "kz_cms_journal_posts", "slug", ids, (s) => s);
  revalidateCms();
  revalidatePath("/admin/journal");
}

export async function saveHomeSectionsSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);

  const orderRaw = String(formData.get("order") ?? "").trim();
  let order: string[] = [];
  try {
    const parsed = JSON.parse(orderRaw) as unknown;
    if (Array.isArray(parsed)) {
      order = parsed.filter((id): id is string => typeof id === "string");
    }
  } catch {
    order = [...HOME_SECTION_IDS];
  }

  const sections: NonNullable<HomeSectionsConfig["sections"]> = {};
  const existingSections = existing.homeSections?.sections ?? {};

  for (const id of HOME_SECTION_IDS) {
    const def = HOME_SECTION_REGISTRY[id];
    const enabled = formData.get(`section_${id}_enabled`) === "1";
    const prev = existingSections[id];
    const override: (typeof sections)[string] = { enabled };

    for (const field of def.editableFields) {
      const raw = formData.get(`section_${id}_${field}`);
      if (raw !== null) {
        const value = String(raw).trim();
        if (value) {
          (override as Record<string, string | boolean>)[field] = value;
        }
      } else {
        const kept = prev?.[field as keyof typeof prev];
        if (typeof kept === "string" && kept.trim()) {
          (override as Record<string, string | boolean>)[field] = kept.trim();
        }
      }
    }

    sections[id] = override;
  }

  const homeSections: HomeSectionsConfig = { order, sections };
  await writeSiteSettingsData(supabase, { ...existing, homeSections });
  revalidateCms();
  redirectAdminSaved("/admin/home-sections", "/");
}

function parseJsonStringArray(raw: FormDataEntryValue | null): string[] {
  const text = String(raw ?? "").trim();
  if (!text) return [];
  try {
    const parsed = JSON.parse(text) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

export async function saveInnerPageSettings(formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);

  const pageId = String(formData.get("pageId") ?? "").trim();
  if (!INNER_PAGE_IDS.includes(pageId as (typeof INNER_PAGE_IDS)[number])) {
    throw new Error("無效的內頁 ID");
  }

  const hero = {
    watermark: String(formData.get("hero_watermark") ?? "").trim() || undefined,
    eyebrow: String(formData.get("hero_eyebrow") ?? "").trim() || undefined,
    title: String(formData.get("hero_title") ?? "").trim() || undefined,
    lead: String(formData.get("hero_lead") ?? "").trim() || undefined,
    leadHighlight: String(formData.get("hero_lead_highlight") ?? "").trim() || undefined,
    metaTitle: String(formData.get("hero_meta_title") ?? "").trim() || undefined,
    metaDescription: String(formData.get("hero_meta_description") ?? "").trim() || undefined,
    ctaLabel: String(formData.get("hero_cta_label") ?? "").trim() || undefined,
    ctaHref: String(formData.get("hero_cta_href") ?? "").trim() || undefined,
    ctaId: String(formData.get("hero_cta_id") ?? "").trim() || undefined,
  };

  const panelOrder = parseJsonStringArray(formData.get("panel_order"));
  const panelIds = parseJsonStringArray(formData.get("panel_ids"));
  const items: Record<string, PagePanelOverride> = {};

  for (const id of panelIds) {
    const enabled = formData.get(`panel_${id}_enabled`) === "1";
    const title = String(formData.get(`panel_${id}_title`) ?? "").trim();
    const body = String(formData.get(`panel_${id}_body`) ?? "").trim();
    const listRaw = String(formData.get(`panel_${id}_list`) ?? "").trim();
    const list = listRaw
      ? listRaw
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : undefined;

    const item: PagePanelOverride = { enabled };
    if (title) item.title = title;
    if (body) item.body = body;
    if (list && list.length > 0) item.list = list;
    items[id] = item;
  }

  const innerPages: InnerPagesConfig = {
    pages: {
      ...(existing.innerPages?.pages ?? {}),
      [pageId]: {
        hero,
        panels: {
          order: panelOrder.length > 0 ? panelOrder : panelIds,
          items,
        },
      },
    },
  };

  await writeSiteSettingsData(supabase, { ...existing, innerPages });
  revalidateCms();
  redirectAdminSaved(`/admin/pages?page=${pageId}`, `/${pageId}`);
}

export async function saveContentModulesAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);

  const petalStats = Array.from({ length: 4 }, (_, i) => ({
    caption: optionalField(String(formData.get(`trust_petal_${i}_caption`) ?? "")),
    value: optionalField(String(formData.get(`trust_petal_${i}_value`) ?? "")),
    label: optionalField(String(formData.get(`trust_petal_${i}_label`) ?? "")),
    detail: optionalField(String(formData.get(`trust_petal_${i}_detail`) ?? "")),
    href: optionalField(String(formData.get(`trust_petal_${i}_href`) ?? "")),
    ctaId: optionalField(String(formData.get(`trust_petal_${i}_ctaId`) ?? "")),
  }));

  const trust: NonNullable<SiteContentSettings["trust"]> = {
    petalStats,
    petalIntro1: optionalField(String(formData.get("trust_petalIntro1") ?? "")),
    petalIntro2: optionalField(String(formData.get("trust_petalIntro2") ?? "")),
    petalHighlights: parseLines(formData.get("trust_petalHighlights")),
  };

  const defaultTestimonialOrder = DEFAULT_TESTIMONIALS.map((t) => t.id);
  const testimonialOrder = parseJsonOrderField(
    formData.get("testimonial_order"),
    defaultTestimonialOrder,
  );
  const testimonialItems: NonNullable<SiteContentSettings["testimonials"]>["items"] = {};
  for (const id of defaultTestimonialOrder) {
    testimonialItems[id] = {
      enabled: formData.get(`testimonial_${id}_enabled`) === "1",
      quote: optionalField(String(formData.get(`testimonial_${id}_quote`) ?? "")),
      author: optionalField(String(formData.get(`testimonial_${id}_author`) ?? "")),
      meta: optionalField(String(formData.get(`testimonial_${id}_meta`) ?? "")),
    };
  }

  const processSteps: NonNullable<SiteContentSettings["processSteps"]> = {
    sectionLabel: optionalField(String(formData.get("process_sectionLabel") ?? "")),
    title: optionalField(String(formData.get("process_title") ?? "")),
    steps: Array.from({ length: 4 }, (_, i) => ({
      num: optionalField(String(formData.get(`process_step_${i}_num`) ?? "")),
      title: optionalField(String(formData.get(`process_step_${i}_title`) ?? "")),
      desc: optionalField(String(formData.get(`process_step_${i}_desc`) ?? "")),
    })),
  };

  const narrativeIds = DEFAULT_NARRATIVE_CHAPTERS.map((c) => c.id);
  const narrativeItems: NonNullable<SiteContentSettings["narrativeChapters"]>["items"] = {};
  for (const id of narrativeIds) {
    narrativeItems[id] = {
      label: optionalField(String(formData.get(`narrative_${id}_label`) ?? "")),
      title: optionalField(String(formData.get(`narrative_${id}_title`) ?? "")),
      body: String(formData.get(`narrative_${id}_body`) ?? "").trim() || undefined,
      image: optionalField(String(formData.get(`narrative_${id}_image`) ?? "")),
      imageAlt: optionalField(String(formData.get(`narrative_${id}_imageAlt`) ?? "")),
    };
  }

  const wellnessServices: NonNullable<SiteContentSettings["wellnessPage"]>["services"] = {};
  for (const service of DEFAULT_WELLNESS_SERVICES) {
    wellnessServices[service.id] = {
      title: optionalField(String(formData.get(`wellness_service_${service.id}_title`) ?? "")),
      body: String(formData.get(`wellness_service_${service.id}_body`) ?? "").trim() || undefined,
      image: optionalField(String(formData.get(`wellness_service_${service.id}_image`) ?? "")),
      imageAlt: optionalField(String(formData.get(`wellness_service_${service.id}_imageAlt`) ?? "")),
    };
  }

  const wellnessPage: NonNullable<SiteContentSettings["wellnessPage"]> = {
    services: wellnessServices,
    traditionalSectionLabel: optionalField(
      String(formData.get("wellness_traditionalSectionLabel") ?? ""),
    ),
    traditionalTitle: optionalField(String(formData.get("wellness_traditionalTitle") ?? "")),
    traditionalItems: parseLines(formData.get("wellness_traditionalItems")),
    traditionalFooter: optionalField(String(formData.get("wellness_traditionalFooter") ?? "")),
  };

  const aboutContact: NonNullable<SiteContentSettings["aboutContact"]> = {
    title: optionalField(String(formData.get("aboutContact_title") ?? "")),
  };

  const content: SiteContentSettings = {
    ...(existing.content ?? {}),
    trust,
    testimonials: { order: testimonialOrder, items: testimonialItems },
    processSteps,
    narrativeChapters: { order: narrativeIds, items: narrativeItems },
    wellnessPage,
    aboutContact,
  };

  await writeSiteSettingsData(supabase, { ...existing, content });
  revalidateCms();
  redirectAdminSaved("/admin/content", "/");
}

export async function resetContentModuleAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const module = String(formData.get("module") ?? "").trim() as ContentModuleId;
  if (!CONTENT_MODULE_IDS.includes(module)) {
    throw new Error("無效的內容模組");
  }

  const existing = await readSiteSettingsData(supabase);
  const content: SiteContentSettings = { ...(existing.content ?? {}) };

  switch (module) {
    case "trust":
      delete content.trust;
      break;
    case "testimonials":
      delete content.testimonials;
      break;
    case "process":
      delete content.processSteps;
      break;
    case "narrative":
      delete content.narrativeChapters;
      break;
    case "wellness":
      delete content.wellnessPage;
      break;
    case "aboutContact":
      delete content.aboutContact;
      break;
  }

  const nextContent = Object.keys(content).length > 0 ? content : undefined;
  await writeSiteSettingsData(supabase, { ...existing, content: nextContent });
  revalidateCms();
  redirectAdminSaved("/admin/content", "/");
}

export async function resetHeroSettingsAction() {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);
  const { hero: _removed, ...rest } = existing;
  await writeSiteSettingsData(supabase, rest);
  revalidateCms();
  redirectAdminSaved("/admin/hero", "/");
}

export async function resetHomeSectionsAction() {
  const { supabase } = await requireAdmin();
  const existing = await readSiteSettingsData(supabase);
  const { homeSections: _removed, ...rest } = existing;
  await writeSiteSettingsData(supabase, rest);
  revalidateCms();
  redirectAdminSaved("/admin/home-sections", "/");
}

export async function resetInnerPageAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const pageId = String(formData.get("pageId") ?? "").trim();
  if (!INNER_PAGE_IDS.includes(pageId as (typeof INNER_PAGE_IDS)[number])) {
    throw new Error("無效的內頁 ID");
  }

  const existing = await readSiteSettingsData(supabase);
  const pages = { ...(existing.innerPages?.pages ?? {}) };
  delete pages[pageId];

  const innerPages: InnerPagesConfig | undefined =
    Object.keys(pages).length > 0 ? { pages } : undefined;

  await writeSiteSettingsData(supabase, {
    ...existing,
    innerPages,
  });
  revalidateCms();
  redirectAdminSaved(`/admin/pages?page=${pageId}`, `/${pageId}`);
}
