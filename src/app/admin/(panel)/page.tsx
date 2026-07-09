import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCmsConfigured } from "@/lib/supabase/env";
import {
  GA4_METRIC_HINTS,
  TRACKING_EVENT_GROUPS,
  getAnalyticsStatus,
} from "@/data/tracking-spec";
import { AdminPageHubs } from "@/app/admin/components/AdminPageHubs";

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("zh-Hant", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export default async function AdminDashboardPage() {
  if (!isCmsConfigured()) {
    return (
      <div className="kz-admin__card kz-admin__card--muted">
        <h2 className="kz-admin__card-title">後台尚未連接</h2>
        <p className="kz-admin__card-lead">
          網站內容資料庫尚未設定完成。請聯絡協助建站的同事完成連線後，再重新整理此頁。
        </p>
      </div>
    );
  }

  const supabase = await createSupabaseServerClient();
  const analytics = getAnalyticsStatus();

  const [
    journalPub,
    journalDraft,
    treatmentsPub,
    treatmentsDraft,
    faqsPub,
    faqsDraft,
    videosPub,
    videosDraft,
    media,
    recentJournal,
    recentTreatments,
    siteSettings,
  ] = await Promise.all([
    supabase
      .from("kz_cms_journal_posts")
      .select("slug", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_journal_posts")
      .select("slug", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase
      .from("kz_cms_treatments")
      .select("slug", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_treatments")
      .select("slug", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase.from("kz_cms_faqs").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("kz_cms_faqs").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase
      .from("kz_cms_shop_videos")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("kz_cms_shop_videos")
      .select("id", { count: "exact", head: true })
      .eq("status", "draft"),
    supabase.from("kz_cms_media").select("id", { count: "exact", head: true }),
    supabase
      .from("kz_cms_journal_posts")
      .select("slug, title, status, updated_at, published_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("kz_cms_treatments")
      .select("slug, name, status, updated_at")
      .order("updated_at", { ascending: false })
      .limit(5),
    supabase
      .from("kz_cms_site_settings")
      .select("updated_at")
      .eq("id", "default")
      .maybeSingle(),
  ]);

  const draftTotal =
    (journalDraft.count ?? 0) +
    (treatmentsDraft.count ?? 0) +
    (faqsDraft.count ?? 0) +
    (videosDraft.count ?? 0);

  const stats = [
    {
      label: "醫美知識",
      count: journalPub.count ?? 0,
      draft: journalDraft.count ?? 0,
      href: "/admin/journal",
      tone: "rose",
    },
    {
      label: "療程",
      count: treatmentsPub.count ?? 0,
      draft: treatmentsDraft.count ?? 0,
      href: "/admin/treatments",
      tone: "plum",
    },
    {
      label: "店內短片",
      count: videosPub.count ?? 0,
      draft: videosDraft.count ?? 0,
      href: "/admin/videos",
      tone: "sage",
    },
    {
      label: "媒體庫",
      count: media.count ?? 0,
      draft: 0,
      href: "/admin/media",
      tone: "lilac",
    },
    {
      label: "常見問題",
      count: faqsPub.count ?? 0,
      draft: faqsDraft.count ?? 0,
      href: "/admin/faq",
      tone: "gold",
    },
  ];

  const gettingStarted = [
    {
      step: "1",
      title: "確認電話與地址",
      href: "/admin/site",
      desc: "站點設定：電話、營業時間、社群連結",
    },
    {
      step: "2",
      title: "更新首頁主圖",
      href: "/admin/hero",
      desc: "首頁最上方輪播圖與標題",
    },
    {
      step: "3",
      title: "發布一篇文章",
      href: "/admin/journal",
      desc: "醫美知識：新增或編輯文章",
    },
  ];

  return (
    <>
      <header className="kz-admin__header kz-admin__header--dashboard">
        <div>
          <p className="kz-admin__eyebrow">內容後台</p>
          <h1 className="kz-admin__title">儀表板</h1>
          <p className="kz-admin__subtitle">
            在這裡改網站文字與圖片。儲存後前台約 1 分鐘內更新。站點設定最後更新：
            {formatDateTime(siteSettings.data?.updated_at)}
          </p>
        </div>
        {draftTotal > 0 ? (
          <div className="kz-admin__alert kz-admin__alert--draft">
            <strong>{draftTotal}</strong> 則草稿未發布
          </div>
        ) : (
          <div className="kz-admin__alert kz-admin__alert--ok">全部內容已發布</div>
        )}
      </header>

      <section className="kz-admin__card kz-admin__welcome">
        <h2 className="kz-admin__card-title">歡迎使用康姿健內容後台</h2>
        <p className="kz-admin__card-lead">
          左側選單可直接進入各模組；若不知道要改哪，請用下方「依頁面編輯」。完整說明見{" "}
          <Link href="/admin/guide" className="kz-admin__text-link">
            使用說明
          </Link>
          。
        </p>
        <ol className="kz-admin__steps">
          {gettingStarted.map((item) => (
            <li key={item.href} className="kz-admin__step">
              <span className="kz-admin__step-num" aria-hidden>
                {item.step}
              </span>
              <div>
                <Link href={item.href} className="kz-admin__step-title">
                  {item.title}
                </Link>
                <p className="kz-admin__step-desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <AdminPageHubs />

      <section className="kz-admin__section">
        <h2 className="kz-admin__section-title">內容數量</h2>
        <div className="kz-admin__stat-grid">
          {stats.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`kz-admin__stat-card kz-admin__stat-card--${item.tone}`}
            >
              <p className="kz-admin__stat-label">{item.label}</p>
              <p className="kz-admin__stat-value">{item.count}</p>
              {item.draft > 0 ? (
                <p className="kz-admin__stat-meta">
                  <span className="kz-admin__badge kz-admin__badge--draft">
                    {item.draft} 草稿
                  </span>
                </p>
              ) : (
                <p className="kz-admin__stat-meta">已發布</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <div className="kz-admin__dashboard-grid">
        <section className="kz-admin__card">
          <div className="kz-admin__card-head">
            <h2 className="kz-admin__card-title">最近更新</h2>
            <Link href="/admin/journal" className="kz-admin__text-link">
              全部文章
            </Link>
          </div>
          <ul className="kz-admin__activity-list">
            {(recentJournal.data ?? []).map((row) => (
              <li key={row.slug}>
                <Link href={`/admin/journal/${row.slug}`} className="kz-admin__activity-item">
                  <span className="kz-admin__activity-title">{row.title}</span>
                  <span className="kz-admin__activity-meta">
                    {row.status === "draft" ? (
                      <span className="kz-admin__badge kz-admin__badge--draft">草稿</span>
                    ) : null}
                    {formatDateTime(row.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
            {(recentJournal.data ?? []).length === 0 ? (
              <li className="kz-admin__empty">尚無文章</li>
            ) : null}
          </ul>
          <div className="kz-admin__card-head kz-admin__card-head--spaced">
            <h3 className="kz-admin__card-subtitle">療程</h3>
            <Link href="/admin/treatments" className="kz-admin__text-link">
              全部療程
            </Link>
          </div>
          <ul className="kz-admin__activity-list">
            {(recentTreatments.data ?? []).map((row) => (
              <li key={row.slug}>
                <Link
                  href={`/admin/treatments/${row.slug}`}
                  className="kz-admin__activity-item"
                >
                  <span className="kz-admin__activity-title">{row.name}</span>
                  <span className="kz-admin__activity-meta">
                    {row.status === "draft" ? (
                      <span className="kz-admin__badge kz-admin__badge--draft">草稿</span>
                    ) : null}
                    {formatDateTime(row.updated_at)}
                  </span>
                </Link>
              </li>
            ))}
            {(recentTreatments.data ?? []).length === 0 ? (
              <li className="kz-admin__empty">尚無療程</li>
            ) : null}
          </ul>
        </section>

        <section className="kz-admin__card">
          <h2 className="kz-admin__card-title">常用捷徑</h2>
          <div className="kz-admin__quick-actions">
            <Link href="/admin/site" className="kz-admin__quick-btn">
              電話／地址
            </Link>
            <Link href="/admin/hero" className="kz-admin__quick-btn">
              首頁主視覺
            </Link>
            <Link href="/admin/media" className="kz-admin__quick-btn">
              上傳圖片
            </Link>
            <Link href="/admin/journal/new" className="kz-admin__quick-btn">
              新增文章
            </Link>
            <Link href="/admin/guide" className="kz-admin__quick-btn">
              使用說明
            </Link>
          </div>
          <div className="kz-admin__tip-box">
            <p className="kz-admin__tip-title">小提示</p>
            <p>
              儲存後前台約 <strong>1 分鐘</strong>內自動更新。若畫面沒變，重新整理或稍候再看即可。
            </p>
          </div>
        </section>
      </div>

      <section className="kz-admin__section" id="analytics">
        <details className="kz-admin__card kz-admin__details">
          <summary className="kz-admin__details-summary">
            <span>
              <strong>進階：網站數據事件（可略過）</strong>
              <span className="kz-admin__details-meta">
                {analytics.active
                  ? analytics.mode === "gtm"
                    ? `已接 GTM`
                    : `已接 GA4`
                  : "未設定追蹤"}
              </span>
            </span>
          </summary>
          <div className="kz-admin__details-body">
            <p className="kz-admin__section-lead">
              此區給需要查看 Google Analytics 的同事參考；日常改文案可略過。
            </p>
            <div className="kz-admin__dashboard-grid kz-admin__dashboard-grid--analytics">
              <div>
                <h3 className="kz-admin__card-title">GA4 指標在哪看</h3>
                <ul className="kz-admin__metric-list">
                  {GA4_METRIC_HINTS.map((hint) => (
                    <li key={hint.metric}>
                      <strong>{hint.metric}</strong>
                      <span>{hint.ga4Path}</span>
                      <p>{hint.note}</p>
                    </li>
                  ))}
                </ul>
                <div className="kz-admin__external-links">
                  <a
                    href="https://analytics.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kz-admin__quick-btn"
                  >
                    開啟 Google Analytics
                  </a>
                </div>
              </div>
              <div>
                <h3 className="kz-admin__card-title">站內按鈕事件目錄</h3>
                <p className="kz-admin__card-lead">
                  訪客點擊預約等按鈕時，系統會記錄事件，方便之後在分析工具查看。
                </p>
                <div className="kz-admin__tracking-groups">
                  {TRACKING_EVENT_GROUPS.map((group) => (
                    <details key={group.title} className="kz-admin__tracking-group">
                      <summary>
                        {group.title}
                        <span>{group.events.length} 項</span>
                      </summary>
                      <p className="kz-admin__tracking-desc">{group.description}</p>
                      <table className="kz-admin__table kz-admin__table--compact">
                        <thead>
                          <tr>
                            <th>事件代碼</th>
                            <th>說明</th>
                          </tr>
                        </thead>
                        <tbody>
                          {group.events.map((event) => (
                            <tr key={event.id}>
                              <td>
                                <code>{event.id}</code>
                              </td>
                              <td>
                                {event.label}
                                {event.page ? (
                                  <span className="kz-admin__muted"> · {event.page}</span>
                                ) : null}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </details>
      </section>
    </>
  );
}
