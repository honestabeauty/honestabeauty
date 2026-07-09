import {
  aboutPanels,
  journalIntroPanels,
  skinAnalysisPanels,
  treatmentCategoryGuide,
  wellnessPanels,
  type ContentPanel,
} from "@/data/page-content";
import { site } from "@/data/site";

export const INNER_PAGE_IDS = [
  "skin-analysis",
  "wellness",
  "about",
  "journal",
  "treatments",
  "faq",
] as const;

export type InnerPageId = (typeof INNER_PAGE_IDS)[number];

export type PageHeroCtaKind = "link" | "whatsapp" | "logo" | "none";

export type PageHeroDefaults = {
  watermark: string;
  eyebrow: string;
  title: string;
  lead: string;
  leadHighlight?: string;
  metaTitle?: string;
  metaDescription?: string;
  ctaKind: PageHeroCtaKind;
  ctaLabel?: string;
  ctaHref?: string;
  ctaId?: string;
  whatsappMessageKey?: "skinAnalysis" | "wellness" | "default";
  imageSrc?: string;
  imageAlt?: string;
};

export type InnerPageDefinition = {
  id: InnerPageId;
  label: string;
  path: string;
  description: string;
  defaultHero: PageHeroDefaults;
  defaultPanels: ContentPanel[];
};

export const INNER_PAGE_REGISTRY: Record<InnerPageId, InnerPageDefinition> = {
  "skin-analysis": {
    id: "skin-analysis",
    label: "量膚定制",
    path: "/skin-analysis",
    description: "Hero + 三格說明面板",
    defaultHero: {
      watermark: "Skin",
      eyebrow: "Skin Analysis",
      title: "量膚定制",
      lead: "西班牙 TEGODER 醫學級果酸 — 4 款專屬配方，量膚之後",
      leadHighlight: "對症建議",
      metaDescription: "康姿健量膚定制 — 先分析膚況，再建議 TEGODER 果酸等專屬療程。",
      ctaKind: "whatsapp",
      ctaLabel: "預約量膚分析",
      ctaId: "cta_whatsapp_skin_hero",
      whatsappMessageKey: "skinAnalysis",
      imageSrc: "/images/promo/tegoder-peel.png",
      imageAlt: "TEGODER 量膚果酸 — 康姿健屯門皮膚管理",
    },
    defaultPanels: skinAnalysisPanels,
  },
  wellness: {
    id: "wellness",
    label: "痛症理療",
    path: "/wellness",
    description: "Hero + 三格說明面板",
    defaultHero: {
      watermark: "Wellness",
      eyebrow: "Pain & Wellness",
      title: "痛症理療 · 遠紅外線養生",
      lead: "皮膚管理之外，康姿健為女賓提供",
      leadHighlight: "Dr. Rainbow 遠紅外線與傳統痛症理療（推拿只限女賓）",
      metaDescription:
        "康姿健痛症理療 — Dr. Rainbow 遠紅外線焗倉、退背拔罐刮痧。痛症推拿只限女賓，屯門單次收費。",
      ctaKind: "whatsapp",
      ctaLabel: "WhatsApp 查詢",
      ctaId: "cta_whatsapp_wellness",
      whatsappMessageKey: "wellness",
      imageSrc: "/videos/reels/posters/11.jpg",
      imageAlt: "康姿健女賓護理服務 — 屯門地舖價目表",
    },
    defaultPanels: wellnessPanels,
  },
  about: {
    id: "about",
    label: "關於我們",
    path: "/about",
    description: "Hero（Logo）+ 理念／服務／資歷面板",
    defaultHero: {
      watermark: "About",
      eyebrow: site.nameEn,
      title: "關於我們",
      lead: `${site.legalName}｜${site.studioTag} — ${site.serviceKeywords}`,
      metaDescription: site.description,
      ctaKind: "logo",
    },
    defaultPanels: aboutPanels,
  },
  journal: {
    id: "journal",
    label: "醫美知識",
    path: "/journal",
    description: "Hero + 閱讀導引面板",
    defaultHero: {
      watermark: "Journal",
      eyebrow: site.nameEn,
      title: "醫美知識",
      lead: "果酸、暗瘡、敏感肌 — 慢慢睇，慢慢了解",
      leadHighlight: "療程原理同護膚小貼士",
      metaDescription: "康姿健醫美知識 — 55+ 篇專業貼文，涵蓋果酸、儀器、痛症理療與護膚貼士。",
      ctaKind: "link",
      ctaLabel: "量膚定制",
      ctaHref: "/skin-analysis",
      ctaId: "cta_journal_hero_skin",
    },
    defaultPanels: journalIntroPanels,
  },
  treatments: {
    id: "treatments",
    label: "療程總覽",
    path: "/treatments",
    description: "Hero + 療程類別導覽三格",
    defaultHero: {
      watermark: "Treatments",
      eyebrow: site.nameEn,
      title: "療程總覽",
      lead: "屯門一人小店，",
      leadHighlight: "量膚定制、單次收費、唔綁套票",
      metaDescription: "康姿健療程總覽 — 果酸、等離子、微針射頻、激光與痛症理療。屯門單次收費。",
      ctaKind: "link",
      ctaLabel: "引導式預約",
      ctaHref: "/book",
      ctaId: "cta_treatments_hero_book",
    },
    defaultPanels: treatmentCategoryGuide,
  },
  faq: {
    id: "faq",
    label: "常見問題",
    path: "/faq",
    description: "Hero 文案（FAQ 列表仍由 FAQ CMS 管理）",
    defaultHero: {
      watermark: "FAQ",
      eyebrow: site.nameEn,
      title: "常見問題",
      lead: "價錢、預約、療程同到店 — 整理客人最常問嘅十五條問題。",
      metaDescription: "康姿健常見問題 — 價格、預約、療程與到店須知等十五題。",
      ctaKind: "link",
      ctaLabel: "立即預約",
      ctaHref: "/book",
      ctaId: "cta_faq_hero_book",
    },
    defaultPanels: [],
  },
};
