import type { NextConfig } from "next";

function getSupabaseImagePatterns(): NonNullable<NextConfig["images"]>["remotePatterns"] {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return [];

  try {
    const { hostname } = new URL(url);
    return [
      {
        protocol: "https",
        hostname,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "12mb",
    },
  },
  images: {
    remotePatterns: getSupabaseImagePatterns(),
  },
  async redirects() {
    return [
      {
        source: "/men",
        destination: "/treatments",
        permanent: true,
      },
      {
        source: "/men/:path*",
        destination: "/treatments",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const verificationFile = process.env.GOOGLE_SITE_VERIFICATION_FILE?.trim();
    if (!verificationFile) return [];

    return [
      {
        source: `/${verificationFile}`,
        destination: "/api/google-site-verification",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/brand/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
