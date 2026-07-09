"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { resetInnerPageAction, saveInnerPageSettings } from "@/app/admin/actions";
import {
  AdminContentPreviewLink,
  AdminFieldHint,
  InnerPageHeroFieldGuide,
  InnerPagePanelFieldGuide,
  SeoMetaFieldGuide,
} from "@/app/admin/components/AdminContentModuleGuides";
import { AdminOverrideBadge } from "@/app/admin/components/AdminOverrideBadge";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { INNER_PAGE_IDS, INNER_PAGE_REGISTRY, type InnerPageId } from "@/data/inner-pages";
import type { AdminInnerPage } from "@/lib/cms/inner-pages";
import type { CmsSelectOption } from "@/lib/cms/admin-field-options";

type Props = {
  pages: AdminInnerPage[];
  pathOptions: CmsSelectOption[];
  pageOverrides: Record<InnerPageId, boolean>;
};

type PanelRow = {
  id: string;
  title: string;
  body: string;
  list: string;
  enabled: boolean;
  isCustom: boolean;
};

function reorderIdList(ids: string[], fromId: string, toId: string) {
  const next = [...ids];
  const from = next.indexOf(fromId);
  const to = next.indexOf(toId);
  if (from < 0 || to < 0 || from === to) return next;
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function toPanelRows(page: AdminInnerPage): PanelRow[] {
  return page.panels.map((panel) => ({
    id: panel.id,
    title: panel.title,
    body: panel.body ?? "",
    list: panel.list?.join("\n") ?? "",
    enabled: panel.enabled,
    isCustom: panel.isCustom,
  }));
}

export function AdminInnerPagesEditor({ pages, pathOptions, pageOverrides }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPageId = (searchParams.get("page") as InnerPageId | null) ?? "skin-analysis";
  const safePageId = INNER_PAGE_IDS.includes(initialPageId) ? initialPageId : "skin-analysis";

  const pageMap = useMemo(
    () => Object.fromEntries(pages.map((p) => [p.id, p])) as Record<InnerPageId, AdminInnerPage>,
    [pages],
  );

  const [pageId, setPageId] = useState<InnerPageId>(safePageId);
  const page = pageMap[pageId];
  const def = INNER_PAGE_REGISTRY[pageId];

  const [panelRows, setPanelRows] = useState<PanelRow[]>(() => toPanelRows(page));
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  // 同步 URL ?page= 參數（瀏覽器上一頁／下一頁）
  useEffect(() => {
    const fromUrl = searchParams.get("page") as InnerPageId | null;
    const nextId =
      fromUrl && INNER_PAGE_IDS.includes(fromUrl) ? fromUrl : safePageId;
    if (nextId === pageId) return;
    setPageId(nextId);
    setPanelRows(toPanelRows(pageMap[nextId]));
  }, [searchParams, pageId, pageMap, safePageId]);

  function switchPage(nextId: InnerPageId) {
    setPageId(nextId);
    setPanelRows(toPanelRows(pageMap[nextId]));
    router.replace(`/admin/pages?page=${nextId}`, { scroll: false });
  }

  function handleDrop(targetId: string) {
    if (!dragId) return;
    setPanelRows((prev) => {
      const order = prev.map((p) => p.id);
      const nextOrder = reorderIdList(order, dragId, targetId);
      return nextOrder.map((id) => prev.find((p) => p.id === id)!);
    });
    setDragId(null);
    setDragOverId(null);
  }

  function addPanel() {
    const id = `custom-${Date.now()}`;
    setPanelRows((prev) => [
      ...prev,
      { id, title: "新面板", body: "", list: "", enabled: true, isCustom: true },
    ]);
  }

  function removePanel(id: string) {
    setPanelRows((prev) => prev.filter((p) => p.id !== id));
  }

  const showCtaFields = def.defaultHero.ctaKind === "link";
  const showWhatsappFields = def.defaultHero.ctaKind === "whatsapp";
  const hasPanels = def.defaultPanels.length > 0 || panelRows.length > 0;

  return (
    <>
      <div className="kz-admin__card kz-admin__form kz-admin__inner-pages kz-admin__inner-pages-picker">
        <AdminTips
          items={[
            <>先選擇內頁，下方表單會<strong>立即切換</strong>為該頁欄位（含標題區、說明面板、SEO）。</>,
            <>各區塊附<strong>欄位對照圖</strong>；留空＝預設值，「已自訂」代表已改過。</>,
            <>痛症頁三項圖文服務在 <Link href="/admin/content#wellness">共用文案區塊 · 痛症護理</Link> 編輯。</>,
            <>詳見 <Link href="/admin/guide#inner-pages">使用說明 · 各頁標題</Link>。</>,
          ]}
        />

        <p className="kz-admin__related kz-admin__related--block">
          <span className="kz-admin__related-label">痛症頁還要改：</span>
          <Link href="/admin/content#wellness" className="kz-admin__related-link">
            共用文案區塊 · 痛症服務圖文
          </Link>
        </p>

        <div className="kz-admin__field">
          <label htmlFor="inner-page-select">選擇內頁</label>
          <select
            id="inner-page-select"
            value={pageId}
            onChange={(e) => switchPage(e.target.value as InnerPageId)}
          >
            {INNER_PAGE_IDS.map((id) => (
              <option key={id} value={id}>
                {INNER_PAGE_REGISTRY[id].label}（{INNER_PAGE_REGISTRY[id].path}）
              </option>
            ))}
          </select>
          <AdminFieldHint>切換內頁後，下方欄位會立即更新為該頁內容。</AdminFieldHint>
        </div>
      </div>

      {/* key={pageId}：React defaultValue 只在首次掛載生效，切換內頁必須重掛載表單 */}
      <form
        key={pageId}
        action={saveInnerPageSettings}
        className="kz-admin__card kz-admin__form kz-admin__inner-pages"
      >
        <input type="hidden" name="pageId" value={pageId} readOnly />
        <input
          type="hidden"
          name="panel_order"
          value={JSON.stringify(panelRows.map((p) => p.id))}
          readOnly
        />
        <input
          type="hidden"
          name="panel_ids"
          value={JSON.stringify(panelRows.map((p) => p.id))}
          readOnly
        />

        <AdminContentPreviewLink href={def.path}>
          在前台查看「{def.label}」↗
        </AdminContentPreviewLink>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">
            頁首主視覺 · {def.label}{" "}
            <AdminOverrideBadge overridden={pageOverrides[pageId]} />
          </legend>

          <InnerPageHeroFieldGuide
            pageLabel={def.label}
            pagePath={def.path}
            ctaKind={def.defaultHero.ctaKind}
          />

          <div className="kz-admin__field">
            <label htmlFor="hero_watermark">① 背景裝飾大字</label>
            <input
              id="hero_watermark"
              name="hero_watermark"
              defaultValue={page.hero.watermark}
              placeholder="例：Skin"
            />
            <AdminFieldHint>頁首右上方淡色大字裝飾，純視覺用途。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="hero_eyebrow">② 英文小標</label>
            <input
              id="hero_eyebrow"
              name="hero_eyebrow"
              defaultValue={page.hero.eyebrow}
              placeholder="例：Skin Analysis"
            />
            <AdminFieldHint>主標題上方、左側有橫線的英文標籤。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="hero_title">③ 主標題</label>
            <input
              id="hero_title"
              name="hero_title"
              defaultValue={page.hero.title}
              placeholder="例：量膚定制"
            />
            <AdminFieldHint>頁面 h1 大標題。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="hero_lead">④ 副標內文</label>
            <textarea
              id="hero_lead"
              name="hero_lead"
              rows={3}
              defaultValue={page.hero.lead}
              placeholder="副標主要文字…"
            />
            <AdminFieldHint>主標題下方段落；強調字會接在這段文字後面。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="hero_lead_highlight">④b 副標強調字（選填）</label>
            <input
              id="hero_lead_highlight"
              name="hero_lead_highlight"
              defaultValue={page.hero.leadHighlight ?? ""}
              placeholder={def.defaultHero.leadHighlight ?? "粉色顯示的關鍵字"}
            />
            <AdminFieldHint>接在副標內文後，前台以粉色粗體顯示。</AdminFieldHint>
          </div>

          <SeoMetaFieldGuide />

          <div className="kz-admin__field">
            <label htmlFor="hero_meta_title">SEO 標題（選填）</label>
            <input
              id="hero_meta_title"
              name="hero_meta_title"
              defaultValue={page.hero.metaTitle ?? ""}
              placeholder={page.hero.title}
            />
            <AdminFieldHint>瀏覽器分頁與 Google 搜尋結果標題。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="hero_meta_description">SEO 描述（選填）</label>
            <textarea
              id="hero_meta_description"
              name="hero_meta_description"
              rows={2}
              defaultValue={page.hero.metaDescription ?? ""}
              placeholder={def.defaultHero.metaDescription ?? page.hero.lead}
            />
            <AdminFieldHint>Google 搜尋結果下方的描述文字。</AdminFieldHint>
          </div>

          {def.defaultHero.ctaKind === "logo" ? (
            <AdminFieldHint>
              ⑤ 此頁頁首顯示品牌 Logo（關於頁），無文字按鈕可編輯。
            </AdminFieldHint>
          ) : null}

          {def.defaultHero.ctaKind !== "logo" && def.defaultHero.ctaKind !== "none" ? (
            <div className="kz-admin__field">
              <label htmlFor="hero_cta_label">⑤ 主按鈕文案</label>
              <input
                id="hero_cta_label"
                name="hero_cta_label"
                defaultValue={page.hero.ctaLabel ?? ""}
                placeholder="例：預約量膚分析"
              />
              <AdminFieldHint>頁首底部深色按鈕文字。</AdminFieldHint>
            </div>
          ) : null}
          {showCtaFields ? (
            <div className="kz-admin__field">
              <label htmlFor="hero_cta_href">⑥ 主按鈕連結</label>
              <AdminPresetSelect
                id="hero_cta_href"
                name="hero_cta_href"
                options={pathOptions}
                defaultValue={page.hero.ctaHref ?? ""}
              />
              <AdminFieldHint>按鈕點擊後前往的頁面。</AdminFieldHint>
            </div>
          ) : null}
          {showWhatsappFields ? (
            <AdminFieldHint>
              ⑤ WhatsApp 按鈕會自動帶預設訊息模板（量膚／痛症等），只需改按鈕文案。
            </AdminFieldHint>
          ) : null}
          {showCtaFields || showWhatsappFields ? (
            <div className="kz-admin__field">
              <label htmlFor="hero_cta_id">GA4 追蹤 ID（選填）</label>
              <input
                id="hero_cta_id"
                name="hero_cta_id"
                defaultValue={page.hero.ctaId ?? ""}
                placeholder="例：cta_whatsapp_skin_hero"
              />
              <AdminFieldHint>對應前台 data-cta-id，供 Google Analytics 追蹤點擊。</AdminFieldHint>
            </div>
          ) : null}
        </fieldset>

        {hasPanels ? (
          <fieldset className="kz-admin__fieldset">
            <legend className="kz-admin__legend">說明面板</legend>
            <InnerPagePanelFieldGuide />
            <p className="kz-admin__list-hint kz-admin__list-hint--reorder">
              拖曳 ⠿ 調整順序；取消勾選「顯示」可隱藏面板
            </p>

            <ul className="kz-admin__section-list">
              {panelRows.map((panel, index) => (
                <li
                  key={panel.id}
                  className={[
                    "kz-admin__section-item",
                    dragOverId === panel.id ? "kz-admin__section-item--drag-over" : "",
                    dragId === panel.id ? "kz-admin__section-item--dragging" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverId(panel.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverId === panel.id) setDragOverId(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    handleDrop(panel.id);
                  }}
                >
                  <div className="kz-admin__section-item__head">
                    <button
                      type="button"
                      className="kz-admin__drag-handle"
                      draggable
                      aria-label={`拖曳調整「${panel.title}」順序`}
                      onDragStart={(e) => {
                        setDragId(panel.id);
                        e.dataTransfer.effectAllowed = "move";
                      }}
                      onDragEnd={() => {
                        setDragId(null);
                        setDragOverId(null);
                      }}
                    >
                      ⠿
                    </button>
                    <div className="kz-admin__section-item__meta">
                      <span className="kz-admin__section-item__index">{index + 1}</span>
                      <div>
                        <p className="kz-admin__section-item__title">{panel.title}</p>
                        <p className="kz-admin__section-item__desc">{panel.id}</p>
                      </div>
                    </div>
                    <label className="kz-admin__section-toggle">
                      <input
                        type="checkbox"
                        name={`panel_${panel.id}_enabled`}
                        value="1"
                        defaultChecked={panel.enabled}
                      />
                      顯示
                    </label>
                    {panel.isCustom ? (
                      <button
                        type="button"
                        className="kz-admin__section-expand kz-admin__section-expand--danger"
                        onClick={() => removePanel(panel.id)}
                      >
                        刪除
                      </button>
                    ) : null}
                  </div>

                  <div className="kz-admin__section-item__fields">
                    <div className="kz-admin__field">
                      <label htmlFor={`panel_${panel.id}_title`}>① 面板標題</label>
                      <input
                        id={`panel_${panel.id}_title`}
                        name={`panel_${panel.id}_title`}
                        defaultValue={panel.title}
                      />
                      <AdminFieldHint>灰底面板最上方 h2 標題。</AdminFieldHint>
                    </div>
                    <div className="kz-admin__field">
                      <label htmlFor={`panel_${panel.id}_body`}>② 內文</label>
                      <textarea
                        id={`panel_${panel.id}_body`}
                        name={`panel_${panel.id}_body`}
                        rows={3}
                        defaultValue={panel.body}
                      />
                      <AdminFieldHint>標題下方的一段說明文字。</AdminFieldHint>
                    </div>
                    <div className="kz-admin__field">
                      <label htmlFor={`panel_${panel.id}_list`}>③ 列表（選填）</label>
                      <textarea
                        id={`panel_${panel.id}_list`}
                        name={`panel_${panel.id}_list`}
                        rows={4}
                        defaultValue={panel.list}
                        placeholder="每行一項"
                      />
                      <AdminFieldHint>內文下方的 bullet 列表，每行一項。</AdminFieldHint>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <button type="button" className="kz-admin__btn kz-admin__btn--ghost" onClick={addPanel}>
              ＋ 新增面板
            </button>
          </fieldset>
        ) : (
          <p className="text-sm text-kz-plum-muted">此頁僅管理頁首標題與 SEO；FAQ 列表請至「常見問題」模組編輯。</p>
        )}

        <div className="kz-admin__form-actions">
          <button type="submit" className="kz-admin__btn kz-admin__btn--primary">
            儲存「{def.label}」
          </button>
        </div>
      </form>

      {pageOverrides[pageId] ? (
        <form
          key={`reset-${pageId}`}
          action={resetInnerPageAction}
          className="kz-admin__card kz-admin__form-actions"
        >
          <input type="hidden" name="pageId" value={pageId} readOnly />
          <button
            type="submit"
            className="kz-admin__btn kz-admin__btn--ghost"
            onClick={(e) => {
              if (!confirm(`確定還原「${def.label}」為預設內容？`)) e.preventDefault();
            }}
          >
            還原「{def.label}」預設
          </button>
        </form>
      ) : null}
    </>
  );
}
