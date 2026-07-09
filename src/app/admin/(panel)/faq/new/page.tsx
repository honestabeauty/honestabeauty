import Link from "next/link";
import { saveFaq } from "@/app/admin/actions";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";

export default function AdminFaqNewPage() {
  return (
    <>
      <AdminPageHeader
        title="新增常見問題"
        lead="填寫問題與答案後儲存，可在列表拖曳調整順序。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "常見問題", href: "/admin/faq" },
          { label: "新增" },
        ]}
        previewHref="/faq"
        guideHref="/admin/guide#faq"
      >
        <Link href="/admin/faq" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveFaq} className="kz-admin__card kz-admin__form">
        <div className="kz-admin__field">
          <label htmlFor="question">問題</label>
          <input id="question" name="question" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="answer">答案</label>
          <textarea id="answer" name="answer" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="sort_order">排序</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue={99} />
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          儲存
        </button>
      </form>
    </>
  );
}
