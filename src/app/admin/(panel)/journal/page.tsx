import Link from "next/link";
import { reorderJournalAction } from "@/app/admin/actions";
import { AdminListTable } from "@/app/admin/components/AdminListTable";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { journalToListRows } from "@/lib/cms/admin-list-mappers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const COLUMNS = [
  { key: "title", label: "標題", width: "lg" as const, truncate: true, sortable: true, sortType: "string" as const },
  { key: "category", label: "分類", width: "md" as const, sortable: true, sortType: "string" as const },
  { key: "date", label: "發布／預定日", width: "md" as const, sortable: true, sortType: "date" as const },
  { key: "status", label: "狀態", width: "md" as const },
];

export default async function AdminJournalListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: posts } = await supabase
    .from("kz_cms_journal_posts")
    .select("slug, title, category, status, published_at, scheduled_at, sort_order")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  const rows = journalToListRows(posts ?? []);

  return (
    <>
      <AdminPageHeader
        title="醫美知識"
        lead="管理文章標題、分類、封面與發布狀態。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "醫美知識" },
        ]}
        previewHref="/journal"
        guideHref="/admin/guide#journal"
      >
        <Link href="/admin/journal/new" className="moana-pill-btn moana-pill-btn--dark">
          新增文章
        </Link>
      </AdminPageHeader>
      <div className="kz-admin__card kz-admin__card--list">
        <AdminListTable
          rows={rows}
          columns={COLUMNS}
          searchPlaceholder="搜尋標題、分類…"
          emptyMessage="沒有符合條件的文章"
          reorderAction={reorderJournalAction}
          reorderHint="拖曳 ⠿ 調整醫美知識列表順序，放開後自動儲存。"
        />
      </div>
    </>
  );
}
