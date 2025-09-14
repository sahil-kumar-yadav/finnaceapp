"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

export async function getWalletSummary(userId) {
  const supabase = await createClient(); // ← await here
  const { data, error } = await supabase.rpc("wallet_summary", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data;
}
