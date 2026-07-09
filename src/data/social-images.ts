import manifest from "./social-images.json";

export type SocialImageItem = (typeof manifest.items)[number];

export function getSocialImageById(id: string): SocialImageItem | undefined {
  return manifest.items.find((item) => item.id === id);
}

export function getSocialImageByFile(file: string): SocialImageItem | undefined {
  return manifest.items.find((item) => item.file === file);
}

export function findSocialImage(...keywords: string[]): SocialImageItem | undefined {
  return manifest.items.find((item) => {
    const haystack = `${item.topic ?? ""} ${item.body ?? ""}`;
    return keywords.every((keyword) => haystack.includes(keyword));
  });
}

function pickByKeywords(keywords: string[], alt: string) {
  const item = findSocialImage(...keywords);
  if (!item) {
    return { src: "/brand/kzj-icon.png", alt };
  }
  return {
    src: item.file,
    alt,
  };
}

/** Curated picks from Social Content.xlsx for site UI */
export const social = {
  heroShop: pickByKeywords(["窩心小店"], "康姿健屯門小店"),
  meTime: pickByKeywords(["無壓力美容", "Me Time"], "康姿健 Me Time 護理"),
  facial: pickByKeywords(["人氣推介", "深層清潔"], "深層清潔補濕人手 Facial"),
  tegoder: pickByKeywords(["量膚定制", "果酸療程"], "TEGODER 量膚定制果酸"),
  peelAcne: pickByKeywords(["暗瘡粉刺篇"], "暗瘡粉刺果酸"),
  peelSensitive: pickByKeywords(["敏感泛紅篇"], "敏感肌果酸"),
  plaser: pickByKeywords(["黑科技登場", "等離子"], "PLASER 等離子儀"),
  plaserAlt: pickByKeywords(["PLASER", "隔空離子"], "PLASER 隔空離子射頻"),
  microneedle: pickByKeywords(["西班牙醫學級微針"], "微針射頻膠原修復"),
  microneedleAlt: pickByKeywords(["微針射頻膠原修復"], "微針射頻"),
  collazen: pickByKeywords(["膠原小旋風"], "COLLAZEN 膠原美肌小旋風"),
  plasmaAcne: pickByKeywords(["等離子微針射頻", "暗瘡"], "等離子抗痘煥膚"),
  trust: pickByKeywords(["無壓力美容", "零硬銷"], "單次收費 · 無硬銷"),
} as const;

export { manifest };
