import type { TreatmentDetailContent } from "@/data/treatment-details";
import type { FaqItem } from "@/data/faq";
import type { JournalPost } from "@/data/journal";
import type { Treatment } from "@/data/treatments";
import type { ShopVideo } from "@/data/shop-videos";
import type { CmsFaqRow, CmsJournalRow, CmsShopVideoRow, CmsTreatmentRow } from "./types";

export function mapJournalRow(row: CmsJournalRow): JournalPost {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    date: row.published_at,
    image: row.image ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    socialId: row.social_id ?? undefined,
  };
}

export function mapTreatmentRow(row: CmsTreatmentRow): Treatment {
  return {
    slug: row.slug,
    name: row.name,
    nameEn: row.name_en ?? undefined,
    tagline: row.tagline,
    problems: row.problems,
    category: row.category,
    priceType: row.price_type,
    price: row.price ?? undefined,
    priceNote: row.price_note ?? undefined,
    image: row.image ?? undefined,
    imageAlt: row.image_alt ?? undefined,
    featured: row.featured,
  };
}

export function mapFaqRow(row: CmsFaqRow): FaqItem {
  return {
    q: row.question,
    a: row.answer,
  };
}

export function mapShopVideoRow(row: CmsShopVideoRow): ShopVideo {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category as ShopVideo["category"],
    durationSec: Number(row.duration_sec),
    poster: row.poster,
    src: row.src,
    relatedHref: row.related_href ?? undefined,
  };
}

export function bodyParagraphsFromText(body: string): string[] {
  return body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

export function treatmentDetailsFromRows(
  rows: CmsTreatmentRow[],
): Record<string, TreatmentDetailContent> {
  const out: Record<string, TreatmentDetailContent> = {};
  for (const row of rows) {
    if (row.details && Object.keys(row.details).length > 0) {
      out[row.slug] = row.details;
    }
  }
  return out;
}
