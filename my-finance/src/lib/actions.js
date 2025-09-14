// src/lib/actions.js
// Auth/session helpers for server-side components.

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

// Create a Supabase client that works in Server Components (with cookies)
export function createServerSupabase() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies,
    }
  );
}

// Require user (redirect if not logged in)
export async function requireUser() {
  const supabase = createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
}
