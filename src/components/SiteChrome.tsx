"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { CtaClickTracker } from "@/components/CtaClickTracker";
import { PageEngagementTracker } from "@/components/PageEngagementTracker";

/**
 * Conditionally renders the public site chrome (Header / Footer / mobile booking
 * bar) around page content, hiding it under /admin.
 *
 * This replaces a server-side `headers()` check in the root layout. `headers()`
 * is a dynamic API, so reading it in the root layout forced EVERY route to be
 * server-rendered on demand. Deciding on the client via `usePathname()` keeps
 * the layout static, which lets public content pages opt into ISR.
 *
 * Header / Footer / mobileBar are passed in as already-rendered Server Component
 * elements (the supported "server components as props" pattern).
 */
export function SiteChrome({
  header,
  footer,
  mobileBar,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  mobileBar: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin") ?? false;

  return (
    <>
      {!isAdmin && <PageEngagementTracker />}
      {!isAdmin && <CtaClickTracker />}
      {!isAdmin && header}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      {!isAdmin && footer}
      {!isAdmin && mobileBar}
    </>
  );
}
