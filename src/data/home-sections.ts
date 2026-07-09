import { images } from "@/data/images";
import { promo } from "@/data/promo-images";

export const HOME_SECTION_IDS = [
  "trust-bar",
  "editorial-chapters",
  "treatment-slider",
  "skin-analysis",
  "featured-treatment",
  "women-care",
  "wellness",
  "journal",
  "testimonials",
  "shop-reels",
  "page-hub",
  "booking-cta",
] as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[number];

export type HomeSectionField =
  | "eyebrow"
  | "title"
  | "body"
  | "highlight"
  | "image"
  | "imageAlt"
  | "linkLabel"
  | "linkHref"
  | "secondaryLinkLabel"
  | "secondaryLinkHref"
  | "sectionDesc"
  | "listLinkLabel";

export type HomeSectionContent = {
  eyebrow?: string;
  title?: string;
  body?: string;
  highlight?: string;
  image?: string;
  imageAlt?: string;
  linkLabel?: string;
  linkHref?: string;
  secondaryLinkLabel?: string;
  secondaryLinkHref?: string;
  sectionDesc?: string;
  listLinkLabel?: string;
};

export type HomeSectionDefinition = {
  id: HomeSectionId;
  label: string;
  description: string;
  defaultEnabled: boolean;
  editableFields: readonly HomeSectionField[];
  defaults: HomeSectionContent;
};

export const DEFAULT_HOME_SECTION_ORDER: HomeSectionId[] = [...HOME_SECTION_IDS];

export const HOME_SECTION_REGISTRY: Record<HomeSectionId, HomeSectionDefinition> = {
  "trust-bar": {
    id: "trust-bar",
    label: "信任區 · 為什麼選康姿健",
    description: "四格花瓣統計與認證說明",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "editorial-chapters": {
    id: "editorial-chapters",
    label: "品牌故事（三章節）",
    description: "About / Promise / Space 左圖右文敘事",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "treatment-slider": {
    id: "treatment-slider",
    label: "精選療程輪播",
    description: "拉取 CMS 標記「精選」的療程",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "skin-analysis": {
    id: "skin-analysis",
    label: "量膚定制 Teaser",
    description: "量膚流程 + Process 四格",
    defaultEnabled: true,
    editableFields: [
      "eyebrow",
      "title",
      "body",
      "highlight",
      "image",
      "imageAlt",
      "linkLabel",
      "secondaryLinkLabel",
      "secondaryLinkHref",
    ],
    defaults: {
      eyebrow: "Skin Analysis",
      title: "量膚定制 · TEGODER 果酸",
      body: "四款果酸方向 — 暗瘡、敏感、美白、抗老。先幫你量膚，再建議最啱配方，",
      highlight: "唔綁套票",
      image: images.treatments.peel.src,
      imageAlt: images.treatments.peel.alt,
      linkLabel: "預約量膚",
      secondaryLinkLabel: "了解量膚定制",
      secondaryLinkHref: "/skin-analysis",
    },
  },
  "featured-treatment": {
    id: "featured-treatment",
    label: "精選療程 Spotlight",
    description: "單一療程推廣（m.pen 等）",
    defaultEnabled: true,
    editableFields: ["eyebrow", "title", "body", "highlight", "image", "imageAlt", "linkLabel", "linkHref"],
    defaults: {
      eyebrow: "Featured Treatment",
      title: "m.pen 微針射頻膠原修復",
      body: "西班牙醫學級 Mesoestetic m.pen — 垂直進針更準，收毛孔、去凹凸洞、撫平細紋。",
      highlight: "單次 $880",
      image: promo.microneedle.src,
      imageAlt: promo.microneedle.alt,
      linkLabel: "了解微針療程",
      linkHref: "/treatments/microneedle-rf",
    },
  },
  "women-care": {
    id: "women-care",
    label: "女賓護理 Teaser",
    description: "女賓護理為主（區塊 ID：women-care）",
    defaultEnabled: true,
    editableFields: ["eyebrow", "title", "body", "highlight", "image", "imageAlt", "linkLabel", "linkHref"],
    defaults: {
      eyebrow: "Women's Care",
      title: "女賓護理為主",
      body: "量膚定制、果酸煥膚、醫美儀器 — 屯門一人工作室，單次收費、唔綁套票。",
      highlight: "痛症推拿只限女賓",
      image: "/videos/reels/posters/11.jpg",
      imageAlt: "康姿健女賓護理 — 量膚定制、果酸煥膚與醫美儀器",
      linkLabel: "了解女賓療程",
      linkHref: "/treatments",
    },
  },
  wellness: {
    id: "wellness",
    label: "痛症理療 Teaser",
    description: "遠紅外線 + 傳統理療",
    defaultEnabled: true,
    editableFields: ["eyebrow", "title", "body", "linkLabel", "linkHref"],
    defaults: {
      eyebrow: "Wellness",
      title: "痛症理療 · 遠紅外線養生",
      body: "Dr. Rainbow 醫療級遠紅外線焗倉、Dr. Face 童顏機，配退背、拔罐、刮痧等傳統理療。痛症推拿只限女賓；做完 Facial 再焗一焗，由內到外排濕調理。",
      linkLabel: "了解痛症理療",
      linkHref: "/wellness",
    },
  },
  journal: {
    id: "journal",
    label: "醫美知識預覽",
    description: "最新 3 篇文章（來自 CMS）",
    defaultEnabled: true,
    editableFields: ["eyebrow", "title", "sectionDesc", "listLinkLabel", "linkHref"],
    defaults: {
      eyebrow: "Journal",
      title: "醫美知識",
      sectionDesc: "果酸、暗瘡、敏感肌 — 慢慢睇，慢慢了解。",
      listLinkLabel: "全部文章",
      linkHref: "/journal",
    },
  },
  testimonials: {
    id: "testimonials",
    label: "客人分享",
    description: "三則見證卡片",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "shop-reels": {
    id: "shop-reels",
    label: "店內短片",
    description: "來自 CMS 的短片網格",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "page-hub": {
    id: "page-hub",
    label: "全站導覽格",
    description: "主要頁面快速入口",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
  "booking-cta": {
    id: "booking-cta",
    label: "底部預約 CTA",
    description: "WhatsApp / 致電引導",
    defaultEnabled: true,
    editableFields: [],
    defaults: {},
  },
};

export const HOME_SECTION_FIELD_LABELS: Record<HomeSectionField, string> = {
  eyebrow: "英文小標",
  title: "主標題",
  body: "內文",
  highlight: "強調字（粉紅）",
  image: "圖片 URL",
  imageAlt: "圖片 alt",
  linkLabel: "主按鈕文案",
  linkHref: "主按鈕連結",
  secondaryLinkLabel: "次要連結文案",
  secondaryLinkHref: "次要連結路徑",
  sectionDesc: "區塊描述",
  listLinkLabel: "列表連結文案",
};
