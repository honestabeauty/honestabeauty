export const whatsappMessages = {
  default: "你好，我想預約康姿健療程諮詢。",
  skinAnalysis: "你好，我想預約量膚分析。",
  firstVisit: "你好，我是首次預約，想了解量膚分析流程。",
  treatmentBooking: "你好，我想預約療程諮詢。",
  wellness: "你好，我想了解痛症理療 / Dr. Rainbow 遠紅外線焗倉。",
  other: "你好，我有其他查詢，想聯絡康姿健。",
  peelType: (name: string) =>
    `你好，我想了解 TEGODER 果酸「${name}」是否適合我，想預約量膚分析。`,
  treatment: (name: string) => `你好，我想預約「${name}」諮詢。`,
  filteredTreatments: (category: string, problem: string) => {
    const parts = ["你好，我想預約療程諮詢"];
    if (category !== "全部") parts.push(`類型：${category}`);
    if (problem !== "全部") parts.push(`肌膚問題：${problem}`);
    return parts.join("，") + "。";
  },
} as const;
