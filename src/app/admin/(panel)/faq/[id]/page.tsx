import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteFaqAction, saveFaq } from "@/app/admin/actions";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ id: string }> };

export default async function AdminFaqEditPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from("kz_cms_faqs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <>
      <AdminPageHeader
        title="編輯常見問題"
        lead={item.question}
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "常見問題", href: "/admin/faq" },
          { label: "編輯" },
        ]}
        relatedLinks={[
          { label: "FAQ 頁標題與 SEO", href: "/admin/pages?page=faq" },
        ]}
        previewHref="/faq"
        guideHref="/admin/guide#faq"
      >
        <Link href="/admin/faq" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveFaq} className="kz-admin__card kz-admin__form">
        <input type="hidden" name="id" value={item.id} />
        <div className="kz-admin__field">
          <label htmlFor="question">問題</label>
          <input id="question" name="question" defaultValue={item.question} required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="answer">答案</label>
          <textarea id="answer" name="answer" defaultValue={item.answer} required />
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
          <button
            type="submit"
            formAction={deleteFaqAction}
            className="moana-pill-btn moana-pill-btn--ghost"
          >
            刪除
          </button>
        </div>
      </form>
    </>
  );
}
