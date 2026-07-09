import Link from "next/link";
import { deleteShopVideoAction, reorderShopVideosAction } from "@/app/admin/actions";
import { AdminListTable } from "@/app/admin/components/AdminListTable";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { videosToListRows } from "@/lib/cms/admin-list-mappers";
import { getAdminShopVideos } from "@/lib/cms/queries";

const COLUMNS = [
  { key: "id", label: "#", width: "sm" as const, sortable: true, sortType: "number" as const },
  { key: "title", label: "標題", width: "lg" as const, truncate: true, sortable: true, sortType: "string" as const },
  { key: "category", label: "分類", width: "md" as const, sortable: true, sortType: "string" as const },
  { key: "status", label: "狀態", width: "md" as const },
];

export default async function AdminVideosListPage() {
  const videos = await getAdminShopVideos();
  const rows = videosToListRows(videos);

  return (
    <>
      <AdminPageHeader
        title="店內短片"
        lead="管理首頁「店內日常」短片標題、封面與排序。影片檔需放在網站資料夾後再部署。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "店內短片" },
        ]}
        previewHref="/#shop-videos-title"
        guideHref="/admin/guide#videos"
      >
        <Link href="/admin/videos/new" className="moana-pill-btn moana-pill-btn--dark">
          新增短片
        </Link>
      </AdminPageHeader>
      <div className="kz-admin__card kz-admin__card--list">
        <AdminListTable
          rows={rows}
          columns={COLUMNS}
          hint="影片檔請放在 public/videos/reels/，此處只管理標題、封面路徑與排序。"
          searchPlaceholder="搜尋標題、分類、編號…"
          emptyMessage="沒有符合條件的短片"
          deleteAction={deleteShopVideoAction}
          reorderAction={reorderShopVideosAction}
          reorderHint="拖曳 ⠿ 調整首頁短片順序，放開後自動儲存。"
        />
      </div>
    </>
  );
}
