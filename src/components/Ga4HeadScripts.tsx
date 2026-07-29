import Script from "next/script";

const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-QD7KBRVNXG";

/** GA4 in <head> — required for Google Search Console Analytics verification. */
export function Ga4HeadScripts() {
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="beforeInteractive"
      />
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
