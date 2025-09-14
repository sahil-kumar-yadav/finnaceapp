import { createClient } from "./supabaseServer";

/**
 * Get all transactions for user
 */
export async function getTransactions(userId) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("transactions")
        .select("*, clients(name), wallets(name)")
        .eq("user_id", userId)
        .order("transaction_date", { ascending: false });

    if (error) throw error;
    return data;
}

/**
 * Get single transaction by ID
 */
export async function getTransactionById(id) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("transactions")
        .select("*, clients(name), wallets(name)")
        .eq("id", id)
        .single();

    if (error) throw error;
    return data;
}

/**
 * Create transaction
 */
export async function createTransaction(userId, payload) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("transactions")
        .insert([{ user_id: userId, ...payload }])
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Update transaction
 */
export async function updateTransaction(id, updates) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("transactions")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;
    return data;
}

/**
 * Delete transaction
 */
export async function deleteTransaction(id) {
    const supabase = createClient();
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) throw error;
    return true;
}
