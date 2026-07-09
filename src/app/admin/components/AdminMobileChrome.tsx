"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminNav } from "@/app/admin/components/AdminNav";
import { AdminThemeToggle } from "@/app/admin/components/AdminThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/data/site";
import { signOutAdmin } from "../auth-actions";

function currentSectionLabel(pathname: string) {
  if (pathname === "/admin") return "儀表板";
  if (pathname.startsWith("/admin/hero")) return "首頁主視覺";
  if (pathname.startsWith("/admin/home-sections")) return "首頁區塊";
  if (pathname.startsWith("/admin/content")) return "共用文案區塊";
  if (pathname.startsWith("/admin/pages")) return "各頁標題與 SEO";
  if (pathname.startsWith("/admin/journal")) return "醫美知識";
  if (pathname.startsWith("/admin/treatments")) return "療程";
  if (pathname.startsWith("/admin/videos")) return "店內短片";
  if (pathname.startsWith("/admin/faq")) return "常見問題";
  if (pathname.startsWith("/admin/media")) return "媒體庫";
  if (pathname.startsWith("/admin/site")) return "站點設定";
  if (pathname.startsWith("/admin/guide")) return "使用說明";
  return "內容後台";
}

export function AdminMobileChrome() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const section = currentSectionLabel(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <div className="kz-admin__mobile-bar">
        <Link href="/admin" className="kz-admin__mobile-brand" onClick={() => setOpen(false)}>
          <BrandLogo className="kz-admin__brand-icon" />
          <span className="kz-admin__mobile-section">{section}</span>
        </Link>
        <button
          type="button"
          className="kz-admin__mobile-menu-btn"
          aria-expanded={open}
          aria-controls="admin-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "關閉" : "選單"}
        </button>
      </div>

      {open ? (
        <div className="kz-admin__mobile-drawer" id="admin-mobile-nav">
          <div className="kz-admin__mobile-drawer-inner">
            <p className="kz-admin__mobile-drawer-title">{site.name} 內容後台</p>
            <AdminNav onNavigate={() => setOpen(false)} />
            <div className="kz-admin__mobile-drawer-foot">
              <AdminThemeToggle />
              <form action={signOutAdmin}>
                <button type="submit" className="kz-admin__logout">
                  登出
                </button>
              </form>
              <Link href="/" className="kz-admin__back-site" onClick={() => setOpen(false)}>
                ← 返回網站
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
