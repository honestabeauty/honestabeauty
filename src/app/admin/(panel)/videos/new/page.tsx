import Link from "next/link";
import { saveShopVideo } from "@/app/admin/actions";
import { AdminComboSelect } from "@/app/admin/components/AdminComboSelect";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";
import { MediaSpecBox } from "@/app/admin/components/MediaSpecBox";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";

const categories = ["開店", "療程", "儀器", "日常", "產品", "門店"];

export default async function AdminVideoNewPage() {
  const pathOptions = await getCmsPathOptions();
  return (
    <>
      <AdminPageHeader
        title="新增短片"
        lead="先準備好影片檔路徑與封面，再填標題與分類。"
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "店內短片", href: "/admin/videos" },
          { label: "新增短片" },
        ]}
        previewHref="/#shop-videos-title"
        guideHref="/admin/guide#videos"
      >
        <Link href="/admin/videos" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveShopVideo} className="kz-admin__card kz-admin__form">
        <div className="kz-admin__field">
          <label htmlFor="title">標題</label>
          <input id="title" name="title" required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="excerpt">摘要</label>
          <textarea id="excerpt" name="excerpt" rows={3} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <select id="category" name="category" defaultValue="日常">
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="kz-admin__field">
          <label htmlFor="duration_sec">片長（秒）</label>
          <input
            id="duration_sec"
            name="duration_sec"
            type="number"
            step="0.1"
            min="0"
            defaultValue="0"
          />
        </div>
        <MediaFieldPicker
          urlName="poster"
          label="封面"
          defaultUrl="/videos/reels/posters/1.jpg"
          folder="posters"
          specKey="posters"
          required
          hint="上傳後自動填入；或使用 /videos/reels/posters/ 路徑。"
        />
        <div className="kz-admin__field">
          <label htmlFor="src">影片路徑</label>
          <MediaSpecBox spec="reelVideo" compact />
          <input
            id="src"
            name="src"
            placeholder="/videos/reels/1.mp4"
            required
            className="mt-3"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="related_href">相關連結（選填）</label>
          <AdminComboSelect
            id="related_href"
            name="related_href"
            options={pathOptions}
            emptyLabel="（不設定）"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="sort_order">排序</label>
          <input id="sort_order" name="sort_order" type="number" defaultValue="0" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue="published">
            <option value="published">已發布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
          建立
        </button>
      </form>
    </>
  );
}
