import type { Metadata } from "next";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

export const DEFAULT_OG_IMAGE = "/images/promo/hero-welcome-editorial-v2.png";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
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

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: ogTitle,
      description,
      locale: "zh_HK",
      type: options.type ?? "website",
      url: pageUrl,
      siteName: site.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
  };
}

const defaultSocial = buildPageMetadata();

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${site.name}｜屯門美容 · 皮膚管理 · 痛症理療`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/brand/kzj-icon.png",
    apple: "/brand/kzj-icon.png",
  },
  openGraph: defaultSocial.openGraph,
  twitter: defaultSocial.twitter,
};
