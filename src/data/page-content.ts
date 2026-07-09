export type ContentPanel = {
  id: string;
  title: string;
  body?: string;
  list?: readonly string[];
};

export const treatmentCategoryGuide: ContentPanel[] = [
  {
    id: "peel",
    title: "果酸煥膚",
    body: "西班牙 TEGODER 果酸，量膚之後先揀專屬配方。幫你更新角質、提亮膚色、疏通毛孔。",
    list: ["油性 / 暗瘡", "敏感 / 泛紅", "暗沉 / 色素", "熟齡 / 乾燥"],
  },
  {
    id: "plasma",
    title: "等離子 · 射頻",
    body: "PLASER 隔空離子射頻、等離子抗痘煥膚等 — 抗炎控油、緊緻提亮，恢復期短。",
    list: ["暗瘡肌控油", "毛孔同鬆弛", "敏感肌溫和煥膚"],
  },
  {
    id: "advanced",
    title: "微針 · 激光 · HIFU",
    body: "m.pen 微針射頻、激光祛斑、HIFU 拉提 — 針對凹凸洞、色斑、輪廓下垂等進階需要。",
    list: ["微針射頻 $880 起", "ITEC LV4 激光", "非侵入式拉提"],
  },
];

export const skinAnalysisPanels: ContentPanel[] = [
  {
    id: "why-skin",
    title: "點解要先量膚？",
    body: "唔係每個人都適合同一款酸或者同一部機。量膚分析可以睇清楚油脂分泌、敏感程度、色素同屏障狀態，再建議最安全嘅路線 — 做唔做由你話事。",
  },
  {
    id: "tegoder",
    title: "TEGODER 醫學級果酸",
    body: "西班牙 TEGODER 係康姿健量膚定制嘅核心。四款果酸方向涵蓋油性暗瘡、敏感泛紅、暗沉色素同熟齡乾燥，濃度同停留時間跟住你當日膚況調。",
    list: [
      "量膚分析後建議專屬配方",
      "敏感肌都可以循序、溫和做",
      "單次收費，唔綁套票",
    ],
  },
  {
    id: "first-booking",
    title: "第一次點預約？",
    body: "如果未做過任何療程，建議第一次約「量膚分析」。分析完會一併講清楚適合咩酸、咩儀器，同預算、恢復期。",
    list: [
      "WhatsApp / IG DM 預約",
      "亦可以用官網引導式預約",
      "價錢：量膚後報價，部分療程有明碼單次價",
    ],
  },
];

export const wellnessPanels: ContentPanel[] = [
  {
    id: "beauty-wellness",
    title: "美容 + 養生，一齊做",
    body: "做完 Facial 再焗遠紅外線，由內到外促進循環同排汗，護膚品吸收都會好啲。好適合長吹冷氣、濕重攰、手腳凍嘅香港節奏。",
  },
  {
    id: "fir-diff",
    title: "遠紅外線同一般汗蒸有咩分別？",
    body: "Dr. Rainbow 釋放 4–14 微米遠紅外線，深入皮下大約 5 cm，唔係淨係表面發熱。躺平 30 分鐘就可以深層排汗，有 KFDA、FDA、CE 等認證。",
    list: ["Dr. Face 童顏機針對面部循環", "單次收費，WhatsApp 問清楚先都得"],
  },
  {
    id: "traditional-pain",
    title: "傳統痛症護理（只限女賓）",
    body: "退背、拔罐、刮痧等傳統推拿手法，疏通經絡、舒緩肩頸背腰攰。痛症推拿只限女賓；詳情同收費 WhatsApp 或 IG 問我哋就得。",
    list: ["退背 — 疏通經絡", "拔罐 — 祛濕散寒", "刮痧 — 排毒去火"],
  },
];

export const journalIntroPanels: ContentPanel[] = [
  {
    id: "read-slow",
    title: "慢慢睇，慢慢了解",
    body: "康姿健整理咗 55+ 篇醫美同護膚貼文，果酸、暗瘡、敏感肌、儀器療程、痛症養生都有。每篇都係店內實際做開嘅嘢，預約前睇吓會易明啲。",
  },
  {
    id: "reading-guide",
    title: "建議睇法",
    list: [
      "想了解果酸 → 揀「護膚知識」或「量膚定制」",
      "暗瘡 / 毛孔煩惱 → 儀器療程 + 護膚知識",
      "遠紅外線 / 痛症 → 痛症理療分類",
    ],
  },
];

export const aboutPanels: ContentPanel[] = [
  {
    id: "philosophy",
    title: "我們的理念",
    body: "康姿健以量膚定制為核心，結合西班牙醫學級護膚、儀器療程同傳統理療，為每位客人度身建議。屯門一人工作室，堅持單次收費、明碼實價、唔綁套票 — 喺安靜舒服嘅空間，專心享受屬於自己嘅護理時光。",
  },
  {
    id: "services",
    title: "服務範圍",
    list: [
      "皮膚管理 — 量膚定制、果酸煥膚、等離子淨痘",
      "醫美儀器 — 激光祛斑、膠原提升、微針射頻",
      "痛症理療 — 退背、拔罐、刮痧（推拿只限女賓）",
    ],
  },
  {
    id: "credentials",
    title: "專業資歷",
    list: [
      "香港資歷架構及英國 ITEC 認證 LV2 國際專業美容師資格",
      "英國 ITEC 認證 LV4 國際專業激光美容師資格",
      "IBDR 香港國際美容技能大賽 2025 面部護理金獎",
      "「2025 姊妹美容優秀專業美容院」",
    ],
  },
];

export const relatedPagesByPath: Record<
  string,
  readonly { href: string; label: string }[]
> = {
  "/treatments": [
    { href: "/skin-analysis", label: "量膚定制" },
    { href: "/book", label: "引導式預約" },
    { href: "/faq", label: "常見問題" },
  ],
  "/skin-analysis": [
    { href: "/treatments/tegoder-peel", label: "TEGODER 果酸療程" },
    { href: "/journal", label: "果酸知識文章" },
    { href: "/book", label: "引導式預約" },
  ],
  "/wellness": [
    { href: "/journal", label: "遠紅外線文章" },
    { href: "/treatments", label: "皮膚管理療程" },
    { href: "/book", label: "引導式預約" },
  ],
  "/journal": [
    { href: "/skin-analysis", label: "量膚定制" },
    { href: "/treatments", label: "療程總覽" },
    { href: "/wellness", label: "痛症理療" },
  ],
  "/faq": [
    { href: "/book", label: "引導式預約" },
    { href: "/about", label: "關於我們" },
    { href: "/treatments", label: "療程總覽" },
  ],
  "/about": [
    { href: "/treatments", label: "療程總覽" },
    { href: "/skin-analysis", label: "量膚定制" },
    { href: "/faq", label: "常見問題" },
  ],
};
