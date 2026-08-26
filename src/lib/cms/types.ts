import type { TreatmentDetailContent } from "@/data/treatment-details";
import type { PriceType, Treatment } from "@/data/treatments";
import type { FaqItem } from "@/data/faq";
import type { JournalPost } from "@/data/journal";

export type ContentStatus = "draft" | "scheduled" | "published";

export type CmsJournalRow = {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  published_at: string;
  scheduled_at: string | null;
  image: string | null;
  image_alt: string | null;
  social_id: string | null;
  slug_aliases: string[];
  status: ContentStatus;
  sort_order: number;
};

export type CmsTreatmentRow = {
  slug: string;
  name: string;
  name_en: string | null;
  tagline: string;
  problems: string[];
  category: string;
  price_type: PriceType;
  price: string | null;
  price_note: string | null;
  image: string | null;
  image_alt: string | null;
  featured: boolean;
  sort_order: number;
  details: TreatmentDetailContent;
  status: ContentStatus;
};

export type CmsFaqRow = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  status: ContentStatus;
};

export type CmsMediaRow = {
  id: string;
  storage_path: string;
  public_url: string;
  filename: string;
  alt: string;
  folder: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
};

export type CmsShopVideoRow = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  duration_sec: number;
  poster: string;
  src: string;
  related_href: string | null;
  sort_order: number;
  status: ContentStatus;
};

export type CmsContentBundle = {
  journalPosts: JournalPost[];
  journalCategories: string[];
  treatments: Treatment[];
  treatmentDetails: Record<string, TreatmentDetailContent>;
  faqItems: FaqItem[];
};
