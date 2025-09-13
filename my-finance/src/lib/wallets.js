"use server";

import { createClient } from "./supabaseServer";

// ✅ Get all wallets for logged-in user
export async function getWallets(userId) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

    if (error) throw error;
    return data;
}

// ✅ Create wallet
export async function createWallet(userId, { name, currency }) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("wallets")
        .insert([{ user_id: userId, name, currency }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ✅ Update wallet
export async function updateWallet(walletId, updates) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("wallets")
        .update(updates)
        .eq("id", walletId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// ✅ Delete wallet
export async function deleteWallet(walletId) {
    const supabase = createClient();
    const { error } = await supabase.from("wallets").delete().eq("id", walletId);
    if (error) throw error;
}

// ✅ Get overall financial summary
export async function getOverallSummary(userId) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("overall_summary", { user_id_input: userId });
  if (error) throw error;
  return data[0]; // single row
}
