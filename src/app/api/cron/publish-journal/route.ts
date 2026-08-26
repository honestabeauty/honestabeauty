import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CMS_TAG } from "@/lib/cms/queries";
import { createSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PublishRun = { id: string };
type ScheduledPost = { slug: string };

function unauthorized() {
  return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (!cronSecret || authorization !== `Bearer ${cronSecret}`) {
    return unauthorized();
  }

  const supabase = createSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "CMS publishing service is not configured" },
      { status: 503 },
    );
  }

  const startedAt = new Date().toISOString();
  const { data: run, error: runError } = await supabase
    .from("kz_cms_publish_runs")
    .insert({
      triggered_by: "vercel-cron",
      started_at: startedAt,
    })
    .select("id")
    .single<PublishRun>();

  if (runError || !run) {
    console.error("Unable to create Journal publish run", runError);
    return NextResponse.json({ ok: false, error: "Unable to start publish run" }, { status: 500 });
  }

  try {
    const { data: duePosts, error: duePostsError } = await supabase
      .from("kz_cms_journal_posts")
      .select("slug")
      .eq("status", "scheduled")
      .lte("scheduled_at", startedAt)
      .returns<ScheduledPost[]>();

    if (duePostsError) throw duePostsError;

    const slugs = (duePosts ?? []).map((post) => post.slug);
    if (slugs.length > 0) {
      const { error: publishError } = await supabase
        .from("kz_cms_journal_posts")
        .update({ status: "published", updated_at: startedAt })
        .in("slug", slugs)
        .eq("status", "scheduled")
        .lte("scheduled_at", startedAt);

      if (publishError) throw publishError;

      revalidateTag(CMS_TAG, "max");
      // Refresh primary discovery surfaces so a newly public article is linked and listed for crawlers.
      revalidatePath("/");
      revalidatePath("/journal");
      revalidatePath("/sitemap.xml");
      slugs.forEach((slug) => revalidatePath(`/journal/${slug}`));
    }

    const { error: finishError } = await supabase
      .from("kz_cms_publish_runs")
      .update({
        finished_at: new Date().toISOString(),
        published_count: slugs.length,
        published_slugs: slugs,
      })
      .eq("id", run.id);

    if (finishError) throw finishError;

    return NextResponse.json({ ok: true, publishedCount: slugs.length, slugs });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown publishing error";
    console.error("Journal scheduled publishing failed", error);

    await supabase
      .from("kz_cms_publish_runs")
      .update({
        finished_at: new Date().toISOString(),
        error_message: message.slice(0, 1000),
      })
      .eq("id", run.id);

    return NextResponse.json({ ok: false, error: "Journal publishing failed" }, { status: 500 });
  }
}
