import { getSiteUrl } from "@/lib/site-url";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  };
}

export function pageBreadcrumbs(
  name: string,
  path: string,
): BreadcrumbItem[] {
  return [
    { name: "首頁", path: "/" },
    { name, path },
  ];
}
