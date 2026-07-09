"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { SocialLinks, type SocialUrls } from "@/components/SocialLinks";
import { IconClose, IconMenu } from "@/components/icons/KzIcons";
import { navItems, site } from "@/data/site";

type Props = {
  socialUrls?: Partial<SocialUrls>;
};

export function Header({ socialUrls }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    const nav = mobileNavRef.current;
    const focusable = nav?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, closeMenu]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="header-editorial sticky top-0 z-50">
      <div className="container-kz flex h-[var(--header-height)] items-center justify-between gap-3">
        <Link href="/" className="brand-logo-link group no-underline shrink-0">
          <BrandLogo priority />
          <span className="sr-only">{site.name} {site.nameEn}</span>
        </Link>

        <nav
          className="header-editorial__nav hidden items-center lg:flex"
          aria-label="主導覽"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-cta-id={`cta_nav_${item.href.replace(/\//g, "") || "home"}`}
              className={`header-editorial__link font-ui no-underline transition-colors ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "header-editorial__link--active"
                  : "header-editorial__link--muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <SocialLinks variant="header" urls={socialUrls} />
          <Link
            href="/book"
            className="btn-primary conversion-touch-target shrink-0"
            data-cta-id="cta_header_book_desktop"
          >
            預約
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden shrink-0">
          <Link
            href="/book"
            className="conversion-touch-target font-ui text-base uppercase tracking-widest text-kz-brand-navy no-underline inline-flex items-center px-3 py-2"
            data-cta-id="cta_header_book_mobile"
          >
            預約
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="conversion-touch-target flex h-11 w-11 items-center justify-center border border-kz-brand-navy/20 text-kz-brand-navy"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "關閉選單" : "開啟選單"}
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          className="header-editorial__drawer border-t border-kz-plum/10 px-5 py-4 lg:hidden"
          aria-label="手機導覽"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-kz-plum/10">
                <Link
                  href={item.href}
                  className="conversion-touch-target block py-4 font-ui text-lg tracking-wide text-kz-plum no-underline"
                  data-cta-id={`cta_mobile_nav_${item.href.replace(/\//g, "")}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-kz-plum/10 py-4">
              <SocialLinks
                variant="header"
                urls={socialUrls}
                className="header-social--drawer"
              />
            </li>
            <li className="pt-3">
              <Link
                href="/book"
                className="btn-primary conversion-touch-target inline-flex"
                data-cta-id="cta_mobile_nav_book"
                onClick={closeMenu}
              >
                預約
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
