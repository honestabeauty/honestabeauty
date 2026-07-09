/** CMS 儀表板用 — 站內轉換追蹤事件目錄（對應 dataLayer / GA4） */

export type TrackingEventRow = {
  id: string;
  label: string;
  page?: string;
};

export const TRACKING_EVENT_GROUPS: {
  title: string;
  description: string;
  events: TrackingEventRow[];
}[] = [
  {
    title: "首頁主視覺",
    description: "主視覺區 CTA 與跑馬燈導覽",
    events: [
      { id: "cta_whatsapp_hero", label: "WhatsApp 預約量膚", page: "/" },
      { id: "cta_instagram_hero", label: "Instagram DM", page: "/" },
      { id: "cta_hero_skin_flow", label: "了解量膚流程", page: "/" },
      { id: "cta_hero_index_treatments", label: "跑馬燈 · 療程", page: "/" },
      { id: "cta_hero_index_skin", label: "跑馬燈 · 量膚", page: "/" },
      { id: "cta_hero_index_wellness", label: "跑馬燈 · 痛症", page: "/" },
      { id: "cta_hero_index_journal", label: "跑馬燈 · 知識", page: "/" },
    ],
  },
  {
    title: "全站導覽",
    description: "Header、手機選單、頁尾",
    events: [
      { id: "cta_header_book_desktop", label: "預約（桌機）" },
      { id: "cta_header_book_mobile", label: "預約（手機）" },
      { id: "cta_whatsapp_mobile_bar", label: "底部列 WhatsApp" },
      { id: "cta_instagram_mobile_bar", label: "底部列 Instagram" },
      { id: "cta_phone_mobile_bar", label: "底部列致電" },
    ],
  },
  {
    title: "預約漏斗",
    description: "引導式預約三步流程",
    events: [
      { id: "funnel_step_1", label: "步驟 1 · 選擇意向" },
      { id: "funnel_step_2", label: "步驟 2 · 聯絡方式" },
      { id: "funnel_step_3", label: "步驟 3 · 確認送出" },
    ],
  },
  {
    title: "療程與內容",
    description: "列表篩選、詳情、相關連結",
    events: [
      { id: "cta_whatsapp_treatment_detail_hero", label: "療程詳情 WhatsApp", page: "/treatments/*" },
      { id: "cta_whatsapp_treatments_filtered", label: "療程篩選後 WhatsApp", page: "/treatments" },
      { id: "cta_home_treatments_all", label: "首頁查看全部療程", page: "/" },
      { id: "cta_journal_all", label: "首頁全部文章", page: "/" },
    ],
  },
];

export const GA4_METRIC_HINTS = [
  {
    metric: "平均參與時間",
    ga4Path: "報表 → 參與度 → 網頁和畫面",
    note: "GA4 自動計算停留；無需在 CMS 重複紀錄。",
  },
  {
    metric: "generate_lead",
    ga4Path: "報表 → 參與度 → 事件",
    note: "站內 CTA 點擊會推送 dataLayer 事件，請在 GTM 對應 GA4 事件。",
  },
  {
    metric: "funnel_step",
    ga4Path: "探索 → 漏斗探索",
    note: "預約引導三步可建立自訂漏斗。",
  },
  {
    metric: "page_engagement",
    ga4Path: "報表 → 參與度 → 事件",
    note: "離開頁面時推送停留秒數（≥3 秒）。",
  },
] as const;

export function getAnalyticsStatus() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return {
    gtmId: gtmId || null,
    gaId: gaId || null,
    active: Boolean(gtmId || gaId),
    mode: gtmId ? ("gtm" as const) : gaId ? ("ga4" as const) : ("none" as const),
  };
}
