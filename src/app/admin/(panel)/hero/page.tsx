import { resetHeroSettingsAction, saveHeroSettings } from "@/app/admin/actions";
import { AdminComboSelect } from "@/app/admin/components/AdminComboSelect";
import { AdminOverrideBadge } from "@/app/admin/components/AdminOverrideBadge";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";
import { getAdminSiteSettings } from "@/lib/cms/queries";
import { mergeHeroContent } from "@/lib/cms/hero";
import {
  CMS_NAV_LABELS,
  CMS_NAV_NUMBERS,
  CMS_SECONDARY_LINK_LABELS,
} from "@/lib/cms/admin-field-options";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";
import { HERO_MAX_SLIDES, type HeroMarqueeCred } from "@/data/hero";
import Link from "next/link";

function credBadgeValue(highlight: HeroMarqueeCred["highlight"]) {
  if (!highlight) return "none";
  return highlight;
}

export default async function AdminHeroPage() {
  const [settings, pathOptions] = await Promise.all([
    getAdminSiteSettings(),
    getCmsPathOptions(),
  ]);
  const hero = mergeHeroContent(settings?.hero);
  const hasHeroOverrides = Boolean(settings?.hero);
  const slideSlots = Array.from({ length: HERO_MAX_SLIDES }, (_, i) => hero.slides[i] ?? { src: "", alt: "" });

  return (
    <>
      <AdminPageHeader
        title={
          <>
            首頁主視覺 <AdminOverrideBadge overridden={hasHeroOverrides} />
          </>
        }
        lead="首頁最上方輪播主圖、標題、英文標語與按鈕。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "首頁主視覺" },
        ]}
        relatedLinks={[
          { label: "首頁區塊", href: "/admin/home-sections" },
          { label: "共用文案區塊", href: "/admin/content" },
        ]}
        relatedLabel="首頁其他可改"
        previewHref="/"
        guideHref="/admin/guide#hero"
      >
        {hasHeroOverrides ? (
          <form action={resetHeroSettingsAction}>
            <button type="submit" className="kz-admin__btn kz-admin__btn--ghost">
              還原預設
            </button>
          </form>
        ) : null}
      </AdminPageHeader>
      <form action={saveHeroSettings} className="kz-admin__card kz-admin__form max-w-2xl">
        <AdminTips
          items={[
            "留空欄位會使用網站預設值；標示「已自訂」代表已改過。",
            "每張輪播圖建議橫向；圖片說明文字有助無障礙與搜尋。",
            "儲存後頂部會出現綠色提示，可一鍵預覽前台。",
          ]}
        />

        <p className="kz-admin__related kz-admin__related--block">
          <span className="kz-admin__related-label">首頁其他可改：</span>
          <Link href="/admin/home-sections" className="kz-admin__related-link">
            首頁區塊
          </Link>
          <span className="kz-admin__related-sep">·</span>
          <Link href="/admin/content" className="kz-admin__related-link">
            共用文案區塊
          </Link>
          <span className="kz-admin__related-sep">·</span>
          <Link href="/admin/videos" className="kz-admin__related-link">
            店內短片
          </Link>
        </p>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">主視覺 · 輪播圖</legend>
          <p className="text-xs text-kz-plum-muted">
            最多 {HERO_MAX_SLIDES} 張。只填第一張時維持單圖；填兩張或以上，首頁每約 5.5 秒自動淡入淡出輪播（滑鼠移入暫停）。
          </p>
          {slideSlots.map((slide, index) => {
            const n = index + 1;
            return (
              <MediaFieldPicker
                key={n}
                urlName={`slide_${n}_image`}
                altName={`slide_${n}_alt`}
                label={`輪播圖 ${n}${n === 1 ? "（必填才顯示主視覺）" : "（選填）"}`}
                defaultUrl={slide.src || undefined}
                defaultAlt={slide.alt || undefined}
                folder="hero"
                specKey="hero"
                hint={n === 1 ? "建議橫向編輯照；上傳或從媒體庫選擇。" : "留空則不加入輪播。"}
              />
            );
          })}
          <div className="kz-admin__field">
            <label htmlFor="watermark">背景裝飾大字</label>
            <input
              id="watermark"
              name="watermark"
              defaultValue={hero.watermark}
              placeholder="SKIN"
            />
          </div>
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">標題文案</legend>
          <div className="kz-admin__field">
            <label htmlFor="kicker">英文小標</label>
            <input
              id="kicker"
              name="kicker"
              defaultValue={hero.kicker}
              placeholder="HONG CHI KIN · Bespoke Skincare"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="kz-admin__field">
              <label htmlFor="title_line_1">主標題第 1 行</label>
              <input
                id="title_line_1"
                name="title_line_1"
                defaultValue={hero.titleLines[0]}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="title_line_2">主標題第 2 行</label>
              <input
                id="title_line_2"
                name="title_line_2"
                defaultValue={hero.titleLines[1]}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="title_line_3">主標題第 3 行</label>
              <input
                id="title_line_3"
                name="title_line_3"
                defaultValue={hero.titleLines[2]}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="kz-admin__field">
              <label htmlFor="rail_tagline_1">標題 rail ①</label>
              <input
                id="rail_tagline_1"
                name="rail_tagline_1"
                defaultValue={hero.railTaglines[0]}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="rail_tagline_2">標題 rail ②</label>
              <input
                id="rail_tagline_2"
                name="rail_tagline_2"
                defaultValue={hero.railTaglines[1]}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="rail_tagline_3">標題 rail ③</label>
              <input
                id="rail_tagline_3"
                name="rail_tagline_3"
                defaultValue={hero.railTaglines[2]}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">賣點徽章</legend>
          <p className="text-xs text-kz-plum-muted">
            徽章顏色（粉／綠／灰）固定；只可改文字。
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="kz-admin__field">
              <label htmlFor="sell_label_1">徽章 ①（粉）</label>
              <input
                id="sell_label_1"
                name="sell_label_1"
                defaultValue={hero.sellBadges[0].label}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="sell_label_2">徽章 ②（綠）</label>
              <input
                id="sell_label_2"
                name="sell_label_2"
                defaultValue={hero.sellBadges[1].label}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="sell_label_3">徽章 ③（灰）</label>
              <input
                id="sell_label_3"
                name="sell_label_3"
                defaultValue={hero.sellBadges[2].label}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">英文裝飾 tagline</legend>
          <p className="text-xs text-kz-plum-muted">
            對應主視覺右側藝術排版英文句；分段填寫以保留原有視覺層次。
          </p>
          <div className="kz-admin__field">
            <label htmlFor="tagline_aria">完整句子（螢幕報讀用 aria-label）</label>
            <input
              id="tagline_aria"
              name="tagline_aria"
              defaultValue={hero.tagline.ariaLabel}
              placeholder="Your Skin is Your Best Accessory"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="kz-admin__field">
              <label htmlFor="tagline_line1_whisper">第一行 · 細字</label>
              <input
                id="tagline_line1_whisper"
                name="tagline_line1_whisper"
                defaultValue={hero.tagline.line1Whisper}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="tagline_line1_em">第一行 · 強調字</label>
              <input
                id="tagline_line1_em"
                name="tagline_line1_em"
                defaultValue={hero.tagline.line1Em}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="tagline_line1_script">第一行 · 手寫段</label>
              <input
                id="tagline_line1_script"
                name="tagline_line1_script"
                defaultValue={hero.tagline.line1Script}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="kz-admin__field">
              <label htmlFor="tagline_line2_primary">第二行 · 主字</label>
              <input
                id="tagline_line2_primary"
                name="tagline_line2_primary"
                defaultValue={hero.tagline.line2Primary}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="tagline_line2_accent">第二行 · 強調字</label>
              <input
                id="tagline_line2_accent"
                name="tagline_line2_accent"
                defaultValue={hero.tagline.line2Accent}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">行動按鈕</legend>
          <div className="kz-admin__field">
            <label htmlFor="whatsapp_label">WhatsApp 主按鈕文案</label>
            <input
              id="whatsapp_label"
              name="whatsapp_label"
              defaultValue={hero.whatsappLabel}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="kz-admin__field">
              <label htmlFor="secondary_link_label">次要連結文案</label>
              <AdminPresetSelect
                id="secondary_link_label"
                name="secondary_link_label"
                options={CMS_SECONDARY_LINK_LABELS}
                defaultValue={hero.secondaryLinkLabel}
              />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="secondary_link_href">次要連結路徑</label>
              <AdminComboSelect
                id="secondary_link_href"
                name="secondary_link_href"
                options={pathOptions}
                defaultValue={hero.secondaryLinkHref}
                allowEmpty={false}
                customPlaceholder="/skin-analysis"
              />
            </div>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="instagram_label">Instagram DM 連結文案</label>
            <input
              id="instagram_label"
              name="instagram_label"
              defaultValue={hero.instagramLabel}
              placeholder="Instagram DM"
            />
          </div>
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">底部 marquee · 快速導覽</legend>
          <p className="text-xs text-kz-plum-muted">
            四個編號連結會在主視覺底部跑馬燈循環顯示。
          </p>
          {hero.marqueeLinks.map((link, index) => {
            const n = index + 1;
            return (
              <div key={link.ctaId} className="grid gap-4 sm:grid-cols-3">
                <div className="kz-admin__field">
                  <label htmlFor={`nav_num_${n}`}>導覽 {n} · 編號</label>
                  <AdminPresetSelect
                    id={`nav_num_${n}`}
                    name={`nav_num_${n}`}
                    options={CMS_NAV_NUMBERS}
                    defaultValue={link.num}
                    allowCustom={false}
                  />
                </div>
                <div className="kz-admin__field">
                  <label htmlFor={`nav_label_${n}`}>導覽 {n} · 標籤</label>
                  <AdminPresetSelect
                    id={`nav_label_${n}`}
                    name={`nav_label_${n}`}
                    options={CMS_NAV_LABELS}
                    defaultValue={link.label}
                  />
                </div>
                <div className="kz-admin__field">
                  <label htmlFor={`nav_href_${n}`}>導覽 {n} · 路徑</label>
                  <AdminComboSelect
                    id={`nav_href_${n}`}
                    name={`nav_href_${n}`}
                    options={pathOptions}
                    defaultValue={link.href}
                    allowEmpty={false}
                    customPlaceholder="/treatments"
                  />
                </div>
              </div>
            );
          })}
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">底部 marquee · 專業認證</legend>
          <p className="text-xs text-kz-plum-muted">
            最多三條認證標籤；留空則不顯示。徽章可選「得獎」或「儀器」小標。
          </p>
          {hero.marqueeCreds.map((cred, index) => {
            const n = index + 1;
            return (
              <div key={n} className="grid gap-4 sm:grid-cols-2">
                <div className="kz-admin__field">
                  <label htmlFor={`cred_label_${n}`}>認證 {n} · 文字</label>
                  <input
                    id={`cred_label_${n}`}
                    name={`cred_label_${n}`}
                    defaultValue={cred.label}
                  />
                </div>
                <div className="kz-admin__field">
                  <label htmlFor={`cred_badge_${n}`}>認證 {n} · 小標</label>
                  <select
                    id={`cred_badge_${n}`}
                    name={`cred_badge_${n}`}
                    defaultValue={credBadgeValue(cred.highlight)}
                  >
                    <option value="none">無小標</option>
                    <option value="award">得獎</option>
                    <option value="device">儀器</option>
                  </select>
                </div>
              </div>
            );
          })}
        </fieldset>

        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          儲存主視覺設定
        </button>
      </form>
    </>
  );
}
