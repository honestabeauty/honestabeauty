import Link from "next/link";
import { reorderTreatmentsAction } from "@/app/admin/actions";
import { AdminListTable } from "@/app/admin/components/AdminListTable";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { treatmentsToListRows } from "@/lib/cms/admin-list-mappers";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const COLUMNS = [
  { key: "name", label: "名稱", width: "lg" as const, truncate: true, sortable: true, sortType: "string" as const },
  { key: "category", label: "分類", width: "md" as const, sortable: true, sortType: "string" as const },
  { key: "price", label: "價錢", width: "md" as const, sortable: true, sortType: "number" as const },
  { key: "status", label: "狀態", width: "md" as const },
];

export default async function AdminTreatmentsListPage() {
  const supabase = await createSupabaseServerClient();
  const { data: items } = await supabase
    .from("kz_cms_treatments")
    .select("slug, name, category, price_type, price, status, featured, sort_order")
    .order("sort_order", { ascending: true });

  const rows = treatmentsToListRows(items ?? []);

  return (
    <>
      <AdminPageHeader
        title="療程"
        lead="管理療程名稱、價錢、圖片與詳情。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "療程" },
        ]}
        previewHref="/treatments"
        guideHref="/admin/guide#treatments"
      >
        <Link href="/admin/treatments/new" className="moana-pill-btn moana-pill-btn--dark">
          新增療程
        </Link>
      </AdminPageHeader>
      <div className="kz-admin__card kz-admin__card--list">
        <AdminListTable
          rows={rows}
          columns={COLUMNS}
          searchPlaceholder="搜尋療程名稱、分類…"
          emptyMessage="沒有符合條件的療程"
          reorderAction={reorderTreatmentsAction}
          reorderHint="拖曳 ⠿ 調整療程目錄順序，放開後自動儲存。"
        />
      </div>
    </>
  );
}
