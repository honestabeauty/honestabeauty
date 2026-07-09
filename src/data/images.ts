import { promo } from "./promo-images";
import { social } from "./social-images";
import { site } from "./site";

export type SiteImage = {
  src: string;
  alt: string;
  caption?: string;
};

/** Promo graphic + caption aligned to on-image copy (not generic site slogans). */
function promoImage(
  item: { src: string; alt: string },
  caption: string,
): SiteImage {
  return { ...item, caption };
}

export const images = {
  hero: {
    main: {
      ...promo.heroWelcome,
      alt: `${site.name}歡迎你的蒞臨 — ${site.subtitle}`,
    },
    treatment: promo.plaser,
    facial: promo.tegoder,
  },
  studio: {
    interior: promoImage(promo.meTimeSpa, "專注享受 60 分鐘寧靜護理"),
    brandPoster: {
      ...promo.heroShop,
      alt: `${site.nameEn} ${site.name} — ${site.subtitle}`,
    },
    care: promoImage(promo.sensitiveRepair, "脆弱肌修護方案"),
  },
  treatments: {
    device: promo.plaser,
    peel: promo.tegoder,
  },
  brand: {
    logo: "/brand/kzj-icon.png",
    icon: "/brand/kzj-icon.png",
    logoBanner: "/brand/hck-logo-banner.svg",
    logoWhite: "/brand/hck-logo-banner-white.svg",
  },
} as const;

export const verticalTaglines = [
  "量膚定制",
  "單次收費",
  "絕無硬銷",
] as const;

/** Hero 標題 rail / 手機 masthead — 與浮動 pill 錯開，突出專業背書 */
export const heroRailTaglines = [
  "西班牙果酸",
  "IBDR 金獎",
  "屯門地舖",
] as const;

export const narrativeChapters = [
  {
    id: "intro",
    label: "01 — About",
    title: "屯門一人工作室，先了解再建議",
    body: [
      "康姿健係屯門紅橋一間皮膚管理工作室。護膚唔應該由推銷套裝開始，而係先了解你塊面需要咩。",
      "西班牙果酸、等離子同微針射頻 — 全部單次收費，做唔做由你話事。",
    ],
    image: promoImage(promo.bioskinCert, "BIOSKIN 2026 原廠供應證明"),
  },
  {
    id: "promise",
    label: "02 — Promise",
    title: "先量膚，再建議",
    body: [
      "每人膚質、生活習慣同煩惱都唔同。我哋會先幫你量膚，再建議啱嘅療程 — 唔綁套票、唔迫你買。",
      "有啲療程明碼單次價，有啲要量膚後先報價。價錢講清楚，你自己安心決定。",
    ],
    image: promoImage(promo.sensitiveRepair, "脆弱肌修護方案"),
  },
  {
    id: "space",
    label: "03 — Space",
    title: "一人小店的私密節奏",
    body: [
      "冇連鎖店咁嘈，淨係專心做你嗰 part。環境舒服、講嘢直接，好似慢慢翻開一本關於自己皮膚嘅雜誌。",
    ],
    image: promoImage(promo.meTime, "放鬆一下，享受無壓力 Me Time"),
  },
] as const;

export { social };
