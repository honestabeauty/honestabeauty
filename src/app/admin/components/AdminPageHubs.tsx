import Link from "next/link";

export type AdminPageHub = {
  id: string;
  title: string;
  description: string;
  previewHref: string;
  links: { label: string; href: string }[];
};

export const ADMIN_PAGE_HUBS: AdminPageHub[] = [
  {
    id: "home",
    title: "首頁",
    description: "主視覺、區塊排序、信任文案、精選療程與短片。",
    previewHref: "/",
    links: [
      { label: "首頁主視覺", href: "/admin/hero" },
      { label: "首頁區塊", href: "/admin/home-sections" },
      { label: "共用文案區塊", href: "/admin/content" },
      { label: "療程", href: "/admin/treatments" },
      { label: "醫美知識", href: "/admin/journal" },
      { label: "店內短片", href: "/admin/videos" },
    ],
  },
  {
    id: "wellness",
    title: "痛症理療",
    description: "服務圖文在「共用文案」；頁面標題與 SEO 在「各頁標題」。",
    previewHref: "/wellness",
    links: [
      { label: "痛症服務圖文", href: "/admin/content#wellness" },
      { label: "頁面標題與 SEO", href: "/admin/pages?page=wellness" },
    ],
  },
  {
    id: "skin",
    title: "量膚定制",
    description: "內頁標題、說明面板與搜尋關鍵字。",
    previewHref: "/skin-analysis",
    links: [{ label: "頁面標題與 SEO", href: "/admin/pages?page=skin-analysis" }],
  },
  {
    id: "about",
    title: "關於",
    description: "關於頁標題與說明。",
    previewHref: "/about",
    links: [{ label: "頁面標題與 SEO", href: "/admin/pages?page=about" }],
  },
  {
    id: "treatments",
    title: "療程目錄",
    description: "療程列表與單項詳情。",
    previewHref: "/treatments",
    links: [
      { label: "療程列表", href: "/admin/treatments" },
      { label: "頁面標題與 SEO", href: "/admin/pages?page=treatments" },
    ],
  },
  {
    id: "journal",
    title: "醫美知識",
    description: "文章列表與單篇內容。",
    previewHref: "/journal",
    links: [
      { label: "文章列表", href: "/admin/journal" },
      { label: "頁面標題與 SEO", href: "/admin/pages?page=journal" },
    ],
  },
  {
    id: "faq",
    title: "常見問題",
    description: "問答內容與 FAQ 頁標題。",
    previewHref: "/faq",
    links: [
      { label: "問答列表", href: "/admin/faq" },
      { label: "頁面標題與 SEO", href: "/admin/pages?page=faq" },
    ],
  },
];

export function AdminPageHubs() {
  return (
    <section className="kz-admin__section" id="page-hubs">
      <div className="kz-admin__card-head">
        <div>
          <h2 className="kz-admin__section-title">依頁面編輯</h2>
          <p className="kz-admin__section-lead">
            想改某一頁時，從這裡進入相關後台項目，不用猜要開哪個選單。
          </p>
        </div>
      </div>
      <div className="kz-admin__hub-grid">
        {ADMIN_PAGE_HUBS.map((hub) => (
          <article key={hub.id} className="kz-admin__hub-card">
            <div className="kz-admin__hub-card-head">
              <h3 className="kz-admin__hub-title">{hub.title}</h3>
              <Link
                href={hub.previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="kz-admin__hub-preview"
              >
                前台 ↗
              </Link>
            </div>
            <p className="kz-admin__hub-desc">{hub.description}</p>
            <ul className="kz-admin__hub-links">
              {hub.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
