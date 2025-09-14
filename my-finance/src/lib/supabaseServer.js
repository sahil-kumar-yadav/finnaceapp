"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Ensure environment variables are defined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing user sessions.
        }
      },
    },
  });
}

export async function getWalletSummary(userId) {
  const supabase = await createClient(); // ✅ now properly awaited
  const { data, error } = await supabase.rpc("wallet_summary", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data;
}
