import { revalidatePath } from "next/cache";
import { createClient } from "./supabaseServer";

// Fetch transactions for logged-in user
export async function getTransactions() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("transactions")
    .select("id, amount, type, category, notes, transaction_date, wallet_id")
    .eq("user_id", user.id)
    .order("transaction_date", { ascending: false });

  if (error) throw error;
  return data;
}

// Add transaction
export async function addTransaction(formData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    wallet_id: formData.wallet_id,
    amount: formData.amount,
    type: formData.type,
    category: formData.category,
    notes: formData.notes,
    transaction_date: formData.date || new Date().toISOString().split("T")[0],
  });

  if (error) throw error;

  revalidatePath("/dashboard");
}

// Delete transaction
export async function deleteTransaction(id) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/dashboard");
}
