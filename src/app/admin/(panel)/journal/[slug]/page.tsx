import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteJournalPostAction, saveJournalPost } from "@/app/admin/actions";
import { AdminDeleteButton } from "@/app/admin/components/AdminDeleteButton";
import { AdminImageFields } from "@/app/admin/components/AdminImageFields";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminPresetSelect } from "@/app/admin/components/AdminPresetSelect";
import { CMS_JOURNAL_CATEGORIES } from "@/lib/cms/admin-field-options";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Props = { params: Promise<{ slug: string }> };

function toHongKongDateTimeLocal(value: string | null) {
  if (!value) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(value));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}

export default async function AdminJournalEditPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data: post } = await supabase
    .from("kz_cms_journal_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!post) notFound();

  return (
    <>
      <AdminPageHeader
        title="編輯文章"
        lead={post.title}
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "醫美知識", href: "/admin/journal" },
          { label: "編輯文章" },
        ]}
        previewHref={`/journal/${post.slug}`}
        guideHref="/admin/guide#journal"
      >
        <Link href="/admin/journal" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveJournalPost} className="kz-admin__card kz-admin__form">
        <input type="hidden" name="slug" value={post.slug} />
        <div className="kz-admin__field">
          <label htmlFor="title">標題</label>
          <input id="title" name="title" defaultValue={post.title} required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <AdminPresetSelect
            id="category"
            name="category"
            options={CMS_JOURNAL_CATEGORIES}
            defaultValue={post.category}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="published_at">文章日期</label>
          <input
            id="published_at"
            name="published_at"
            type="date"
            defaultValue={post.published_at}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="scheduled_at">預定發布時間（香港時間）</label>
          <input
            id="scheduled_at"
            name="scheduled_at"
            type="datetime-local"
            defaultValue={toHongKongDateTimeLocal(post.scheduled_at)}
          />
          <p className="kz-admin__field-hint">
            選擇「預定發布」後必填；系統會在時間到達後自動公開文章。
          </p>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="excerpt">摘要</label>
          <textarea id="excerpt" name="excerpt" defaultValue={post.excerpt} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="body">內文</label>
          <textarea id="body" name="body" defaultValue={post.body} rows={16} />
        </div>
        <AdminImageFields
          defaultImage={post.image}
          defaultAlt={post.image_alt}
          folder="journal"
        />
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue={post.status}>
            <option value="published">已發布</option>
            <option value="scheduled">預定發布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <div className="kz-admin__actions">
          <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
            儲存
          </button>
          <AdminDeleteButton
            action={deleteJournalPostAction}
            hidden={{ slug: post.slug }}
            confirmMessage={`確定刪除「${post.title}」？`}
            className="moana-pill-btn moana-pill-btn--ghost"
          >
            刪除
          </AdminDeleteButton>
        </div>
      </form>
    </>
  );
}
