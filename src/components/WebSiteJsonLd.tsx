import { JsonLd } from "@/components/JsonLd";
import { getSite } from "@/lib/cms/site";
import { getSiteUrl } from "@/lib/site-url";

export async function WebSiteJsonLd() {
  const site = await getSite();
  const siteUrl = getSiteUrl();

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: site.name,
        alternateName: site.nameEn,
        url: siteUrl,
        description: site.description,
        inLanguage: "zh-Hant",
        publisher: {
          "@id": `${siteUrl}/#business`,
        },
      }}
    />
  );
}
