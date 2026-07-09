import { getSiteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/JsonLd";
import { getSite } from "@/lib/cms/site";

function parseHours(hours: string): { opens: string; closes: string } {
  const match = hours.match(/(\d{1,2}:\d{2})\s*[–—-]\s*(\d{1,2}:\d{2})/);
  if (!match) return { opens: "09:00", closes: "21:00" };
  return { opens: match[1], closes: match[2] };
}

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export async function LocalBusinessJsonLd() {
  const site = await getSite();
  const siteUrl = getSiteUrl();
  const businessId = `${siteUrl}/#business`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BeautySalon",
        "@id": businessId,
        name: site.name,
        alternateName: site.nameEn,
        description: site.description,
        url: siteUrl,
        telephone: `+${site.phoneTel}`,
        image: `${siteUrl}/brand/icon-512.png`,
        logo: `${siteUrl}/brand/icon-512.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.replace(/^屯門/, "").trim() || site.address,
          addressLocality: "屯門",
          addressRegion: "新界",
          addressCountry: "HK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 22.3919,
          longitude: 113.9715,
        },
        hasMap: site.mapUrl,
        areaServed: [
          { "@type": "City", name: "屯門" },
          { "@type": "AdministrativeArea", name: "新界" },
          { "@type": "Country", name: "HK" },
        ],
        openingHoursSpecification: site.businessHours.schedule.map((row) => {
          const { opens, closes } = parseHours(row.hours);
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: DAY_NAMES[row.day],
            opens,
            closes,
          };
        }),
        sameAs: [
          site.instagram,
          site.threads,
          site.facebook,
          site.xiaohongshu,
        ].filter(Boolean),
        priceRange: "$$",
      }}
    />
  );
}
