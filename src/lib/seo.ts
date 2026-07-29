import type { Metadata } from "next";
import { site } from "@/data/site";
import { getGoogleSiteVerificationMeta } from "@/lib/google-site-verification";
import { getSiteUrl } from "@/lib/site-url";

/** Dedicated 1200×630 social share image */
export const DEFAULT_OG_IMAGE = "/images/promo/og-default.jpg";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** ISO date for article OG */
  publishedTime?: string;
  /** When true, omit fixed OG width/height (non-default content images) */
  omitOgDimensions?: boolean;
};

export function buildPageMetadata(options: PageMetadataOptions = {}): Metadata {
  const siteUrl = getSiteUrl();
  const description = options.description ?? site.description;
  const pageTitle = options.title;
  const ogTitle = pageTitle
    ? `${pageTitle}｜${site.name}`
    : `${site.name} ${site.nameEn}`;
  const imagePath = options.image ?? DEFAULT_OG_IMAGE;
  const imageUrl = imagePath.startsWith("http")
    ? imagePath
    : `${siteUrl}${imagePath}`;
  const pageUrl = options.path ? `${siteUrl}${options.path}` : siteUrl;
  const isDefaultOg = imagePath === DEFAULT_OG_IMAGE;
  const omitDims = options.omitOgDimensions ?? !isDefaultOg;

  const ogImage: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  } = {
    url: imageUrl,
    alt: pageTitle ? `${pageTitle}｜${site.name}` : site.name,
  };
  if (!omitDims) {
    ogImage.width = 1200;
    ogImage.height = 630;
  }

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: ogTitle,
      description,
      locale: "zh_HK",
      type: options.type ?? "website",
      url: pageUrl,
      siteName: site.name,
      images: [ogImage],
      ...(options.type === "article" && options.publishedTime
        ? { publishedTime: options.publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

const defaultSocial = buildPageMetadata({ path: "/" });

const googleSiteVerification = getGoogleSiteVerificationMeta();

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name}｜屯門美容 · 皮膚管理 · 痛症理療`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      { url: "/brand/kzj-icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  openGraph: defaultSocial.openGraph,
  twitter: defaultSocial.twitter,
  alternates: {
    canonical: getSiteUrl(),
  },
};
