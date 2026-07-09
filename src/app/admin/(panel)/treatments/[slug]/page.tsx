import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteTreatmentAction, saveTreatment } from "@/app/admin/actions";
import { AdminDeleteButton } from "@/app/admin/components/AdminDeleteButton";
import { AdminImageFields } from "@/app/admin/components/AdminImageFields";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { CMS_TREATMENT_CATEGORIES } from "@/lib/cms/admin-field-options";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

export default async function AdminTreatmentEditPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from("kz_cms_treatments")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!item) notFound();

  const details = (item.details ?? {}) as {
    suitableFor?: string;
    features?: string[];
    processSteps?: string[];
    aftercare?: string[];
  };

  return (
    <>
      <AdminPageHeader
        title="編輯療程"
        lead={item.name}
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "療程", href: "/admin/treatments" },
          { label: "編輯療程" },
        ]}
        previewHref={`/treatments/${item.slug}`}
        guideHref="/admin/guide#treatments"
      >
        <Link href="/admin/treatments" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveTreatment} className="kz-admin__card kz-admin__form">
        <input type="hidden" name="slug" value={item.slug} />
        <div className="kz-admin__field">
          <label htmlFor="name">名稱</label>
          <input id="name" name="name" defaultValue={item.name} required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="tagline">簡介</label>
          <textarea id="tagline" name="tagline" defaultValue={item.tagline} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <AdminPresetSelect
            id="category"
            name="category"
            options={CMS_TREATMENT_CATEGORIES}
            defaultValue={item.category}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="problems">針對問題（逗號分隔）</label>
          <input
            id="problems"
            name="problems"
            defaultValue={(item.problems ?? []).join("、")}
          />
        </div>
        <AdminImageFields
          defaultImage={item.image}
          defaultAlt={item.image_alt}
          folder="treatments"
        />
        <div className="kz-admin__field kz-admin__field--row">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="featured" defaultChecked={item.featured} />
            首頁精選
          </label>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="sort_order">排序</label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={item.sort_order}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price_type">價錢類型</label>
          <select id="price_type" name="price_type" defaultValue={item.price_type}>
            <option value="consult">諮詢報價</option>
            <option value="fixed">固定價格</option>
          </select>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price">價錢（固定價時填寫）</label>
          <input id="price" name="price" defaultValue={item.price ?? ""} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="price_note">價錢備註</label>
          <input id="price_note" name="price_note" defaultValue={item.price_note ?? ""} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="suitable_for">適合對象</label>
          <textarea
            id="suitable_for"
            name="suitable_for"
            defaultValue={details.suitableFor ?? ""}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="features">療程特色（每行一項）</label>
          <textarea
            id="features"
            name="features"
            defaultValue={(details.features ?? []).join("\n")}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="process_steps">療程流程（每行一項）</label>
          <textarea
            id="process_steps"
            name="process_steps"
            rows={4}
            defaultValue={(details.processSteps ?? []).join("\n")}
            placeholder="到店諮詢&#10;清潔準備&#10;正式療程&#10;術後護理建議"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="aftercare">術後注意（每行一項）</label>
          <textarea
            id="aftercare"
            name="aftercare"
            rows={3}
            defaultValue={(details.aftercare ?? []).join("\n")}
            placeholder="加強保濕防曬&#10;避免即日高溫桑拿"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue={item.status}>
            <option value="published">已發布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <div className="kz-admin__actions">
          <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
            儲存
          </button>
          <AdminDeleteButton
            action={deleteTreatmentAction}
            hidden={{ slug: item.slug }}
            confirmMessage={`確定刪除「${item.name}」？`}
            className="moana-pill-btn moana-pill-btn--ghost"
          >
            刪除
          </AdminDeleteButton>
        </div>
      </form>
    </>
  );
}
