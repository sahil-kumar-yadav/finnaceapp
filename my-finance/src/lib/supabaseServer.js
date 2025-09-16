"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function createClient() {
  // ✅ must await cookies() in App Router
  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      async getAll() {
        return await cookieStore.getAll();
      },
      async setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // safe to ignore inside server components
        }
      },
    },
  });
}

export async function getWalletSummary(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("wallet_summary", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data;
}
