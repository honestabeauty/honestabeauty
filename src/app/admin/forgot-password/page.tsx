import { site } from "@/data/site";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { AdminThemeToggle } from "@/app/admin/components/AdminThemeToggle";
import { requestPasswordReset } from "../auth-actions";
import { isCmsConfigured } from "@/lib/supabase/env";

type Props = { searchParams: Promise<{ sent?: string; error?: string }> };

const errors: Record<string, string> = {
  missing: "請輸入電郵。",
  send: "無法寄出重設信，請稍後再試或聯絡站長。",
  config: "後台尚未完成連線設定，請聯絡協助建站的同事。",
};

export default async function AdminForgotPasswordPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const configured = isCmsConfigured();
  const justSent = sent === "1";

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
        <p className="kz-admin__login-lead">重設後台密碼</p>
        <div className="kz-admin__login-theme">
          <AdminThemeToggle compact />
        </div>

        {!configured ? (
          <p className="mt-6 text-sm text-kz-plum-muted">{errors.config}</p>
        ) : justSent ? (
          <div className="mt-6 space-y-4">
            <p className="text-sm text-kz-plum-muted">
              若該電郵已獲授權，我們已寄出重設連結。請檢查收件匣（及垃圾郵件），並於約 1
              小時內完成設定。
            </p>
            <Link href="/admin/login" className="moana-pill-btn moana-pill-btn--dark inline-flex">
              返回登入
            </Link>
          </div>
        ) : (
          <form action={requestPasswordReset} className="kz-admin__form mt-6">
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {errors[error] ?? "寄送失敗。"}
              </p>
            ) : null}
            <p className="text-sm text-kz-plum-muted">
              輸入管理員電郵，我們會寄出重設密碼連結到你的信箱。
            </p>
            <div className="kz-admin__field">
              <label htmlFor="email">電郵</label>
              <input id="email" name="email" type="email" required autoComplete="email" />
            </div>
            <button type="submit" className="moana-pill-btn moana-pill-btn--dark">
              寄出重設連結
            </button>
          </form>
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
