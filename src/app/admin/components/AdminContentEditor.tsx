"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { resetContentModuleAction, saveContentModulesAction } from "@/app/admin/actions";
import {
  AboutContactFieldGuide,
  AdminContentPreviewLink,
  AdminFieldHint,
  NarrativeChapterFieldGuide,
  ProcessStepsFieldGuide,
  TestimonialsFieldGuide,
  TrustIntroFieldGuide,
  TrustPetalFieldGuide,
  WellnessServicesFieldGuide,
  WellnessTraditionalFieldGuide,
} from "@/app/admin/components/AdminContentModuleGuides";
import { AdminModuleReset } from "@/app/admin/components/AdminModuleReset";
import { AdminOverrideBadge } from "@/app/admin/components/AdminOverrideBadge";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";
import type { PetalStat } from "@/components/EditorialPetalStats";
import type { NarrativeChapter, ProcessStepItem, WellnessServiceContent } from "@/data/site-content";

type AdminTestimonial = {
  id: string;
  quote: string;
  author: string;
  meta: string;
  enabled: boolean;
};
import type { CmsSelectOption } from "@/lib/cms/admin-field-options";

type WellnessTraditional = {
  sectionLabel: string;
  title: string;
  items: string[];
  footerNote: string;
};

type ContentOverrides = {
  trust: boolean;
  testimonials: boolean;
  process: boolean;
  narrative: boolean;
  wellness: boolean;
  aboutContact: boolean;
};

const WELLNESS_SERVICE_ADMIN_LABELS: Record<string, string> = {
  "dr-rainbow": "Dr. Rainbow 醫療級遠紅外線焗倉",
  "wellness-detox": "養生排毒 · 遠紅外線理療",
  "dr-face": "Dr. Face 遠紅外線童顏機",
};

type Props = {
  trust: {
    petalStats: PetalStat[];
    petalIntro: string[];
    petalHighlights: readonly string[] | string[];
  };
  testimonials: AdminTestimonial[];
  processSteps: {
    sectionLabel: string;
    title: string;
    steps: ProcessStepItem[];
  };
  narrativeChapters: NarrativeChapter[];
  wellnessServices: WellnessServiceContent[];
  wellnessTraditional: WellnessTraditional;
  aboutContact: { title: string };
  overrides: ContentOverrides;
  pathOptions: CmsSelectOption[];
};

const PETAL_CORNER_LABELS: Record<PetalStat["corner"], string> = {
  tl: "左上瓣 · 四瓣排列左上方",
  tr: "右上瓣 · 四瓣排列右上方",
  bl: "左下瓣 · 四瓣排列左下方",
  br: "右下瓣 · 四瓣排列右下方",
};

const RESET_MODULES = [
  { id: "trust", label: "信任花瓣" },
  { id: "testimonials", label: "客人評價" },
  { id: "process", label: "量膚流程" },
  { id: "narrative", label: "品牌敘事" },
  { id: "wellness", label: "痛症護理" },
  { id: "aboutContact", label: "聯絡標題" },
] as const;

