import type { MetadataRoute } from "next";
import { sitePages } from "@/data/site";
import { getJournalPosts, getTreatments } from "@/lib/cms/queries";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();
  const [treatments, journalPosts] = await Promise.all([
    getTreatments(),
    getJournalPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...sitePages.map((page) => ({
      url: `${base}${page.href}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page.href === "/book" ? 0.9 : 0.8,
    })),
  ];

  const treatmentPages: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: `${base}/treatments/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journalPages: MetadataRoute.Sitemap = journalPosts.map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...treatmentPages, ...journalPages];
}
