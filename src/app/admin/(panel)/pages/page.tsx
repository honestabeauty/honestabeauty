import { Suspense } from "react";
import { AdminInnerPagesEditor } from "@/app/admin/components/AdminInnerPagesEditor";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { INNER_PAGE_IDS } from "@/data/inner-pages";
import { getAllInnerPagesForAdmin, innerPageHasOverrides } from "@/lib/cms/inner-pages";
import { getSiteSettingsData } from "@/lib/cms/site";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";

function EditorFallback() {
  return <p className="text-sm text-kz-plum-muted">載入編輯器…</p>;
}

export default async function AdminInnerPagesPage() {
  const [pages, pathOptions, settings] = await Promise.all([
    getAllInnerPagesForAdmin(),
    getCmsPathOptions(),
    getSiteSettingsData(),
  ]);

  const pageOverrides = Object.fromEntries(
    INNER_PAGE_IDS.map((id) => [id, innerPageHasOverrides(id, settings)]),
  ) as Record<(typeof INNER_PAGE_IDS)[number], boolean>;

  return (
    <>
      <AdminPageHeader
        title="各頁標題與 SEO"
        lead="編輯量膚、男賓、痛症、關於等內頁的標題區、說明面板與搜尋關鍵字。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "各頁標題與 SEO" },
        ]}
        relatedLinks={[
          { label: "痛症服務圖文", href: "/admin/content#wellness" },
        ]}
        guideHref="/admin/guide#inner-pages"
      />
      <Suspense fallback={<EditorFallback />}>
        <AdminInnerPagesEditor
          pages={pages}
          pathOptions={pathOptions}
          pageOverrides={pageOverrides}
        />
      </Suspense>
    </>
  );
}
