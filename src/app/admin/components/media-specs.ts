export type MediaSpecItem = {
  label: string;
  value: string;
};

export type MediaSpec = {
  title: string;
  items: MediaSpecItem[];
};

const imageUploadBase: MediaSpecItem[] = [
  { label: "格式", value: "JPEG、PNG、WebP、GIF" },
  { label: "單檔上限", value: "10 MB" },
];

export const MEDIA_SPECS = {
  journal: {
    title: "醫美知識圖片規格",
    items: [
      ...imageUploadBase,
      { label: "列表顯示比例", value: "4 : 5（直向海報）" },
      { label: "建議尺寸", value: "1000 × 1250 px 或 800 × 1000 px" },
      { label: "內頁顯示比例", value: "4 : 5（直向海報，完整顯示）" },
      { label: "路徑範例", value: "/images/social/... 或媒體庫 URL" },
    ],
  },
  treatments: {
    title: "療程圖片規格",
    items: [
      ...imageUploadBase,
      { label: "內頁顯示比例", value: "4 : 5（直向海報，完整顯示）" },
      { label: "建議尺寸", value: "1000 × 1250 px 或 824 × 1024 px" },
      { label: "列表縮圖比例", value: "4 : 5（與內頁一致）" },
      { label: "路徑範例", value: "/images/promo/xxx.png" },
    ],
  },
  posters: {
    title: "短片封面規格",
    items: [
      ...imageUploadBase,
      { label: "顯示比例", value: "9 : 16（直向，與影片一致）" },
      { label: "建議尺寸", value: "1080 × 1920 px" },
      { label: "路徑範例", value: "/videos/reels/posters/1.jpg" },
    ],
  },
  hero: {
    title: "首頁主視覺圖片規格",
    items: [
      ...imageUploadBase,
      { label: "顯示方式", value: "橫向全幅編輯照（左圖右文 mirror 版面）" },
      { label: "建議尺寸", value: "1536 × 1024 px 或 1920 × 1280 px（3 : 2 橫向）" },
      { label: "路徑範例", value: "/images/promo/hero-welcome-editorial-v2.png" },
    ],
  },
  general: {
    title: "圖片上傳規格",
    items: [
      ...imageUploadBase,
      { label: "用途", value: "通用素材，依實際版位自行裁切" },
    ],
  },
  reelVideo: {
    title: "短片影片規格（不經 CMS 上傳）",
    items: [
      { label: "格式", value: "MP4（H.264 視訊 + AAC 音訊）" },
      { label: "顯示比例", value: "9 : 16（直向）" },
      { label: "建議解析度", value: "1080 × 1920 px" },
      { label: "建議片長", value: "15 – 90 秒" },
      { label: "單檔建議", value: "≤ 30 MB" },
      { label: "存放位置", value: "public/videos/reels/" },
      { label: "路徑範例", value: "/videos/reels/1.mp4" },
    ],
  },
} as const satisfies Record<string, MediaSpec>;

export type MediaSpecKey = keyof typeof MEDIA_SPECS;

export function specForMediaFolder(folder: string): MediaSpec {
  if (folder === "journal") return MEDIA_SPECS.journal;
  if (folder === "treatments") return MEDIA_SPECS.treatments;
  if (folder === "posters") return MEDIA_SPECS.posters;
  if (folder === "hero") return MEDIA_SPECS.hero;
  return MEDIA_SPECS.general;
}
