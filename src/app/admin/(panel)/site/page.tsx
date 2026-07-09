import { saveSiteSettings } from "@/app/admin/actions";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { AdminTips } from "@/app/admin/components/AdminTips";
import { getAdminSiteSettings } from "@/lib/cms/queries";
import { site as staticSite } from "@/data/site";

export default async function AdminSiteSettingsPage() {
  const overrides = await getAdminSiteSettings();

  const values = {
    phone: overrides?.phone ?? staticSite.phone,
    phoneTel: overrides?.phoneTel ?? staticSite.phoneTel,
    hours: overrides?.hours ?? staticSite.hours,
    address: overrides?.address ?? staticSite.address,
    description: overrides?.description ?? staticSite.description,
    subtitle: overrides?.subtitle ?? staticSite.subtitle,
    instagram: overrides?.instagram ?? staticSite.instagram,
    threads: overrides?.threads ?? staticSite.threads,
    facebook: overrides?.facebook ?? staticSite.facebook,
    xiaohongshu: overrides?.xiaohongshu ?? staticSite.xiaohongshu,
  };

  return (
    <>
      <AdminPageHeader
        title="站點設定"
        lead="全站聯絡資訊、SEO 描述與社群連結；主要顯示於頁尾與結構化資料。"
        guideHref="/admin/guide#site"
      />
      <form action={saveSiteSettings} className="kz-admin__card kz-admin__form max-w-2xl">
        <AdminTips
          items={[
            "未填欄位會保留靜態預設值。",
            "撥號用電話請填無空格格式（如 85297709300），供 tel: 連結使用。",
            "首頁主圖與內頁標題請至「首頁主視覺」「各頁標題與 SEO」編輯。",
          ]}
        />
        <div className="kz-admin__field">
          <label htmlFor="phone">顯示電話</label>
          <input id="phone" name="phone" defaultValue={values.phone} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="phone_tel">撥號用（無空格，如 85297709300）</label>
          <input id="phone_tel" name="phone_tel" defaultValue={values.phoneTel} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="hours">營業時間</label>
          <input id="hours" name="hours" defaultValue={values.hours} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="address">地址</label>
          <textarea id="address" name="address" defaultValue={values.address} rows={2} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="subtitle">副標題</label>
          <input id="subtitle" name="subtitle" defaultValue={values.subtitle} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="description">SEO 描述</label>
          <textarea
            id="description"
            name="description"
            defaultValue={values.description}
            rows={3}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="instagram">Instagram URL</label>
          <input id="instagram" name="instagram" defaultValue={values.instagram} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="threads">Threads URL</label>
          <input id="threads" name="threads" defaultValue={values.threads} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="facebook">Facebook URL</label>
          <input id="facebook" name="facebook" defaultValue={values.facebook} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="xiaohongshu">小紅書 URL</label>
          <input id="xiaohongshu" name="xiaohongshu" defaultValue={values.xiaohongshu} />
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          儲存設定
        </button>
      </form>
    </>
  );
}
