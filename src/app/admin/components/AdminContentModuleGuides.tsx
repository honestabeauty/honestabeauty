import type { ReactNode } from "react";

export function AdminFieldHint({ children }: { children: ReactNode }) {
  return <p className="kz-admin__field-hint">{children}</p>;
}

export function AdminContentPreviewLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="kz-admin__content-preview-link">
      {children}
    </a>
  );
}

function GuideShell({
  location,
  note,
  children,
}: {
  location: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="kz-admin__module-guide">
      <p className="kz-admin__module-guide__location">{location}</p>
      {children}
      {note ? <p className="kz-admin__module-guide__note">{note}</p> : null}
    </div>
  );
}

/** 首頁四瓣數據卡 */
export function TrustPetalFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 首頁「為什麼選康姿健」"
      note="四張卡片圍成花瓣形；⑤ 整張卡片可點擊，由「點擊卡片前往」設定。"
    >
      <div className="kz-admin__module-guide__cols">
        <div className="kz-admin__module-guide__block">
          <p className="kz-admin__module-guide__heading">四瓣方位</p>
          <div className="kz-admin__module-guide__grid-2x2" aria-hidden>
            {[
              ["左上", "tl"],
              ["右上", "tr"],
              ["左下", "bl"],
              ["右下", "br"],
            ].map(([label, code]) => (
              <div key={code} className="kz-admin__module-guide__cell">
                <span className="kz-admin__module-guide__cell-label">{label}</span>
                <span className="kz-admin__module-guide__cell-code">{code}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="kz-admin__module-guide__block">
          <p className="kz-admin__module-guide__heading">單張卡片 · 由上至下</p>
          <div className="kz-admin__module-guide__stack" aria-hidden>
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
              ① 頂部小字
            </span>
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--hero">
              ② 中間大字
            </span>
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
              ③ 大字下方標題
            </span>
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
              ④ 底部說明
            </span>
          </div>
        </div>
      </div>
    </GuideShell>
  );
}

/** 量膚流程四步驟 */
export function ProcessStepsFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 首頁量膚區、/skin-analysis、/men、/wellness 底部"
      note="每個步驟左側顯示編號，右側為標題 + 說明。"
    >
      <div className="kz-admin__module-guide__stack kz-admin__module-guide__stack--wide" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
          英文小標（例 Skin Analysis）
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
          區塊主標題（例 量膚定制流程）
        </span>
        <div className="kz-admin__module-guide__step-row">
          <span className="kz-admin__module-guide__step-num">01</span>
          <div className="kz-admin__module-guide__step-body">
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
              步驟標題
            </span>
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
              步驟說明
            </span>
          </div>
        </div>
        <div className="kz-admin__module-guide__step-row">
          <span className="kz-admin__module-guide__step-num">02</span>
          <div className="kz-admin__module-guide__step-body">
            <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
              … 共四步
            </span>
          </div>
        </div>
      </div>
    </GuideShell>
  );
}

/** 首頁品牌敘事章節 */
export function NarrativeChapterFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 首頁三個圖文敘事章節（左右交替排版）"
      note="奇數章節圖左文右；偶數章節圖右文左。圖片建議 4:5 直式。"
    >
      <div className="kz-admin__module-guide__split-preview" aria-hidden>
        <div className="kz-admin__module-guide__image-placeholder">章節圖片</div>
        <div className="kz-admin__module-guide__stack">
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
            章節標籤（英文小標）
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
            章節主標題
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
            內文段落 1
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
            內文段落 2
          </span>
        </div>
      </div>
    </GuideShell>
  );
}

/** 首頁客人評價 */
export function TestimonialsFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 首頁「客人分享」區塊"
      note="區塊標題「客人分享」為固定文案；此處只編輯三則評價卡內容與順序。"
    >
      <div className="kz-admin__module-guide__quote-preview" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
          Voices · 客人分享（固定）
        </span>
        <div className="kz-admin__module-guide__quote-card">
          <span className="kz-admin__module-guide__quote-index">01</span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--quote">
            「評價內容 quote」
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
            客人稱呼 author
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
            附註 meta（例 屯門 · 回訪客人）
          </span>
        </div>
      </div>
    </GuideShell>
  );
}

/** 痛症頁 · 圖文服務列表 */
export function WellnessServicesFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · /wellness · 頁首下方 · 三個圖文服務區"
      note="奇數項圖左文右；偶數項圖右文左。左側數字 01、02、03 為固定排版。"
    >
      <div className="kz-admin__module-guide__split-preview" aria-hidden>
        <div className="kz-admin__module-guide__image-placeholder">① 服務海報圖</div>
        <div className="kz-admin__module-guide__stack">
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
            01（固定編號）
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
            ② 服務標題
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
            ③ 內文段落（每行一段）
          </span>
        </div>
      </div>
    </GuideShell>
  );
}

