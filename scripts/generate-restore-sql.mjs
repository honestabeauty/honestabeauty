import fs from "fs";

const backup = JSON.parse(
  fs.readFileSync("scripts/backups/cms-20260709.json", "utf8"),
);
const oldBase = "https://xhixmbjtidzsibwpygxb.supabase.co";
const newBase = "https://nwywuatgkrmiibysbwkw.supabase.co";

function esc(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  if (Array.isArray(v)) {
    if (v.every((x) => typeof x === "string")) {
      return `ARRAY[${v.map((x) => esc(x)).join(",")}]::text[]`;
    }
    return `${esc(JSON.stringify(v))}::jsonb`;
  }
  if (typeof v === "object") return `${esc(JSON.stringify(v))}::jsonb`;
  const s = String(v).split(oldBase).join(newBase);
  return `'${s.replace(/'/g, "''")}'`;
}

const order = [
  "kz_cms_site_settings",
  "kz_cms_treatments",
  "kz_cms_journal_posts",
  "kz_cms_faqs",
  "kz_cms_media",
  "kz_cms_shop_videos",
];

let sql = `-- CMS restore for honestabeauty
-- Remapped storage URLs to ${newBase}

begin;

`;

for (const table of order) {
  const rows = backup.tables[table] || [];
  sql += `-- ${table} (${rows.length})\n`;
  if (!rows.length) continue;
  const cols = Object.keys(rows[0]);
  for (const row of rows) {
    const vals = cols.map((c) => esc(row[c]));
    sql += `insert into public.${table} (${cols.join(", ")}) values (${vals.join(", ")})\n`;
    sql += `on conflict do nothing;\n`;
  }
  sql += `\n`;
}

sql += `commit;

-- Admins skipped: create Auth user first, then insert into kz_cms_admins.
`;

fs.writeFileSync("scripts/client-restore-cms.sql", sql, "utf8");
console.log(
  "wrote scripts/client-restore-cms.sql",
  sql.length,
  "chars",
  "lines",
  sql.split("\n").length,
);
console.log(
  order.map((t) => `${t}=${(backup.tables[t] || []).length}`).join(", "),
);
