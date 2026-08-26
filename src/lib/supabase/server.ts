import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseAnonKey, getSupabaseUrl, isCmsConfigured } from "./env";

export async function createSupabaseServerClient() {
  if (!isCmsConfigured()) {
    throw new Error("Supabase CMS is not configured");
  }

  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

/** Read-only client for public content (no session required). */
export function createSupabasePublicClient() {
  if (!isCmsConfigured()) {
    return null;
  }

  return createClient(getSupabaseUrl(), getSupabaseAnonKey());
}

/**
 * Service-role client for server-only maintenance tasks such as scheduled publishing.
 * Never expose SUPABASE_SERVICE_ROLE_KEY to browser code.
 */
export function createSupabaseAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!isCmsConfigured() || !serviceRoleKey) {
    return null;
  }

  return createClient(getSupabaseUrl(), serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
