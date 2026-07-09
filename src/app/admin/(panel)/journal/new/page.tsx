import Link from "next/link";
import { createJournalPost } from "@/app/admin/actions";
import { AdminImageFields } from "@/app/admin/components/AdminImageFields";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { CMS_JOURNAL_CATEGORIES } from "@/lib/cms/admin-field-options";

export default function AdminJournalNewPage() {
  return (
    <>
      <AdminPageHeader
        title="新增文章"
        lead="填寫標題與內容後儲存；網址代碼（slug）可留空自動產生。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "醫美知識", href: "/admin/journal" },
          { label: "新增文章" },
        ]}
        previewHref="/journal"
        guideHref="/admin/guide#journal"
      >
        <Link href="/admin/journal" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={createJournalPost} className="kz-admin__card kz-admin__form">
        <div className="kz-admin__field">
          <label htmlFor="title">標題</label>
          <input id="title" name="title" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="slug">網址代碼（留空自動產生）</label>
          <input id="slug" name="slug" placeholder="my-article-slug" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <AdminPresetSelect
            id="category"
            name="category"
            options={CMS_JOURNAL_CATEGORIES}
            defaultValue="醫美知識"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="published_at">發布日期</label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="excerpt">摘要</label>
          <textarea id="excerpt" name="excerpt" rows={3} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="body">內文</label>
          <textarea id="body" name="body" rows={16} />
        </div>
        <AdminImageFields folder="journal" />
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue="draft">
            <option value="draft">草稿</option>
            <option value="published">已發布</option>
          </select>
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          建立
        </button>
      </form>
    </>
  );
}
