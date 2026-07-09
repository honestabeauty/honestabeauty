"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminPanelError({ error, reset }: Props) {
  useEffect(() => {
    console.error("[admin]", error);
  }, [error]);

  return (
    <div className="kz-admin__card kz-admin__error-card" role="alert">
      <h1 className="kz-admin__title">儲存或載入時出咗問題</h1>
      <p className="kz-admin__subtitle">
        請再試一次。若仍然失敗，可返回儀表板，或稍後再操作。內容多數情況下未寫入，唔使擔心整站壞咗。
      </p>
      {error.message ? (
        <p className="kz-admin__card-lead">
          詳細訊息：<code>{error.message}</code>
        </p>
      ) : null}
      <div className="kz-admin__error-actions">
        <button type="button" className="moana-pill-btn moana-pill-btn--dark" onClick={reset}>
          再試一次
        </button>
        <Link href="/admin" className="kz-admin__quick-btn kz-admin__quick-btn--ghost">
          返回儀表板
        </Link>
      </div>
    </div>
  );
}
