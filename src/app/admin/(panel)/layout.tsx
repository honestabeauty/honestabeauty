import { site } from "@/data/site";
import type { ReactNode } from "react";
import Link from "next/link";
import { Suspense } from "react";
import { AdminMobileChrome } from "@/app/admin/components/AdminMobileChrome";
import { AdminNav } from "@/app/admin/components/AdminNav";
import { AdminSaveNotice } from "@/app/admin/components/AdminSaveNotice";
import { AdminThemeToggle } from "@/app/admin/components/AdminThemeToggle";
import { BrandLogo } from "@/components/BrandLogo";
import { signOutAdmin } from "../auth-actions";

export default function AdminPanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="kz-admin">
      <AdminMobileChrome />
      <div className="kz-admin__shell">
        <aside className="kz-admin__sidebar">
          <div className="kz-admin__sidebar-top">
            <Link href="/admin" className="kz-admin__brand">
              <BrandLogo className="kz-admin__brand-icon" priority />
              <span className="kz-admin__brand-text">
                {site.name}
                <small>{site.nameEn}</small>
              </span>
            </Link>
            <AdminNav />
          </div>
          <div className="kz-admin__sidebar-foot">
            <AdminThemeToggle />
            <form action={signOutAdmin}>
              <button type="submit" className="kz-admin__logout">
                登出
              </button>
            </form>
            <Link href="/" className="kz-admin__back-site">
              ← 返回網站
            </Link>
          </div>
        </aside>
        <main className="kz-admin__main">
          <Suspense fallback={null}>
            <AdminSaveNotice />
          </Suspense>
          {children}
        </main>
      </div>
    </div>
  );
}
