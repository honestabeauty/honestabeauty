export const site = {
  name: "康姿健",
  nameEn: "HONG CHI KIN",
  legalName: "康姿健理療",
  tagline: "Your Skin is Your Best Accessory",
  subtitle: "屯門美容 · 皮膚管理 · 痛症理療",
  serviceKeywords:
    "屯門美容｜激光祛斑｜膠原提升｜等離子淨痘煥膚｜退背",
  description:
    "屯門溫馨美容一人工作室。皮膚管理、痛症理療、激光祛斑、膠原提升、等離子淨痘、退背。先量膚再建議，單次收費，唔綁套票。",
  studioTag: "溫馨美容一人工作室",
  services: ["屯門美容", "皮膚管理", "痛症理療"],
  location: "屯門",
  phone: "9770 9300",
  phoneTel: "85297709300",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "85297709300",
  whatsappMessage: encodeURIComponent("你好，我想預約康姿健療程諮詢。"),
  instagram: "https://www.instagram.com/hong_chi_kin",
  threads: "https://www.threads.com/@hong_chi_kin",
  facebook:
    "https://www.facebook.com/profile.php?id=100066932628186",
  xiaohongshu: "https://xhslink.com/m/7zoVvFMANdv",
  hours: "每日 09:00 – 21:00",
  address: "屯門紅橋菁菱徑9號華利大廈12號（地舖）",
  mapQuery: "康姿健 屯門紅橋菁菱徑9號華利大廈12號",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=%E5%BA%B7%E5%A7%BF%E5%81%A5+%E5%B1%AF%E9%96%80%E7%B4%85%E6%A9%8B%E8%8F%81%E8%8F%B1%E5%BE%919%E8%99%9F%E8%8F%AF%E5%88%A9%E5%A4%A7%E5%BB%8812%E8%99%9F&hl=zh-HK&z=17&output=embed",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=%E5%BA%B7%E5%A7%BF%E5%81%A5+%E5%B1%AF%E9%96%80%E7%B4%85%E6%A9%8B%E8%8F%81%E8%8F%B1%E5%BE%919%E8%99%9F%E8%8F%AF%E5%88%A9%E5%A4%A7%E5%BB%8812%E8%99%9F",
  businessHours: {
    schedule: [
      { day: 1, label: "星期一", hours: "09:00 – 21:00" },
      { day: 2, label: "星期二", hours: "09:00 – 21:00" },
      { day: 3, label: "星期三", hours: "09:00 – 21:00" },
      { day: 4, label: "星期四", hours: "09:00 – 21:00" },
      { day: 5, label: "星期五", hours: "09:00 – 21:00" },
      { day: 6, label: "星期六", hours: "09:00 – 21:00" },
      { day: 0, label: "星期日", hours: "09:00 – 21:00" },
    ],
    note: "營業時間或會因突發事件臨時調整，請向小店查詢",
  },
  credentials: [
    "IBDR 2025 金獎",
    "ITEC LV4 激光",
    "姊妹美容優秀",
    "屯門地舖",
  ],
  credentialsFull: [
    "香港資歷架構及英國 ITEC 認證 LV2 國際專業美容師資格",
    "英國 ITEC 認證 LV4 國際專業激光美容師資格",
    "IBDR 香港國際美容技能大賽 2025 面部護理金獎",
    "「2025 姊妹美容優秀專業美容院」",
  ],
} as const;

export function whatsappUrl(message?: string) {
  const text = message ? encodeURIComponent(message) : site.whatsappMessage;
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function telUrl() {
  return `tel:+${site.phoneTel}`;
}

export const navItems = [
  { label: "療程", href: "/treatments" },
  { label: "量膚定制", href: "/skin-analysis" },
  { label: "痛症理療", href: "/wellness" },
  { label: "醫美知識", href: "/journal" },
  { label: "常見問題", href: "/faq" },
  { label: "關於", href: "/about" },
] as const;

/** 全站主要頁面 — 首頁導覽格與頁尾完整連結 */
export const sitePages = [
  {
    label: "療程",
    href: "/treatments",
    eyebrow: "Treatments",
    desc: "激光祛斑、膠原提升、微針射頻、果酸煥膚等醫美級療程。",
  },
  {
    label: "量膚定制",
    href: "/skin-analysis",
    eyebrow: "Skin Analysis",
    desc: "西班牙 TEGODER 果酸 — 先分析膚況，再建議專屬配方。",
  },
  {
    label: "醫美知識",
    href: "/journal",
    eyebrow: "Journal",
    desc: "果酸、暗瘡、敏感肌 — 慢慢睇，慢慢了解。",
  },
  {
    label: "痛症理療",
    href: "/wellness",
    eyebrow: "Wellness",
    desc: "遠紅外線焗倉、退背、拔罐、刮痧等傳統理療。",
  },
  {
    label: "關於",
    href: "/about",
    eyebrow: "About",
    desc: "工作室理念、專業資歷、營業時間與地圖。",
  },
  {
    label: "常見問題",
    href: "/faq",
    eyebrow: "FAQ",
    desc: "價格、預約、療程 — 十五條最常問嘅問題。",
  },
  {
    label: "預約",
    href: "/book",
    eyebrow: "Booking",
    desc: "三步選好意向，透過 WhatsApp、Instagram 或致電聯絡。",
  },
] as const;

export const footerNavItems = sitePages;
