"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Status = "loading" | "ready" | "saving" | "done" | "error";

export function AdminResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("正在驗證重設連結…");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;
    const supabase = createSupabaseBrowserClient();

    async function prepareSession() {
      try {
        const hash = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "";
        const search = typeof window !== "undefined" ? window.location.search : "";
        const hashParams = new URLSearchParams(hash);
        const queryParams = new URLSearchParams(search);

        const code = queryParams.get("code");
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else {
          const accessToken = hashParams.get("access_token");
          const refreshToken = hashParams.get("refresh_token");
          const type = hashParams.get("type");

          if (accessToken && refreshToken && (type === "recovery" || type === "invite")) {
            const { error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            if (error) throw error;
          }
        }

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (!session) {
          throw new Error("連結無效或已過期，請重新申請重設密碼。");
        }

        if (!cancelled) {
          setStatus("ready");
          setMessage("");
          // Clean tokens from the address bar after session is established
          window.history.replaceState({}, "", "/admin/reset-password");
        }
      } catch (err) {
        if (!cancelled) {
          setStatus("error");
          setMessage(err instanceof Error ? err.message : "無法驗證重設連結。");
        }
      }
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && !cancelled) {
        setStatus("ready");
        setMessage("");
      }
    });

    void prepareSession();

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (password.length < 8) {
      setStatus("error");
      setMessage("密碼至少需要 8 個字元。");
      return;
    }
    if (password !== confirm) {
      setStatus("error");
      setMessage("兩次輸入的密碼不一致。");
      return;
    }

    startTransition(async () => {
      setStatus("saving");
      setMessage("正在更新密碼…");
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setStatus("error");
        setMessage(error.message || "更新密碼失敗，請重試或重新申請連結。");
        return;
      }
      setStatus("done");
      setMessage("密碼已更新，正在進入後台…");
      router.replace("/admin");
      router.refresh();
    });
  }

  if (status === "loading") {
    return <p className="mt-6 text-sm text-kz-plum-muted">{message}</p>;
  }

  if (status === "error" && !pending) {
    return (
      <div className="mt-6 space-y-4">
        <p className="text-sm text-red-700" role="alert">
          {message}
        </p>
        <a href="/admin/forgot-password" className="moana-pill-btn moana-pill-btn--dark inline-flex">
          重新申請重設密碼
        </a>
      </div>
    );
  }

  if (status === "done") {
    return <p className="mt-6 text-sm text-kz-plum-muted">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="kz-admin__form mt-6">
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-700" : "text-kz-plum-muted"}`} role="status">
          {message}
        </p>
      ) : null}
      <div className="kz-admin__field">
        <label htmlFor="password">新密碼</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={pending || status === "saving"}
        />
      </div>
      <div className="kz-admin__field">
        <label htmlFor="confirm">確認新密碼</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={pending || status === "saving"}
        />
      </div>
      <button
        type="submit"
        className="moana-pill-btn moana-pill-btn--dark"
        disabled={pending || status === "saving"}
      >
        {status === "saving" ? "儲存中…" : "更新密碼並登入"}
      </button>
    </form>
  );
}
