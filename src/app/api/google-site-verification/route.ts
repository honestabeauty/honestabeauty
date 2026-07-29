import {
  getGoogleSiteVerificationFile,
  getGoogleSiteVerificationFileBody,
} from "@/lib/google-site-verification";

export function GET() {
  const filename = getGoogleSiteVerificationFile();
  if (!filename) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(getGoogleSiteVerificationFileBody(filename), {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
