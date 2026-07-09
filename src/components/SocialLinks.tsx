import {
  FacebookLogo,
  InstagramLogo,
  ThreadsLogo,
} from "@phosphor-icons/react/dist/ssr";
import { site as staticSite } from "@/data/site";

export type SocialUrls = {
  instagram: string;
  threads: string;
  xiaohongshu: string;
  facebook: string;
};

function IconXiaohongshu({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="social-links__svg"
    >
      <path
        d="M7.2 4.8h9.6A2.4 2.4 0 0 1 19.2 7.2v9.6a2.4 2.4 0 0 1-2.4 2.4H7.2A2.4 2.4 0 0 1 4.8 16.8V7.2A2.4 2.4 0 0 1 7.2 4.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M8.4 9.2h2.1l1.05 3.35L12.7 9.2h2.1M8.8 14.8h6.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buildSocialItems(urls: SocialUrls, iconSize: number) {
  return [
    {
      href: urls.instagram,
      label: "Instagram",
      icon: <InstagramLogo size={iconSize} weight="regular" aria-hidden />,
    },
    {
      href: urls.threads,
      label: "Threads",
      icon: <ThreadsLogo size={iconSize} weight="regular" aria-hidden />,
    },
    {
      href: urls.xiaohongshu,
      label: "小紅書",
      icon: <IconXiaohongshu size={iconSize} />,
    },
    {
      href: urls.facebook,
      label: "Facebook",
      icon: <FacebookLogo size={iconSize} weight="regular" aria-hidden />,
    },
  ] as const;
}

type Props = {
  urls?: Partial<SocialUrls>;
  variant?: "header" | "footer";
  className?: string;
};

export function SocialLinks({
  urls,
  variant = "header",
  className = "",
}: Props) {
  const resolved: SocialUrls = {
    instagram: urls?.instagram ?? staticSite.instagram,
    threads: urls?.threads ?? staticSite.threads,
    xiaohongshu: urls?.xiaohongshu ?? staticSite.xiaohongshu,
    facebook: urls?.facebook ?? staticSite.facebook,
  };
  const iconSize = variant === "footer" ? 15 : 16;
  const items = buildSocialItems(resolved, iconSize);
  const rootClass =
    variant === "footer"
      ? `social-links social-links--footer ${className}`.trim()
      : `social-links social-links--header header-social ${className}`.trim();
  const linkClass =
    variant === "footer" ? "social-links__item" : "header-social__link social-links__icon";

  if (variant === "footer") {
    return (
      <ul className={rootClass} aria-label="社群連結">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <span className="social-links__icon-wrap" aria-hidden>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={rootClass} aria-label="社群連結">
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label={item.label}
          title={item.label}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}
