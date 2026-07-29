const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-QD7KBRVNXG";

/** Static GA4 tags in <head> for Google Search Console Analytics verification. */
export function Ga4HeadScripts() {
  if (!gaId) return null;

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
        }}
      />
    </>
  );
}
