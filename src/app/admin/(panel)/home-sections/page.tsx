import { AdminHomeSectionsEditor } from "@/app/admin/components/AdminHomeSectionsEditor";
import { AdminOverrideBadge } from "@/app/admin/components/AdminOverrideBadge";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { resetHomeSectionsAction } from "@/app/admin/actions";
import { homeSectionsHasOverrides } from "@/lib/cms/inner-pages";
import { getHomeSections } from "@/lib/cms/home-sections";
import { getSiteSettingsData } from "@/lib/cms/site";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";

export default async function AdminHomeSectionsPage() {
  const [sections, pathOptions, settings] = await Promise.all([
    getHomeSections(),
    getCmsPathOptions(),
    getSiteSettingsData(),
  ]);
  const hasOverrides = homeSectionsHasOverrides(settings);

  return (
    <>
      <AdminPageHeader
        title={
          <>
            首頁區塊 <AdminOverrideBadge overridden={hasOverrides} />
          </>
        }
        lead="調整首頁各區塊的顯示順序、開關，以及宣傳文案與圖片。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "首頁區塊" },
        ]}
        relatedLinks={[
          { label: "首頁主視覺", href: "/admin/hero" },
          { label: "共用文案區塊", href: "/admin/content" },
        ]}
        relatedLabel="首頁其他可改"
        previewHref="/"
        guideHref="/admin/guide#home-sections"
      >
        {hasOverrides ? (
          <form action={resetHomeSectionsAction}>
            <button type="submit" className="kz-admin__btn kz-admin__btn--ghost">
              還原預設
            </button>
          </form>
        ) : null}
      </AdminPageHeader>
      <AdminHomeSectionsEditor sections={sections} pathOptions={pathOptions} />
    </>
  );
}
