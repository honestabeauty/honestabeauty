import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { SocialLinks } from "@/components/SocialLinks";
import { footerNavItems } from "@/data/site";
import { getSite } from "@/lib/cms/site";

export async function Footer() {
  const site = await getSite();
  const telHref = `tel:+${site.phoneTel}`;

  return (
    <footer className="border-t border-kz-lilac/60 bg-kz-lilac/30">
      <div className="container-kz section-kz">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block no-underline">
              <BrandLogo className="brand-logo--footer" />
            </Link>
            <p className="mt-4 font-ui text-[10px] uppercase tracking-[0.18em] text-kz-plum-muted">
              {site.serviceKeywords}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-kz-plum-muted">
              {site.studioTag} · {site.subtitle}
            </p>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              導覽
            </p>
            <ul className="mt-4 space-y-2">
              {footerNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-kz-plum no-underline hover:text-kz-rose"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              聯絡
            </p>
            <ul className="mt-4 space-y-2 text-sm text-kz-plum-muted">
              <li>{site.location}</li>
              <li>{site.address}</li>
              <li>
                <a href={telHref} className="text-kz-plum no-underline hover:text-kz-rose">
                  {site.phone}
                </a>
              </li>
              <li>{site.hours}</li>
            </ul>
          </div>

          <div>
            <p className="font-ui text-xs uppercase tracking-widest text-kz-plum-muted">
              追蹤我們
            </p>
            <SocialLinks
              variant="footer"
              urls={{
                instagram: site.instagram,
                threads: site.threads,
                xiaohongshu: site.xiaohongshu,
                facebook: site.facebook,
              }}
            />
          </div>
        </div>

        <div className="mt-12 border-t border-kz-lilac/60 pt-8 text-center text-xs text-kz-plum-muted">
          <p>
            © {new Date().getFullYear()} {site.name} {site.nameEn}. 屯門量膚定制皮膚管理.
          </p>
        </div>
      </div>
    </footer>
  );
}
