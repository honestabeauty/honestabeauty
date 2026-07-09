/**
 * Restore kz_cms_* tables from scripts/backups/cms-YYYYMMDD.json
 * into the CURRENT .env.local Supabase project.
 *
 * Prerequisites on the target project:
 *   1. Run supabase/migrations/001 → 002 → 003 in SQL Editor
 *   2. Create Auth users for CMS admins (or use create:admin after restore)
 *   3. Set .env.local to the NEW project keys
 *
 * Usage:
 *   npx tsx scripts/restore-cms.ts scripts/backups/cms-20260709.json
 *   npx tsx scripts/restore-cms.ts scripts/backups/cms-20260709.json --skip-admins
 *   npx tsx scripts/restore-cms.ts scripts/backups/cms-20260709.json --old-url https://OLD.supabase.co
 *
 * Notes:
 * - Does NOT migrate Auth users. Admins must be recreated on the new project.
 * - Remaps public_url / image fields that still point at --old-url to the new project URL.
 * - Storage files must be uploaded separately (see handoff checklist).
 */
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
config();

const CONTENT_TABLES = [
  "kz_cms_site_settings",
  "kz_cms_treatments",
  "kz_cms_journal_posts",
  "kz_cms_faqs",
  "kz_cms_media",
  "kz_cms_shop_videos",
] as const;

type BackupPayload = {
  exportedAt?: string;
  tables: Record<string, Record<string, unknown>[]>;
};

function argFlag(name: string) {
  return process.argv.includes(name);
}

function argValue(name: string) {
  const i = process.argv.indexOf(name);
  if (i === -1) return undefined;
  return process.argv[i + 1];
}

function remapUrls(
  value: unknown,
  oldBase: string | undefined,
  newBase: string,
): unknown {
  if (!oldBase) return value;
  if (typeof value === "string") {
    return value.split(oldBase).join(newBase);
  }
  if (Array.isArray(value)) {
    return value.map((v) => remapUrls(v, oldBase, newBase));
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = remapUrls(v, oldBase, newBase);
    }
    return out;
  }
  return value;
}

async function restoreCms() {
  const file = process.argv[2];
  if (!file || file.startsWith("-")) {
    console.error(
      "Usage: npx tsx scripts/restore-cms.ts <backup.json> [--skip-admins] [--old-url https://OLD.supabase.co]",
    );
    process.exit(1);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
    process.exit(1);
  }

  const skipAdmins = argFlag("--skip-admins");
  const oldUrl = (argValue("--old-url") ?? "https://xhixmbjtidzsibwpygxb.supabase.co").replace(
    /\/$/,
    "",
  );
  const newUrl = url.replace(/\/$/, "");

  const payload = JSON.parse(readFileSync(file, "utf8")) as BackupPayload;
  if (!payload.tables) {
    console.error("Invalid backup: missing tables");
    process.exit(1);
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Target: ${newUrl}`);
  console.log(`Backup: ${file} (exported ${payload.exportedAt ?? "unknown"})`);
  if (oldUrl !== newUrl) {
    console.log(`Remap storage URLs: ${oldUrl} → ${newUrl}`);
  }

  for (const table of CONTENT_TABLES) {
    const rows = payload.tables[table] ?? [];
    if (!rows.length) {
      console.log(`Skip ${table}: 0 rows`);
      continue;
    }

    const remapped = rows.map(
      (row) => remapUrls(row, oldUrl, newUrl) as Record<string, unknown>,
    );

    const { error } = await supabase.from(table).upsert(remapped);
    if (error) throw new Error(`${table}: ${error.message}`);
    console.log(`Restored ${table}: ${remapped.length} rows`);
  }

  if (skipAdmins) {
    console.log("Skipped kz_cms_admins (--skip-admins). Create admins with:");
    console.log("  npm run create:admin -- --email ... --password ... --role owner");
  } else {
    const admins = payload.tables.kz_cms_admins ?? [];
    console.log(
      `\nBackup has ${admins.length} admin row(s). Auth users are NOT copied.`,
    );
    console.log("Create matching Auth users on the new project, then either:");
    console.log("  A) npm run create:admin -- --email <email> --password <pass> --role owner");
    console.log("  B) Insert into kz_cms_admins with the new auth.users.id");
    for (const a of admins) {
      console.log(`  - ${String(a.email)} (${String(a.role)})`);
    }
  }

  console.log("\nNext: upload Storage files into bucket kz-cms if media URLs 404.");
}

restoreCms().catch((err) => {
  console.error(err);
  process.exit(1);
});
