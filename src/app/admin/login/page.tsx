import { site } from "@/data/site";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminThemeToggle } from "@/app/admin/components/AdminThemeToggle";
import { signInAdmin } from "../auth-actions";
import { isCmsConfigured } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ error?: string }> };

const errors: Record<string, string> = {
  missing: "請輸入電郵同密碼。",
  invalid: "登入失敗，請檢查電郵或密碼。",
  unauthorized: "此帳戶未獲內容後台管理權限。請使用已授權的管理員電郵登入。",
  config: "後台尚未完成連線設定，請聯絡協助建站的同事。",
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
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
        <p className="kz-admin__login-lead">內容管理後台登入</p>
        <div className="kz-admin__login-theme">
          <AdminThemeToggle compact />
        </div>

        {!configured ? (
          <p className="mt-6 text-sm text-kz-plum-muted">
            後台尚未連接資料庫。請聯絡協助建站的同事完成設定後再登入。
          </p>
        ) : (
          <form action={signInAdmin} className="kz-admin__form mt-6">
            {error && (
              <p className="text-sm text-red-700" role="alert">
                {errors[error] ?? "登入失敗。"}
              </p>
            )}
            <div className="kz-admin__field">
              <label htmlFor="email">電郵</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="kz-admin__field">
              <label htmlFor="password">密碼</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
              登入
            </button>
          </form>
        )}

        <p className="mt-8 text-xs text-kz-plum-muted">
          <Link href="/" className="text-kz-rose no-underline">
            ← 返回網站
          </Link>
        </p>
      </div>
    </div>
  );
}
