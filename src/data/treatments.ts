import { promo } from "./promo-images";

export type PriceType = "fixed" | "consult";

export type Treatment = {
  slug: string;
  name: string;
  nameEn?: string;
  tagline: string;
  problems: string[];
  category: string;
  priceType: PriceType;
  price?: string;
  priceNote?: string;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
};

const treatmentImages: Record<string, { src: string; alt: string }> = {
  "tegoder-peel": promo.tegoder,
  "plaser-rf": promo.plaserRf,
  "microneedle-rf": promo.microneedle,
  "plasma-acne": promo.plasmaAcne,
  "plasma-peel": promo.plasmaPeel,
  collazen: promo.collazen,
  hifu: promo.hifu,
  "laser-spot": promo.laserSpot,
  exosome: promo.exosome,
};

function withImage(t: Omit<Treatment, "image" | "imageAlt">): Treatment {
  const img = treatmentImages[t.slug];
  return img ? { ...t, image: img.src, imageAlt: img.alt } : t;
}

export const treatments: Treatment[] = [
  withImage({
    slug: "tegoder-peel",
    name: "西班牙 TEGODER 量膚定制果酸療程",
    tagline: "4 款專屬果酸配方，針對油性、敏感、暗沉、熟齡肌，量膚之後對症建議。",
    problems: ["暗沉", "敏感", "熟齡", "油性"],
    category: "果酸煥膚",
    priceType: "consult",
    priceNote: "量膚分析後報價 · 單次收費",
    featured: true,
  }),
  withImage({
    slug: "plaser-rf",
    name: "PLASER 隔空離子熱能射頻再生儀",
    tagline: "德國 Flyzer 專利，等離子 + 射頻，殺菌、提亮、緊緻一齊做。",
    problems: ["鬆弛", "暗沉", "毛孔"],
    category: "射頻緊緻",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
    featured: true,
  }),
  withImage({
    slug: "microneedle-rf",
    name: "微針射頻膠原修復療程",
    tagline: "Mesoestetic m.pen 智能微針，垂直進針更精準，收毛孔去凹凸洞。",
    problems: ["毛孔", "凹凸洞", "初老"],
    category: "微針射頻",
    priceType: "fixed",
    price: "$880",
    priceNote: "單次（可加 $300 Bioskin 精華）",
    featured: true,
  }),
  withImage({
    slug: "plasma-acne",
    name: "等離子抗痘煥膚療程",
    tagline: "抗炎控油、收細毛孔，針對暗瘡肌、油脂粒、毛囊炎。",
    problems: ["暗瘡", "油脂粒", "毛孔"],
    category: "等離子",
    priceType: "fixed",
    price: "$680",
    priceNote: "單次（可加 $300 Bioskin 精華）",
    featured: true,
  }),
  withImage({
    slug: "plasma-peel",
    name: "等離子煥膚療程",
    tagline: "溫和更新角質、改善粗糙乾紋，熟齡肌同敏感肌都適合。",
    problems: ["敏感", "乾燥", "熟齡"],
    category: "等離子",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
  }),
  withImage({
    slug: "collazen",
    name: "COLLAZEN 膠原美肌小旋風",
    tagline: "5 合 1 綜合護理：清潔、補濕、HIFU 拉提、RF 膠原、Cryo 修復。",
    problems: ["鬆弛", "暗沉", "乾燥"],
    category: "綜合儀器",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
    featured: true,
  }),
  withImage({
    slug: "hifu",
    name: "HIFU 緊緻拉提",
    tagline: "非侵入式超聲波拉提，針對輪廓鬆弛、法令紋。",
    problems: ["鬆弛", "初老"],
    category: "HIFU",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
  }),
  withImage({
    slug: "laser-spot",
    name: "激光祛斑嫩膚",
    tagline: "針對色斑、膚色不均，改善整體透亮感。",
    problems: ["色斑", "暗沉"],
    category: "激光",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
  }),
  withImage({
    slug: "exosome",
    name: "外泌體細胞修復",
    tagline: "深層細胞修復，改善膚質、促進膠原再生。",
    problems: ["初老", "暗沉", "敏感"],
    category: "細胞修復",
    priceType: "consult",
    priceNote: "諮詢報價 · 單次收費",
  }),
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export const featuredTreatments = treatments.filter((t) => t.featured);
