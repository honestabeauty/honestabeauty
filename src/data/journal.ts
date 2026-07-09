import manifest from "./social-images.json";
import { getSocialImageById, type SocialImageItem } from "./social-images";

export type JournalPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image?: string;
  imageAlt?: string;
  socialId?: string;
};

/** Preserve short URLs for the first three hand-picked articles. */
const LEGACY_SLUGS: Record<string, string> = {
  "2606-美容唔止靠儀器-西班牙醫學級-量膚定制-果酸療程": "tegoder-custom-peel",
  "2606-暗瘡粉刺篇-油光滿面-黑頭死纏爛打-淨化平衡皮脂果酸-幫毛孔大掃除":
    "acne-peel",
  "2606-敏感泛紅篇-皮膚薄又易紅-最溫和嘅-玫瑰亮白果酸-打破敏感肌宿命":
    "sensitive-peel",
};

/** ASCII-only slugs — Next.js dev/prod routing breaks on long Chinese path segments. */
function slugFromItem(item: SocialImageItem): string {
  const legacy = LEGACY_SLUGS[item.id];
  if (legacy) return legacy;
  return `${item.sheet}-r${item.row}`;
}

/** Previous slug algorithm (for old bookmarks / shared links). */
function legacySlugFromId(id: string): string {
  return id
    .replace(/[^\u4e00-\u9fff\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function cleanTitle(topic: string | null | undefined): string {
  if (!topic) return "醫美知識";
  return topic
    .replace(/[^\u4e00-\u9fff\w\s·｜\-「」【】！？、：？]/gu, "")
    .trim();
}

function categoryFromItem(item: SocialImageItem): string {
  const topic = item.topic ?? "";
  const bracket = topic.match(/【([^】]+)】/);
  if (bracket) return bracket[1].replace(/篇$/, "").trim();

  const haystack = `${topic} ${item.body ?? ""}`;
  if (/Dr\.?\s*Rainbow|遠紅外線|痛症|拔罐|刮痧|退背|養生|排毒|宮寒/.test(haystack)) {
    return "痛症理療";
  }
  if (/COLLAZEN|HIFU|微針|等離子|激光|Plasma|Plaser/i.test(haystack)) {
    return "儀器療程";
  }
  if (/果酸|暗瘡|敏感|保濕|護膚|轉季|秋冬|精油|撥筋/.test(haystack)) {
    return "護膚知識";
  }
  return "醫美知識";
}

function excerptFromItem(item: SocialImageItem): string {
  const body = item.body ?? "";
  const line =
    body
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l.replace(/[^\u4e00-\u9fff]/g, "").length >= 12) ??
    item.topic ??
    "";
  return line
    .replace(/[^\u4e00-\u9fff\w\s，。！？、：「」]/g, "")
    .slice(0, 120);
}

function dateFromSheet(sheet: string): string {
  if (/^\d{4}$/.test(sheet)) {
    const yy = sheet.slice(0, 2);
    const mm = sheet.slice(2, 4);
    return `20${yy}-${mm}-15`;
  }
  return "2026-01-15";
}

function postFromSocialItem(item: SocialImageItem): JournalPost {
  return {
    slug: slugFromItem(item),
    title: cleanTitle(item.topic),
    excerpt: excerptFromItem(item),
    category: categoryFromItem(item),
    date: dateFromSheet(item.sheet),
    socialId: item.id,
    image: item.file,
    imageAlt: cleanTitle(item.topic),
  };
}

/** All 55 social posts from Materials manifest, newest sheet first. */
export const journalPosts: JournalPost[] = [...manifest.items]
  .sort((a, b) => {
    if (a.sheet !== b.sheet) return b.sheet.localeCompare(a.sheet);
    return a.row - b.row;
  })
  .map(postFromSocialItem);

export const journalCategories = [
  "全部",
  ...Array.from(new Set(journalPosts.map((p) => p.category))).sort(),
] as const;

const slugAliasToCanonical = new Map<string, string>();

for (const item of manifest.items) {
  const post = journalPosts.find((p) => p.socialId === item.id);
  if (!post) continue;

  const aliases = new Set<string>([
    item.id,
    legacySlugFromId(item.id),
    `${item.sheet}-r${item.row}`,
  ]);

  for (const alias of aliases) {
    if (alias && alias !== post.slug) {
      slugAliasToCanonical.set(alias, post.slug);
    }
  }
}

function normalizeSlugParam(param: string): string {
  try {
    return decodeURIComponent(param).normalize("NFC").trim();
  } catch {
    return param.normalize("NFC").trim();
  }
}

export function resolveJournalPost(param: string): {
  post: JournalPost;
  canonicalSlug: string;
} | null {
  const raw = normalizeSlugParam(param);

  const direct = journalPosts.find(
    (p) => p.slug === raw || p.socialId === raw,
  );
  if (direct) {
    return { post: direct, canonicalSlug: direct.slug };
  }

  const aliased = slugAliasToCanonical.get(raw);
  if (aliased) {
    const post = journalPosts.find((p) => p.slug === aliased);
    if (post) return { post, canonicalSlug: post.slug };
  }

  return null;
}

export function getJournalPost(slug: string) {
  return resolveJournalPost(slug)?.post;
}

export function getJournalBody(slug: string): string[] {
  const post = getJournalPost(slug);
  if (!post?.socialId) return post ? [post.excerpt] : [];
  const item = getSocialImageById(post.socialId);
  const source = item?.body ?? item?.visual ?? post.excerpt;
  return source
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}
