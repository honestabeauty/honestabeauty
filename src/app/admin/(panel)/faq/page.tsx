import Link from "next/link";
import { reorderFaqAction } from "@/app/admin/actions";
import { AdminListTable } from "@/app/admin/components/AdminListTable";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { faqToListRows } from "@/lib/cms/admin-list-mappers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const COLUMNS = [
  { key: "order", label: "#", width: "sm" as const, sortable: true, sortType: "number" as const },
  { key: "question", label: "問題", width: "lg" as const, truncate: true, sortable: true, sortType: "string" as const },
  { key: "status", label: "狀態", width: "md" as const },
];

export default async function AdminFaqListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: items } = await supabase
    .from("kz_cms_faqs")
    .select("id, question, sort_order, status")
    .order("sort_order", { ascending: true });

  const rows = faqToListRows(items ?? []);

  return (
    <>
      <AdminPageHeader
        title="常見問題"
        lead="管理 FAQ 問答與顯示順序。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "常見問題" },
        ]}
        relatedLinks={[
          { label: "FAQ 頁標題與 SEO", href: "/admin/pages?page=faq" },
        ]}
        previewHref="/faq"
        guideHref="/admin/guide#faq"
      >
        <Link href="/admin/faq/new" className="moana-pill-btn moana-pill-btn--dark">
          新增
        </Link>
      </AdminPageHeader>
      <div className="kz-admin__card kz-admin__card--list">
        <AdminListTable
          rows={rows}
          columns={COLUMNS}
          searchPlaceholder="搜尋問題內容…"
          emptyMessage="沒有符合條件的問題"
          reorderAction={reorderFaqAction}
          reorderHint="拖曳 ⠿ 調整 FAQ 頁面順序，放開後自動儲存。"
        />
      </div>
    </>
  );
}
