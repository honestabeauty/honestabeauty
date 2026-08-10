/**
 * Set hero image on a published CMS journal post.
 *
 * Usage:
 *   npx tsx scripts/set-journal-image.ts tuen-mun-acid-peel-skin-analysis /images/social/tuen-mun-acid-peel-skin-analysis.png
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config();

const slug = process.argv[2];
const image = process.argv[3];
const imageAlt =
  process.argv[4] ??
  "屯門做果酸煥膚安全嗎？量膚定制先了解膚質再決定";

if (!slug || !image) {
  console.error(
    "Usage: npx tsx scripts/set-journal-image.ts <slug> <image-path> [image-alt]",
  );
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase
  .from("kz_cms_journal_posts")
  .update({
    image,
    image_alt: imageAlt,
    updated_at: new Date().toISOString(),
  })
  .eq("slug", slug)
  .select("slug, title, image")
  .maybeSingle();

if (error) {
  console.error(error.message);
  process.exit(1);
}

if (!data) {
  console.error(`No journal post found for slug: ${slug}`);
  process.exit(1);
}

console.log("Updated journal post:", data);
