import Link from "next/link";
import type { ReactNode } from "react";

export type AdminBreadcrumb = {
  label: string;
  href?: string;
};

export type AdminRelatedLink = {
  label: string;
  href: string;
};

type Props = {
  title: ReactNode;
  lead?: string;
  breadcrumbs?: AdminBreadcrumb[];
  relatedLinks?: AdminRelatedLink[];
  relatedLabel?: string;
  previewHref?: string;
  previewLabel?: string;
  guideHref?: string;
  children?: ReactNode;
};

export function AdminPageHeader({
  title,
  lead,
  breadcrumbs,
  relatedLinks,
  relatedLabel = "相關編輯",
  previewHref,
  previewLabel = "預覽前台",
  guideHref,
  children,
}: Props) {
  return (
    <header className="kz-admin__header">
      <div className="kz-admin__header-main">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="kz-admin__breadcrumbs" aria-label="麵包屑">
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="kz-admin__breadcrumb">
                {index > 0 ? (
                  <span className="kz-admin__breadcrumb-sep" aria-hidden>
                    ›
                  </span>
                ) : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="kz-admin__breadcrumb-link">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="kz-admin__breadcrumb-current">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <h1 className="kz-admin__title">{title}</h1>
        {lead ? <p className="kz-admin__subtitle">{lead}</p> : null}
        {(previewHref || guideHref) && (
          <div className="kz-admin__header-links">
            {previewHref ? (
              <Link
                href={previewHref}
                target="_blank"
                rel="noopener noreferrer"
                className="kz-admin__header-link"
              >
                {previewLabel} ↗
              </Link>
            ) : null}
            {guideHref ? (
              <Link href={guideHref} className="kz-admin__header-link kz-admin__header-link--muted">
                使用說明
              </Link>
            ) : null}
          </div>
        )}
        {relatedLinks && relatedLinks.length > 0 ? (
          <p className="kz-admin__related">
            <span className="kz-admin__related-label">{relatedLabel}：</span>
            {relatedLinks.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? <span className="kz-admin__related-sep">·</span> : null}
                <Link href={link.href} className="kz-admin__related-link">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </div>
      {children ? <div className="kz-admin__header-actions">{children}</div> : null}
    </header>
  );
}
