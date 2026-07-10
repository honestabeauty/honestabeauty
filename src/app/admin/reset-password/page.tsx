import { site } from "@/data/site";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminThemeToggle } from "@/app/admin/components/AdminThemeToggle";
import { AdminResetPasswordForm } from "@/app/admin/components/AdminResetPasswordForm";
import { isCmsConfigured } from "@/lib/supabase/env";

export default function AdminResetPasswordPage() {
  const configured = isCmsConfigured();

  return (
    <div className="kz-admin kz-admin__login">
      <div className="kz-admin__card kz-admin__login-card">
        <div className="kz-admin__brand kz-admin__brand--center">
          <BrandLogo className="kz-admin__brand-icon kz-admin__brand-icon--login" priority />
          <span className="kz-admin__brand-text">
            {site.name}
            <small>{site.nameEn}</small>
          </span>
        </div>
        <p className="kz-admin__login-lead">設定新密碼</p>
        <div className="kz-admin__login-theme">
          <AdminThemeToggle compact />
        </div>

        {!configured ? (
          <p className="mt-6 text-sm text-kz-plum-muted">
            後台尚未連接資料庫。請聯絡協助建站的同事完成設定後再試。
          </p>
        ) : (
          <AdminResetPasswordForm />
        )}

        <p className="mt-8 text-xs text-kz-plum-muted">
          <Link href="/admin/login" className="text-kz-rose no-underline">
            ← 返回登入
          </Link>
        </p>
      </div>
    </div>
  );
}
