export type TreatmentDetailContent = {
  suitableFor: string;
  features: string[];
  processSteps: string[];
  aftercare: string[];
  notes?: string[];
};

export const treatmentDetails: Record<string, TreatmentDetailContent> = {
  "tegoder-peel": {
    suitableFor:
      "油性暗瘡、敏感泛紅、暗沉蠟黃、熟齡鬆弛等膚況。首次建議先量膚分析，再選擇專屬果酸配方。",
    features: [
      "西班牙 TEGODER 醫學級果酸，4 款配方量膚後建議",
      "量膚定制濃度與停留時間，敏感肌亦可循序進行",
      "改善角質代謝、提亮膚色、疏通毛孔",
      "單次收費，不綁套票",
    ],
    processSteps: [
      "卸妝清潔與 TEGODER 量膚分析",
      "依膚況選擇果酸配方並進行煥膚",
      "中和、鎮靜修復與防曬提醒",
    ],
    aftercare: [
      "療程後 3–7 日加強防曬，避免高溫桑拿",
      "暫停家用酸類與磨砂產品，按建議使用修復產品",
    ],
    notes: ["孕婦、活躍性疱疹或嚴重濕疹請先告知"],
  },
  "plaser-rf": {
    suitableFor:
      "毛孔粗大、暗沉蠟黃、輕度鬆弛、反覆粉刺等。適合想同時改善膚質與緊緻度的客人。",
    features: [
      "德國 Flyzer 專利等離子 + 射頻雙技術",
      "隔空操作，減少表皮刺激",
      "殺菌、美白、緊緻多效合一",
      "非侵入式，恢復期短",
    ],
    processSteps: [
      "清潔與膚況評估，調校儀器參數",
      "分區進行等離子射頻護理",
      "冰導或修復精華鎮靜收尾",
    ],
    aftercare: [
      "24 小時內避免化妝與高溫環境",
      "加強保濕防曬，暫停刺激性護膚品",
    ],
  },
  "microneedle-rf": {
    suitableFor:
      "毛孔粗大、凹凸洞、痘疤、初老鬆弛。希望以微針射頻促進膠原再生的客人。",
    features: [
      "Mesoestetic m.pen 智能微針，垂直進針更精準",
      "射頻能量直達真皮，收毛孔、撫平凹凸",
      "可加配 Bioskin 精華加強修復",
      "明碼單次 $880",
    ],
    processSteps: [
      "清潔消毒，敷舒緩膏（視需要）",
      "m.pen 微針射頻分區操作",
      "修復面膜與居家護理建議",
    ],
    aftercare: [
      "24–48 小時避免沾水、化妝與運動出汗",
      "嚴格防曬，使用建議修復產品",
    ],
    notes: ["活躍性暗瘡發炎期需先評估"],
  },
  "plasma-acne": {
    suitableFor:
      "暗瘡肌、油脂粒、毛囊炎、毛孔粗大。想控油抗炎又唔想太刺激嘅客人。",
    features: [
      "等離子技術抗炎控油、收細毛孔",
      "針對暗瘡菌與過剩油脂",
      "可加配 Bioskin 精華 ($300)",
      "明碼單次 $680",
    ],
    processSteps: [
      "深層清潔與粉刺清理（視膚況）",
      "等離子抗痘模式分區護理",
      "鎮靜修復與控油建議",
    ],
    aftercare: [
      "避免用手擠壓痘痘",
      "使用清爽保濕，避免厚重油分",
    ],
  },
  "plasma-peel": {
    suitableFor:
      "敏感肌、乾燥粗糙、熟齡乾紋、膚色不均。想溫和更新角質又不想太刺激。",
    features: [
      "等離子溫和煥膚，熟齡肌與敏感肌皆可循序進行",
      "改善粗糙觸感與細紋",
      "配合修復步驟，減少泛紅",
      "單次收費，量膚後建議療程間隔",
    ],
    processSteps: [
      "清潔與膚況評估",
      "等離子煥膚模式操作",
      "修復精華與防曬提醒",
    ],
    aftercare: ["加強保濕防曬", "暫停家用酸類產品"],
  },
  collazen: {
    suitableFor:
      "鬆弛下垂、暗沉缺水、想一次過完成清潔、補濕、拉提、膠原、冷卻修復的客人。",
    features: [
      "COLLAZEN Tornado 五合一：清潔、補濕、HIFU、RF、Cryo",
      "一機多效，流程緊湊",
      "針對輪廓與膠原流失",
      "可按膚況調整探頭組合",
    ],
    processSteps: [
      "卸妝清潔與膚況分析",
      "依序使用多探頭進行綜合護理",
      "Cryo 冷卻修復收尾",
    ],
    aftercare: ["療程後加強保濕", "避免即日高溫桑拿或激烈運動"],
  },
  hifu: {
    suitableFor:
      "輪廓鬆弛、法令紋、下顎線模糊、初老下垂。想非侵入式拉提的客人。",
    features: [
      "高能聚焦超聲波直達 SMAS 層",
      "刺激膠原收緊，無開刀恢復期",
      "針對面部輪廓線條",
      "效果循序顯現，建議量膚後規劃",
    ],
    processSteps: [
      "清潔與標定拉提區域",
      "HIFU 探頭分層操作",
      "修復鎮靜與居家護理建議",
    ],
    aftercare: [
      "少數人可能有輕微紅腫，一般數小時內消退",
      "加強防曬與保濕",
    ],
    notes: ["孕婦、金屬植入物或嚴重皮膚病請先告知"],
  },
  "laser-spot": {
    suitableFor:
      "色斑、曬斑、膚色不均、暗沉。持有 ITEC LV4 激光資歷，可安全操作醫療級激光。",
    features: [
      "Genelux Lite 等醫療級激光設備",
      "針對色素沉澱分層處理",
      "改善整體透亮感",
      "療程前需評估膚色與色斑類型",
    ],
    processSteps: [
      "量膚分析與色斑評估",
      "清潔後進行激光嫩膚 / 祛斑",
      "修復面膜與嚴格防曬提醒",
    ],
    aftercare: [
      "療程後嚴格防曬，避免紫外線",
      "結痂期勿自行剝落",
    ],
    notes: ["近期嚴重曬傷或服用感光藥物請先告知"],
  },
  exosome: {
    suitableFor:
      "初老、暗沉、敏感修復、膚質粗糙。想從細胞層面促進修復與再生。",
    features: [
      "外泌體成分促進細胞溝通與修復",
      "改善整體膚質與光澤",
      "可配合其他儀器加強滲透",
      "適合術後或倦肌急救",
    ],
    processSteps: [
      "清潔與膚況評估",
      "外泌體導入（可配合微針或電導）",
      "修復鎮靜收尾",
    ],
    aftercare: ["加強保濕", "避免即日刺激性護膚"],
  },
};

export function getTreatmentDetails(slug: string) {
  return treatmentDetails[slug];
}