/** 痛症頁傳統護理 */
export function WellnessTraditionalFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · /wellness · 服務列表下方"
      note="頁尾備註後台會自動接上營業時間同地舖地址（來自站點設定）。"
    >
      <div className="kz-admin__module-guide__stack kz-admin__module-guide__stack--wide" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
          英文小標 sectionLabel
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
          區塊主標題
        </span>
        <ul className="kz-admin__module-guide__bullet-list">
          <li>項目列表 · 第一項</li>
          <li>項目列表 · 第二項</li>
          <li>…</li>
        </ul>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          頁尾備註 + 營業時間／地址（後半自動）
        </span>
      </div>
    </GuideShell>
  );
}

/** 關於頁聯絡區 */
export function AboutContactFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · /about 關於我們頁 · 底部聯絡面板"
      note="電話、WhatsApp、地址、地圖等資料來自「站點設定」，此處只改聯絡區標題。"
    >
      <div className="kz-admin__module-guide__panel-preview" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
          聯絡標題（可編輯）
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          電話 · WhatsApp · 地址 …（站點設定）
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          地圖（固定）
        </span>
      </div>
    </GuideShell>
  );
}

/** 信任區 · 標題下方引言（四瓣卡片上方） */
export function TrustIntroFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 四瓣卡片「上方」標題區"
      note="「Trust / 為什麼選康姿健」為固定文案；下方才是四瓣數據卡。"
    >
      <div className="kz-admin__module-guide__stack kz-admin__module-guide__stack--wide" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
          Trust（固定）
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
          為什麼選康姿健（固定）
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          引言段落 1
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          引言段落 2
        </span>
        <ul className="kz-admin__module-guide__bullet-list">
          <li>重點列表 · 第一項</li>
          <li>重點列表 · 第二項</li>
          <li>…</li>
        </ul>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted kz-admin__module-guide__slot--divider">
          ↓ 下方四瓣數據卡
        </span>
      </div>
    </GuideShell>
  );
}

type InnerPageCtaKind = "link" | "whatsapp" | "logo" | "none";

function ctaGuideLabel(kind: InnerPageCtaKind) {
  if (kind === "logo") return "品牌 Logo（固定元件，非文字按鈕）";
  if (kind === "whatsapp") return "WhatsApp 主按鈕";
  if (kind === "link") return "主按鈕（連結）";
  return "無按鈕";
}

/** 內頁頁首區 */
export function InnerPageHeroFieldGuide({
  pageLabel,
  pagePath,
  ctaKind,
}: {
  pageLabel: string;
  pagePath: string;
  ctaKind: InnerPageCtaKind;
}) {
  return (
    <GuideShell
      location={`前台位置 · ${pagePath} · 頁面頂部主視覺`}
      note="SEO 欄位不顯示在頁面上，只影響 Google 搜尋結果同瀏覽器分頁標題。"
    >
      <div className="kz-admin__module-guide__hero-preview" aria-hidden>
        <span className="kz-admin__module-guide__watermark">裝飾大字</span>
        <div className="kz-admin__module-guide__hero-body">
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--label">
            ① 英文小標
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title kz-admin__module-guide__slot--h1">
            ② 主標題
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
            ③ 副標內文
            <strong className="kz-admin__module-guide__highlight"> 強調字</strong>
          </span>
          <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--btn">
            ④ {ctaGuideLabel(ctaKind)}
          </span>
        </div>
      </div>
      <p className="kz-admin__module-guide__heading">{pageLabel} · 欄位對照</p>
    </GuideShell>
  );
}

/** 內頁灰底說明面板 */
export function InnerPagePanelFieldGuide() {
  return (
    <GuideShell
      location="前台位置 · 頁首下方 · 灰底說明面板"
      note="可拖曳排序、隱藏或新增面板；FAQ 頁的問答列表請至「常見問題」模組編輯。"
    >
      <div className="kz-admin__module-guide__panel-preview kz-admin__module-guide__panel-preview--wide" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--title">
          ① 面板標題
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          ② 內文段落
        </span>
        <ul className="kz-admin__module-guide__bullet-list">
          <li>③ 列表項目（選填）</li>
          <li>每行一項</li>
        </ul>
      </div>
    </GuideShell>
  );
}

/** SEO meta（內頁） */
export function SeoMetaFieldGuide() {
  return (
    <div className="kz-admin__module-guide kz-admin__module-guide--compact">
      <p className="kz-admin__module-guide__location">SEO · 不顯示在頁面內容</p>
      <div className="kz-admin__module-guide__seo-preview" aria-hidden>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--seo-title">
          瀏覽器分頁 / Google 標題
        </span>
        <span className="kz-admin__module-guide__slot kz-admin__module-guide__slot--muted">
          搜尋結果描述文字…
        </span>
      </div>
      <p className="kz-admin__module-guide__note">留空時使用主標題或預設描述。</p>
    </div>
  );
}
