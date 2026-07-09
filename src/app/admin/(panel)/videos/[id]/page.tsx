import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteShopVideoAction, saveShopVideo } from "@/app/admin/actions";
import { AdminComboSelect } from "@/app/admin/components/AdminComboSelect";
import { AdminDeleteButton } from "@/app/admin/components/AdminDeleteButton";
import { AdminPageHeader } from "@/app/admin/components/AdminPageHeader";
import { MediaFieldPicker } from "@/app/admin/components/MediaFieldPicker";
import { MediaSpecBox } from "@/app/admin/components/MediaSpecBox";
import { getCmsPathOptions } from "@/lib/cms/admin-path-options";
import { getAdminShopVideo } from "@/lib/cms/queries";

const categories = ["開店", "療程", "儀器", "日常", "產品", "門店"];

type Props = { params: Promise<{ id: string }> };

export default async function AdminVideoEditPage({ params }: Props) {
  const { id } = await params;
  const [video, pathOptions] = await Promise.all([
    getAdminShopVideo(Number(id)),
    getCmsPathOptions(),
  ]);
  if (!video) notFound();

  return (
    <>
      <AdminPageHeader
        title={`編輯短片 #${video.id}`}
        lead={video.title}
        breadcrumbs={[
          { label: "儀表板", href: "/admin" },
          { label: "店內短片", href: "/admin/videos" },
          { label: "編輯短片" },
        ]}
        previewHref="/#shop-videos-title"
        guideHref="/admin/guide#videos"
      >
        <Link href="/admin/videos" className="text-sm text-kz-rose no-underline">
          ← 返回列表
        </Link>
      </AdminPageHeader>
      <form action={saveShopVideo} className="kz-admin__card kz-admin__form">
        <input type="hidden" name="id" value={video.id} />
        <div className="kz-admin__field">
          <label htmlFor="title">標題</label>
          <input id="title" name="title" defaultValue={video.title} required />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="excerpt">摘要</label>
          <textarea id="excerpt" name="excerpt" rows={3} defaultValue={video.excerpt} />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="category">分類</label>
          <select id="category" name="category" defaultValue={video.category}>
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
            defaultValue={video.duration_sec}
          />
        </div>
        <MediaFieldPicker
          urlName="poster"
          label="封面"
          defaultUrl={video.poster}
          folder="posters"
          specKey="posters"
          required
          hint="上傳後自動填入；或使用 /videos/reels/posters/ 路徑。"
        />
        <div className="kz-admin__field">
          <label htmlFor="src">影片路徑</label>
          <MediaSpecBox spec="reelVideo" compact />
          <input id="src" name="src" defaultValue={video.src} required className="mt-3" />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="related_href">相關連結</label>
          <AdminComboSelect
            id="related_href"
            name="related_href"
            options={pathOptions}
            defaultValue={video.related_href ?? ""}
            emptyLabel="（不設定）"
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="sort_order">排序</label>
          <input
            id="sort_order"
            name="sort_order"
            type="number"
            defaultValue={video.sort_order}
          />
        </div>
        <div className="kz-admin__field">
          <label htmlFor="status">狀態</label>
          <select id="status" name="status" defaultValue={video.status}>
            <option value="published">已發布</option>
            <option value="draft">草稿</option>
          </select>
        </div>
        <div className="kz-admin__actions">
          <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
            儲存
          </button>
          <AdminDeleteButton
            action={deleteShopVideoAction}
            hidden={{ id: String(video.id) }}
            confirmMessage={`確定刪除「${video.title}」？`}
            className="moana-pill-btn moana-pill-btn--ghost"
          >
            刪除
          </AdminDeleteButton>
        </div>
      </form>
    </>
  );
}
