/** Google Search Console — HTML meta tag content value. */
export function getGoogleSiteVerificationMeta(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
}

/** Google Search Console — HTML file name, e.g. google1234567890abcdef.html */
export function getGoogleSiteVerificationFile(): string | undefined {
  return process.env.GOOGLE_SITE_VERIFICATION_FILE?.trim() || undefined;
}

export function getGoogleSiteVerificationFileBody(filename: string): string {
  return `google-site-verification: ${filename}`;
}