function reorderIdList(ids: string[], fromId: string, toId: string) {
  const next = [...ids];
  const from = next.indexOf(fromId);
  const to = next.indexOf(toId);
  if (from < 0 || to < 0 || from === to) return next;
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function SectionHead({
  title,
  description,
  overridden,
  moduleId,
  moduleLabel,
}: {
  title: string;
  description: string;
  overridden: boolean;
  moduleId: (typeof RESET_MODULES)[number]["id"];
  moduleLabel: string;
}) {
  return (
    <div className="kz-admin__content-section-head">
      <div>
        <div className="kz-admin__content-section-title-row">
          <h2 className="kz-admin__card-title">{title}</h2>
          <AdminOverrideBadge overridden={overridden} />
        </div>
        <p className="kz-admin__card-lead">{description}</p>
      </div>
      <AdminModuleReset
        action={resetContentModuleAction}
        moduleId={moduleId}
        label={moduleLabel}
      />
    </div>
  );
}

export function AdminContentEditor({
  trust,
  testimonials,
  processSteps,
  narrativeChapters,
  wellnessServices,
  wellnessTraditional,
  aboutContact,
  overrides,
  pathOptions,
}: Props) {
  const initialTestimonialOrder = useMemo(() => testimonials.map((t) => t.id), [testimonials]);
  const [testimonialOrder, setTestimonialOrder] = useState(initialTestimonialOrder);
  const [testimonialDragId, setTestimonialDragId] = useState<string | null>(null);
  const [testimonialDragOverId, setTestimonialDragOverId] = useState<string | null>(null);

  const testimonialById = useMemo(
    () => Object.fromEntries(testimonials.map((t) => [t.id, t])),
    [testimonials],
  );

  function handleTestimonialDrop(targetId: string) {
    if (!testimonialDragId) return;
    setTestimonialOrder((prev) => reorderIdList(prev, testimonialDragId, targetId));
    setTestimonialDragId(null);
    setTestimonialDragOverId(null);
  }

  return (
    <form action={saveContentModulesAction} className="kz-admin__card kz-admin__form kz-admin__content-editor">
      <AdminTips
        items={[
          <>各模組下方有<strong>欄位對照圖</strong>，標示前台顯示位置；可點「在前台查看此區塊」快速確認。</>,
          <>留空欄位＝使用網站預設文案；標示「已自訂」代表已改過，可按「還原預設」清回預設。</>,
          <>痛症頁「三項圖文服務」在此編輯；頁面大標題與 SEO 請至 <Link href="/admin/pages?page=wellness">各頁標題與 SEO · 痛症理療</Link>。</>,
          <>詳見 <Link href="/admin/guide#site-content">使用說明 · 共用文案</Link>。</>,
        ]}
      />

      <p className="kz-admin__related kz-admin__related--block">
        <span className="kz-admin__related-label">痛症頁還要改：</span>
        <Link href="/admin/pages?page=wellness" className="kz-admin__related-link">
          各頁標題與 SEO · 痛症理療
        </Link>
      </p>

      <input type="hidden" name="testimonial_order" value={JSON.stringify(testimonialOrder)} readOnly />

      <section className="kz-admin__content-section">
        <SectionHead
          title="信任花瓣"
          description="首頁「為什麼選康姿健」區塊 — 四張數據卡、兩段引言、重點列表。"
          overridden={overrides.trust}
          moduleId="trust"
          moduleLabel="信任花瓣"
        />
        <AdminContentPreviewLink href="/">在前台查看此區塊 ↗</AdminContentPreviewLink>
        <TrustPetalFieldGuide />
        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">四瓣數據卡（逐瓣編輯）</legend>
          {trust.petalStats.map((petal, i) => (
            <div key={petal.corner} className="kz-admin__content-subcard">
              <p className="kz-admin__content-subcard-title">{PETAL_CORNER_LABELS[petal.corner]}</p>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_caption`}>① 頂部小字</label>
                <input
                  id={`trust_petal_${i}_caption`}
                  name={`trust_petal_${i}_caption`}
                  defaultValue={petal.caption}
                  placeholder="例：量膚定制"
                />
                <AdminFieldHint>卡片最上方一行小字，通常為分類或賣點名稱。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_value`}>② 中間大字</label>
                <input
                  id={`trust_petal_${i}_value`}
                  name={`trust_petal_${i}_value`}
                  defaultValue={petal.value}
                  placeholder="例：1:1、0、金獎、12h"
                />
                <AdminFieldHint>視覺最突出的大字，可填數字、比例或關鍵詞。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_label`}>③ 大字下方標題</label>
                <input
                  id={`trust_petal_${i}_label`}
                  name={`trust_petal_${i}_label`}
                  defaultValue={petal.label}
                  placeholder="例：儀器分析 · 專人問診"
                />
                <AdminFieldHint>中間大字下面的一行主標題。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_detail`}>④ 底部說明</label>
                <input
                  id={`trust_petal_${i}_detail`}
                  name={`trust_petal_${i}_detail`}
                  defaultValue={petal.detail}
                  placeholder="例：先了解膚況，再建議療程"
                />
                <AdminFieldHint>卡片最底部補充說明，字較細。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_href`}>⑤ 點擊卡片前往</label>
                <AdminPresetSelect
                  id={`trust_petal_${i}_href`}
                  name={`trust_petal_${i}_href`}
                  options={pathOptions}
                  defaultValue={petal.href ?? ""}
                  customPlaceholder="/path"
                />
                <AdminFieldHint>客人點整張卡片時跳轉的頁面。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`trust_petal_${i}_ctaId`}>GA4 追蹤 ID（選填）</label>
                <input
                  id={`trust_petal_${i}_ctaId`}
                  name={`trust_petal_${i}_ctaId`}
                  defaultValue={petal.ctaId ?? ""}
                  placeholder="例：cta_petal_skin"
                />
                <AdminFieldHint>對應前台 data-cta-id，供 Google Analytics 追蹤點擊。</AdminFieldHint>
              </div>
            </div>
          ))}
        </fieldset>
        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">標題下方 · 引言段落</legend>
          <TrustIntroFieldGuide />
          <div className="kz-admin__field">
            <label htmlFor="trust_petalIntro1">① 引言段落 1</label>
            <textarea
              id="trust_petalIntro1"
              name="trust_petalIntro1"
              rows={3}
              defaultValue={trust.petalIntro[0] ?? ""}
            />
            <AdminFieldHint>「為什麼選康姿健」標題下方第一段文字。</AdminFieldHint>
          </div>
          <div className="kz-admin__field">
            <label htmlFor="trust_petalIntro2">② 引言段落 2</label>
            <textarea
              id="trust_petalIntro2"
              name="trust_petalIntro2"
              rows={3}
              defaultValue={trust.petalIntro[1] ?? ""}
            />
            <AdminFieldHint>第一段下方的第二段文字。</AdminFieldHint>
          </div>
        </fieldset>
        <div className="kz-admin__field">
          <label htmlFor="trust_petalHighlights">③ 重點列表（每行一項）</label>
          <textarea
            id="trust_petalHighlights"
            name="trust_petalHighlights"
            rows={4}
            defaultValue={trust.petalHighlights.join("\n")}
          />
          <AdminFieldHint>引言下方的 bullet 列表；再下方才是四瓣數據卡。</AdminFieldHint>
        </div>
      </section>

      <section className="kz-admin__content-section">
        <SectionHead
          title="量膚定制流程"
          description="四步驟流程區塊 — 標題與每步編號、標題、說明。"
          overridden={overrides.process}
          moduleId="process"
          moduleLabel="量膚流程"
        />
        <AdminContentPreviewLink href="/skin-analysis">在前台查看此區塊 ↗</AdminContentPreviewLink>
        <ProcessStepsFieldGuide />
        <div className="kz-admin__field">
          <label htmlFor="process_sectionLabel">① 英文小標</label>
          <input
            id="process_sectionLabel"
            name="process_sectionLabel"
            defaultValue={processSteps.sectionLabel}
            placeholder="例：Skin Analysis"
          />
          <AdminFieldHint>區塊最上方細字標籤（左側有橫線裝飾）。</AdminFieldHint>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="process_title">② 區塊主標題</label>
          <input
            id="process_title"
            name="process_title"
            defaultValue={processSteps.title}
            placeholder="例：量膚定制流程"
          />
          <AdminFieldHint>英文小標下方的大標題。</AdminFieldHint>
        </div>
        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">③ 四個步驟（由上至下）</legend>
        {processSteps.steps.map((step, i) => (
          <div key={step.num} className="kz-admin__content-subcard">
            <p className="kz-admin__content-subcard-title">步驟 {i + 1}</p>
            <div className="kz-admin__field">
              <label htmlFor={`process_step_${i}_num`}>左側編號</label>
              <input
                id={`process_step_${i}_num`}
                name={`process_step_${i}_num`}
                defaultValue={step.num}
                placeholder="例：01"
              />
              <AdminFieldHint>步驟左邊顯示的數字。</AdminFieldHint>
            </div>
            <div className="kz-admin__field">
              <label htmlFor={`process_step_${i}_title`}>步驟標題</label>
              <input
                id={`process_step_${i}_title`}
                name={`process_step_${i}_title`}
                defaultValue={step.title}
                placeholder="例：膚質分析"
              />
              <AdminFieldHint>編號右側的主標題。</AdminFieldHint>
            </div>
            <div className="kz-admin__field">
              <label htmlFor={`process_step_${i}_desc`}>步驟說明</label>
              <textarea
                id={`process_step_${i}_desc`}
                name={`process_step_${i}_desc`}
                rows={2}
                defaultValue={step.desc}
                placeholder="例：先幫你量膚，了解膚質同煩惱。"
              />
              <AdminFieldHint>標題下方的一行補充說明。</AdminFieldHint>
            </div>
          </div>
        ))}
        </fieldset>
      </section>

      <section className="kz-admin__content-section">
        <SectionHead
          title="品牌敘事章節"
          description="首頁三個圖文敘事區塊 — 標籤、標題、內文、圖片。"
          overridden={overrides.narrative}
          moduleId="narrative"
          moduleLabel="品牌敘事"
        />
        <AdminContentPreviewLink href="/">在前台查看此區塊 ↗</AdminContentPreviewLink>
        <NarrativeChapterFieldGuide />
        {narrativeChapters.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="kz-admin__content-subcard">
            <p className="kz-admin__content-subcard-title">
              第 {chapterIndex + 1} 章 · {chapter.label}
            </p>
            <div className="kz-admin__field">
              <label htmlFor={`narrative_${chapter.id}_label`}>① 章節標籤（英文小標）</label>
              <input
                id={`narrative_${chapter.id}_label`}
                name={`narrative_${chapter.id}_label`}
                defaultValue={chapter.label}
                placeholder="例：Heritage"
              />
              <AdminFieldHint>圖片旁最上方細字標籤。</AdminFieldHint>
            </div>
            <div className="kz-admin__field">
              <label htmlFor={`narrative_${chapter.id}_title`}>② 章節主標題</label>
              <input
                id={`narrative_${chapter.id}_title`}
                name={`narrative_${chapter.id}_title`}
                defaultValue={chapter.title}
              />
              <AdminFieldHint>標籤下方的大標題。</AdminFieldHint>
            </div>
            <div className="kz-admin__field">
              <label htmlFor={`narrative_${chapter.id}_body`}>③ 內文段落</label>
              <textarea
                id={`narrative_${chapter.id}_body`}
                name={`narrative_${chapter.id}_body`}
                rows={4}
                defaultValue={chapter.body.join("\n\n")}
              />
              <AdminFieldHint>每段之間空一行；前台會逐段顯示。</AdminFieldHint>
            </div>
            <MediaFieldPicker
              urlName={`narrative_${chapter.id}_image`}
              altName={`narrative_${chapter.id}_imageAlt`}
              label="④ 章節圖片"
              defaultUrl={chapter.image}
              defaultAlt={chapter.imageAlt}
              folder="general"
              specKey="posters"
              hint="建議 4:5 直式；留空使用預設圖。Alt 會顯示為圖片說明。"
            />
          </div>
        ))}
      </section>

      <section className="kz-admin__content-section">
        <SectionHead
          title="客人評價"
          description="首頁三則評價卡 — 可拖曳排序，取消勾選可隱藏。"
          overridden={overrides.testimonials}
          moduleId="testimonials"
          moduleLabel="客人評價"
        />
        <AdminContentPreviewLink href="/">在前台查看此區塊 ↗</AdminContentPreviewLink>
        <TestimonialsFieldGuide />
        <p className="kz-admin__list-hint kz-admin__list-hint--reorder">
          拖曳左側 ⠿ 調整順序（儲存表單時一併寫入）
        </p>
        <ul className="kz-admin__section-list">
          {testimonialOrder.map((id, index) => {
            const item = testimonialById[id];
            if (!item) return null;
            return (
              <li
                key={id}
                className={[
                  "kz-admin__section-item",
                  testimonialDragOverId === id ? "kz-admin__section-item--drag-over" : "",
                  testimonialDragId === id ? "kz-admin__section-item--dragging" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onDragOver={(e) => {
                  e.preventDefault();
                  setTestimonialDragOverId(id);
                }}
                onDragLeave={() => {
                  if (testimonialDragOverId === id) setTestimonialDragOverId(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  handleTestimonialDrop(id);
                }}
              >
                <div className="kz-admin__section-item__head">
                  <button
                    type="button"
                    className="kz-admin__drag-handle"
                    draggable
                    aria-label={`拖曳調整評價 ${index + 1} 順序`}
                    onDragStart={(e) => {
                      setTestimonialDragId(id);
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragEnd={() => {
                      setTestimonialDragId(null);
                      setTestimonialDragOverId(null);
                    }}
                  >
                    ⠿
                  </button>
                  <div className="kz-admin__section-item__meta">
                    <span className="kz-admin__section-item__index">{index + 1}</span>
                    <div>
                      <p className="kz-admin__section-item__title">{item.author}</p>
                      <p className="kz-admin__section-item__desc">{item.meta}</p>
                    </div>
                  </div>
                  <label className="kz-admin__section-toggle">
                    <input
                      type="checkbox"
                      name={`testimonial_${id}_enabled`}
                      value="1"
                      defaultChecked={item.enabled}
                    />
                    顯示
                  </label>
                </div>
                <fieldset className="kz-admin__fieldset kz-admin__section-item__fields">
                  <div className="kz-admin__field">
                    <label htmlFor={`testimonial_${id}_quote`}>① 評價內容</label>
                    <textarea
                      id={`testimonial_${id}_quote`}
                      name={`testimonial_${id}_quote`}
                      rows={3}
                      defaultValue={item.quote}
                    />
                    <AdminFieldHint>卡片主體引號內的評價文字。</AdminFieldHint>
                  </div>
                  <div className="kz-admin__field">
                    <label htmlFor={`testimonial_${id}_author`}>② 客人稱呼</label>
                    <input
                      id={`testimonial_${id}_author`}
                      name={`testimonial_${id}_author`}
                      defaultValue={item.author}
                      placeholder="例：陳小姐"
                    />
                    <AdminFieldHint>評價下方顯示的客人名字。</AdminFieldHint>
                  </div>
                  <div className="kz-admin__field">
                    <label htmlFor={`testimonial_${id}_meta`}>③ 附註</label>
                    <input
                      id={`testimonial_${id}_meta`}
                      name={`testimonial_${id}_meta`}
                      defaultValue={item.meta}
                      placeholder="例：屯門 · 回訪客人"
                    />
                    <AdminFieldHint>稱呼旁邊的灰色小字附註。</AdminFieldHint>
                  </div>
                </fieldset>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="kz-admin__content-section" id="wellness">
        <SectionHead
          title="痛症頁 · 服務與護理"
          description="痛症理療頁 — 三個圖文服務區 + 下方「傳統痛症護理」區塊。"
          overridden={overrides.wellness}
          moduleId="wellness"
          moduleLabel="痛症護理"
        />
        <AdminContentPreviewLink href="/wellness">在前台查看此頁 ↗</AdminContentPreviewLink>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">圖文服務列表（共 3 項）</legend>
          <WellnessServicesFieldGuide />
          {wellnessServices.map((service, index) => (
            <div key={service.id} className="kz-admin__content-subcard">
              <p className="kz-admin__content-subcard-title">
                服務 {index + 1} · {WELLNESS_SERVICE_ADMIN_LABELS[service.id] ?? service.title}
              </p>
              <div className="kz-admin__field">
                <label htmlFor={`wellness_service_${service.id}_title`}>② 服務標題</label>
                <input
                  id={`wellness_service_${service.id}_title`}
                  name={`wellness_service_${service.id}_title`}
                  defaultValue={service.title}
                />
                <AdminFieldHint>圖片旁的主標題 h2。</AdminFieldHint>
              </div>
              <div className="kz-admin__field">
                <label htmlFor={`wellness_service_${service.id}_body`}>③ 內文段落</label>
                <textarea
                  id={`wellness_service_${service.id}_body`}
                  name={`wellness_service_${service.id}_body`}
                  rows={5}
                  defaultValue={service.body.join("\n")}
                />
                <AdminFieldHint>每行一段；前台逐行顯示為獨立段落。</AdminFieldHint>
              </div>
              <MediaFieldPicker
                urlName={`wellness_service_${service.id}_image`}
                altName={`wellness_service_${service.id}_imageAlt`}
                label="① 服務海報圖"
                defaultUrl={service.image}
                defaultAlt={service.imageAlt}
                folder="general"
                specKey="posters"
                hint="建議 4:5 直式海報；留空使用預設圖。"
              />
            </div>
          ))}
        </fieldset>

        <fieldset className="kz-admin__fieldset">
          <legend className="kz-admin__legend">傳統痛症護理</legend>
        <WellnessTraditionalFieldGuide />
        <div className="kz-admin__field">
          <label htmlFor="wellness_traditionalSectionLabel">① 英文小標</label>
          <input
            id="wellness_traditionalSectionLabel"
            name="wellness_traditionalSectionLabel"
            defaultValue={wellnessTraditional.sectionLabel}
            placeholder="例：Traditional Care"
          />
          <AdminFieldHint>區塊最上方細字標籤。</AdminFieldHint>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="wellness_traditionalTitle">② 區塊主標題</label>
          <input
            id="wellness_traditionalTitle"
            name="wellness_traditionalTitle"
            defaultValue={wellnessTraditional.title}
          />
          <AdminFieldHint>英文小標下方的大標題。</AdminFieldHint>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="wellness_traditionalItems">③ 項目列表</label>
          <textarea
            id="wellness_traditionalItems"
            name="wellness_traditionalItems"
            rows={4}
            defaultValue={wellnessTraditional.items.join("\n")}
          />
          <AdminFieldHint>標題下方的 bullet 列表，每行一項。</AdminFieldHint>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="wellness_traditionalFooter">④ 頁尾備註</label>
          <input
            id="wellness_traditionalFooter"
            name="wellness_traditionalFooter"
            defaultValue={wellnessTraditional.footerNote}
          />
          <AdminFieldHint>列表下方文字；前台會自動接上營業時間同地址。</AdminFieldHint>
        </div>
        </fieldset>
      </section>

      <section className="kz-admin__content-section">
        <SectionHead
          title="關於頁 · 聯絡標題"
          description="/about 底部聯絡面板的標題文字。"
          overridden={overrides.aboutContact}
          moduleId="aboutContact"
          moduleLabel="聯絡標題"
        />
        <AdminContentPreviewLink href="/about">在前台查看此區塊 ↗</AdminContentPreviewLink>
        <AboutContactFieldGuide />
        <div className="kz-admin__field">
          <label htmlFor="aboutContact_title">聯絡區標題</label>
          <input
            id="aboutContact_title"
            name="aboutContact_title"
            defaultValue={aboutContact.title}
            placeholder="例：聯絡我們"
          />
          <AdminFieldHint>聯絡面板最上方 h2 標題；電話、地址等請至「站點設定」修改。</AdminFieldHint>
        </div>
      </section>

      <div className="kz-admin__form-actions">
        <button type="submit" className="kz-admin__btn kz-admin__btn--primary">
          儲存共用文案
        </button>
      </div>
    </form>
  );
}
