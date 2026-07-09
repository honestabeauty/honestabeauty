"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  hint?: string;
  exact?: boolean;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    label: "總覽",
    items: [
      { href: "/admin", label: "儀表板", hint: "上手步驟與內容總覽", exact: true },
      { href: "/admin#page-hubs", label: "依頁面編輯", hint: "想改哪一頁就從這裡進" },
    ],
  },
  {
    label: "版面與文案",
    items: [
      { href: "/admin/hero", label: "首頁主視覺", hint: "輪播圖、標題、按鈕" },
      { href: "/admin/home-sections", label: "首頁區塊", hint: "區塊開關、排序、文案" },
      { href: "/admin/content", label: "共用文案區塊", hint: "信任重點、評價、痛症服務" },
      { href: "/admin/pages", label: "各頁標題與 SEO", hint: "內頁標題、說明、搜尋關鍵字" },
    ],
  },
  {
    label: "列表內容",
    items: [
      { href: "/admin/journal", label: "醫美知識", hint: "文章新增與編輯" },
      { href: "/admin/treatments", label: "療程", hint: "療程資料與價錢" },
      { href: "/admin/videos", label: "店內短片", hint: "首頁短片標題與排序" },
      { href: "/admin/faq", label: "常見問題", hint: "問答內容" },
    ],
  },
  {
    label: "資源",
    items: [{ href: "/admin/media", label: "媒體庫", hint: "上傳與管理圖片" }],
  },
  {
    label: "設定",
    items: [{ href: "/admin/site", label: "站點設定", hint: "電話、地址、社群" }],
  },
  {
    label: "說明",
    items: [{ href: "/admin/guide", label: "使用說明", hint: "操作手冊與常見問題" }],
  },
];

function isActive(pathname: string, item: NavItem) {
  if (item.href.includes("#")) return false;
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type Props = {
  onNavigate?: () => void;
};

export function AdminNav({ onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <nav className="kz-admin__nav" aria-label="CMS 導覽">
      {navGroups.map((group) => (
        <div key={group.label} className="kz-admin__nav-group">
          <p className="kz-admin__nav-label">{group.label}</p>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item) ? "page" : undefined}
              title={item.hint}
              onClick={onNavigate}
            >
              <span className="kz-admin__nav-link-label">{item.label}</span>
              {item.hint ? (
                <span className="kz-admin__nav-link-hint">{item.hint}</span>
              ) : null}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
