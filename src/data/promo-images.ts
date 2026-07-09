import manifest from "./promo-images.json";

export type PromoImageItem = (typeof manifest.items)[number];

export function getPromoById(id: string): PromoImageItem | undefined {
  return manifest.items.find((item) => item.id === id);
}

export function getPromoByTreatment(slug: string): PromoImageItem | undefined {
  return manifest.items.find((item) => item.treatment === slug);
}

/** Direct path + alt — filenames often do not match on-image copy. */
function file(src: string, alt: string) {
  return { src, alt };
}

/**
 * Semantic promo keys → actual PNG content (verified against files on disk).
 * Do not trust filename alone; see promo-images.json `actualTitle` when present.
 */
export const promo = {
  heroWelcome: file("/images/promo/hero-welcome-editorial-v2.png", "康姿健歡迎你的蒞臨"),

  /** Brand emblem poster — not a shop interior photo */
  heroShop: file(
    "/images/promo/hero-shop.png",
    "康姿健 — 手法美容 · 皮膚管理 · 痛症理療",
  ),

  meTime: file("/images/promo/me-time.png", "享受寧靜、無壓力的護理時光"),
  meTimeSpa: file(
    "/images/promo/plaser-rf.png",
    "專注享受 60 分鐘寧靜護理",
  ),

  spanishFacial: file("/images/promo/dr-face.png", "西班牙醫學級人手 Facial"),
  tegoder: file("/images/promo/tegoder-peel.png", "TEGODER 玫瑰亮白果酸 · 敏感肌適用"),
  sensitiveRepair: file("/images/promo/me-time.png", "脆弱肌修護方案"),

  seasonal: file("/images/promo/spanish-facial.png", "轉季護膚小貼士"),
  winterSkincare: file("/images/promo/plasma-acne.png", "寒流襲港 · 爆拆護膚提示"),
  eventPrep: file("/images/promo/sensitive-repair.png", "重要日子前大掃除"),

  drRainbow: file(
    "/images/promo/dr-rainbow-fir.png",
    "Dr. Rainbow 醫療級遠紅外線",
  ),
  wellnessDetox: file("/images/promo/wellness-detox.png", "養生排毒 Dr. Rainbow"),
  drFace: file("/images/promo/dr-face.png", "Dr. Face 遠紅外線童顏機"),

  plaser: file("/images/promo/collazen-atoz.png", "Air Plaser 等離子"),
  plaserRf: file("/images/promo/collazen-atoz.png", "Air Plaser 等離子"),
  laserSpot: file("/images/promo/air-plaser.png", "Ruikd Genelux Lite 納秒激光"),

  microneedle: file("/images/promo/microneedle-rf.png", "PLASER RF 微針射頻 · 單次 $880"),
  plasmaAcne: file("/images/promo/plasma-acne.png", "寒流襲港 · 爆拆護膚提示"),
  plasmaPeel: file("/images/promo/plasma-peel.png", "藍光煥膚黑科技"),

  collazen: file(
    "/images/promo/collazen-5in1.png",
    "COLLAZEN 膠原美肌小旋風 5合1",
  ),
  collazenAlt: file("/images/promo/dr-rainbow-fir.png", "COLLAZEN 膠原小旋風 A to Z"),
  collazenHifuRf: file(
    "/images/promo/laser-spot.png",
    "COLLAZEN HIFU RF 增效",
  ),
  collazenTriple: file(
    "/images/promo/brand-opening.png",
    "COLLAZEN 膠原美肌小旋風 一打三",
  ),
  collazen5in1: file(
    "/images/promo/collazen-5in1.png",
    "COLLAZEN 膠原美肌小旋風 5合1",
  ),

  hifu: file("/images/promo/collazen-5in1.png", "3-Way HIFU 逆齡 V 面"),
  bioskinCert: file("/images/promo/hifu.png", "BIOSKIN 2026 原廠供應證明"),

  exosome: file("/images/promo/exosome.png", "BSK9 EXOSOMES 爆髮療程"),

  brandOpening: file("/images/promo/collazen-hifu-rf.png", "康姿健開工大吉"),
  cnyPrep: file("/images/promo/seasonal-skincare.png", "過年毛孔大掃除"),
  holidayGreeting: file("/images/promo/microneedle-rf.png", "馬年迎春接福"),
} as const;

export { manifest };
