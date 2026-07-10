"use server";

import { redirect } from "next/navigation";
import { isCmsAdminUser } from "@/lib/cms/admin";
import { getSiteUrl } from "@/lib/site-url";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isCmsConfigured } from "@/lib/supabase/env";

export async function signInAdmin(formData: FormData) {
  if (!isCmsConfigured()) {
    redirect("/admin/login?error=config");
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=invalid");

  const userId = data.user?.id;
  if (!userId) redirect("/admin/login?error=invalid");

  const isAdmin = await isCmsAdminUser(supabase, userId);
  if (!isAdmin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  redirect("/admin");
}

export async function requestPasswordReset(formData: FormData) {
  if (!isCmsConfigured()) {
    redirect("/admin/forgot-password?error=config");
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) {
    redirect("/admin/forgot-password?error=missing");
  }

  const supabase = await createSupabaseServerClient();
  const redirectTo = `${getSiteUrl()}/admin/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

  // Always show the same success screen to avoid email enumeration.
  if (error) {
    console.error("[cms] resetPasswordForEmail failed:", error.message);
    redirect("/admin/forgot-password?error=send");
  }

  redirect("/admin/forgot-password?sent=1");
}

export async function signOutAdmin() {
  if (!isCmsConfigured()) {
    redirect("/admin/login");
  }
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
