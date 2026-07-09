/**
 * Seed Kang Zi Jian CMS tables from static src/data files.
 *
 * Usage:
 *   npx tsx scripts/seed-kz-cms.ts          # requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 *   npx tsx scripts/seed-kz-cms.ts --sql    # print SQL only (for manual apply)
 */
import { config } from "dotenv";
import { writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";
config({ path: ".env.local" });
config();
import manifest from "../src/data/social-images.json";
import { faqItems } from "../src/data/faq";
import { treatmentDetails } from "../src/data/treatment-details";
import { treatments } from "../src/data/treatments";
import {
  journalPosts,
  type JournalPost,
} from "../src/data/journal";
import { shopVideos } from "../src/data/shop-videos";
import { getSocialImageById } from "../src/data/social-images";
import { site } from "../src/data/site";

const LEGACY_SLUGS: Record<string, string> = {
  "2606-美容唔止靠儀器-西班牙醫學級-量膚定制-果酸療程": "tegoder-custom-peel",
  "2606-暗瘡粉刺篇-油光滿面-黑頭死纏爛打-淨化平衡皮脂果酸-幫毛孔大掃除":
    "acne-peel",
  "2606-敏感泛紅篇-皮膚薄又易紅-最溫和嘅-玫瑰亮白果酸-打破敏感肌宿命":
    "sensitive-peel",
};

function legacySlugFromId(id: string): string {
  return id
    .replace(/[^\u4e00-\u9fff\w-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function sqlStr(value: string | null | undefined): string {
  if (value == null) return "null";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlArray(values: string[]): string {
  if (!values.length) return "array[]::text[]";
  return `array[${values.map(sqlStr).join(",")}]`;
}

function journalBody(post: JournalPost): string {
  if (!post.socialId) return post.excerpt;
  const item = getSocialImageById(post.socialId);
  return item?.body ?? item?.visual ?? post.excerpt;
}

function journalAliases(post: JournalPost): string[] {
  if (!post.socialId) return [];
  const item = manifest.items.find((i) => i.id === post.socialId);
  if (!item) return [legacySlugFromId(post.socialId)];
  const aliases = new Set<string>([
    item.id,
    legacySlugFromId(item.id),
    `${item.sheet}-r${item.row}`,
  ]);
  aliases.delete(post.slug);
  return [...aliases];
}

function buildJournalInserts(): string {
  const lines = journalPosts.map((post, i) => {
    const body = journalBody(post);
    return `insert into public.kz_cms_journal_posts (slug, title, excerpt, body, category, published_at, image, image_alt, social_id, slug_aliases, status, sort_order)
values (${sqlStr(post.slug)}, ${sqlStr(post.title)}, ${sqlStr(post.excerpt)}, ${sqlStr(body)}, ${sqlStr(post.category)}, ${sqlStr(post.date)}::date, ${sqlStr(post.image ?? null)}, ${sqlStr(post.imageAlt ?? post.title)}, ${sqlStr(post.socialId ?? null)}, ${sqlArray(journalAliases(post))}, 'published', ${i})
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body = excluded.body,
  category = excluded.category,
  published_at = excluded.published_at,
  image = excluded.image,
  image_alt = excluded.image_alt,
  social_id = excluded.social_id,
  slug_aliases = excluded.slug_aliases,
  updated_at = now();`;
  });
  return lines.join("\n");
}

function buildTreatmentInserts(): string {
  return treatments
    .map((t, i) => {
      const details = treatmentDetails[t.slug] ?? {};
      const detailsJson = JSON.stringify(details).replace(/'/g, "''");
      return `insert into public.kz_cms_treatments (slug, name, name_en, tagline, problems, category, price_type, price, price_note, image, image_alt, featured, for_men, sort_order, details, status)
values (${sqlStr(t.slug)}, ${sqlStr(t.name)}, ${sqlStr(t.nameEn ?? null)}, ${sqlStr(t.tagline)}, ${sqlArray(t.problems)}, ${sqlStr(t.category)}, ${sqlStr(t.priceType)}, ${sqlStr(t.price ?? null)}, ${sqlStr(t.priceNote ?? null)}, ${sqlStr(t.image ?? null)}, ${sqlStr(t.imageAlt ?? null)}, ${t.featured ? "true" : "false"}, false, ${i}, '${detailsJson}'::jsonb, 'published')
on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  problems = excluded.problems,
  category = excluded.category,
  price_type = excluded.price_type,
  price = excluded.price,
  price_note = excluded.price_note,
  image = excluded.image,
  image_alt = excluded.image_alt,
  featured = excluded.featured,
  for_men = false,
  details = excluded.details,
  updated_at = now();`;
    })
    .join("\n");
}

function buildFaqInserts(): string {
  return faqItems
    .map(
      (faq, i) => `insert into public.kz_cms_faqs (question, answer, sort_order, status)
values (${sqlStr(faq.q)}, ${sqlStr(faq.a)}, ${i}, 'published');`,
    )
    .join("\n");
}

function buildSiteInsert(): string {
  const data = JSON.stringify({
    phone: site.phone,
    phoneTel: site.phoneTel,
    hours: site.hours,
    address: site.address,
    instagram: site.instagram,
    threads: site.threads,
    facebook: site.facebook,
    xiaohongshu: site.xiaohongshu,
    description: site.description,
    subtitle: site.subtitle,
  }).replace(/'/g, "''");

  return `insert into public.kz_cms_site_settings (id, data)
values ('default', '${data}'::jsonb)
on conflict (id) do update set data = excluded.data, updated_at = now();`;
}

function buildShopVideoInserts(): string {
  return shopVideos
    .map(
      (v, i) => `insert into public.kz_cms_shop_videos (id, title, excerpt, category, duration_sec, poster, src, related_href, sort_order, status)
values (${v.id}, ${sqlStr(v.title)}, ${sqlStr(v.excerpt)}, ${sqlStr(v.category)}, ${v.durationSec}, ${sqlStr(v.poster)}, ${sqlStr(v.src)}, ${sqlStr(v.relatedHref ?? null)}, ${i}, 'published')
on conflict (id) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  category = excluded.category,
  duration_sec = excluded.duration_sec,
  poster = excluded.poster,
  src = excluded.src,
  related_href = excluded.related_href,
  sort_order = excluded.sort_order,
  updated_at = now();`,
    )
    .join("\n");
}

async function seedWithServiceRole() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Clear FAQs for idempotent re-seed (no natural key besides uuid)
  await supabase.from("kz_cms_faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  for (const [i, post] of journalPosts.entries()) {
    const { error } = await supabase.from("kz_cms_journal_posts").upsert({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      body: journalBody(post),
      category: post.category,
      published_at: post.date,
      image: post.image ?? null,
      image_alt: post.imageAlt ?? post.title,
      social_id: post.socialId ?? null,
      slug_aliases: journalAliases(post),
      status: "published",
      sort_order: i,
    });
    if (error) throw new Error(`journal ${post.slug}: ${error.message}`);
  }

  for (const [i, t] of treatments.entries()) {
    const { error } = await supabase.from("kz_cms_treatments").upsert({
      slug: t.slug,
      name: t.name,
      name_en: t.nameEn ?? null,
      tagline: t.tagline,
      problems: t.problems,
      category: t.category,
      price_type: t.priceType,
      price: t.price ?? null,
      price_note: t.priceNote ?? null,
      image: t.image ?? null,
      image_alt: t.imageAlt ?? null,
      featured: t.featured ?? false,
      for_men: false,
      sort_order: i,
      details: treatmentDetails[t.slug] ?? {},
      status: "published",
    });
    if (error) throw new Error(`treatment ${t.slug}: ${error.message}`);
  }

  for (const [i, faq] of faqItems.entries()) {
    const { error } = await supabase.from("kz_cms_faqs").insert({
      question: faq.q,
      answer: faq.a,
      sort_order: i,
      status: "published",
    });
    if (error) throw new Error(`faq: ${error.message}`);
  }

  const { error: siteError } = await supabase.from("kz_cms_site_settings").upsert({
    id: "default",
    data: {
      phone: site.phone,
      phoneTel: site.phoneTel,
      hours: site.hours,
      address: site.address,
      description: site.description,
      subtitle: site.subtitle,
      instagram: site.instagram,
      threads: site.threads,
      facebook: site.facebook,
      xiaohongshu: site.xiaohongshu,
    },
  });
  if (siteError) throw new Error(siteError.message);

  for (const [i, video] of shopVideos.entries()) {
    const { error } = await supabase.from("kz_cms_shop_videos").upsert({
      id: video.id,
      title: video.title,
      excerpt: video.excerpt,
      category: video.category,
      duration_sec: video.durationSec,
      poster: video.poster,
      src: video.src,
      related_href: video.relatedHref ?? null,
      sort_order: i,
      status: "published",
    });
    if (error) throw new Error(`video ${video.id}: ${error.message}`);
  }

  console.log(
    `Seeded ${journalPosts.length} journal, ${treatments.length} treatments, ${faqItems.length} FAQs, ${shopVideos.length} shop videos`,
  );
}

const sqlOnly = process.argv.includes("--sql");

if (sqlOnly) {
  const sql = [
    "-- Kang Zi Jian CMS seed",
    "delete from public.kz_cms_faqs;",
    buildSiteInsert(),
    buildTreatmentInserts(),
    buildJournalInserts(),
    buildFaqInserts(),
    buildShopVideoInserts(),
  ].join("\n");
  writeFileSync("scripts/seed-kz-cms.sql", sql, "utf8");
  console.log("Wrote scripts/seed-kz-cms.sql");
} else {
  seedWithServiceRole().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
