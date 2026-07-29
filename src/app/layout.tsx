import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";
import { Footer } from "@/components/Footer";
import { Ga4HeadScripts } from "@/components/Ga4HeadScripts";
import { GtmScripts } from "@/components/GtmScripts";
import { Header } from "@/components/Header";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { WebSiteJsonLd } from "@/components/WebSiteJsonLd";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { SiteChrome } from "@/components/SiteChrome";
import { getSite } from "@/lib/cms/site";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const site = await getSite();
  const socialUrls = {
    instagram: site.instagram,
    threads: site.threads,
    xiaohongshu: site.xiaohongshu,
    facebook: site.facebook,
  };

  return (
    <html
      lang="zh-Hant"
      translate="no"
      suppressHydrationWarning
      className={`${notoSerif.variable} ${notoSans.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "window.dataLayer=window.dataLayer||[];",
          }}
        />
        <Ga4HeadScripts />
      </head>
      <body className="min-h-full flex flex-col pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
        <GtmScripts />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <a href="#main-content" className="skip-link" suppressHydrationWarning>
          跳至主內容
        </a>
        <SiteChrome
          header={<Header socialUrls={socialUrls} />}
          footer={<Footer />}
          mobileBar={<MobileBookingBar />}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
